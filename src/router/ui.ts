interface UIObject {
  type: "jump" | "download" | "error";
  jumpUrl?: string;
}
export function getUI(): UIObject {
  const host: string = document.location.host;
  switch (host) {
    case "m.shuquge.com": {
      const _pathname = document.location.pathname.split("/").slice(-1)[0];
      const _id = _pathname.match(/^(\d+)/);
      if (_id) {
        const id = _id[0];
        const jumpUrl = `https://www.shuquge.com/txt/${id}/index.html`;
        return {
          type: "jump",
          jumpUrl,
        };
      } else {
        return {
          type: "error",
        };
      }
    }
    default: {
      return {
        type: "download",
      };
    }
  }
}
