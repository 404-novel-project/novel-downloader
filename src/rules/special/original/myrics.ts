import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { gfetch, GfetchRequestOptions } from "../../../lib/http";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate, Chapter, Status } from "../../../main";
import { BaseRuleClass } from "../../../rules";

export class Myrics extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookId = /^\/novels\/(\d+)/.exec(document.location.pathname)?.[1];

    if (!bookId) {
      throw new Error("获取书籍信息出错！");
    }
    const mWindow = unsafeWindow as Mwindow;
    const initialState = mWindow.__INITIAL_STATE__;
    const lang = navigator.languages.join(", ");
    const country = initialState.global.country;

    const signIn = initialState.global.signIn.status === "SUCCESS";
    const accessToken = initialState.global.signIn.user?.accessToken ?? null;

    const infoApi = `https://api.myrics.com/v1/novels/${bookId}`;
    const chapterApiBase = `https://api.myrics.com/v1/novels/${bookId}/chapters`;

    const headers: Record<string, string> = {
      Authority: "api.myrics.com",
      Accept: "application/json",
      Origin: "https://www.myrics.com",
      Referer: "https://www.myrics.com/",
      "X-Platform": "FRONT",
      "X-Lang": lang,
      "X-Country": country,
    };
    if (accessToken) {
      headers.Authorization = accessToken;
    }
    const init: GfetchRequestOptions = {
      headers,
      method: "GET",
      responseType: "json",
    };

    interface Info {
      result: {
        author: {
          id: number;
          is_vip: boolean;
          pen_name: string;
          profile_image: string;
        };
        comment_count: number;
        cover_image: string;
        current_part: number;
        genres: Genre[];
        id: number;
        is_collected: boolean;
        is_finished: boolean;
        is_subscribed: boolean;
        long_summary: string;
        section: "BL" | "BG" | "OTHERS";
        short_summary: string;
        title: string;
        total_view_count: number;
        word_count: number;
      };
      status_code: number;
    }
    const respI = await gfetch(infoApi, init);
    const info = respI.response as Info;
    if (info.status_code !== 200) {
      throw new Error("获取书籍信息出错！");
    }
    const bookUrl = `https://www.myrics.com/novels/${bookId}`;
    const bookname = info.result.title;
    const author = info.result.author.pen_name;
    const introduction = info.result.long_summary;
    const introductionHTML = document.createElement("div");
    introductionHTML.innerText = introduction;
    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = info.result.cover_image;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = info.result.genres.map((g) => g.name);

    const chapters: Chapter[] = [];

    let pages = 0;
    let page = 1;
    const getChapterSearch = (p: number) => ({ page: p.toString() });
    interface ChaptersPage {
      result: {
        has_next: boolean;
        has_prev: boolean;
        items: ChapterItem[];
        page: number;
        pages: number;
        per_page: 20;
        total_count: number;
      };
      status_code: number;
    }
    while (pages === 0 || page <= pages) {
      const chapterApiUrl =
        chapterApiBase +
        `?${new URLSearchParams(getChapterSearch(page)).toString()}`;

      const respC = await gfetch(chapterApiUrl, init);
      const chaptersPage = respC.response as ChaptersPage;
      if (chaptersPage.status_code !== 200) {
        throw new Error("获取书籍信息出错！");
      }
      pages = chaptersPage.result.pages;
      page++;
      for (const item of chaptersPage.result.items) {
        const chapterId = item.id;
        const chapterUrl = `https://www.myrics.com/novels/${bookId}/chapters/${chapterId}`;
        const chapterNumber = item.order;
        const chapterName = `${item.order} - ${item.title}`;
        const isVIP = item.coin !== 0;
        const isPaid = item.is_purchased;
        const sectionNumber = item.part;
        const sectionName = `卷${sectionNumber}`;
        const sectionChapterNumber = item.order;
        const isAdult = item.is_adult;
        const chapter = new Chapter(
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP,
          isPaid,
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          this.chapterParse,
          this.charset,
          { bookId, chapterId, init }
        );
        if (chapter.isVIP === true && chapter.isPaid === false) {
          chapter.status = Status.aborted;
        }
        if (signIn === false && isAdult === true) {
          chapter.status = Status.aborted;
        }
        chapters.push(chapter);
      }
    }
    chapters.sort((a: Chapter, b: Chapter) => {
      if (a.sectionNumber && b.sectionNumber) {
        if (a.sectionNumber !== b.sectionNumber) {
          return a.sectionNumber - b.sectionNumber;
        } else {
          if (a.sectionChapterNumber && b.sectionChapterNumber) {
            return a.sectionChapterNumber - b.sectionChapterNumber;
          }
        }
      } else {
        return a.chapterNumber - b.chapterNumber;
      }
      return 0;
    });
    let i = 0;
    for (const c of chapters) {
      i++;
      c.chapterNumber = i;
    }

    const book = new Book(
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters
    );
    return book;
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    interface Options {
      bookId: string;
      chapterId: number;
      init: GfetchRequestOptions;
    }
    interface ChapterApiResponse {
      result: {
        coin: number;
        coin_type: string;
        content: string;
        id: number;
        is_adult: boolean;
        is_available: boolean;
        next_chapter: ChapterItem;
        order: number;
        part: number;
        prev_chapter: ChapterItem;
        published_at: string;
        title: string;
        word_count: number;
      };
      status_code: number;
    }
    const { bookId, chapterId, init } = options as Options;
    const url = `https://api.myrics.com/v1/novels/${bookId}/chapters/${chapterId}`;
    const resp = await gfetch(url, init);
    const chapter = resp.response as ChapterApiResponse;
    if (chapter.status_code !== 200) {
      throw new Error("获取章节失败！");
    }
    const contentRaw = document.createElement("div");
    contentRaw.innerHTML = chapter.result.content;
    const {
      dom: contentHTML,
      text: contentText,
      images: contentImages,
    } = await cleanDOM(contentRaw, "TM");
    return {
      chapterName,
      contentRaw,
      contentText,
      contentHTML,
      contentImages,
      additionalMetadate: null,
    };
  }
}

