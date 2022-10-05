# React题目汇总

## 如何配置 React-Router 实现路由切换

公司：阿里、滴滴

分类：React

### 答案&解析

主要通过3个api实现：

- 路由器：`BrowserRouter` 或者 `HashRouter`：负责感知路由的变化并做出反应
  - `BrowserRouter`使用的是 history api 来实现的
  - `HashRouter`使用的是 hash api 实现的
- 路由：`Route` 和 `Switch`：负责定义路径与组件之间的映射关系
- 导航：`Link`、`NavLink`、`Redirect`：负责触发路径的改变

:::tip 前端路由解决了什么问题？
前端路由可以帮助我们在仅有一个页面的情况下，记住用户当前走到了哪一步
:::

:::tip hash 和 history？
hash：

1. 通过 `window.location.hash = 'index'` 设置 hash
2. 通过监听 `hashchange` 事件，来渲染对应的页面

history：

1. `window.history.forward()`: 前进
2. `window.history.back()`: 后退
3. `window.history.go(2)`: 前进两页
4. `window.history.go(-2)`: 后退两页
5. `history.pushState(data[,title][,url])`: 向浏览历史中追加一条记录
6. `history.replaceState(data[,title][,url])`: 修改替换当前浏览历史中的信息
7. 通过监听 `popState` 来监听页面历史记录数组的变化（`pushState` 和 `replaceState`不会触发）
:::

## React 路由的动态加载模块，实现按需加载

公司：阿里

分类：React

### 答案&解析

- import()
- React.lazy
- React.Suspense

```js
import {lazy, Suspense} from 'react' 
const DemoComp = lazy(() => import("./DemoComp"))

<Suspense fallback={<div>loading</div>}>
  <Switch>
    <Route path="demo" component={DemoComp} />
  </Switch>
<Suspense>
```

:::tip next 中的 动态加载

```js
import dynamic from "next/dynamic";
const comp = dynamic(import("../components/comp"));
```

:::

## 多个组件之间如何拆分各自的 state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，这如何思考

公司：阿里

分类：React

#### 答案&解析

状态提升
state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state。

## React 项目中有哪些细节可以优化？实际开发中都做过哪些性能优化

公司：滴滴、掌门一对一、网易、有赞、沪江、喜马拉雅、酷家乐、快手

分类：React

### 答案&解析

- 使用 shouldComponentUpdate 规避冗余的更新逻辑
- PureComponent + immutable.js库
- React.memo 与 useMemo (函数版的shouldComponentUpdate)

:::tip shouldComponentUpdate
React组件会根据 shouldComponentUpdate 的返回值来决定是否执行该方法之后的生命周期，进而决定是否对组件进行 re-render（重渲染）

- 只要父组件更新，那么子组件会被无条件更新
- 自身使用 setState 不管前后状态内容是否发生了变化，它都会走一遍更新流程

```js
// 在组件中添加 shouldComponentUpdate
shouldComponentUpdate(nextProps, nextState) {
  // 判断 text 属性在父组件更新前后是否发生变化，若没有发生变化，则返回 false
  if (nextProps.text === this.props.text) {
    return false
  }
  return true
}
```

:::

::: tip PureComponent
PureComponent将会在shouldComponentUpdate中对组件前后 props 和 state 进行浅比较，并根据结果，决定是否要继续更新。

但对象是看引用是否变化，若数据内容没变，则会进行一次无用的刷新，反之，则会阻断一次更新， immutable.js 每次修改都会返回一个新的对象，这样就解决了引用与数据的问题

```js
// 继承 React.PureComponent 就可以避免写 shouldComponentUpdate
export default class ChildB extends React.PureComponent{}
```

:::
::: tip React.memo
React.memo(组件[,对比逻辑])\
useMemo(() => {
  computeExpensiveValue(a, b)
}, [a,b])

1. React.memo 控制是否需要重新渲染一个组件
2. useMemo 控制的则是是否需要重复执行某一段逻辑
:::

## react 最新版本解决了什么问题 加了哪些东西

公司：滴滴

分类：React

### 答案&解析

React 16.x的三大新特性 Time Slicing、Suspense、 hooks

- Time Slicing（解决CPU速度问题）使得在执行任务的期间可以随时暂停，跑去干别的事情，这个特性使得react能在性能极其差的机器跑时，仍然保持有良好的性能
- Suspense （解决网络IO问题） 和lazy配合，实现异步加载组件。 能暂停当前组件的渲染， 当完成某件事以后再继续渲染，解决从react出生到现在都存在的「异步副作用」的问题，而且解决得非的优雅，使用的是 T异步但是同步的写法，这是最好的解决异步问题的方式
- 提供了一个内置函数componentDidCatch，当有错误发生时，可以友好地展示 fallback 组件; 可以捕捉到它的子元素（包括嵌套子元素）抛出的异常; 可以复用错误组件。

