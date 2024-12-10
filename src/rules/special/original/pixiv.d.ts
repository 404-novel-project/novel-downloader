interface GlobalData {
  token: string;
  services: Services;
  oneSignalAppId: string;
  publicPath: string;
  commonResourcePath: string;
  development: boolean;
  userData: UserData | null;
  adsData: null;
  miscData: MiscData;
  premium: Premium;
  mute: Mute[];
}

interface MiscData {
  consent: Consent;
  policyRevision: boolean;
  grecaptcha: Grecaptcha;
  info: Info | null;
  isSmartphone: boolean;
}

interface Consent {
  gdpr: boolean;
}

interface Grecaptcha {
  recaptchaEnterpriseScoreSiteKey: string;
}

interface Info {
  id: string;
  title: string;
  createDate: string;
}

interface Mute {
  type: number;
  value: string;
  premiumSlot: boolean;
}

interface Premium {
  freeCampaign?: boolean;
}

interface Services {
  booth: string;
  sketch: string;
  vroidHub: string;
  accounts: string;
}

interface UserData {
  id: string;
  pixivId: string;
  name: string;
  profileImg: string;
  profileImgBig: string;
  premium: boolean;
  xRestrict: number;
  adult: boolean;
  safeMode: boolean;
  illustCreator: boolean;
  novelCreator: boolean;
}

/* PixivResponse */
interface PixivResponse<T = unknown> {
  error: boolean;
  message: string;
  body: T;
}

/*
https://www.pixiv.net
/ajax/novel/series/:seriesID
- lang=en
- version=0e6ff4f1fa77cd8630159156c6ca02363ac6e1a8
*/
interface SeriesBody {
  id: string; // seriesID
  userId: string;
  userName: string; // 作者
  profileImageUrl: string;
  xRestrict: number;
  isOriginal: boolean;
  isConcluded: boolean;
  genreId: string;
  title: string; // 系列名称
  caption: string; // 系列简介
  language: string; // 系列语言
  tags: string[]; // tag列表
  publishedContentCount: number;
  publishedTotalCharacterCount: number;
  publishedTotalWordCount: number;
  publishedReadingTime: number;
  useWordCount: boolean;
  lastPublishedContentTimestamp: number;
  createdTimestamp: number; // 系列创建时间
  updatedTimestamp: number; // 系列最后更新时间
  createDate: string;
  updateDate: string;
  firstNovelId: string;
  latestNovelId: string;
  displaySeriesContentCount: number;
  shareText: string;
  total: number; // 系列作品总数
  firstEpisode: Zone;
  watchCount: null;
  maxXRestrict: null;
  cover: Cover; // 系列封面
  isWatched: boolean;
  isNotifying: boolean;
  aiType: number;
  hasGlossary: boolean;
  extraData: ExtraData;
  zoneConfig: ZoneConfig;
}

interface Cover {
  urls: {
    "240mw": string;
    "480mw": string;
    "1200x1200": string;
    "128x128": string;
    original: string;
  };
}

interface ExtraData {
  meta: Meta;
}

interface Meta {
  title: string;
  description: string;
  canonical: string;
  alternateLanguages?: AlternateLanguages;
  descriptionHeader?: string;
  ogp: Ogp;
  twitter: Ogp;
}

interface AlternateLanguages {
  [key: string]: string;
}

interface Ogp {
  description: string;
  image: string;
  title: string;
  type?: string;
  card?: string;
}

interface Zone {
  url: string;
}

interface ZoneConfig {
  header: Zone;
  footer: Zone;
  responsive: Zone;
  rectangle: Zone;
  "500x500"?: Zone;
  expandedFooter?: Zone;
  logo?: Zone;
  relatedworks?: Zone;
}

/*
https://www.pixiv.net
/ajax/novel/series_content/:seriesID
- limit=30
- last_order=90
- order_by=asc&
- lang=en
- version=0e6ff4f1fa77cd8630159156c6ca02363ac6e1a8
*/
interface SeriesContentBody {
  tagTranslation: any[];
  thumbnails: Thumbnails;
  illustSeries: any[];
  requests: any[];
  users: any[];
  page: Page;
}

interface Page {
  seriesContents: SeriesContent[];
}