interface ChapterItem {
  coin: number;
  coin_type: string;
  comment_count: number;
  id: number;
  is_adult: boolean;
  is_purchased: boolean;
  novel_id: number;
  order: number;
  part: number;
  published_at: string;
  title: string;
  total_view_count: number;
  word_count: number;
}

type Mwindow = { __INITIAL_STATE__: InitialState } & Window & typeof globalThis;

interface User {
  accessToken: string;
  author: null;
  authorSponsorshipCoin: number;
  authorSponsorshipCoinForNextGrade: number;
  authorSponsorshipGrade: number;
  backgroundColor: string;
  coin: number;
  collectNovelCount: number;
  createdAt: string;
  email: string;
  fontSize: number;
  homePage: string;
  id: number;
  isAdmin: boolean;
  isAuthor: boolean;
  isReviewer: boolean;
  isVipUser: boolean;
  lastPasswordChangedAt: null;
  locale: string;
  nickname: string;
  point: number;
  readWordCount: number;
  readWordCountForNextGrade: number;
  readWordCountGrade: number;
  reviewCount: number;
  status: "ACTIVE";
  subscribeNovelCount: number;
  unreadMailCount: number;
}
interface Genre {
  id: number;
  name: string;
  order: number;
}
interface InitialState {
  global: {
    signIn: {
      status: "LOADING" | "SUCCESS";
      user: User | null;
    };
    genres: {
      status: "LOADING";
      isLoaded: boolean;
      genres: [];
    };
    sponsorItems: {
      AUTHOR_SPONSORSHIP: {
        status: "LOADING";
        isLoaded: boolean;
        items: [];
      };
      REVIEWER_SPONSORSHIP: {
        status: "LOADING";
        isLoaded: boolean;
        items: [];
      };
    };
    mails: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    exchangeRates: {
      status: "LOADING";
      isLoaded: boolean;
      data: {};
    };
    giftBox: {
      status: "LOADING";
      isLoaded: boolean;
      data: {};
    };
    country: "CN";
    viewLang: null;
  };
  comments: {};
  modals: {
    searchedNovels: {
      status: "INITIAL";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
  };
  banner: {};
  adult: {
    status: "LOADING";
    isLoaded: boolean;
    pagination: {
      hasNext: boolean;
      hasPrev: boolean;
      items: [];
      page: number;
      pages: number;
      totalCount: number;
    };
  };
  author: {
    profile: {
      status: "LOADING";
      isLoaded: boolean;
      author: {};
    };
    updatedChapters: {
      status: "LOADING";
      isLoaded: boolean;
      chapters: [];
    };
    notices: {
      status: "LOADING";
      isLoaded: boolean;
      notices: [];
    };
    novels: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    recommendations: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    searchNovels: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    sponsors: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
  };
  bestReviewCreate: {
    status: "LOADING";
    isLoaded: boolean;
    bestReview: {};
  };
  bestReviewDetail: {
    status: "LOADING";
    isLoaded: boolean;
    bestReview: {};
  };
  bestReviews: {
    status: "LOADING";
    isLoaded: boolean;
    pagination: {
      hasNext: boolean;
      hasPrev: boolean;
      items: [];
      page: number;
      pages: number;
      totalCount: number;
    };
  };
  chapterDetail: {
    novel: {
      status: "LOADING";
      isLoaded: boolean;
      novel: {};
    };
    chapter: {
      status: "LOADING";
      isLoaded: boolean;
      chapter: {};
    };
    sponsorshipShares: {
      status: "LOADING";
      isLoaded: boolean;
      items: [];
    };
  };
  chapterList: {
    novelInfo: {
      status: "SUCCESS";
      isLoaded: boolean;
      novel: {
        author: {
          id: number;
          isVip: boolean;
          penName: string;
          profileImage: string;
        };
        commentCount: number;
        coverImage: string;
        currentPart: number;
        genres: Genre[];
        id: number;
        isCollected: boolean;
        isFinished: boolean;
        isSubscribed: boolean;
        longSummary: string;
        section: string;
        shortSummary: string;
        title: string;
        totalViewCount: number;
        wordCount: number;
      };
    };
    chapters: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    recommendations: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
  };
  copyright: {
    status: "LOADING";
    isLoaded: boolean;
    novels: [];
  };
  fanClub: {
    info: {
      status: "LOADING";
      isLoaded: boolean;
      info: {};
    };
    feeds: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    bigFans: {
      status: "LOADING";
      fans: [];
    };
    novels: {
      status: "LOADING";
      novels: [];
    };
  };
  home: {
    vipAuthorRecentNovels: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    newAuthorRecentNovels: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    finishedRecentNovels: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    ranking: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    bestReviews: {
      status: "LOADING";
      isLoaded: boolean;
      reviews: [];
    };
    notices: {
      status: "LOADING";
      isLoaded: boolean;
      notices: [];
    };
  };
  notices: {
    status: "LOADING";
    isLoaded: boolean;
    pagination: {
      hasNext: boolean;
      hasPrev: boolean;
      items: [];
      page: number;
      pages: number;
      totalCount: number;
    };
  };
  novelCommentList: {
    status: "LOADING";
    isLoaded: boolean;
    novel: {};
  };
  noticeDetail: {
    notice: {
      status: "LOADING";
      isLoaded: boolean;
      noticeDetail: {};
    };
    authorNotice: {
      status: "LOADING";
      isLoaded: boolean;
      noticeDetail: {};
    };
  };
  novelDetail: {
    novelInfo: {
      status: "LOADING";
      isLoaded: boolean;
      novel: {};
    };
    recommendations: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
  };
  personal: {
    userInfo: {
      status: "LOADING";
      isLoaded: boolean;
      userInfo: {};
    };
    novelInfo: {
      status: "LOADING";
      isLoaded: boolean;
      novel: {};
    };
    coinHistories: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    pointHistories: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    collectNovels: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    collectAuthors: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    collectReviewers: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    subscribedNovels: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    mails: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    mail: {
      status: "LOADING";
      isLoaded: boolean;
      mail: {};
    };
    coinToPoint: {
      status: "LOADING";
      coin: null;
    };
    couponCodes: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
  };
  ranking: {
    status: "LOADING";
    isLoaded: boolean;
    pagination: {
      hasNext: boolean;
      hasPrev: boolean;
      items: [];
      page: number;
      pages: number;
      totalCount: number;
    };
    waitedType: null;
  };
  recentChapters: {
    status: "LOADING";
    isLoaded: boolean;
    pagination: {
      hasNext: boolean;
      hasPrev: boolean;
      items: [];
      page: number;
      pages: number;
      totalCount: number;
    };
  };
  recentNovels: {
    status: "LOADING";
    isLoaded: boolean;
    pagination: {
      hasNext: boolean;
      hasPrev: boolean;
      items: [];
      page: number;
      pages: number;
      totalCount: number;
    };
  };
  recharge: {
    paymentGateways: {
      status: "LOADING";
      isLoaded: boolean;
      paymentGateways: [];
    };
    paymentGatewayItems: {
      status: "LOADING";
      isLoading: boolean;
      paymentGatewayItems: [];
    };
    purchaseResult: {
      success: null;
      message: null;
      transaction: {
        id: null;
        pg: null;
        userEmail: null;
        createdAt: null;
      };
      item: {
        name: null;
        price: null;
        currency: null;
      };
    };
  };
  recommendations: {
    adminRecommendations: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    personalRecommendations: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
  };
  search: {
    searchLogs: {
      status: "LOADING";
      isLoaded: boolean;
      searchLogs: [];
    };
    searchNovels: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
  };
  studioBestReviews: {
    status: "LOADING";
    isLoaded: boolean;
    pagination: {
      hasNext: boolean;
      hasPrev: boolean;
      items: [];
      page: number;
      pages: number;
      totalCount: number;
    };
  };
  studioCommon: {
    levelTables: {
      status: "LOADING";
      isLoaded: boolean;
      levelTables: [];
    };
    coinPerPrice: {
      status: "LOADING";
      isLoaded: boolean;
      coinPerPrice: {};
    };
    banners: {
      status: "LOADING";
      isLoaded: boolean;
      banners: [];
    };
  };
  studioIncome: {
    settlementRequests: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    cumulativeSettlementIncome: {
      status: "LOADING";
      isLoaded: boolean;
      income: {};
    };
    novelIncomes: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    monthlyNovelIncomes: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    sponsorIncomes: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    cumulativeSponsorIncome: {
      status: "LOADING";
      isLoaded: boolean;
      coin: number;
    };
    monthlySponsorIncomes: {
      status: "LOADING";
      isLoaded: boolean;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
    monthlyCumulativeSponsorIncome: {
      status: "LOADING";
      isLoaded: boolean;
      coin: number;
    };
    novelIncomeStats: {
      status: "LOADING";
      isLoaded: boolean;
      stats: [];
    };
    sponsorIncomeStats: {
      status: "LOADING";
      isLoaded: boolean;
      stats: [];
    };
  };
  studioMyPage: {
    updatedChapters: {
      status: "LOADING";
      isLoaded: boolean;
      chapters: [];
    };
    notices: {
      status: "LOADING";
      isLoaded: boolean;
      notices: [];
    };
    novels: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    recommendations: {
      status: "LOADING";
      isLoaded: boolean;
      novels: [];
    };
    noticeCreate: {
      status: "LOADING";
    };
    noticeUpdate: {
      status: "LOADING";
    };
    noticeDetail: {
      status: "LOADING";
      isLoaded: boolean;
      notice: {};
    };
  };
  studioNovelDetail: {
    novel: {
      status: "LOADING";
      isLoaded: boolean;
      novel: {};
    };
    chapters: {
      status: "LOADING";
      isLoaded: boolean;
      novelId: null;
      pagination: {
        hasNext: boolean;
        hasPrev: boolean;
        items: [];
        page: number;
        pages: number;
        totalCount: number;
      };
    };
  };
  studioNovelManage: {
    novelDefaultCovers: {
      status: "LOADING";
      isLoaded: boolean;
      covers: [];
    };
    novelCreate: {
      status: "LOADING";
    };
    novelUpdate: {
      status: "LOADING";
    };
    recentNovels: {
      status: "LOADING";
      novels: [];
    };
    chpaterCreate: {
      status: "LOADING";
    };
    chpaterUpdate: {
      chapter: {
        status: "LOADING";
        isLoaded: boolean;
        chapter: null;
      };
      status: "LOADING";
    };
    chpaterDelete: {
      status: "LOADING";
    };
  };
  studioSettlementRequest: {
    areaFees: {
      status: "LOADING";
      isLoaded: boolean;
      areaFees: [];
    };
    settlementRequest: {
      status: "INITIAL";
      isLoaded: boolean;
      settlementRequest: null;
    };
  };
  router: {
    location: null;
  };
}

/*
window.__INITIAL_STATE__
{
    "global": {
        "signIn": {
            "status": "LOADING",
            "user": null
        },
        "genres": {
            "status": "LOADING",
            "isLoaded": boolean,
            "genres": []
        },
        "sponsorItems": {
            "AUTHOR_SPONSORSHIP": {
                "status": "LOADING",
                "isLoaded": boolean,
                "items": []
            },
            "REVIEWER_SPONSORSHIP": {
                "status": "LOADING",
                "isLoaded": boolean,
                "items": []
            }
        },
        "mails": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "exchangeRates": {
            "status": "LOADING",
            "isLoaded": boolean,
            "data": {}
        },
        "giftBox": {
            "status": "LOADING",
            "isLoaded": boolean,
            "data": {}
        },
        "country": "CN",
        "viewLang": null
    },
    "comments": {},
    "modals": {
        "searchedNovels": {
            "status": "INITIAL",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        }
    },
    "banner": {},
    "adult": {
        "status": "LOADING",
        "isLoaded": boolean,
        "pagination": {
            "hasNext": boolean,
            "hasPrev": boolean,
            "items": [],
            "page": 1,
            "pages": 1,
            "totalCount": 0
        }
    },
    "author": {
        "profile": {
            "status": "LOADING",
            "isLoaded": boolean,
            "author": {}
        },
        "updatedChapters": {
            "status": "LOADING",
            "isLoaded": boolean,
            "chapters": []
        },
        "notices": {
            "status": "LOADING",
            "isLoaded": boolean,
            "notices": []
        },
        "novels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "recommendations": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "searchNovels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "sponsors": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        }
    },
    "bestReviewCreate": {
        "status": "LOADING",
        "isLoaded": boolean,
        "bestReview": {}
    },
    "bestReviewDetail": {
        "status": "LOADING",
        "isLoaded": boolean,
        "bestReview": {}
    },
    "bestReviews": {
        "status": "LOADING",
        "isLoaded": boolean,
        "pagination": {
            "hasNext": boolean,
            "hasPrev": boolean,
            "items": [],
            "page": 1,
            "pages": 1,
            "totalCount": 0
        }
    },
    "chapterDetail": {
        "novel": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novel": {}
        },
        "chapter": {
            "status": "LOADING",
            "isLoaded": boolean,
            "chapter": {}
        },
        "sponsorshipShares": {
            "status": "LOADING",
            "isLoaded": boolean,
            "items": []
        }
    },
    "chapterList": {
        "novelInfo": {
            "status": "SUCCESS",
            "isLoaded": true,
            "novel": {
                "author": {
                    "id": 3621,
                    "isVip": true,
                    "penName": "路过的袖子",
                    "profileImage": "https://cdn.myrics.com/author_profile_images/09808b44-2434-4e40-8ea8-224072bd8497.png?_ts=1637055116.2230818"
                },
                "commentCount": 2057,
                "coverImage": "https://cdn.myrics.com/novel_cover_images/7a874b52-475a-443d-b06e-12d4e2df651f.png?_ts=1608200020.4682019",
                "currentPart": 2,
                "genres": [
                    {
                        "id": 54,
                        "name": "未來科幻",
                        "order": 1
                    },
                    {
                        "id": 48,
                        "name": "ABO",
                        "order": 4
                    },
                    {
                        "id": 49,
                        "name": "🚗",
                        "order": 4
                    },
                    {
                        "id": 51,
                        "name": "搞笑",
                        "order": 5
                    }
                ],
                "id": 5304,
                "isCollected": boolean,
                "isFinished": boolean,
                "isSubscribed": boolean,
                "longSummary": "在ABO本位面宇宙中，有联盟和帝国两大阵营，联盟有主席，而帝国是军权控制的君主立宪，帝国元帅和国君共享最高位。这个世界ABO来源于对抗虫族的人类被迫改造自己融合了外星基因，因此A具备强悍肉体，O的初代具有意念力，后来逐渐退化为目前状态，ABO都有高自愈力并且长寿。A肉体强悍，普遍比O和B强度高30%，但是O智商较高且具有策略才能（因为有王虫基因），因此军队里参谋指挥军官通常O而前线王牌战斗英雄通常A。B受发情影响最少，身体状态稳定且人数偏多。军队普遍担任整备师和研究员。因为现代人类的性活力旺盛，是个完全不介意随时搞起的社会。【球大家给推荐一下吧，自觉还挺带劲的，就是写完不火233】",
                "section": "BL",
                "shortSummary": "联盟帝国的无节操ABO世界【帝国边境日常的正篇】球推荐呀！",
                "title": "ABO<军事会议>停车场",
                "totalViewCount": 94036,
                "wordCount": 511214
            }
        },
        "chapters": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "recommendations": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        }
    },
    "copyright": {
        "status": "LOADING",
        "isLoaded": boolean,
        "novels": []
    },
    "fanClub": {
        "info": {
            "status": "LOADING",
            "isLoaded": boolean,
            "info": {}
        },
        "feeds": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "bigFans": {
            "status": "LOADING",
            "fans": []
        },
        "novels": {
            "status": "LOADING",
            "novels": []
        }
    },
    "home": {
        "vipAuthorRecentNovels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "newAuthorRecentNovels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "finishedRecentNovels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "ranking": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "bestReviews": {
            "status": "LOADING",
            "isLoaded": boolean,
            "reviews": []
        },
        "notices": {
            "status": "LOADING",
            "isLoaded": boolean,
            "notices": []
        }
    },
    "notices": {
        "status": "LOADING",
        "isLoaded": boolean,
        "pagination": {
            "hasNext": boolean,
            "hasPrev": boolean,
            "items": [],
            "page": 1,
            "pages": 1,
            "totalCount": 0
        }
    },
    "novelCommentList": {
        "status": "LOADING",
        "isLoaded": boolean,
        "novel": {}
    },
    "noticeDetail": {
        "notice": {
            "status": "LOADING",
            "isLoaded": boolean,
            "noticeDetail": {}
        },
        "authorNotice": {
            "status": "LOADING",
            "isLoaded": boolean,
            "noticeDetail": {}
        }
    },
    "novelDetail": {
        "novelInfo": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novel": {}
        },
        "recommendations": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        }
    },
    "personal": {
        "userInfo": {
            "status": "LOADING",
            "isLoaded": boolean,
            "userInfo": {}
        },
        "novelInfo": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novel": {}
        },
        "coinHistories": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "pointHistories": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "collectNovels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "collectAuthors": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "collectReviewers": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "subscribedNovels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "mails": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "mail": {
            "status": "LOADING",
            "isLoaded": boolean,
            "mail": {}
        },
        "coinToPoint": {
            "status": "LOADING",
            "coin": null
        },
        "couponCodes": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        }
    },
    "ranking": {
        "status": "LOADING",
        "isLoaded": boolean,
        "pagination": {
            "hasNext": boolean,
            "hasPrev": boolean,
            "items": [],
            "page": 1,
            "pages": 1,
            "totalCount": 0
        },
        "waitedType": null
    },
    "recentChapters": {
        "status": "LOADING",
        "isLoaded": boolean,
        "pagination": {
            "hasNext": boolean,
            "hasPrev": boolean,
            "items": [],
            "page": 1,
            "pages": 1,
            "totalCount": 0
        }
    },
    "recentNovels": {
        "status": "LOADING",
        "isLoaded": boolean,
        "pagination": {
            "hasNext": boolean,
            "hasPrev": boolean,
            "items": [],
            "page": 1,
            "pages": 1,
            "totalCount": 0
        }
    },
    "recharge": {
        "paymentGateways": {
            "status": "LOADING",
            "isLoaded": boolean,
            "paymentGateways": []
        },
        "paymentGatewayItems": {
            "status": "LOADING",
            "isLoading": boolean,
            "paymentGatewayItems": []
        },
        "purchaseResult": {
            "success": null,
            "message": null,
            "transaction": {
                "id": null,
                "pg": null,
                "userEmail": null,
                "createdAt": null
            },
            "item": {
                "name": null,
                "price": null,
                "currency": null
            }
        }
    },
    "recommendations": {
        "adminRecommendations": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "personalRecommendations": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        }
    },
    "search": {
        "searchLogs": {
            "status": "LOADING",
            "isLoaded": boolean,
            "searchLogs": []
        },
        "searchNovels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        }
    },
    "studioBestReviews": {
        "status": "LOADING",
        "isLoaded": boolean,
        "pagination": {
            "hasNext": boolean,
            "hasPrev": boolean,
            "items": [],
            "page": 1,
            "pages": 1,
            "totalCount": 0
        }
    },
    "studioCommon": {
        "levelTables": {
            "status": "LOADING",
            "isLoaded": boolean,
            "levelTables": []
        },
        "coinPerPrice": {
            "status": "LOADING",
            "isLoaded": boolean,
            "coinPerPrice": {}
        },
        "banners": {
            "status": "LOADING",
            "isLoaded": boolean,
            "banners": []
        }
    },
    "studioIncome": {
        "settlementRequests": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "cumulativeSettlementIncome": {
            "status": "LOADING",
            "isLoaded": boolean,
            "income": {}
        },
        "novelIncomes": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "monthlyNovelIncomes": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "sponsorIncomes": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "cumulativeSponsorIncome": {
            "status": "LOADING",
            "isLoaded": boolean,
            "coin": 0
        },
        "monthlySponsorIncomes": {
            "status": "LOADING",
            "isLoaded": boolean,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        },
        "monthlyCumulativeSponsorIncome": {
            "status": "LOADING",
            "isLoaded": boolean,
            "coin": 0
        },
        "novelIncomeStats": {
            "status": "LOADING",
            "isLoaded": boolean,
            "stats": []
        },
        "sponsorIncomeStats": {
            "status": "LOADING",
            "isLoaded": boolean,
            "stats": []
        }
    },
    "studioMyPage": {
        "updatedChapters": {
            "status": "LOADING",
            "isLoaded": boolean,
            "chapters": []
        },
        "notices": {
            "status": "LOADING",
            "isLoaded": boolean,
            "notices": []
        },
        "novels": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "recommendations": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novels": []
        },
        "noticeCreate": {
            "status": "LOADING"
        },
        "noticeUpdate": {
            "status": "LOADING"
        },
        "noticeDetail": {
            "status": "LOADING",
            "isLoaded": boolean,
            "notice": {}
        }
    },
    "studioNovelDetail": {
        "novel": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novel": {}
        },
        "chapters": {
            "status": "LOADING",
            "isLoaded": boolean,
            "novelId": null,
            "pagination": {
                "hasNext": boolean,
                "hasPrev": boolean,
                "items": [],
                "page": 1,
                "pages": 1,
                "totalCount": 0
            }
        }
    },
    "studioNovelManage": {
        "novelDefaultCovers": {
            "status": "LOADING",
            "isLoaded": boolean,
            "covers": []
        },
        "novelCreate": {
            "status": "LOADING"
        },
        "novelUpdate": {
            "status": "LOADING"
        },
        "recentNovels": {
            "status": "LOADING",
            "novels": []
        },
        "chpaterCreate": {
            "status": "LOADING"
        },
        "chpaterUpdate": {
            "chapter": {
                "status": "LOADING",
                "isLoaded": boolean,
                "chapter": null
            },
            "status": "LOADING"
        },
        "chpaterDelete": {
            "status": "LOADING"
        }
    },
    "studioSettlementRequest": {
        "areaFees": {
            "status": "LOADING",
            "isLoaded": boolean,
            "areaFees": []
        },
        "settlementRequest": {
            "status": "INITIAL",
            "isLoaded": boolean,
            "settlementRequest": null
        }
    },
    "router": {
        "location": null
    }
}
*/

/*
/// https://api.myrics.com/v1/novels/5304
{
  "result": {
    "author": {
      "id": 3621,
      "is_vip": true,
      "pen_name": "\u8def\u8fc7\u7684\u8896\u5b50",
      "profile_image": "https://cdn.myrics.com/author_profile_images/09808b44-2434-4e40-8ea8-224072bd8497.png?_ts=1637055116.2230818"
    },
    "comment_count": 2057,
    "cover_image": "https://cdn.myrics.com/novel_cover_images/7a874b52-475a-443d-b06e-12d4e2df651f.png?_ts=1608200020.4682019",
    "current_part": 2,
    "genres": [
      { "id": 54, "name": "\u672a\u4f86\u79d1\u5e7b", "order": 1 },
      { "id": 48, "name": "ABO", "order": 4 },
      { "id": 49, "name": "\ud83d\ude97", "order": 4 },
      { "id": 51, "name": "\u641e\u7b11", "order": 5 }
    ],
    "id": 5304,
    "is_collected": false,
    "is_finished": false,
    "is_subscribed": false,
    "long_summary": "\u5728ABO\u672c\u4f4d\u9762\u5b87\u5b99\u4e2d\uff0c\u6709\u806f\u76df\u548c\u5e1d\u570b\u5169\u5927\u9663\u71df\uff0c\u806f\u76df\u6709\u4e3b\u5e2d\uff0c\u800c\u5e1d\u570b\u662f\u8ecd\u6b0a\u63a7\u5236\u7684\u541b\u4e3b\u7acb\u61b2\uff0c\u5e1d\u570b\u5143\u5e25\u548c\u570b\u541b\u5171\u4eab\u6700\u9ad8\u4f4d\u3002\u9019\u500b\u4e16\u754cABO\u4f86\u6e90\u65bc\u5c0d\u6297\u87f2\u65cf\u7684\u4eba\u985e\u88ab\u8feb\u6539\u9020\u81ea\u5df1\u878d\u5408\u4e86\u5916\u661f\u57fa\u56e0\uff0c\u56e0\u6b64A\u5177\u5099\u5f37\u608d\u8089\u9ad4\uff0cO\u7684\u521d\u4ee3\u5177\u6709\u610f\u5ff5\u529b\uff0c\u5f8c\u4f86\u9010\u6f38\u9000\u5316\u70ba\u76ee\u524d\u72c0\u614b\uff0cABO\u90fd\u6709\u9ad8\u81ea\u6108\u529b\u4e26\u4e14\u9577\u58fd\u3002A\u8089\u9ad4\u5f37\u608d\uff0c\u666e\u904d\u6bd4O\u548cB\u5f37\u5ea6\u9ad830%\uff0c\u4f46\u662fO\u667a\u5546\u8f03\u9ad8\u4e14\u5177\u6709\u7b56\u7565\u624d\u80fd\uff08\u56e0\u70ba\u6709\u738b\u87f2\u57fa\u56e0\uff09\uff0c\u56e0\u6b64\u8ecd\u968a\u88e1\u53c3\u8b00\u6307\u63ee\u8ecd\u5b98\u901a\u5e38O\u800c\u524d\u7dda\u738b\u724c\u6230\u9b25\u82f1\u96c4\u901a\u5e38A\u3002B\u53d7\u767c\u60c5\u5f71\u97ff\u6700\u5c11\uff0c\u8eab\u9ad4\u72c0\u614b\u7a69\u5b9a\u4e14\u4eba\u6578\u504f\u591a\u3002\u8ecd\u968a\u666e\u904d\u64d4\u4efb\u6574\u5099\u5e2b\u548c\u7814\u7a76\u54e1\u3002\u56e0\u70ba\u73fe\u4ee3\u4eba\u985e\u7684\u6027\u6d3b\u529b\u65fa\u76db\uff0c\u662f\u500b\u5b8c\u5168\u4e0d\u4ecb\u610f\u96a8\u6642\u641e\u8d77\u7684\u793e\u6703\u3002\u3010\u7403\u5927\u5bb6\u7d66\u63a8\u85a6\u4e00\u4e0b\u5427\uff0c\u81ea\u89ba\u9084\u633a\u5e36\u52c1\u7684\uff0c\u5c31\u662f\u5beb\u5b8c\u4e0d\u706b233\u3011",
    "section": "BL",
    "short_summary": "\u806f\u76df\u5e1d\u570b\u7684\u7121\u7bc0\u64cdABO\u4e16\u754c\u3010\u5e1d\u570b\u908a\u5883\u65e5\u5e38\u7684\u6b63\u7bc7\u3011\u7403\u63a8\u85a6\u5440\uff01",
    "title": "ABO<\u8ecd\u4e8b\u6703\u8b70>\u505c\u8eca\u5834",
    "total_view_count": 94036,
    "word_count": 511214
  },
  "status_code": 200
}
*/

/*
/// https://api.myrics.com/v1/novels/9972/chapters?page=1
{
  "result": {
    "has_next": true,
    "has_prev": false,
    "items": [
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 205511,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 121,
        "part": 1,
        "published_at": "2021-12-06 21:00:00",
        "title": "\u7b2c121\u7ae0\u3001\u505a\u6389\u4ed6\u5011",
        "total_view_count": 9,
        "word_count": 1578
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 205184,
        "is_adult": true,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 120,
        "part": 1,
        "published_at": "2021-12-05 21:00:00",
        "title": "\u7b2c120\u7ae0\u3001\u9ece\u843d\u6492\u5b0c",
        "total_view_count": 18,
        "word_count": 1960
      },
      {
        "coin": 0,
        "coin_type": "FREE",
        "comment_count": 0,
        "id": 205183,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 119,
        "part": 1,
        "published_at": "2021-12-04 21:00:00",
        "title": "\u7b2c119\u7ae0\u3001\u8cb7\u80a1\u7968\u6536\u8cfc",
        "total_view_count": 27,
        "word_count": 1658
      },
      {
        "coin": 0,
        "coin_type": "FREE",
        "comment_count": 0,
        "id": 205182,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 118,
        "part": 1,
        "published_at": "2021-12-03 21:00:00",
        "title": "\u7b2c118\u7ae0\u3001\u8ce3\u5834\u8cfc\u7269",
        "total_view_count": 34,
        "word_count": 1781
      },
      {
        "coin": 0,
        "coin_type": "FREE",
        "comment_count": 0,
        "id": 205181,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 117,
        "part": 1,
        "published_at": "2021-12-02 21:00:00",
        "title": "\u7b2c117\u7ae0\u3001\u5c0d\u6771\u7948\u597d",
        "total_view_count": 31,
        "word_count": 1548
      },
      {
        "coin": 0,
        "coin_type": "FREE",
        "comment_count": 0,
        "id": 204582,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 116,
        "part": 1,
        "published_at": "2021-11-30 21:00:00",
        "title": "\u7b2c116\u7ae0\u3001\u4ea4\u5f80\u95dc\u4fc2",
        "total_view_count": 38,
        "word_count": 1828
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 204581,
        "is_adult": true,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 115,
        "part": 1,
        "published_at": "2021-11-29 21:00:00",
        "title": "\u7b2c115\u7ae0\u3001\u4e09\u4eba\u884c\u5fc5\u6709\u4e73\u4ea4",
        "total_view_count": 37,
        "word_count": 1633
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 204580,
        "is_adult": true,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 114,
        "part": 1,
        "published_at": "2021-11-28 21:00:00",
        "title": "\u7b2c114\u7ae0\u3001\u7b2c\u4e00\u6b21\u5e7e\u6b72",
        "total_view_count": 40,
        "word_count": 1719
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 204578,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 113,
        "part": 1,
        "published_at": "2021-11-27 21:00:00",
        "title": "\u7b2c113\u7ae0\u3001\u63a5\u53d7\u62f7\u554f",
        "total_view_count": 30,
        "word_count": 1724
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 204426,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 112,
        "part": 1,
        "published_at": "2021-11-26 21:00:00",
        "title": "\u7b2c112\u7ae0\u3001\u7761\u8863\u6c92\u4e86",
        "total_view_count": 26,
        "word_count": 1839
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 204425,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 111,
        "part": 1,
        "published_at": "2021-11-25 21:00:00",
        "title": "\u7b2c111\u7ae0\u3001\u6771\u7948\u7684\u66f8\u623f",
        "total_view_count": 34,
        "word_count": 1985
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 204424,
        "is_adult": true,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 110,
        "part": 1,
        "published_at": "2021-11-24 21:00:00",
        "title": "\u7b2c110\u7ae0\u3001\u7537\u670b\u53cb\u5f85\u9047",
        "total_view_count": 46,
        "word_count": 1779
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 204320,
        "is_adult": true,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 109,
        "part": 1,
        "published_at": "2021-11-23 21:00:00",
        "title": "\u7b2c109\u7ae0\u3001\u63a5\u53d7\u544a\u767d",
        "total_view_count": 45,
        "word_count": 2036
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 203877,
        "is_adult": true,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 108,
        "part": 1,
        "published_at": "2021-11-22 21:00:00",
        "title": "\u7b2c108\u7ae0\u3001\u6d74\u5ba4\u5167\u53e3\u4ea4\uff08\u5faeH\uff09",
        "total_view_count": 43,
        "word_count": 1952
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 203875,
        "is_adult": true,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 107,
        "part": 1,
        "published_at": "2021-11-21 21:00:00",
        "title": "\u7b2c107\u7ae0\u3001\u4e09\u4eba\u904e\u591c\uff08\u5faeH\uff09",
        "total_view_count": 49,
        "word_count": 1606
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 203874,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 106,
        "part": 1,
        "published_at": "2021-11-20 21:00:00",
        "title": "\u7b2c106\u7ae0\u3001\u501f\u4f4f\u5b63\u666f\u7199\u5bb6",
        "total_view_count": 27,
        "word_count": 1706
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 203603,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 105,
        "part": 1,
        "published_at": "2021-11-19 21:00:00",
        "title": "\u7b2c105\u7ae0\u3001\u7409\u83ef\u4e0a\u9580",
        "total_view_count": 24,
        "word_count": 1594
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 203601,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 104,
        "part": 1,
        "published_at": "2021-11-18 21:00:00",
        "title": "\u7b2c104\u7ae0\u3001\u671f\u672b\u8003\u7d50\u675f",
        "total_view_count": 27,
        "word_count": 1757
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 203600,
        "is_adult": false,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 103,
        "part": 1,
        "published_at": "2021-11-17 21:00:00",
        "title": "\u7b2c103\u7ae0\u3001\u751f\u6d3b\u6a21\u5f0f\u5354\u8abf",
        "total_view_count": 29,
        "word_count": 1730
      },
      {
        "coin": 2,
        "coin_type": "STANDARD",
        "comment_count": 0,
        "id": 203587,
        "is_adult": true,
        "is_purchased": false,
        "novel_id": 9972,
        "order": 102,
        "part": 1,
        "published_at": "2021-11-16 21:00:00",
        "title": "\u7b2c102\u7ae0\u3001\u88ab\u8feb\u544a\u767d",
        "total_view_count": 43,
        "word_count": 1987
      }
    ],
    "page": 1,
    "pages": 7,
    "per_page": 20,
    "total_count": 121
  },
  "status_code": 200
}
*/

/*
/// https://api.myrics.com/v1/novels/5912/chapters/154028
{
  "result": {
    "coin": 0,
    "coin_type": "FREE",
    "content": "………………",
    "id": 154028,
    "is_adult": false,
    "is_available": true,
    "next_chapter": {
      "coin": 0,
      "coin_type": "FREE",
      "id": 154031,
      "is_adult": false,
      "order": 37,
      "part": 1,
      "published_at": "2020-10-02 12:30:00",
      "title": "\u5bc2\u5bde\u6708\u4e0b\u5f26\u2027\u4e03",
      "word_count": 7343
    },
    "order": 36,
    "part": 1,
    "prev_chapter": {
      "coin": 0,
      "coin_type": "FREE",
      "id": 154025,
      "is_adult": false,
      "order": 35,
      "part": 1,
      "published_at": "2020-09-30 12:30:00",
      "title": "\u5bc2\u5bde\u6708\u4e0b\u5f26\u2027\u4e94",
      "word_count": 8907
    },
    "published_at": "2020-10-01 12:30:00",
    "title": "\u5bc2\u5bde\u6708\u4e0b\u5f26\u2027\u516d",
    "word_count": 8778
  },
  "status_code": 200
}
*/
