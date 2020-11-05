# Plugins

插件用于 bundle 文件的优化，资源管理和环境变量注入，作用于整个构建过程。

## 常用 plugins

-   CommonsChunkPlugin: 将 chunks 相同的模块代码提取成公共 js
-   CleanWebpackPlugin: 清理构建目录
-   ExtractTextWebpackPlugin: 将 css 从 bundle 文件里提取成一个独立的 css 文件
-   CopyWebpackPlugin: 将文件或者文件拷贝到构建的输出目录
-   HtmlWebpackPlugin: 创建 html 文件去承载输出的 bundle
-   UglifyjsWebpackPlugin: 压缩 js
-   ZipWebpackPlugin: 将打包出的资源生成一个 zip 包

## 用法

-   plugins: `[plugin-1, plugin-2]`

```js
const path = require(path);
module.exports = {
    output: {
        filename: "bundle.js",
    },
    +++++++++++++++
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
};
```
