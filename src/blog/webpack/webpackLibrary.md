# 打包库

webpack 可以打包库或者组件，支持多种配置

-   支持 ES module

```js
import * as Test from "test";
```

-   支持 CJs

```js
const Test = require("test");
```

-   支持 AMD

```js
require(["test"], function(Test) {
    //Test()
});
```

## 配置

-   library: 库的全局变量
-   libraryTarget: 支持库的引入方式
-   libraryExport: 导入形式

```js
module.exports = {
    entry: {
        'index': '../index/index.js'
        'index.min': '../index/index.js'
    },
    output: {
        filename: '[name].js',
        library: 'index',
        libraryTarget: 'umd',
        libraryExport: 'default'
    }
}
```

## 针对.min 文件压缩

-   安装插件 `terser-webpack-plugin`

```sh
yarn add terser-webpack-plugin -D
```

-   mode 设置为 none
-   minimizer 通过正则匹配.min 文件，通过 TerserPlugin 进行压缩

TerserPlugin 好处可以把 es6 语法进行压缩

```js
module.exports = {
    entry: {
        'index': '../index/index.js'
        'index.min': '../index/index.js'
    },
    output: {
        filename: '[name].js',
        library: 'index',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    mode: 'none',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            })
        ]
    }
}
```

-   配置 package.json

```json
{
    "main": "index.js"
}
```

-   配置 main 入口文件

```js
//index.js

if (process.env.NODE_ENV === "production") {
    module.exports = require("./dist/index.js");
} else {
    module.exports = require("./dist/index.min.js");
}
```