React16.8 加入hooks，让React函数式组件更加灵活，hooks之前，React存在很多问题：

- 在组件间复用状态逻辑很难
- 复杂组件变得难以理解，高阶组件和函数组件的嵌套过深。
- class组件的this指向问题
- 难以记忆的生命周期

hooks很好的解决了上述问题，hooks提供了很多方法

- useState 返回有状态值，以及更新这个状态值的函数
- useEffect 接受包含命令式，可能有副作用代码的函数。
- useContext 接受上下文对象（从 React.createContext返回的值）并返回当前上下文值，
- useReducer useState 的替代方案。接受类型为 （state，action）=> newState的reducer，并返回与dispatch方法配对的当前状态。
- useCalLback 返回一个回忆的memoized版本，该版本仅在其中一个输入发生更改时才会更改。纯函数的输入输出确定性
- useMemo 纯的一个记忆函数 o useRef 返回一个可变的ref对象，其Current 属性被初始化为传递的参数，返回的 ref 对象在组件的整个生命周期内保持不变。
- useImperativeMethods 自定义使用ref时公开给父组件的实例值
- useMutationEffect 更新兄弟组件之前，它在React执行其DOM改变的同一阶段同步触发
- useLayoutEffect DOM改变后同步触发。使用它来从DOM读取布局并同步重新渲染

React16.9
重命名 Unsafe 的生命周期方法。新的 UNSAFE_前缀将有助于在代码 review 和 debug 期间，使这些有问题的字样更突出
废弃 javascrip:形式的 URL。以javascript:开头的URL 非常容易遭受攻击，造成安全漏洞。
废弃"Factory"组件。 工厂组件会导致 React 变大且变慢。
act（）也支持异步函数，并且你可以在调用它时使用 await。
使用 `<React.ProfiLer>` 进行性能评估。在较大的应用中追踪性能回归可能会很方便

React16.13.0
支持在渲染期间调用setState，但仅适用于同一组件
可检测冲突的样式规则并记录警告
废弃 unstable_createPortal，使用CreatePortal
将组件堆栈添加到其开发警告中，使开发人员能够隔离bug并调试其程序，这可以清楚地说明问题所在，并更快地定位和修复错误。

## React 事件绑定原理

公司：滴滴、沪江

分类：React

### 答案&解析

React并不是将click事件绑定到了div的真实DOM上，而是在document处监听了所有的事件，当事件发生并且冒泡到document处的时候，React将事件内容封装并交由真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能在组件挂在销毁时统一订阅和移除事件。
除此之外，冒泡到document上的事件也不是原生的浏览器事件，而是由react自己实现的合成事件（SyntheticEvent）。因此如果不想要是事件冒泡的话应该调用`event.preventDefault()`方法，而不是调用`event.stopProppagation()`方法。

JSX 上写的事件并没有绑定在对应的真实 DOM 上，而是通过事件代理的方式，将所有的事件都统一绑定在了 document 上。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。

另外冒泡到 document 上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 `event.stopPropagation` 是无效的，而应该调用 `event.preventDefault`。

实现合成事件的目的如下：

- 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
- 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。

:::tip React的事件和普通的HTML事件有什么不同？
区别：

- 对于事件名称命名方式，原生事件为全小写，react 事件采用小驼峰；
- 对于事件函数处理语法，原生事件为字符串，react 事件为函数；
- react 事件不能采用 return false 的方式来阻止浏览器的默认行为，而必须要地明确地调用`preventDefault()`来阻止默认行为。

合成事件是 react 模拟原生 DOM 事件所有能力的一个事件对象，其优点如下：

- 兼容所有浏览器，更好的跨平台；
- 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）。
- 方便 react 统一管理和事务机制。
- 事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到document 上合成事件才会执行。
:::

## React 组件通信方式

公司：滴滴、掌门一对一、喜马拉雅、蘑菇街

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/31)

- 父 -> 子：通过 props
- 子 -> 父：父组件通过给子组件传递一个绑定自身上下文的函数，子组件通过调用该函数将数据与参数的方式传递给父组件
- 兄弟之间：即没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。
  - 可以使用自定义事件通信（发布订阅模式）
  - 可以通过redux等进行全局状态管理
  - 如果是兄弟组件通信，可以找到这两个兄弟节点共同的父节点, 结合父子间通信方式进行通信。

:::tip context
Consumer 不仅能够读取 Provider 下发的数据，还能读取到这些数据后续的更新

- React.createContext
- Provider
- Consumer

```js
const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

// 父组件
<Provider value={title: this.state.title}></Provider>

// 子组件
<Consumer>
  {value => <div>{value.title}</div>}
</Consumer>

```

:::

::: tip 手写 eventEmitter

