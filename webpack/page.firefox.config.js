import path from "path";
import { fileURLToPath } from "url";

import CopyPlugin from "copy-webpack-plugin";

import getWebpackConfig from "./page.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default getWebpackConfig("firefox", [
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "..", "assets"),
        to: path.resolve(__dirname, "..", "dist", "firefox/assets"),
      },
      {
        from: path.resolve(__dirname, "..", "assets"),
        to: path.resolve(__dirname, "..", "dist", "chromium/assets"),
      },
      {
        from: path.resolve(__dirname, "..", "_locales"),
        to: path.resolve(__dirname, "..", "dist", "firefox/_locales"),
      },
      {
        from: path.resolve(__dirname, "..", "_locales"),
        to: path.resolve(__dirname, "..", "dist", "chromium/_locales"),
      },
      {
        from: path.resolve(__dirname, "..", "license.txt"),
        to: path.resolve(__dirname, "..", "dist", "firefox"),
      },
      {
        from: path.resolve(__dirname, "..", "license.txt"),
        to: path.resolve(__dirname, "..", "dist", "chromium"),
      },
    ],
  }),
]);
