# 性能分析

## 1. 速度分析

[Speed Measure Plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin#readme)

-   安装

```sh
yarn add -D speed-measure-webpack-plugin
```

-   代码示例

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
    plugin: [new Myplugin(), new MyOtherPlugin()],
});
```

## 2. 体积分析

[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

```sh
yarn add -D webpack-bundle-analyzer
```

```js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = {
    plugins: [new BundleAnalyzerPlugin()],
};
```
