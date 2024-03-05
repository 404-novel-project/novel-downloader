import fs from "fs";
import path from "path";

import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";

import getWebpackConfig, { dev, __dirname, tsconfigPath } from "./config.js";

const entry = [path.resolve(__dirname, "..", "src/content_scripts/index.ts")];

if (dev) {
  const devContentScriptsPath = path.resolve(__dirname, "..", "src/dev/content_scripts.ts");
  if (fs.existsSync(devContentScriptsPath)) {
    entry.push(devContentScriptsPath);
  }
  console.warn("Webpack content_scripts pack with src/dev/content_scripts.ts");
}

const rules = [
  {
    test: /\.vue$/,
    loader: "vue-loader",
  },
  {
    test: /\.tsx?$/,
    loader: "ts-loader",
    exclude: /node_modules/,
    options: {
      appendTsSuffixTo: [/\.vue$/],
      configFile: tsconfigPath,
      onlyCompileBundledFiles: true,
    },
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },
  {
    test: /\.css$/,
    use: ["vue-style-loader", "css-loader"],
  },
  {
    test: /\.png$/,
    type: "asset/inline",
  },
];

const plugins = [
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  }),
  new VueLoaderPlugin(),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
];

export default (browser) => {
  const output = {
    path: path.resolve(__dirname, "..", "dist", `${browser}/content_scripts`),
    filename: "bundle.js",
    chunkFormat: "module",
  };

  return getWebpackConfig({ entry, output, plugins, rules });
};
