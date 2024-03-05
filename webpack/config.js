import path from "path";
import { fileURLToPath } from "url";

import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import License from "license-webpack-plugin";

const LicenseWebpackPlugin = License.LicenseWebpackPlugin;

export const dev = process.env.NODE_ENV === "development";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const tsconfigPath = path.resolve(__dirname, "..", "src/tsconfig.json");

const resolveDefault = {
  extensions: [".tsx", ".ts", ".js"],
  plugins: [
    new TsconfigPathsPlugin({
      configFile: tsconfigPath,
    }),
  ],
};

export default ({ entry, output, resolve = resolveDefault, rules, plugins }) => {
  plugins.push(new LicenseWebpackPlugin());
  return {
    mode: dev ? "development" : "production",
    entry: entry,
    output: output,
    devtool: "source-map",
    cache: {
      type: "memory",
    },
    resolve,
    target: "es2023",
    module: {
      rules,
    },
    plugins,
  };
};
