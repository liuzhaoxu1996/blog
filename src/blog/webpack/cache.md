# 缓存

提升二次构建速度

## 方案

-   babel-loader 开启缓存

-   terser-webpack-plugin 开启缓存

-   使用 hard-source-webpack-plugin

## 配置

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

-   terser-webpack-plugin 配置

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

-   hard-source-webpack-plugin 配置

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
