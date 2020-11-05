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

## 解析 js

-   安装

```sh
yarn add @babel/core @babel/preset-env babel-loader -D
```

-   配置

    -   test: 指定匹配规则
    -   use: 指定使用的 loader 名称

```js
//webpack.config.js

const path = require(path);
module.exports = {
    output: {
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
            },
        ],
    },
};
```

```json
// .babelrc

{
    "presets": ["@babel/preset-env"]
}
```

## 解析 css

-   安装

```sh
yarn add style-loader css-loader -D
```

-   配置

    -   css-loader 用于加载.css 文件，并且转换成 commonjs 对象

    -   style-loader 将样式通过`<style>`标签插入到 head 中

```js
module.exports = {
    output: {
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
```

## 解析 less

-   安装

```sh
yarn add less less-loader -D
```

-   配置

    -   less-loader 将 less 语法转换为 css 语法

```js
module.exports = {
    output: {
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
        ],
    },
};
```

## 解析 图片、字体

-   安装

```sh
yarn add file-loader -D

// 资源转换成 base64
yarn add url-loader -D
```

-   配置

```js
module.exports = {
    output: {
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: ["file-loader"],
                // 使用 base64

                // use: [{
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10240
                //     }
                // }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"],
                // 使用 base64

                // use: [{
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10240
                //     }
                // }]
            },
        ],
    },
};
```