```js
class myEventEmitter {
  constructor() {
    // eventMap 用来存储事件和监听函数之间的关系
    this.eventMap = {};
  }
  // type 这里就代表事件的名称
  on(type, handler) {
    // hanlder 必须是一个函数，如果不是直接报错
    if (!(handler instanceof Function)) {
      throw new Error("请传一个函数");
    }
    // 判断 type 事件对应的队列是否存在
    if (!this.eventMap[type]) {
      // 若不存在，新建该队列
      this.eventMap[type] = [];
    }
    // 若存在，直接往队列里推入 handler
    this.eventMap[type].push(handler);
  }
  // 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体
  emit(type, params) {
    // 假设该事件是有订阅的（对应的事件队列存在）
    if (this.eventMap[type]) {
      // 将事件队列里的 handler 依次执行出队
      this.eventMap[type].forEach((handler, index) => {
        // 注意别忘了读取 params
        handler(params);
      });
    }
  }
  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
    }
  }
}
```

:::

## 为什么会有 React Hooks，它解决了什么问题？

class 组件的问题：

- 大型组件很难拆分和重构
- 相同业务逻辑，可能要在多个生命周期勾子中调用，逻辑比较混乱
- 复用逻辑变得复杂，入 Mixins，HOC，RenderProp

函数组件更灵活、易拆分、易测试，但函数组件没有 state、生命周期，需要 hooks

:::tip 函数组件

- 默认函数组件没有 state
- 函数组件是一个纯函数，执行完即销毁，无法存储 state
- 没有生命周期，通过 useEffect 来模拟 DidMount 和 DidUpdate, 通过 `return () => {}` 来模拟 `willUnMount`
:::

## React Hooks 如何模拟组件生命周期？

useEffect 模拟 componentDidMount 和 componentDidUpdate 和 componentWillUnmount

## 如何自定义 Hook？

1.引入react和自己需要的hook
2.创建自己的hook函数
3.返回一个数组,数组中第一个内容是数据,第二是修改数据的函数
4.将自己定义的hook暴露出去
5.在自己的业务组件中引入并使用

```js
import React,{useState,useEffect} from 'react';

// 如何模拟数据接口请求功能
export default function useLoadData(){
  const [num,setNum] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      console.log('rrr');
      setNum(2)
    }, 1000);
  }, [])
  return [num, setNum]
}
```

## React Hooks 性能优化？

- useMemo
- useCalLback

## 使用 React Hooks 遇到哪些坑？

- 不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们
- 使用函数的方式来更新状态, 例如：count 初始值是0，多次执行 `setCount(count + 1)`, 因为状态变量只会在下一次渲染才会更新，所以每次取到的 count 都是 0，得到结果是 1，不是 3，所以使用`setCount(count => count + 1)`
- 不要忘记清理副作用, 比如在 useEffect 的 return 清理 setTimeout
- useState 初始化值，只有第一次有效, 比如初始化值是父组件传递的 props，props 更新，初始值也不会更新
- useEffect 闭包陷阱, 依赖为[]时，react 重新 render，effect 内部函数并不会执行，获取的state值是不对的。

## 如何解决 React Hooks 中的闭包陷阱？

- 使用回调函数赋值
- 使用 useRef
- 使用 useReducer

### 使用回调函数

当我们使用 setState 时，新的 state 如果是通过计算旧的 state 得出，那么我们可以将回调函数当作参数传递给 setState。该回调函数将接收先前的 state，并返回一个更新后的值：

```js
import React, { useState, useEffect, useRef } from 'react'

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <div>{count}</div>;
}

export default App
```

### 使用 useRef

同一个 ref 在 React 组件的整个生命周期中只存在一个引用，因此通过 current 永远是可以访问到引用中最新的函数值，不会存在闭包陈旧值的问题。

```js
import React, { useState, useEffect, useRef } from 'react'

function App() {
    const [count, setCount] = useState(0)

    const countRef = useRef(0)
    // 模拟 DidMount
    useEffect(() => {
        // 定时任务
        const timer = setInterval(() => {
            console.log('setInterval...', countRef.current)
            setCount(countRef.current++)
        }, 1000)

        // 清除定时任务
        return () => clearTimeout(timer)
    }, []) // 依赖为 []，re-render 不会重新执行 effect 函数

    return <div>count: {count}</div>
}

export default App
```

### 使用 useReducer

利用 useReducer 获取的dispatch方法在组件的生命周期中保持唯一引用，并且总是能操作到最新的值：

```js
import {useEffect, useReducer} from 'react'

const initialCount = 0;

function reducer(count, action) {
  switch (action.type) {
    case 'increment':
      return count + 1
    case 'decrement':
      return count - 1
    default:
      throw new Error();
  }
}

function App() {
  const [count, dispatch] = useReducer(reducer, initialCount);
  useEffect(()=>{
    setInterval(() => {
      dispatch({type:'increment'})
    }, 1000);
  },[])

  return <div>Count: {count}</div>
}

export default App
```

