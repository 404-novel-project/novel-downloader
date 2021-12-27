/* eslint-disable @typescript-eslint/no-var-requires */
const webpackConfig = require("./webpack.config");

webpackConfig.optimization.minimize = false;
webpackConfig.optimization.moduleIds = "named";
webpackConfig.output.filename = "bundle-greasyfork.js";

module.exports = webpackConfig;
