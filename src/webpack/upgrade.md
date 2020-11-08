# 项目升级

## webpack 升级

-   原来项目配置

```json
{
    "devDependencies": {
        "babel-core": "^6.26.0",
        "babel-loader": "^7.1.2",
        "babel-plugin-transform-remove-strict-mode": "0.0.2",
        "babel-preset-es2015": "^6.24.1",
        "clean-webpack-plugin": "^0.1.19",
        "css-loader": "^0.28.7",
        "eslint": "^4.18.2",
        "eslint-loader": "^2.0.0",
        "extract-text-webpack-plugin": "^3.0.0",
        "glob": "^7.1.2",
        "path": "^0.12.7",
        "speed-measure-webpack-plugin": "^1.3.3",
        "style-loader": "^0.18.2",
        "uglifyjs-webpack-plugin": "^1.0.0-beta.3",
        "webpack": "^3.5.6",
        "babel-polyfill": "^6.26.0"
    }
}
```

-   速度分析：
    ![](https://p4.ssl.qhimg.com/t0161cfb1a9d1cece61.png)

*   webpack 3 -> webpack 5
*   ExtractTextPlugin -> MiniCssExtractPlugin
*   CommonsChunkPlugin -> splitChunksPlugin
*   UglifyJsPlugin -> TerserPlugin

```js

 SMP  ⏱
General output time took 4.074 secs

 SMP  ⏱  Plugins
MiniCssExtractPlugin took 0.001 secs

 SMP  ⏱  Loaders
babel-loader took 2.18 secs
  module count = 48
mini-css-extract-plugin, and
css-loader took 1.31 secs
  module count = 28
css-loader took 0.721 secs
  module count = 29
modules with no loaders took 0.194 secs
  module count = 28
```
