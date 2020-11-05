# Loaders

webpack 内置支持 js 和 json 两种文件类型，通过 loaders 去支持其他文件类型（比如 css, less, html 等），并且把他们转化成有效的模块。loader 本身是一个函数，接收源文件作为参数，返回转换的接口，供下一个 loader 使用。

## 常用 Loaders

-   babel-loader: 转换 ES6、ES7 等 JS 新特性语法
-   css-loader: 支持.css 文件的加载和解析
-   less-loader: 将 less 文件转换成 css
-   ts-loader: 将 TS 转换成 JS
-   file-loader: 进行图片、字体等打包
-   raw-loader: 将文件以字符串的形式导入
-   thread-loader: 多进程打包 JS 和 CSS

## Loaders 的用法

-   test: 指定匹配规则
-   use: 指定使用的 loader 名称

```js
const path = require(path);
module.exports = {
    output: {
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: "raw-loader",
            },
        ],
    },
};
```
