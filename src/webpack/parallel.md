# 多进程构建、压缩

## 1.多进程构建

### 原理

每次 webpack 解析一个模块，[thread-loader](https://www.webpackjs.com/loaders/thread-loader/) 会将它及它的依赖分配给 worker 线程中

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

## 2.多进程压缩

[terser-webpack-plugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/) 开启 parallel 参数

### 安装

```sh
yarn add terser-webpack-plugin -D
```

### 代码示例

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
