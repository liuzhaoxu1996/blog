# Vue题目汇总

## 说一下对 React 和 Vue 的理解，它们的异同

公司：网易、脉脉、快手

分类：React、Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/347)

## 介绍单页应用和多页应用？

公司：寺库、海康威视

分类：React、Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/593)

## 说一下 Vue3 与 Vue2 的对比

公司：高德

分类：Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/302)

## vue 对数组的方法做了重写的操作，如何实现对 vue2 中对数组操作的 push()方法

公司：高德

分类：Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/307)

## 简述 Vue 的生命周期以及每个阶段做的事

公司：脉脉、58

分类：Vue

答案&解析

| 钩子            | 常用操作示例            |
| ------------- | ----------------- |
| beforeCreate  | 初始化前的准备（很少用）      |
| created       | 请求接口、初始化数据、事件监听   |
| beforeMount   | 访问 DOM 前的准备       |
| mounted       | DOM 相关操作（第三方库初始化） |
| beforeUpdate  | 更新前对比旧状态、清理操作     |
| updated       | 更新后执行依赖 DOM 变更的逻辑 |
| beforeDestroy | 清除定时器、解绑事件、销毁资源   |
| destroyed     | 完全销毁后的收尾工作        |

## 说一下 Vue 组件的通信方式都有哪些？(父子组件，兄弟组件，多级嵌套组件等等)

公司：脉脉、58

分类：Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/288)

| 通信场景   | 方式                  | 适用情况        |
| ------ | ------------------- | ----------- |
| 父传子    | Props               | 简单单向数据传递    |
| 子传父    | `$emit`             | 子组件通知父组件    |
| 兄弟组件   | 父组件中转、事件总线、Vuex     | 兄弟间通信，状态共享  |
| 多级嵌套组件 | Provide/Inject、Vuex | 祖孙传值、复杂状态共享 |
| 全局状态管理 | Vuex                | 大型项目复杂状态管理  |

## 说一下 Vuex 的原理以及自己的理解

公司：脉脉

分类：Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/287)

## 说一下 Vue 的\$nextTick 原理

公司：自如

分类：Vue

答案&解析

- Vue 会把需要更新的 DOM 操作推入一个异步队列（异步批处理）。
- $nextTick 实质是基于异步任务机制（microtask 或 macrotask）注册一个回调，在 DOM 更新循环结束后执行。
- Vue 优先使用 Promise.then（microtask），其次用 MutationObserver，再其次 setImmediate，最后 setTimeout。

## Vue 子组件和父组件执行顺序

分类：Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/653)

```text
父 beforeCreate → 父 created → 父 beforeMount
      ↓
    子 beforeCreate → 子 created → 子 beforeMount → 子 mounted
      ↓
父 mounted
```

## Vuex 和 localStorage 的区别

公司：高思教育

分类：Vue

答案&解析

| 名称               | 作用                                          |
| ---------------- | ------------------------------------------- |
| **Vuex**         | Vue.js 官方状态管理库，管理应用中的**全局状态**，用于组件间共享和同步状态。 |
| **localStorage** | 浏览器本地存储，用于持久化存储数据，即使刷新或关闭浏览器数据依然存在。         |

## Vue 双向绑定原理

公司：高思教育、安居客

分类：Vue

答案&解析

Vue 双向绑定原理核心是 数据劫持 + 发布-订阅模式，

数据劫持（Object.defineProperty）：通过 Object.defineProperty | proxy 拦截对象属性的访问和赋值操作，实现数据的响应式。

发布-订阅模式：每个数据被劫持后，建立一个依赖收集器（Dep），当数据变化时通知所有订阅该数据的 watcher 进行更新。

Watcher：监听器，负责在数据变化时更新视图。

模板编译：Vue 编译模板时，会将模板中的变量解析成对应的响应式数据绑定。

## 说一下 Vue 的 keep-alive 是如何实现的，具体缓存的是什么？

公司：快手

分类：Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/207)