interface SeriesContent {
  id: string; // 系列中各作品 novelID
  userId: string;
  series: Series;
  title: string; // 题名
  commentHtml: string;
  tags: string[];
  restrict: number;
  xRestrict: number;
  isOriginal: boolean;
  textLength: number;
  characterCount: number;
  wordCount: number;
  useWordCount: boolean;
  readingTime: number;
  bookmarkCount: number;
  url: string;
  uploadTimestamp: number;
  reuploadTimestamp: number;
  isBookmarkable: boolean;
  bookmarkData: null;
  aiType: number;
}

interface Series {
  id: number;
  viewableType: number; // 章节状态，怱视非0章节
  contentOrder: number; // 章节顺序
}

interface Thumbnails {
  illust: any[];
  novel: Novel[];
  novelSeries: any[];
  novelDraft: any[];
}

interface Novel {
  id: string;
  title: string;
  xRestrict: number;
  restrict: number;
  url: string;
  tags: string[];
  userId: string;
  userName: string;
  profileImageUrl: string;
  textCount: number;
  wordCount: number;
  readingTime: number;
  useWordCount: boolean;
  description: string;
  isBookmarkable: boolean;
  bookmarkData: null;
  bookmarkCount: number;
  isOriginal: boolean;
  marker: null;
  titleCaptionTranslation: TitleCaptionTranslation;
  createDate: string;
  updateDate: string;
  isMasked: boolean;
  seriesId: string;
  seriesTitle: string;
  isUnlisted: boolean;
  aiType: number;
}

interface TitleCaptionTranslation {
  workTitle: null;
  workCaption: null;
}

/*
https://www.pixiv.net
/ajax/novel/:novelID
- lang=en
- version=0e6ff4f1fa77cd8630159156c6ca02363ac6e1a8
*/
interface NovelBody {
  bookmarkCount: number;
  commentCount: number;
  markerCount: number;
  createDate: string;
  uploadDate: string; // 上传时间
  description: string; // 简介
  id: string; // novel ID
  title: string; // 标题
  likeCount: number;
  pageCount: number;
  userId: string;
  userName: string; // 作者
  viewCount: number;
  isOriginal: boolean;
  isBungei: boolean;
  xRestrict: number;
  restrict: number;
  content: string; //正文
  coverUrl: string; // 封面
  suggestedSettings: SuggestedSettings;
  isBookmarkable: boolean;
  bookmarkData: null;
  likeData: boolean;
  pollData: null;
  marker: null;
  tags: Tags; // Tags
  seriesNavData: SeriesNavData | null; // 系列导航，内含 seriesID
  descriptionBoothId: null;
  descriptionYoutubeId: null;
  comicPromotion: null;
  fanboxPromotion: FanboxPromotion;
  contestBanners: ContestBanners | [];
  contestData: null;
  request: null;
  imageResponseOutData: any[];
  imageResponseData: any[];
  imageResponseCount: number;
  userNovels: { [key: string]: UserNovel | null };
  hasGlossary: boolean;
  zoneConfig: ZoneConfig;
  extraData: ExtraData;
  titleCaptionTranslation: TitleCaptionTranslation;
  isUnlisted: boolean;
  language: string; // 语言
  textEmbeddedImages: { [key: string]: TextEmbeddedImage } | null; // 上传插图
  commentOff: number;
  characterCount: number;
  wordCount: number;
  useWordCount: boolean;
  readingTime: number;
  aiType: number;
  noLoginData?: NoLoginData;
}

interface TextEmbeddedImage {
  novelImageId: string;
  sl: string;
  urls: {
    "240mw": string;
    "480mw": string;
    "1200x1200": string;
    "128x128": string;
    original: string;
  };
}

interface FanboxPromotion {
  userName: string;
  userImageUrl: string;
  contentUrl: string;
  description: string;
  imageUrl: string;
  imageUrlMobile: string;
  hasAdultContent: boolean;
}

