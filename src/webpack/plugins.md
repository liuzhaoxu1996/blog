# Plugins

插件用于 bundle 文件的优化，资源管理和环境变量注入，作用于整个构建过程。

## 常用 plugins

-   HtmlWebpackPlugin: 创建 html 文件去承载输出的 bundle
-   CommonsChunkPlugin: 将 chunks 相同的模块代码提取成公共 js
-   CleanWebpackPlugin: 清理构建目录
-   ExtractTextWebpackPlugin: 将 css 从 bundle 文件里提取成一个独立的 css 文件
-   CopyWebpackPlugin: 将文件或者文件拷贝到构建的输出目录
-   UglifyjsWebpackPlugin: 压缩 js
-   ZipWebpackPlugin: 将打包出的资源生成一个 zip 包

## [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

默认根据配置将 css，js 文件注入到 html 里

### 安装

```sh
yarn add --dev html-webpack-plugin@next
```

### 使用

-   webpack.config.js

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "index.js",
    output: {
        path: __dirname + "/dist",
        filename: "index_bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
};
```

## [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

取代 style-loader，提取 js 中的 css 成单独文件

-   安装

```sh
yarn add css-loader -D
yarn add mini-css-extract-plugin -D
```

-   使用

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
};
```

## [terser-webpack-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

取代 style-loader，提取 js 中的 css 成单独文件

-   安装

```sh
yarn add terser-webpack-plugin -D
```

-   使用

```js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
```

## [css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)

压缩 css

-   安装

```sh
yarn add css-minimizer-webpack-plugin -D
```

-   使用

```js
module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true,
                cache: true,
            }),
        ],
    },
};
```

### [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)

默认会删除 output 指定的输出目录

-   安装

```sh
yarn add clean-webpack-plugin -D
```

-   使用

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    plugins: [new CleanWebpackPlugin()],
};
```
