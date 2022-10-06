# 面试题

## 百度（2022-9-28）

### 网页性能优化

### webpack 优化

### 闭包

### debounce

一个频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效。

应用场景：

- 搜索 sug
- 比如我们想改变窗口大小时，等到移动完鼠标后再去重新绘制页面。
- 当鼠标移动结束时，再去绘制页面。
- 点击付款按钮

```js
function debounce (fn, time, immediate) {
  let timer = null;
  let localImmediate = immediate;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (localImmediate) {
      localImmediate = false
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      localImmediate = true
      timer = null;
    }, time);
  }
}
```

### throttle

一个频繁触发的函数，在规定时间内，函数执行一次后，只有大于设定的执行周期后才会执行第二次。

应用场景：

- 滚轮事件计算高度
- 动画

```js
function throttle (fn, time) {
  let timer = null;
  return function (...args) {
    if (timer) {
      return;
    }
    fn.apply(this, ...args);
    timer = setTimeout(() => {
      timer = null;
    }, time);
  }
}
```

### throttle 先执行一次

### 数组转树

```js
//  数组转树
let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 }
];
```

思路：

- 递归：每次递归都会找一遍数组，找到所有等于当前 pid 的数组，添加到 children 里

```js
// 方法1
function arrayToTree(arr, pid) {
  return arr.filter(item => item.pid === pid).map(item => ({ ...item, children: arrayToTree(arr, item.id) }));
}
const data = arrayToTree(arr, 0);
console.log(JSON.stringify(data));

// 方法2
const getChildren = (array, result, pid) => {
  const items = array.filter(item => item && item.pid === pid);
  result.push(...items);
  items.map(item => {
    item.children = [];
    getChildren(array, item.children, item.id);
  });
};

function array2result(array, pid = 0) {
  const result = [];
  getChildren(array, result, pid);
  return result;
}

const data = array2result(array, 0);
console.log(JSON.stringify(data));
```
