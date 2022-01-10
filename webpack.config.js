/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");
const WebpackUserscript = require("webpack-userscript");
const webpack = require("webpack");

const simpleGit = require("simple-git");
const git = simpleGit();

const dev = process.env.NODE_ENV === "development";
console.log(`development: ${dev}`);

git.raw("rev-list", "--count", "HEAD").then((REVISION) => {
  console.log(REVISION);
  fs.writeFileSync("REVISION", REVISION);
});

module.exports = {
  mode: dev ? "development" : "production",
  optimization: {
    moduleIds: "natural",
    usedExports: true,
  },
  performance: {
    hints: "error",
    maxAssetSize: 2 * 10 ** (3 + 3),
  },
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
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
      {
        test: /\.html$|\.html.j2$/i,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["css-loader", "less-loader"],
      },
    ],
  },
  externals: {
    "crypto-js": "CryptoJS",
    fflate: "fflate",
    "idb-keyval": "idbKeyval",
    loglevel: "log",
    nunjucks: "nunjucks",
    vue: "Vue",
  },
  devServer: {
    server: "http",
    port: 11944,
    allowedHosts: "all",
    hot: true,
    liveReload: true,
    magicHtml: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    client: {
      webSocketURL: "wss://webpack.lo.bgme.me/ws",
    },
  },
  plugins: [
    new WebpackUserscript({
      headers: () => {
        const headerPath = path.resolve(__dirname, "src", "header.json");
        const header = JSON.parse(fs.readFileSync(headerPath));
        const revision = fs.readFileSync("REVISION").toString().trim();
        let version;
        if (dev) {
          version = header["version"] + `.${Date.now()}`;
        } else {
          version = header["version"] + `.${revision}`;
        }
        console.log(`version: ${version}`);
        header["version"] = version;
        return header;
      },
      ssri: true,
      pretty: true,
      downloadBaseUrl:
        "https://github.com/yingziwu/novel-downloader/raw/gh-pages/",
      proxyScript: {
        filename: "[basename].proxy.user.js",
        baseUrl: "https://webpack.lo.bgme.me/",
        enable: dev,
      },
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
