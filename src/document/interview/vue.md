# Vue题目汇总

## 说一下对 React 和 Vue 的理解，它们的异同

公司：网易、脉脉、快手

分类：React、Vue

答案&解析

| 对比点         | Vue                                             | React                                      |
| ----------- | ----------------------------------------------- | ------------------------------------------ |
| **定位**      | 框架（集成度更高）                                       | 库（专注于视图层）                                  |
| **语法风格**    | 模板语法（`template`）+ Options API / Composition API | JSX 语法（JS 写 HTML）                          |
| **响应式原理**   | Vue2：`Object.defineProperty`<br>Vue3：`Proxy`    | 通过 `useState` 等 Hook 来管理状态，依赖 immutable 设计 |
| **状态管理**    | 官方主推 Vuex（现转向 Pinia）                            | Redux、MobX、Zustand、Recoil 等可选方案            |
| **路由支持**    | 官方提供 Vue Router                                 | 需要引入第三方 React Router                       |
| **模板和逻辑分离** | 模板和逻辑在单文件组件中清晰分离                                | 使用 JSX，将逻辑和视图融合在一起                         |
| **组件通信**    | props、emit、provide/inject                       | props、context、状态提升                         |
| **指令系统**    | 拥有丰富的指令（如 `v-if`, `v-for`, `v-model`）           | 没有类似指令，使用 JS 逻辑控制                          |
| **类型支持**    | Vue3 对 TypeScript 支持增强，但仍不如 React 顺手            | 天生适合 TypeScript，类型推导较好                     |

响应式区别

| 特性        | **Vue（2.x & 3.x）**                           | **React（16+）**                           |
| --------- | -------------------------------------------- | ---------------------------------------- |
| 响应式核心     | Vue2：`Object.defineProperty`<br>Vue3：`Proxy` | 状态不可变 + 重新渲染组件（`useState`, `useReducer`） |
| 数据是“可变”的？ | ✅ 响应式对象是可变的（自动追踪依赖）                          | ❌ React 状态不可变（需要用 setState 触发更新）         |
| 自动依赖追踪    | ✅ 是的，模板中使用的数据 Vue 会自动追踪依赖                    | ❌ React 不追踪依赖，靠函数闭包和渲染过程                 |
| 响应式细粒度    | ✅ 精细（只更新受影响的数据）                              | ⛔ 粗粒度（组件级重渲染）                            |
| 响应式触发更新   | 数据变化 → 自动更新部分视图                              | `setState/useState` → 整个组件重新执行 render    |
| 深层数据变更支持  | Vue2 对数组、对象有些限制；Vue3 基于 Proxy 改进很多           | 对象/数组变化不会自动追踪，需要手动处理或重新设置状态              |
| 开发者感知度    | 低感知（写代码时少考虑响应细节）                             | 高感知（需要关注闭包、依赖、状态引用变化）                    |

## 说一下 Vue3 与 Vue2 的对比

公司：高德

分类：Vue

答案&解析

| 项目      | Vue 2                       | Vue 3                                               |
| ------- | --------------------------- | --------------------------------------------------- |
| 核心机制    | `Object.defineProperty` 劫持  | `Proxy` 代理                                          |
| 支持深层结构  | 不完全（数组、嵌套对象需手动处理）           | 完全支持，性能更好                                           |
| 性能      | 对大对象、嵌套结构较弱                 | 性能显著提升，更自然的响应式处理                                    |
| 响应式 API | `data`, `computed`, `watch` | 全新的 `reactive`, `ref`, `computed`, `watch` 等组合式 API |

## vue 对数组的方法做了重写的操作，如何实现对 vue2 中对数组操作的 push()方法

公司：高德

分类：Vue

答案&解析

- 调用自定义的 push 方法；

- 执行原生 push 逻辑；

- 手动触发依赖（dep.notify()）来更新视图；

- 对新增元素做递归响应式处理（如果是对象）。

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

Vuex 设计思想理解

- 单一数据源 \
让整个应用的状态集中在一个地方，避免多处状态不一致和难以维护的问题。

- 明确的状态变更路径 \
只有 mutation 可以更改状态，且必须同步执行，这让状态变更可追踪、易于调试（配合 devtools）。
通过 action 执行异步操作，把异步和同步的职责分离。

- 利用 Vue 响应式系统 \
状态是响应式的，组件与状态的绑定是自动的，无需手动更新视图。

- 模块化支持 \
大型项目时，state/mutation/action/getter 都可拆分成模块，方便分工协作和维护。

## 说一下 Vue 的 $nextTick 原理

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

答案&解析

\<keep-alive\> 是 Vue 内置的一个抽象组件，专门用来缓存包裹的动态组件实例，避免重复创建和销毁，从而提升性能，尤其常用在路由视图（\<router-view\>）或动态组件切换中。

它的核心目的就是 缓存组件实例及其 DOM，切换时不销毁，保持状态和 DOM 结构。