interface ContestBanners {
  id: string;
  title: string;
  comment: string;
  user_id: string;
  scene: string;
  restrict: string;
  x_restrict: string;
  tag_full_lock: string;
  response_auto: string;
  is_original: string;
  language: string;
  tag: string;
  tool: string;
  cover_type: string;
  cover_id: string;
  hash: string;
  serialized_value: string;
  character_count: string;
  word_count: string;
  cdate: string;
  mdate: string;
  novel_cover_img_name: string;
  novel_cover_img_ext: string;
  comment_off_setting: string;
  ai_type: string;
  text: string;
  type: string;
  text_length: number;
  user_account: string;
  user_name: string;
  user_status: string;
  tag_a: string[];
  url: { [key: string]: string };
  series_id: number;
  series_title: null;
  marker_count: number;
  bookmark_count: number;
  comment_count: number;
  rating_count: number;
  rating_score: number;
  rating_view: number;
  view_mode: number;
  theme_background: number;
  theme_size: number;
  theme_spacing: number;
}

interface NoLoginData {
  breadcrumbs: Breadcrumbs;
  zengoWorkData: ZengoWorkData;
}

interface Breadcrumbs {
  successor: Successor[];
  current: Current;
}

interface Current {
  [key: string]: string;
}

interface Successor {
  tag: string;
  translation: Current;
}

interface ZengoWorkData {
  nextWork: Work;
  prevWork: Work;
}

interface Work {
  id: string;
  title: string;
}

interface SeriesNavData {
  seriesType: string;
  seriesId: number;
  title: string;
  isConcluded: boolean;
  isReplaceable: boolean;
  isWatched: boolean;
  isNotifying: boolean;
  order: number;
  next: Next;
  prev: Next;
}

interface Next {
  title: string;
  order: number;
  id: string;
  available: boolean;
}

interface SuggestedSettings {
  viewMode: number;
  themeBackground: number;
  themeSize: null;
  themeSpacing: null;
}

interface Tags {
  authorId: string;
  isLocked: boolean;
  tags: Tag[];
  writable: boolean;
}

interface Tag {
  tag: string;
  locked?: boolean;
  deletable?: boolean;
  userId: string;
  romaji?: string;
  userName?: string;
  translation?: Translation;
}

interface Translation {
  [key: string]: string;
}

interface UserNovel {
  id: string;
  title: string;
  xRestrict: number;
  restrict: number;
  url: string;
  tags: string[];
  userId: string;
  userName: string;
  profileImageUrl: string;
  textCount: number;
  wordCount: number;
  readingTime: number;
  useWordCount: boolean;
  description: string;
  isBookmarkable: boolean;
  bookmarkData: null;
  bookmarkCount: number | null;
  isOriginal: boolean;
  marker: null;
  titleCaptionTranslation: TitleCaptionTranslation;
  createDate: string;
  updateDate: string;
  isMasked: boolean;
  seriesId: string;
  seriesTitle: string;
  isUnlisted: boolean;
  aiType: number;
}

/*
https://www.pixiv.net/ajax/novel/:novelID/insert_illusts
- id[]=105963051-1
- lang=en
- version=0e6ff4f1fa77cd8630159156c6ca02363ac6e1a8
*/
interface InsertIllustsBody {
  [key: string]: InsertIllusts;
}

interface InsertIllusts {
  visible: boolean;
  unavailableType: null;
  illust: Illust;
  user: User;
  id: string;
  page: number;
}

interface Illust {
  title: string;
  description: string;
  restrict: number;
  xRestrict: number;
  sl: number;
  tags: Tag[];
  images: Images;
}

interface Images {
  small: string;
  medium: string;
  original: string; // 插画原始图片地址
}

interface User {
  id: string;
  name: string;
  image: string;
}

/*
https://www.pixiv.net
/ajax/illust/:illustID
- lang=en
- version=0e6ff4f1fa77cd8630159156c6ca02363ac6e1a8
*/
interface IllustBody {
  illustId: string;
  illustTitle: string;
  illustComment: string;
  id: string;
  title: string;
  description: string;
  illustType: number;
  createDate: string;
  uploadDate: string;
  restrict: number;
  xRestrict: number;
  sl: number;
  urls: IllustUrls;
  tags: Tags;
  alt: string;
  storableTags: string[];
  userId: string;
  userName: string;
  userAccount: string;
  userIllusts: { [key: string]: UserIllust | null };
  likeData: boolean;
  width: number;
  height: number;
  pageCount: number;
  bookmarkCount: number;
  likeCount: number;
  commentCount: number;
  responseCount: number;
  viewCount: number;
  bookStyle: string;
  isHowto: boolean;
  isOriginal: boolean;
  imageResponseOutData: any[];
  imageResponseData: any[];
  imageResponseCount: number;
  pollData: null;
  seriesNavData: null;
  descriptionBoothId: null;
  descriptionYoutubeId: null;
  comicPromotion: null;
  fanboxPromotion: null;
  contestBanners: IllustContestBanners;
  isBookmarkable: boolean;
  bookmarkData: null;
  contestData: null;
  zoneConfig: ZoneConfig;
  extraData: ExtraData;
  titleCaptionTranslation: TitleCaptionTranslation;
  isUnlisted: boolean;
  request: null;
  commentOff: number;
  aiType: number;
}

