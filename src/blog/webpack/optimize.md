# 性能优化

## 1. 利用压缩

-   html 文件的压缩：html-webpack-plugin
-   css 文件的压缩：mini-css-extract-plugin
-   js 文件的压缩：terser-webpack-plugin

## 2. 缩小构建目标

-   配置 exclude
-   配置 alias
-   优化 resolve.extensions 配置
-   优化 resolve.mainFields 配置
-   优化 resolve.modules 配置

## 3. [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

webpack 开启 tree shaking 的条件

::: tip
DCE: dead code elimination

-   代码不会被执行
-   代码执行的结果不会被用到
-   代码只会影响死变量

:::

-   开启 tree shaking

-   在.babelrc 里配置 modules:false
-   必须使用 es6 语法, 不支持 cjs
-   必须在 production 模式下

## 4. 擦除无用 css

[Purgecss-webpack-plugin](https://github.com/FullHuman/purgecss/tree/master/packages/purgecss-webpack-plugin)

-   安装

```sh
yarn add purgecss-webpack-plugin -D
```

-   配置

```js {4,40-42}
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "src"),
};

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
    ],
};
```

## 5. 提取公共资源

::: tip
SplitChunksPlugin 在 webpack4 以后是内置的，替代 CommonsChunkPlugin 插件

chunks 参数说明：

-   async 异步引入的库进行分离
-   initial 同步引入的库进行分离
-   all 所有引入的库进行分离

:::

-   配置

```js
module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};
```

## 6. 利用缓存

利用缓存提升二次构建速度

方案

-   babel-loader 开启缓存

-   terser-webpack-plugin 开启缓存

-   使用 hard-source-webpack-plugin

配置

-   babel-loader 配置

```js{5}
module: {
    rules: [
        {
            test: /.js$/,
            use: "babel-loader?cacheDirectory=true",
            exclude: "node_modules",
        },
    ];
}
```

-   [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) 配置

```js{6}
module: {
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
            }),
        ];
    }
}
```

-   [hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin) 配置

```sh
yarn add hard-source-webpack-plugin -D
```

```js{10}
module: {
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
            }),
        ];
    }
    plugins: [new hardSourceWebpackPlugin()];
}
```

## 7. [懒加载](https://webpack.js.org/guides/code-splitting/#dynamic-imports)

-   配置

安装 babel 插件，通过 jsonp 动态加载 js

```sh
yarn add @babel/plugin-syntax-dynamic-import -D
```

-   .babelrc

```json
{
    "plugin": ["@babel/plugin-syntax-dynamic-import"]
}
```

-   项目中

```js
function test() {
    import("./test.js").then((Text) => {
        // ...
    });
}
```

## 8. 多进程压缩

多进程压缩，[terser-webpack-plugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/) 开启 parallel

-   安装

```sh
yarn add terser-webpack-plugin -D
```

-   代码示例

```js
module.exports = {
    optimization: {
        minimizer: [
            new TerserPlugin({
                // parallel: true // 默认值：2*cpu -1
                parallel: 4,
            }),
        ],
    },
};
```

## 9. 多进程构建

多进程构建，每次 webpack 解析一个模块，[thread-loader](https://www.webpackjs.com/loaders/thread-loader/) 会将它及它的依赖分配给 worker 线程中

### 安装

```sh
yarn add thread-loader -D
```

### 代码示例

```js{13-18}
module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            workers: 3,
                        },
                    },
                    "babel-loader?cacheDirectory=true",
                ],
                exclude: "node_modules",
            },
        ],
    },
};
```