实现原理

\<keep-alive\> 内部维护一个 缓存池 cache，用一个对象存储已缓存的组件实例，key 通常是组件的 VNode.key。

当包裹的动态组件切换时，keep-alive 会判断目标组件是否已缓存：

是：直接复用缓存实例，挂载对应 DOM；

否：创建新实例并缓存。

## Vue3比Vue2性能提升

回顾Vue2，我们知道每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把用到的数据property记录为依赖，当依赖发生改变，触发setter，则会通知watcher，从而使关联的组件重新渲染。
因此，Vue3在编译阶段，做了进一步优化：

① diff算法优化
vue3在diff算法中相比vue2增加了静态标记，其作用是为了会发生变化的地方添加一个flag标记，下次发生变化的时候直接找该地方进行比较。

② 静态提升
Vue3中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用。免去了重复的创建操作，优化内存。
没做静态提升之前，未参与更新的元素也在render函数内部，会重复创建阶段。
做了静态提升后，未参与更新的元素，被放置在render 函数外，每次渲染的时候只要取出即可。同时该元素会被打上静态标记值为-1，特殊标志是负整数表示永远不会用于 Diff。

③ 事件监听缓存
默认情况下绑定事件行为会被视为动态绑定（没开启事件监听器缓存），所以每次都会去追踪它的变化。开启事件侦听器缓存后，没有了静态标记。也就是说下次diff算法的时候直接使用。

④ SSR优化
当静态内容大到一定量级时候，会用createStaticVNode方法在客户端去生成一个static node，这些静态node，会被直接innerHtml，就不需要创建对象，然后根据对象渲染。

## Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？

1、vue2中采用 defineProperty来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加getter和setter，实现响应式。但是存在以下的问题：

检测不到对象属性的添加和删除
数组API方法无法监听到
需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

2、proxy：监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作。
总结：

Object.defineProperty只能遍历对象属性进行劫持
Proxy直接可以劫持整个对象，并返回一个新对象，我们可以只操作新的对象达到响应式目的
Proxy可以直接监听数组的变化（push、shift、splice）
Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等，这是Object.defineProperty不具备的

## Vue3.0响应式原理

1、性能提升

响应式性能提升，由原来的 Object.defineProperty 改为基于ES6的 Proxy ，使其速度更快
重写了 Vdom (diff算法优化，增加静态标志)
进行模板编译优化（静态提升，不参与更新的元素只被创建一次）
更加高效的组件初始化

2、更好的支持 typeScript

Vue.js 2.x 选用 Flow 做类型检查，来避免一些因类型问题导致的错误，但是 Flow 对于一些复杂场景类型的检查，支持得并不好。
Vue.js 3.0 抛弃了 Flow ，使用 TypeScript 重构了整个项目
TypeScript 提供了更好的类型检查，能支持复杂的类型推断

3、新增 Composition API
Composition API 是 vue3 新增的功能，比 mixin 更强大。它可以把各个功能模块独立开来，提高代码逻辑的可复用性，同时代码压缩性更强。
在 Vue3 中，定义 methods、watch、computed、data数据等都放在了 setup() 函数中。
setup()函数会在created()生命周期之前执行。执行顺序为：beforeCreate > setup > created

4、新增组件

Fragment 不再限制 template 只有一个根节点。
Teleport 传送门，允许我们将控制的内容传送到任意的 DOM 中。
Suspense 等待异步组件时渲染一些额外的内容，让应用有更好的用户体验。

5、Tree-shaking：支持摇树优化
摇树优化后会将不需要的模块修剪掉，真正需要的模块打到包内。优化后的项目体积只有原来的一半，加载速度更快。

6、Custom Renderer API： 自定义渲染器
实现 DOM 的方式进行 WebGL 编程。

## watch 和 watchEffect 的区别？

watch 和 watchEffect 都是监听器，watchEffect 是一个副作用函数。它们之间的区别有：

watch ：既要指明监视的数据源，也要指明监视的回调。

而 watchEffect 可以自动监听数据源作为依赖。不用指明监视哪个数据，监视的回调中用到哪个数据，那就监视哪个数据。

watch 运行的时候不会立即执行，值改变后才会执行，而 watchEffect 运行后可立即执行。这一点可以通过 watch 的配置项 immediate 改变。

watchEffect有点像 computed ：

但 computed 注重的计算出来的值（回调函数的返回值）， 所以必须要写返回值。
而 watcheffect注重的是过程（回调函数的函数体），所以不用写返回值。

watch与 vue2.x中 watch 配置功能一致，但也有两个小坑

监视 reactive 定义的响应式数据时，oldValue 无法正确获取，强制开启了深度监视（deep配置失效）
监视 reactive 定义的响应式数据中某个属性时，deep配置有效。

## v-if 和 v-for 的优先级哪个高？

在 vue2 中 v-for 的优先级更高，但是在 vue3 中优先级改变了。v-if 的优先级更高。
