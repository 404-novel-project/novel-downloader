const path = require("path");
const fs = require("fs");
const WebpackUserscript = require("webpack-userscript");

const dev = process.env.NODE_ENV === "development";
console.log(`development: ${dev}`);

// Generate revision
try {
  require("child_process").execSync(
    `[ $(git rev-list --count master) != "1" ] && git rev-list --count master > REVISION \
    || echo $(($(curl https://api.github.com/repos/yingziwu/novel-downloader/compare/80a4a3c44bee219c97952103309f66ab0910bba5...master | jq '.total_commits') + 1)) > REVISION`
  );
} catch (error) {
  console.error(error);
}

module.exports = {
  mode: dev ? "development" : "production",
  optimization: {
    moduleIds: "natural",
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
    nunjucks: "nunjucks",
    vue: "Vue",
  },
  devServer: {
    server: "http",
    port: 11944,
    allowedHosts: "all",
    hot: true,
    liveReload: true,
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
        const revision = require("child_process")
          .execSync("cat REVISION")
          .toString()
          .trim();
        let version;
        if (dev) {
          version = header["version"] + `.${revision}` + `.${Date.now()}`;
        } else {
          version = header["version"] + `.${revision}`;
        }
        console.log(`version: ${version}`);
        header["version"] = version;
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
