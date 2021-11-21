interface UIObject {
  type: "jump" | "download" | "error";
  jumpFunction?: () => void;
}
const defaultObject: UIObject = {
  type: "download",
};
const errorObject: UIObject = {
  type: "error",
};
export function getUI(): () => UIObject {
  const host: string = document.location.host;
  switch (host) {
    case "m.shuquge.com": {
      return () => {
        const _pathname = document.location.pathname.split("/").slice(-1)[0];
        const _id = _pathname.match(/^(\d+)/);
        if (!_id) {
          return errorObject;
        }
        const id = _id[0];
        return {
          type: "jump",
          jumpFunction() {
            document.location.href = `https://www.shuquge.com/txt/${id}/index.html`;
          },
        };
      };
    }
    case "m.xinwanben.com": {
      return () => ({
        type: "jump",
        jumpFunction() {
          document.location.host = "www.xinwanben.com";
        },
      });
    }
    case "www.tadu.com": {
      return () => {
        const re = /^\/book\/\d+\/?$/;
        if (re.test(document.location.pathname)) {
          return defaultObject;
        }
        return errorObject;
      };
    }
    case "www.kanunu8.com": {
      return () => {
        if (
          document.body.innerHTML.includes("作者：") ||
          document.body.innerHTML.includes("作者:") ||
          document.body.innerHTML.includes("内容简介")
        ) {
          return defaultObject;
        }
        return errorObject;
      };
    }
    default: {
      return () => defaultObject;
    }
  }
}
