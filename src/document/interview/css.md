# Css题目汇总

## css 伪类与伪元素区别

公司：滴滴、网易

分类：Css

答案&解析

| 特性              | 伪类（pseudo-class）                   | 伪元素（pseudo-element）                   |
| --------------- | ---------------------------------- | ------------------------------------- |
| **用途**          | 表示元素的特定状态                          | 表示元素的某个虚拟部分                           |
| **语法**          | 使用一个冒号 `:`                         | 使用两个冒号 `::`（CSS3标准）                   |
| **作用对象**        | 整个元素                               | 元素的一部分（如首行、首字）                        |
| **是否真实存在于DOM中** | 否，仅逻辑状态                            | 否，仅虚拟存在                               |
| **示例**          | `:hover`, `:focus`, `:nth-child()` | `::before`, `::after`, `::first-line` |

## 说一下盒子模型

公司：兑吧

分类：Css

答案&解析

```lua
+---------------------------+
|       margin（外边距）     |
|  +---------------------+  |
|  |    border（边框）    |  |
|  |  +---------------+  |  |
|  |  | padding（内边距）|  |
|  |  |  +----------+  |  |
|  |  |  | content  |  |  |
|  |  |  +----------+  |  |
|  |  +---------------+  |
|  +---------------------+  |
+---------------------------+
```

## Css 如何画出一个扇形，动手实现下

公司：头条

分类：Css、编程题

答案&解析

border

## BFC 是什么？触发 BFC 的条件是什么？有哪些应用场景？

公司：快手、伴鱼、网易

分类：CSS

答案&解析
BFC 是一个隔离作用域的布局盒子，触发条件可以是 overflow、float、display、position 等，用来清除浮动、解决 margin 合并、避免布局干扰等

触发 BFC 的条件

| 条件                                                    | 说明                                |
| ----------------------------------------------------- | --------------------------------- |
| `float` 的值不为 `none`                                   | 例如 `float: left/right`            |
| `position` 为 `absolute` 或 `fixed`                     | 相对定位不会触发                          |
| `display` 为 `inline-block`、`table-cell`、`flow-root` 等 | `inline-block` 是常见的触发方式           |
| `overflow` 不为 `visible`                               | 例如 `overflow: hidden/auto/scroll` |
| `contain: layout` 或 `contain: paint`                  | 现代浏览器支持                           |
| `flex` 或 `grid` 容器（父元素是 flex/grid）                    | 自动形成 BFC                          |

## 说一下什么是重绘重排，哪些操作会造成重绘重排

公司：滴滴、伴鱼、菜鸟网络、58

分类：CSS

答案&解析

重绘：当元素样式发生改变，但不影响布局时，比如颜色、背景图、可见性变化，浏览器会重新绘制该元素。\
重排：当元素的大小、位置、结构等影响到布局时，浏览器需要重新计算所有相关元素的几何信息。

## 通过 link 进来的 css 会阻塞页面渲染嘛，Js 会阻塞吗，如果会如何解决？

公司：伴鱼

分类：CSS

| 类型            | 是否阻塞解析 | 是否阻塞渲染 | 推荐优化方式                       |
| ------------- | ------ | ------ | ---------------------------- |
| CSS `<link>`  | 否      | ✅ 是    | 用 `media + onload` 或提取关键 CSS |
| JS `<script>` | ✅ 是    | ✅ 是    | 使用 `defer` 或 `async`，放到底部    |

| 属性    | 加载顺序 | 执行时机      | 保证顺序 |
| ----- | ---- | --------- | ---- |
| 默认    | 阻塞   | 立即执行      | ✅ 是  |
| defer | 异步   | DOM 解析后执行 | ✅ 是  |
| async | 异步   | 加载完即执行    | ❌ 否  |

## Css 选择器都有什么，权重是怎么计算的

公司：完美世界

分类：Css

答案&解析

```css
/* 选择器 */                    /* 权重 (a,b,c,d) */
/* 1 */  #header                => (0,1,0,0)    — 1 个 ID
/* 2 */  .container             => (0,0,1,0)    — 1 个类
/* 3 */  div                   => (0,0,0,1)    — 1 个元素
/* 4 */  div#header             => (0,1,0,1)    — 1 ID + 1 元素
/* 5 */  div.container.active   => (0,0,2,1)    — 2 类 + 1 元素
/* 6 */  a:hover                => (0,0,1,1)    — 1 伪类 + 1 元素
/* 7 */  input[type="text"]     => (0,0,1,1)    — 1 属性 + 1 元素
/* 8 */  *                      => (0,0,0,0)    — 通配符不加权重
```

## 布局都有什么方式，float 和 position 有什么区别

