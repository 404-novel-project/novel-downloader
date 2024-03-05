import fs from "fs";
import path from "path";

import webpack from "webpack";
import PugPlugin from "pug-plugin";

import getWebpackConfig, { dev, __dirname, tsconfigPath } from "./config.js";

const entry = [path.resolve(__dirname, "..", "src/backgroud/index.ts")];

if (dev) {
  const devBackgroudPath = path.resolve(__dirname, "..", "src/dev/backgroud.ts");
  if (fs.existsSync(devBackgroudPath)) {
    entry.push(devBackgroudPath);
  }
  console.warn("Webpack backgroud pack with src/dev/backgroud.ts");
}

const plugins = [
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
];

const rules = [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          compilerOptions: {
            lib: ["ESNext"],
            types: ["serviceworker"],
          },
          configFile: tsconfigPath,
          onlyCompileBundledFiles: true,
        },
      },
    ],
    exclude: /node_modules/,
  },
  {
    test: /\.pug$/,
    loader: PugPlugin.loader,
    options: {
      method: "compile",
    },
  },
];

export default (browser) => {
  const output = {
    path: path.resolve(__dirname, "..", "dist", `${browser}/backgroud`),
    filename: "bundle.js",
    chunkFormat: "module",
  };

  return getWebpackConfig({ entry, output, plugins, rules });
};
