# 文件监听

## 内置 watch

-   原理

    轮询判断文件的最后编辑时间是否变化，间隔一段时间，把变化的文件更新一次。

-   用法

```json
// package.json

{
    "scripts": {
        "dev": "webpack --watch"
    }
}
```

```js
// or webpack.config.js

module.exports = {
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        // 更新间隔时间
        aggregateTimeout: 300,
        // 每秒轮训次数
        poll: 1000,
    },
};
```

## webpack-dev-server

-   安装

```js
// package.json
{
    "scripts": {
        "dev": "webpack serve --open 'Google Chrome'"
    }
}
```

-   配置

```js
module.exports = {
    ...
    mode: "development",
    plugins: [
        // 添加内置webpack热更新模块
        new webpack.HotModuleReplacementPlugin()
    ],
    // 配置devserver
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    }
};
```
