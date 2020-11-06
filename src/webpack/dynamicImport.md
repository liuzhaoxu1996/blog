# 代码分割

## 适用场景

-   js 懒加载

## 配置

安装 babel 插件，通过 jsonp 动态加载 js

```sh
yarn add @babel/plugin-syntax-dynamic-import -D
```

.babelrc

```json
{
    "plugin": ["@babel/plugin-syntax-dynamic-import"]
}
```

项目中

```js
function test() {
    import("./test.js").then((Text) => {
        // ...
    });
}
```
