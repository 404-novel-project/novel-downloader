import path from "path";

import webpack from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import getWebpackConfig, { __dirname } from "./config.js";

const tsconfigPath = path.resolve(__dirname, "..", "src/sw/tsconfig.json");

const entry = path.resolve(__dirname, "..", "src/sw/index.ts");

const resolve = {
  extensions: [".tsx", ".ts", ".js"],
  plugins: [
    new TsconfigPathsPlugin({
      configFile: tsconfigPath,
    }),
  ],
};

const rules = [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          configFile: tsconfigPath,
          onlyCompileBundledFiles: true,
        },
      },
    ],
    exclude: /node_modules/,
  },
];

const plugins = [
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
];

export default (browser) => {
  const output = {
    path: path.resolve(__dirname, "..", "dist", `${browser}/`),
    filename: "sw.js",
    chunkFormat: "module",
  };

  return getWebpackConfig({ entry, output, resolve, plugins, rules });
};