公司：完美世界

分类：Css

答案&解析

| 特性            | float                  | position                                 |
| ------------- | ---------------------- | ---------------------------------------- |
| **作用**        | 让元素脱离文档流，向左或右浮动，文本环绕   | 通过指定方式定位元素（相对、绝对等）                       |
| **元素是否脱离文档流** | 是（浮动元素不占据原位置空间）        | `relative` 不脱离，其他如 `absolute`、`fixed` 脱离 |
| **对后续元素影响**   | 后续块级元素会环绕浮动元素或顶到浮动元素下面 | 脱离文档流的定位元素不影响后续元素布局                      |
| **典型用途**      | 文本环绕、简单列布局             | 精准定位元素，比如弹窗、悬浮按钮等                        |
| **清除浮动问题**    | 需要清除浮动，否则父元素高度坍塌       | 无需清除浮动，定位元素单独占位置                         |
| **定位方式**      | 只能向左或右浮动               | 可以指定具体坐标（top/right/bottom/left）          |

## `nth-child`和`nth-of-type` 有什么区别

公司：网易

分类：Css

答案&解析

| 选择器              | 计数规则            | 举例解释            |
| ---------------- | --------------- | --------------- |
| `nth-child(n)`   | 父元素所有子元素按顺序计数   | 选第 n 个子元素，不考虑类型 |
| `nth-of-type(n)` | 父元素中该类型（标签）元素计数 | 选第 n 个同标签名的子元素  |

## flex 布局，如何实现把八个元素分两行摆放

公司：网易

分类：Css

答案&解析

```css
.container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  width: 400px;     /* 容器宽度 */
}

.item {
  flex: 0 0 25%;    /* 每个元素占容器宽度的25%，即4个元素一行 */
  box-sizing: border-box;
  border: 1px solid #ccc;
  text-align: center;
  padding: 10px 0;
}
```

## Css 方式实现一个不知道宽高的 div 居中都有哪几种方法

公司：阿里、滴滴、易车、新东方、虎扑、饿了么、爱范儿、心娱、58

分类：Css

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/335)

## 动手实现一个左右固定100px，中间自适应的三列布局？(至少三种)

公司：自如、头条

分类：Css、编程题

答案&解析

```html
<style>
.flex-container {
  display: flex;
}

.left, .right {
  width: 100px;
  background-color: #f88;
}

.center {
  flex: 1;
  background-color: #8f8;
}
<style>

<div class="flex-container">
  <div class="left">左侧 100px</div>
  <div class="center">中间自适应</div>
  <div class="right">右侧 100px</div>
</div>
```

## Css 超出省略怎么写，三行超出省略怎么写

公司：虎扑

分类：Css

答案&解析

```css
.selector {
  white-space: nowrap;       /* 不换行 */
  overflow: hidden;          /* 超出隐藏 */
  text-overflow: ellipsis;   /* 超出用省略号代替 */
}
```

```css
.selector {
  display: -webkit-box;           /* 伸缩盒子模型 */
  -webkit-box-orient: vertical;  /* 垂直排列子元素 */
  -webkit-line-clamp: 3;          /* 显示3行 */
  overflow: hidden;               /* 超出隐藏 */
  text-overflow: ellipsis;        /* 超出省略号 */
}
```

## 清除浮动的方式

公司：头条

分类：Css

答案&解析

```css
.container::after {
  content: "";
  display: block;
  clear: both;
}
```

## link 和 @import 区别

分类：Css

答案&解析

| 对比点  | `<link>`                               | `@import`                                    |
| ---- | -------------------------------------- | -------------------------------------------- |
| 使用位置 | 写在 HTML 中的 `<head>` 里                  | 写在 CSS 文件或 `<style>` 标签中                     |
| 语法示例 | `<link rel="stylesheet" href="a.css">` | `@import url("a.css");` 或 `@import "a.css";` |

## justify-content:space-between around 有什么区别

公司：快手

分类：Css

答案&解析

```html
<div class="danmu-container">
  <div class="danmu">这是第一条弹幕~</div>
  <div class="danmu" style="top: 40px;">Hello 弹幕世界！</div>
  <div class="danmu" style="top: 80px;">CSS 也能搞定弹幕~ 🎉</div>
</div>

<style>
.danmu-container {
  position: relative;
  width: 100%;
  height: 200px;
  background: #111;
  overflow: hidden;
}

.danmu {
  position: absolute;
  white-space: nowrap;
  color: #fff;
  font-size: 20px;
  animation: danmu-move 8s linear infinite;
  right: -100%; /* 从屏幕右边开始 */
}

/* 弹幕从右到左移动动画 */
@keyframes danmu-move {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
```