## Hooks 相比 HOC 和 Render Prop 有哪些有点？

HOC / Render Props / Hooks 三种写法都可以提高代码的复用性，但实现方法不同：HOC 是对传入的组件进行增强后，返回新的组件给开发者；Render Props 是指将一个返回 React 组件的函数，作为 prop 传给另一个 React 组件的共享代码的技术；Hooks 是 React 提供的一组 API，使开发者可以在不编写 class 的情况下使用 state 和其他 React 特性。

- 复用性
HOC、Render Props、Hooks 都有提高代码复用性的能力，但根据其设计模式上的差别，适用范围也会有所差异：HOC 基于单一功能原则，对传入组件进行增强；Render Props 复用数据源，按需渲染 UI；Hooks 对于不同场景的复用都有较好的普适性。
- 可读性 / 易用性
  - HOC 可读性差，易用性差。HOC 写法看似简洁，但开发者无法通过阅读 HOC 的调用辨别出方法的作用：看不到接收和返回的结构，增加调试和修复问题的成本；进行多个 HOC 组合使用时，不能确定使用顺序且有命名空间冲突风险，需要了解每个 HOC 的具体实现，难以维护。不建议过度使用 HOC，但比较适合不需要个性化开发定制时使用：常见于第三方库提供 HOC 类型的 API 给开发者进行功能增强。
  - Render Props 可读性较好，易用性强。代码相对冗长，但能清晰看到组件接收的 props 以及传递的功能等，可以对 props 属性重命名，不会有命名冲突。但难以在 render 函数外使用数据源，且容易形成嵌套地狱。
  - Hooks 可读性强，易用性较好。使用 Hooks 时，能清晰看到组件接收的 props 以及传递的功能等，可以对 props 属性重命名，不会有命名冲突，不存在嵌套地狱，且没有数据源获取及使用范围的限制。但 Hooks 编程应遵循函数式编程的实践，否则 Hooks 所需的依赖数组的处理会造成较大的心智负担。

:::tip 知识点

1. HOC （Higher Order Component，即高阶组件）
HOC 是 React 中复用代码的编程模式。具体来说，高阶组件是一个纯函数，它接收一个组件并返回一个新的组件。常见例子：React Redux 的 connect，将 Redux Store 和 React 组件联系起来。

```js
// react-redux connect 例子
const ConnectedMyComponent = connect(mapState)(MyComponent);

// 实现一个简单的 HOC 例子
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("Current props: ", this.props);
      console.log("Previous props: ", prevProps);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
```

2. Render Props
Render Props 是 React 中复用代码的编程模式。主要解决组件逻辑相同而渲染规则不同的复用问题。常见例子：React Router 中，自定义 render 函数，按需使用 routeProps 来渲染业务组件。

```js
ReactDOM.render(
  <Router>
    <Route
      path="/home"
      render={(routeProps) => (
        <div>Customize HZFE's {routeProps.location.pathname}</div>
      )}
    />
  </Router>,
  node
);
```

3. React Hooks
React Hooks 是 React 16.8 引入的一组 API。开发者可以在不使用 class 写法的情况下，借助 Hooks 在纯函数组件中使用状态和其他 React 功能。

