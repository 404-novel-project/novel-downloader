const path = require("path");
const WebpackUserscript = require("webpack-userscript");

const dev = process.env.NODE_ENV === "development";
console.log(`development: ${dev}`);

module.exports = {
  mode: dev ? "development" : "production",
  optimization: {
    minimize: false,
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
      headers: path.resolve(__dirname, "src", "header.json"),
      ssri: true,
      pretty: true,
      proxyScript: {
        filename: "[basename].proxy.user.js",
        baseUrl: "http://localhost:11944/",
        enable: dev,
      },
    }),
  ],
};
