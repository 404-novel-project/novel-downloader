import path from "path";

import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import VueRouterPlugin from "unplugin-vue-router/webpack";

import AutoImport from "unplugin-auto-import/webpack";
import Components from "unplugin-vue-components/webpack";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import getWebpackConfig, { dev, __dirname, tsconfigPath } from "./config.js";

const entry = {
  dashboard: path.resolve(__dirname, "..", "src/pages/dashboard/index.ts"),
  popup: path.resolve(__dirname, "..", "src/pages/popup/index.ts"),
  worker: path.resolve(__dirname, "..", "src/pages/worker/index.ts"),
  streamSavePage: path.resolve(__dirname, "..", "src/pages/worker/page.ts"),
};

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
      ignoreDiagnostics: [
        // TS7006: Parameter 'scope' implicitly has an 'any' type.
        // https://github.com/vuejs/vue-loader/issues/1915
        7006,
      ],
    },
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },
  {
    test: /\.css$/,
    use: [dev ? "vue-style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
  },
  {
    test: /\.scss$/,
    use: [dev ? "vue-style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  },
];

export default (browser, _plugins) => {
  const output = {
    path: path.resolve(__dirname, "..", "dist", `${browser}/pages`),
    filename: "js/[name].js",
    chunkFormat: "module",
    scriptType: "module",
  };

  let plugins = [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: false,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: false,
    }),
    new VueLoaderPlugin(),
    VueRouterPlugin({
      routesFolder: "src/pages/dashboard/pages",
      dts: "src/pages/dashboard/typed-router.d.ts",
      extensions: [".vue"],
      importMode: "async",
    }),
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      chunks: ["dashboard"],
      scriptLoading: "module",
      xhtml: true,
      title: "Dashboard",
      favicon: "assets/icon-48.png",
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      chunks: ["popup"],
      scriptLoading: "module",
      xhtml: true,
      title: "popup",
      favicon: "assets/icon-48.png",
    }),
    new HtmlWebpackPlugin({
      filename: "worker.html",
      chunks: ["worker"],
      scriptLoading: "module",
      xhtml: true,
      title: "service worker register",
      favicon: "assets/icon-48.png",
    }),
  ];
  if (!dev) {
    plugins.push(new MiniCssExtractPlugin());

    // 修复编译出错时不退出
    // https://stackoverflow.com/questions/56053159/webpack-run-build-but-not-exit-command
    // https://medium.com/finnovate-io/make-webpack-exit-on-compilation-errors-16d2eec03391
    // https://github.com/webpack/webpack/issues/708
    const errorExit = {
      apply: (compiler) => {
        compiler.hooks.done.tap("DonePlugin", (stats) => {
          if (stats.compilation.errors.length > 0) {
            console.log(stats.compilation.errors);
            process.exit(1);
          }
        });
      },
    };
    plugins.push(errorExit);
  }
  if (_plugins) {
    plugins = plugins.concat(_plugins);
  }

  return getWebpackConfig({ entry, output, rules, plugins });
};