```js
function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

:::

## 说一下 React setState 原理

公司：网易

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/223)

## 说一下 React diff 算法

公司：脉脉

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/222)

## 说一下 React 生命周期，以及都有哪些改变，为什么去掉了那几个旧的生命周期

公司：完美世界、高德、脉脉、有赞、挖财、沪江、携程、喜马拉雅、酷家乐

分类：React

### 答案&解析

- react老版本中：
![](https://img-blog.csdnimg.cn/20200702114631693.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTE3NDgzMTk=,size_16,color_FFFFFF,t_70)

react旧版生命周期包含三个过程：

1、挂载过程
constructor()
componentWillMount()
componentDidMount()

2、更新过程
componentWillReceiveProps(nextProps)
shouldComponentUpdate(nextProps,nextState)
componentWillUpdate (nextProps,nextState)
render()
componentDidUpdate(prevProps,prevState)

3、卸载过程
componentWillUnmount()

其具体作用分别为：
1、constructor()
完成了React数据的初始化。

2、componentWillMount()
组件已经完成初始化数据，但是还未渲染DOM时执行的逻辑，主要用于服务端渲染。

3、componentDidMount()
组件第一次渲染完成时执行的逻辑，此时DOM节点已经生成了。

4、componentWillReceiveProps(nextProps)
接收父组件新的props时，重新渲染组件执行的逻辑。

5、shouldComponentUpdate(nextProps, nextState)
在setState以后，state发生变化，组件会进入重新渲染的流程时执行的逻辑。在这个生命周期中return false可以阻止组件的更新，主要用于性能优化。

6、componentWillUpdate(nextProps, nextState)
shouldComponentUpdate返回true以后，组件进入重新渲染的流程时执行的逻辑。

7、render()
页面渲染执行的逻辑，render函数把jsx编译为函数并生成虚拟dom，然后通过其diff算法比较更新前后的新旧DOM树，并渲染更改后的节点。

8、componentDidUpdate(prevProps, prevState)
重新渲染后执行的逻辑。

9、componentWillUnmount()
组件的卸载前执行的逻辑，比如进行“清除组件中所有的setTimeout、setInterval等计时器”或“移除所有组件中的监听器removeEventListener”等操作。

- react16.3中：
废除了 componentWillMount, componentWillReceiveProps, componentWillUpdate, 并引入了一个新的生命周期钩子：getDerivedStateFromProps， getSnapshotBeforeUpdate。

::: tip getDerivedStateFromProps

- 是一个静态方法，函数内部无法调用 this，防止用户对生命周期的错用和滥用
- getDerivedStateFromProps(props, state), 函数内返回一个对象，内部的 state 属性会合并到 state 中
- react16.4中，组件任何更新都会触发 getDerivedStateFromProps
:::

::: tip 为什么去掉了那几个旧的生命周期？

- 为 fiber 架构铺路，把有可能多次执行 render 阶段中的三个方法弃用
- 使用 static 修饰 getDerivedStateFromProps， 防止用户滥用或错用

:::

## React key 是干嘛用的 为什么要加？key 主要是解决哪一类问题的

公司：滴滴、挖财

分类：React

### 答案&解析

react中key的作用是：在diff算法中判断元素是最新创建的还是被移动来的，从而减少不必要的diff，也就是为了提高diff同级比较的效率，避免原地复用带来的副作用；key是react用来追踪列表的元素被修改，被添加或者是被删除的标识。

## 为什么 useState 要使用数组而不是对象

公司：伴鱼

分类：React

#### 答案&解析

因为useState使用的是es6的解构赋值

数组和对象解构赋值的区别：

- 数组的元素是按次序排列的,数组解构时变量的取值由数组元素的位置决定,变量名可以任意命名。
- 数组的元素是按次序排列的,数组解构时变量的取值由元素的位置决定,变量名可以任意命名。
- 对象的属性则没有次序,解构时变量名必须与属性同名才能取到正确的值
- 因此使用数组会更灵活,可以任意命名state和修改state的方法

## 说一下单向数据流有什么好处

公司：完美世界、酷家乐

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/358)

## 说一下对 React 和 Vue 的理解，它们的异同

公司：网易、脉脉、快手

分类：React、Vue

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/347)

## 说一下 React.Component 和 Ract.PureComponent 的区别

公司：高德、有赞、酷家乐

分类：React

#### 答案&解析

PureComponent表示一个纯组件，可以用来优化React程序，减少render函数执行的次数，从而提高组件的性能。

在React中，当prop或者state发生变化时，可以通过在shouldComponentUpdate生命周期函数中执行return false来阻止页面的更新，从而减少不必要的render执行。React.PureComponent会自动执行 shouldComponentUpdate。

不过，pureComponent中的 shouldComponentUpdate() 进行的是浅比较，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致。浅比较会忽略属性和或状态突变情况，其实也就是数据引用指针没有变化，而数据发生改变的时候render是不会执行的。如果需要重新渲染那么就需要重新开辟空间引用数据。PureComponent一般会用在一些纯展示组件上。

使用pureComponent的好处：当组件更新时，如果组件的props或者state都没有改变，render函数就不会触发。省去虚拟DOM的生成和对比过程，达到提升性能的目的。这是因为react自动做了一层浅比较。

## 说一下对 React Hook 的理解，它的实现原理，和生命周期有哪些区别？

公司：高德

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/311)

## 说一下 React 有状态组件与无状态组件区别，以及为什么要用，它的优缺点

公司：高德

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/305)

## 说一下对 React context 的理解

公司：脉脉、酷家乐

分类：React

### 答案&解析

在React中，数据传递一般使用props传递数据，维持单向数据流，这样可以让组件之间的关系变得简单且可预测，但是单项数据流在某些场景中并不适用。单纯一对的父子组件传递并无问题，但要是组件之间层层依赖深入，props就需要层层传递显然，这样做太繁琐了。

Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

可以把context当做是特定一个组件树内共享的store，用来做数据传递。简单说就是，当你不想在组件树中通过逐层传递props或者state的方式来传递数据时，可以使用Context来实现跨层级的组件数据传递。

JS的代码块在执行期间，会创建一个相应的作用域链，这个作用域链记录着运行时JS代码块执行期间所能访问的活动对象，包括变量和函数，JS程序通过作用域链访问到代码块内部或者外部的变量和函数。

假如以JS的作用域链作为类比，React组件提供的Context对象其实就好比一个提供给子组件访问的作用域，而 Context对象的属性可以看成作用域上的活动对象。由于组件 的 Context 由其父节点链上所有组件通 过 getChildContext（）返回的Context对象组合而成，所以，组件通过Context是可以访问到其父组件链上所有节点组件提供的Context的属性。

## 说一下对 React-redux 的理解以及它的原理，主要解决什么问题

公司：阿里、脉脉

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/284)

## 对React中Fragment的理解，它的使用场景是什么？

### 答案&解析

在React中，组件返回的元素只能有一个根元素。为了不添加多余的DOM节点，我们可以使用Fragment标签来包裹所有的元素，Fragment标签不会渲染出任何元素。

## React 如何避免 renderd 的触发

公司：脉脉

分类：React

### 答案&解析

React 基于虚拟 DOM 和高效 Diff 算法的完美配合，实现了对 DOM 最小粒度的更新。大多数情况下，React 对 DOM 的渲染效率足以业务日常。但在个别复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，其很重要的一个方向，就是避免不必要的渲染（Render）。这里提下优化的点：

- shouldComponentUpdate 和 PureComponent
在 React 类组件中，可以利用 shouldComponentUpdate或者 PureComponent 来减少因父组件更新而触发子组件的 render，从而达到目的。shouldComponentUpdate 来决定是否组件是否重新渲染，如果不希望组件重新渲染，返回 false 即可。

- 利用高阶组件
在函数组件中，并没有 shouldComponentUpdate 这个生命周期，可以利用高阶组件，封装一个类似 PureComponet 的功能

- 使用 React.memo
React.memo 是 React 16.6 新的一个 API，用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似，但不同的是， React.memo只能用于函数组件。

## 说一下对 vnode 的理解，vnode 的引入与直接操作原生 dom 相比，哪一个相率更高，为什么

公司：脉脉、菜鸟网络、蘑菇街

分类：React

### 答案&解析

- 提高开发效率
使用JavaScript，我们在编写应用程序时的关注点在于如何更新DOM。
使用React，你只需要告诉React你想让视图处于什么状态，React则通过VitrualDom确保DOM与该状态相匹配。你不必自己去完成属性操作、事件处理、DOM更新，React会替你完成这一切。
这让我们更关注我们的业务逻辑而非DOM操作，这一点即可大大提升我们的开发效率。

- 关于提升性能
直接操作DOM是非常耗费性能的，这一点毋庸置疑。但是React使用VitrualDom也是无法避免操作DOM的。
如果是首次渲染，VitrualDom不具有任何优势，甚至它要进行更多的计算，消耗更多的内存。
VitrualDom的优势在于React的Diff算法和批处理策略，React在页面更新之前，提前计算好了如何进行更新和渲染DOM。实际上，这个计算过程我们在直接操作DOM时，也是可以自己判断和实现的，但是一定会耗费非常多的精力和时间，而且往往我们自己做的是不如React好的。所以，在这个过程中React帮助我们"提升了性能"。
所以，我更倾向于说，VitrualDom帮助我们提高了开发效率，在重复渲染时它帮助我们计算如何更高效的更新，而不是它比DOM操作更快。

- 跨平台兼容

## React15/16.x 的区别

公司：百分点

分类：React

### 答案&解析

- react15的架构可以分为两层：

Reconciler（协调器）— 找出需要更新的组件，以及标识出如何更新

Renderer（渲染器）— 负责将变化后的组件渲染到页面上

- react16的架构可以分为三层：

Scheduler（调度器）— 调度任务的优先级，高级优先级的优先进入Reconciler阶段

Reconciler（协调器）— 找出需要更新的组件，以及标识出如何更新

Renderer（渲染器）— 负责将变化后的组件渲染到页面上

说在前头：

浏览器的16.6ms机制

对人眼来说，正常流畅的刷新率为60hz，即60帧，即浏览器16.6ms刷新一次。

我们知道js可以操作dom元素，所以浏览器的GUI线程和js线程是互斥的。js的执行和浏览器的绘制、布局不能同时进行。所以在每16.6ms内浏览器要执行如下操作：

JS脚本执行 ------ 浏览器样式布局 ------ 浏览器样式绘制

如果js脚本执行时间过长，超过16.6ms，这次刷新中浏览器绘制和布局就无法执行，这就会造成人眼可识别的卡顿，发现操作时浏览器没有“实时”做出反应。如：对于用户在输入框输入内容这个行为来说，就体现为按下了键盘按键但是页面上不实时显示输入。

15和16区别

react15的reconciler是stack-reconciler。即是采用递归形式工作的，是同步的，在生成虚拟dom树并diff过程中是无法中断的。这样在组件层级过深时，会造成js执行时间过长，浏览器无法布局和绘制，造成丢帧。

react16的reconciler是fiber-reconciler。即采用的异步可中断更新代替react15的同步更新，react16的scheduler调度器会告诉reconciler，浏览器是否有空闲时间执行js脚本。这样就不会影响浏览器的绘制和布局工作。不会丢帧。

在react16中，原来的虚拟DOM,因其结构已不能满足异步可中断更新的需求，改而采用新的结构Fiber。虚拟dom节对应变为Fiber节点，虚拟dom树对应变为Fiber树。

## redux 请求中间件如何处理并发

公司：网易

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/528)

## React 组件中怎么做事件代理？它的原理是什么？

公司：网易

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/525)

## React 怎么做数据的检查和变化

公司：网易

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/521)

## react-router 里的 Link 标签和 a 标签有什么区别

公司：滴滴

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/520)

## React 中 Dom 结构发生变化后内部经历了哪些变化

公司：滴滴

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/511)

## React 挂载的时候有 3 个组件，textComponent、composeComponent、domComponent，区别和关系，Dom 结构发生变化时怎么区分 data 的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理

公司：滴滴

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/510)

## Redux 中间件是什么东西？接受几个参数？柯里化函数两端的参数具体是什么东西？

公司：滴滴

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/508)

## Redux 中间件· 中间件是怎么拿到 store 和 action？然后怎么处理？

公司：滴滴

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/507)

## state 是怎么注入到组件的，从 reducer 到组件经历了什么样的过程

公司：滴滴

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/506)

## 接入 Redux 过程？绑定 connect 的过程？connect 的原理

公司：头条、宝宝树

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/497)

## react 异步渲染的概念, 介绍 Time Slicing 和 Suspense

公司：有赞

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/485)

## 16.X 中 props 改变后在哪个生命周期中处理

公司：有赞

分类：React

### 答案&解析

getDerivedStateFromProps

## 介绍下 React 高阶组件，和普通组件有什么区别，适用什么场景

公司：有赞、饿了么、喜马拉雅、乘法云

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/476)

## shouldComponentUpdate 是为了解决什么问题

公司：挖财

分类：React

答案&解析:
React组件会根据 shouldComponentUpdate 的返回值来决定是否执行该方法之后的生命周期，进而决定是否对组件进行 re-render（重渲染）

## React 遇到性能问题一般在哪个生命周期里解决

公司：沪江

分类：React

### 答案&解析

- shouldComponentUpdate

## React/Redux 中哪些功能用到了哪些设计模式

公司：沪江

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/457)

## 一个对象数组，每个子对象包含一个 id 和 name，React 如何渲染出全部的 name？在哪个生命周期里写？其中有几个 name 不存在，通过异步接口获取，如何做？渲染的时候 key 给什么值？可以使用 index 吗？用 id 好还是 index 好？

公司：饿了么

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/452)

## componentWillReceiveProps 的触发条件是什么

公司：喜马拉雅

分类：React

### 答案&解析

componentWillReceiveProps在初始化render的时候不会执行，它会在Component接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染。这个东西十分好用，但是一旦用错也会造成十分严重的后果。

## 介绍 React 设计思路，它的理念是什么？

公司：蘑菇街、海风教育

分类：React

### 答案&解析

React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。
理念：快速响应

## 哪些方法会触发 react 重新渲染？重新渲染 render 会做些什么？

公司：百分点

分类：React

### 答案&解析

- setState
- 父组件重新渲染
- context 变化

## state 和 props 触发更新的生命周期分别有什么区别？

公司：百分点

分类：React

### 答案&解析

state改变会触发 getDerivedStateFromProps + shouldComponentUpdate
props改变会触发 getDerivedStateFromProps

![](https://img-blog.csdnimg.cn/d92d18e6658c47ccbaa8874c2ad1feac.png)

## React setState 是同步还是异步？

公司：百分点

分类：React

#### 答案&解析

setState是一个伪异步，即延迟执行但本身还在一个事件循环，所以它的执行顺序在同步代码后、异步代码前。为什么会有这种现象？这就要说到react的合成事件了，react的批处理更新也得益于合成事件，可以试下脱离react事件，使用原生事件（setInterval, setTimeout, 事件）执行setState，你会得到同步的代码。

react18更新：原生事件也是异步更新，合并 state，所有事件全部批处理

:::tip 知识点

- 不可变值
- 可能被异步更新
- 可能被合并

不能直接对 state 进行赋值
例如：`this.state.count ++`，应该使用 setState 进行赋值
:::

## Fiber算法原理，相比之前的stack算法哪些方面做了优化？

分类：React

#### 答案&解析

Fiber 它的主要特性是增量渲染:能够将渲染工作分割成块，并将其分散到多个帧中。

- JS 运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。当我们调用setState更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。
- 解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成。也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。
- Fiber 树在首次渲染的时候会一次过生成。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。
- 在构造 Fiber 树的过程中，Fiber Reconciler 会将需要更新的节点信息保存在Effect List当中，在阶段二执行的时候，会批量更新相应的节点。

## 如何实现双向绑定，并抽象成公共组件

分类：React

### 答案&解析

```js
import React, { useRef, useState } from "react";
const proxyMap = new WeakMap();
const observer = (initialState, cb) => {
  const existing = proxyMap.get(initialState);
  if (existing) return existing;
  const proxy = new Proxy(initialState, {
    get(target, key, receiver) {
      const val = Reflect.get(target, key, receiver);
      return typeof val === "object" && val !== null ? observer(val, cb) : val; // 递归处理object类型
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      return cb() && ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      return cb() && ret;
    }
  });
  return proxyMap.set(initialState, proxy) && proxy;
};
function useReactive(initialState) {
  const refState = useRef(initialState);
  const [, setUpdate] = useState({});
  const refProxy = useRef({
    data: null,
    initialized: false
  });
  if (refProxy.current.initialized === false) {
    refProxy.current.data = observer(refState.current, () => {
      setUpdate({});
    });
    refProxy.current.initialized = true;
    return refProxy.current.data;
  }
  return refProxy.current.data;
}

