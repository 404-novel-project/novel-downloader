interface UIObject {
  type: "jump" | "download" | "error";
  jumpFunction?: () => void;
}
const errorObject: UIObject = {
  type: "error",
};
export function getUI(): UIObject {
  const host: string = document.location.host;
  switch (host) {
    case "m.shuquge.com": {
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
    }
    case "m.xinwanben.com": {
      return {
        type: "jump",
        jumpFunction() {
          document.location.host = "www.xinwanben.com";
        },
      };
    }
    default: {
      return {
        type: "download",
      };
    }
  }
}
