# 提取公共资源

## SplitChunksPlugin

SplitChunksPlugin 在 webpack4 以后是内置的，替代 CommonsChunkPlugin 插件

chunks 参数说明：

-   async 异步引入的库进行分离
-   initial 同步引入的库进行分离
-   all 所有引入的库进行分离

## 配置

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
