# Tree Shaking

webpack 开启 tree shaking 的条件

## 开启 tree shaking

-   在.babelrc 里配置 modules:false
-   必须使用 es6 语法, 不支持 cjs
-   必须在 production 模式下

## DCE

dead code elimination

-   代码不会被执行
-   代码执行的结果不会被用到
-   代码只会影响死变量

例如：

```js
// dead code
if (false) {
    console.log("xxx");
}
```