interface IllustContestBanners {
  illust_id: string;
  illust_user_id: string;
  illust_title: string;
  illust_ext: string;
  illust_width: string;
  illust_height: string;
  illust_restrict: string;
  illust_x_restrict: string;
  illust_create_date: string;
  illust_upload_date: string;
  illust_server_id: string;
  illust_hash: null;
  illust_type: string;
  illust_sanity_level: number;
  illust_book_style: string;
  illust_page_count: string;
  illust_comment_off_setting: string;
  illust_ai_type: string;
  illust_custom_thumbnail_upload_datetime: null;
  illust_comment: string;
  illust_tag_full_lock: string;
  illust_tool01: string;
  illust_tool02: string;
  illust_tool03: string;
  user_account: string;
  user_name: string;
  user_premium: string;
  url: { [key: string]: string };
  illust_rating_count: string;
  illust_rating_score: string;
  illust_rating_view: string;
  illust_content_type: IllustContentType;
  tags: string[];
  illust_series: boolean;
  is_bookmarked: boolean;
  bookmarkable: boolean;
  res: number;
  cnt: number;
  display_tags: DisplayTag[];
}

interface DisplayTag {
  tag: string;
  is_myself: boolean;
  has_lock: boolean;
  add_user_id: number;
  name_flg: boolean;
  is_pixpedia_article_exists: boolean;
  romaji: string;
  translation?: string;
}

interface IllustContentType {
  sexual: number;
  lo: boolean;
  grotesque: boolean;
  violent: boolean;
  homosexual: boolean;
  drug: boolean;
  thoughts: boolean;
  antisocial: boolean;
  religion: boolean;
  original: boolean;
  furry: boolean;
  bl: boolean;
  yuri: boolean;
}

interface IllustUrls {
  mini: string;
  thumb: string;
  small: string;
  regular: string;
  original: string;
}

interface UserIllust {
  id: string;
  title: string;
  illustType: number;
  xRestrict: number;
  restrict: number;
  sl: number;
  url: string;
  description: string;
  tags: string[];
  userId: string;
  userName: string;
  width: number;
  height: number;
  pageCount: number;
  isBookmarkable: boolean;
  bookmarkData: null;
  alt: string;
  titleCaptionTranslation: TitleCaptionTranslation;
  createDate: string;
  updateDate: string;
  isUnlisted: boolean;
  isMasked: boolean;
  aiType: number;
  profileImageUrl?: string;
}

interface IllustZoneConfig {
  logo: Zone;
}

/*
https://www.pixiv.net
/ajax/illust/:illustID/pages
- lang=en
- version=0e6ff4f1fa77cd8630159156c6ca02363ac6e1a8
*/
// body: IllustPagesBody[];
interface IllustPagesBody {
  urls: IllustUrls;
  width: number;
  height: number;
}

interface IllustUrls {
  thumb_mini: string;
  small: string;
  regular: string;
  original: string;
}

interface GlossaryBody {
  categories: {
    id: string;
    seriesId: string;
    name: string;
    items: {
      id: string;
      seriesId: string;
      categoryId: string;
      name: string;
      overview: string;
      coverImage: string | null;
      detail: string | null;
    }[];
    error: boolean;
  }[];
  replaceeItemIds: any[];
  extraData: {
    meta: {
      title: string;
      description: string;
      canonical: string;
      ogp: {
        type: string;
        title: string;
        description: string;
        image: string;
      };
      twitter: {
        card: string;
        site: string;
        title: string;
        description: string;
        image: string;
      };
    };
  };
  zoneConfig: {
    header: {
      url: string;
    };
    footer: {
      url: string;
    };
    logo: {
      url: string;
    };
    ad_logo: {
      url: string;
    };
  };
}
