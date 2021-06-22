const path = require("path");
const fs = require("fs");
const WebpackUserscript = require("webpack-userscript");

const dev = process.env.NODE_ENV === "development";

module.exports = {
  mode: dev ? "development" : "production",
  optimization: {
    minimize: false,
    moduleIds: "named",
  },
  entry: path.resolve(__dirname, "src", "tester", "index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "tester.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    https: false,
    host: "localhost",
    port: 11944,
    public: "webpack.lo.bgme.me",
    disableHostCheck: true,
    hot: false,
    liveReload: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  },
  plugins: [
    new WebpackUserscript({
      headers: () => {
        const rawHeaderPath = path.resolve(__dirname, "src", "header.json");
        const rawHeader = JSON.parse(fs.readFileSync(rawHeaderPath));
        const header = {
          name: "小说下载器测试脚本",
          "name:en": "novel-downloader-tester",
          author: "bgme",
          description: "小说下载器测试脚本",
          version: "[version].[buildTime]",
          namespace: "https://blog.bgme.me",
          icon:
            "https://cdn.jsdelivr.net/gh/yingziwu/novel-downloader/assets/icon.png",
          license: "AGPL-3.0",
          "run-at": "document-start",
          noframes: "true",
          match: rawHeader.match,
          exclude: rawHeader.exclude,
          grant: [
            "unsafeWindow",
            "GM_openInTab",
            "window.close",
            "GM_getTab",
            "GM_saveTab",
            "GM_getTabs",
          ],
        };
        header.match.push(
          "https://greasyfork.org/*/scripts/406070-%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8"
        );
        return header;
      },
      ssri: false,
      pretty: true,
      proxyScript: {
        filename: "[basename].proxy.user.js",
        baseUrl: "https://webpack.lo.bgme.me/",
        enable: dev,
      },
    }),
  ],
};
