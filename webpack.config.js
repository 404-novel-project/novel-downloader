const path = require("path");
const fs = require("fs");
const WebpackUserscript = require("webpack-userscript");

const dev = process.env.NODE_ENV === "development";
console.log(`development: ${dev}`);

module.exports = {
  mode: dev ? "development" : "production",
  optimization: {
    minimize: false,
    moduleIds: "named",
    usedExports: true,
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
    ],
  },
  devServer: {
    port: 11944,
    allowedHosts: ["all"],
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
        const headerPath = path.resolve(__dirname, "src", "header.json");
        const header = JSON.parse(fs.readFileSync(headerPath));
        const revision = require("child_process")
          .execSync("git rev-list --count master")
          .toString()
          .trim();
        header["version"] = header["version"] + `.${revision}`;
        return header;
      },
      ssri: false,
      pretty: true,
      downloadBaseUrl:
        "https://github.com/yingziwu/novel-downloader/raw/gh-pages/",
      proxyScript: {
        filename: "[basename].proxy.user.js",
        baseUrl: "https://webpack.lo.bgme.me/",
        enable: dev,
      },
    }),
  ],
};