const CountDemo = () => {
  let reactive = useReactive({
    count: 0
  });
  return (
    <div
      onClick={() => {
        reactive.count++;
      }}
    >
      click-add-count-{reactive.count}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <CountDemo />
    </div>
  );
}
```

## 说一下 Redux 的原理，介绍下整体的一个工作流程

公司：脉脉、兑吧、寺库、蘑菇街、百分点

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/283)

## 介绍 Redux 数据流的流程

公司：阿里

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/551)

## Redux 如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理

公司：阿里

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/550)

## 使用过的 Redux 中间件

公司：阿里

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/547)

## redux 的设计思想

公司：头条

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/546)

## React 数据持久化有什么实践吗？

公司：洋葱学院

分类：React

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/238)

## Redux 怎么实现属性传递，介绍下原理

公司：喜马拉雅

分类：React

### 答案与解析

react-redux 数据传输∶ view-->action-->reducer-->store-->view。看下点击事件的数据是如何通过redux传到view上：

view 上的AddClick 事件通过mapDispatchToProps 把数据传到action ---> click:()=>dispatch(ADD)
action 的ADD 传到reducer上
reducer传到store上 const store = createStore(reducer);
store再通过 mapStateToProps 映射穿到view上text:State.text

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
class App extends React.Component{
  render(){
    let { text, click, clickR } = this.props;
    return(
      <div>
        <div>数据:已有人{text}</div>
        <div onClick={click}>加人</div>
        <div onClick={clickR}>减人</div>
      </div>
    )
  }
}
const initialState = {
  text:5
}
const reducer = function(state,action){
  switch(action.type){
    case 'ADD':
      return {text:state.text+1}
    case 'REMOVE':
      return {text:state.text-1}
    default:
      return initialState;
  }
}

let ADD = {
    type:'ADD'
}
let Remove = {
    type:'REMOVE'
}

const store = createStore(reducer);

let mapStateToProps = function (state){
  return{
    text:state.text
  }
}

let mapDispatchToProps = function(dispatch){
  return{
    click:()=>dispatch(ADD),
    clickR:()=>dispatch(Remove)
  }
}

const App1 = connect(mapStateToProps,mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store = {store}>
    <App1></App1>
  </Provider>,document.getElementById('root')
)
```

## Redux 中异步的请求怎么处理

公司：滴滴

分类：React

### 答案&解析

redux-thunk

## Redux 和 Vuex 有什么区别，说下一它们的共同思想

公司：快手

分类：React、Vue

### 答案&解析

- Redux相对于Flux的改进：
  - 把store和Dispatcher合并,结构更加简单清晰
  - 新增state角色，代表每个时间点store对应的值，对状态的管理更加明确
Redux数据流的顺序是:View调用store.dispatch发起Action->store接受Action(action传入reducer函数,reducer函数返回一个新的state)->通知store.subscribe订阅的重新渲染函数

- Vuex是专门为Vue设计的状态管理框架,同样基于Flux架构，并吸收了Redux的优点
Vuex相对于Redux的不同点有:
- 改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，无需switch,只需在对应的mutation函数里改变state值即可
- 由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可
Vuex数据流的顺序是:View调用store.commit提交对应的请求到Store中对应的mutation函数->store改变(vue检测到数据变化自动渲染)
