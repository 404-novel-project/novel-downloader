import webpackConfig from "./webpack.config.js";

webpackConfig.optimization.minimize = false;
webpackConfig.optimization.moduleIds = "named";
webpackConfig.output.filename = "bundle-greasyfork.js";

export default webpackConfig;
