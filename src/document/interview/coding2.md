# 算法题目汇总

## 无重复字符的最长子串

公司：头条

分类：算法

[答案&解析](https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/)

## 合并二维有序数组成一维有序数组，归并排序的思路

公司：头条

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/8)

```js
/**
 * 解题思路：
 * 双指针 从头到尾比较 两个数组的第一个值，根据值的大小依次插入到新的数组中
 * 空间复杂度：O(m + n)
 * 时间复杂度：O(m + n)
 * @param {Array} arr1
 * @param {Array} arr2
 */

function　merge(arr1, arr2){
    var　result=[];
    while(arr1.length>0 && arr2.length>0){
        if(arr1[0]<arr2[0]){
              /*shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。*/
            result.push(arr1.shift());
        }else{
            result.push(arr2.shift());
        }
    }
    return　result.concat(arr1).concat(arr2);
}

function mergeSort(arr){
    let lengthArr = arr.length;
    if(lengthArr === 0){
     return [];
    }
    while(arr.length > 1){
     let arrayItem1 = arr.shift();
     let arrayItem2 = arr.shift();
     let mergeArr = merge(arrayItem1, arrayItem2);
     arr.push(mergeArr);
    }
    return arr[0];
}
let arr1 = [[1,2,3],[4,5,6],[7,8,9],[1,2,3],[4,5,6]];
let arr2 = [[1,4,6],[7,8,10],[2,6,9],[3,7,13],[1,5,12]];
mergeSort(arr1);
mergeSort(arr2);
```

## 单向链表实现队列

公司：头条
分类：算法
[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/214)

## 按要求实现 rightView 函数

```js
function TreeNode(val){
  this.val = val;
  this.left = null;
  this.right = null;
}
function rightView(root){
  // 请你实现
}
// => [1,4,3]
     1      => 1
   2   4    => 4
 7   3      => 3
```

公司：头条

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/140)

## 给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。说明: 叶子节点是指没有子节点的节点

公司：头条

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/626)

## 给定一个整数数组 nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和

公司：头条

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/625)

答案：

```js

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function(nums) {
    var max = Number.MIN_SAFE_INTEGER;
    for(var i = 0;i < nums.length; i++){
        var sum = 0;
        for(var j = i;j < nums.length; j++){
            sum += nums[j];
            if(sum > max){
                max = sum;
            }
        }
    }
    return max;
};


// 解法2：动态规划
var maxSubArray = function(nums) {
    var max = Number.MIN_SAFE_INTEGER;
    var prev = 0;
    for(var i=0;i<nums.length;i++){
        prev = Math.max(prev+nums[i],nums[i])
        max = Math.max(max,prev);
    }
    return max;
};
```

## 多种方式实现斐波那契数列

公司：腾讯、CVTE、微软

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/9)

```js
// 基本方法
function fib(n) {
  if(n < 0) throw new Error('输入的数字不能小于0');
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

// 数组方法
function fib(n) {
  if(n < 0) throw new Error('输入的数字不能小于0');
  if (n < 2) {
    return n;
  }
  let list = [];
  list[0] = 0;
  list[1] = 1;
  for (let i = 1; i < n; i++) {
    list[i + 1] = list[i] + list[i - 1];
  }
  return list[n];
}

// Generator
function* fib(n) {
  if(n < 0) throw new Error('输入的数字不能小于0');
  let f0 = 1,
    f1 = 1,
    count = 0;
  while (count < n) {
    yield f0;
    [f0, f1] = [f1, f0 + f1];
    count++;
  }
}
```

## 字符串出现的不重复最长长度

公司：腾讯

分类：算法

[答案&解析](https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/)

## 有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90）

公司：滴滴

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/19)

## [实操题]输入一条 polyline，输出 polyline 的中点

题目补充：

```js
算法：输入一条polyline，输出polyline的中点
绘制：在浏览器中绘制出polyline和中点
说明：中点是指沿着polyline，到polyline的起点和终点，距离相等，中点要求在polyline上
输入：[[10, 20], [20, 200], [30, 220], [40, 300], [100, 400]]，以[10, 20]举例，10代表x坐标，20代表y坐标，单位是像素
要求：提供源代码，用原生JavaScript实现，不使用任何框架、类库、构建工具，本地打开html文件可直接看到效果
```

公司：腾讯
分类：算法
[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/240)

## 将给定的数组从顶级分类递归查找子分类，最终构建一个树状数组

```js
/*
 *数组：[{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]
 *输出结果：[{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]
 *说明：parentId为0 的是根节点
 */
```

分类：算法
[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/212)

## 实现一个将 52 张牌随机均等的分给四个人，比如输入 [0,1,2,3....51] ，输出[[1,2,16...],[4,3,6..],[....],[....]]

公司：顺丰
分类：算法
[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/157)

## 二叉树序列化反序列化

公司：微软
分类：算法
[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/346)

## 输入一个数字，找到对应的字母

```js
/*
 如输入1 返回a
 输入26返回z
 输入27返回aa
 输入28返回ab
 输入53返回aaa
*/
```

公司：微软
分类：算法
[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/345)

## Given an int n, output Mausoleum Array solutions

```js
// Given an int n, output Mausoleum Array solutions.
// Mausoleum Array:
// Construct by 1,1,2,2,3,3,…,n-1,n-1,n,n
// first were non-decreasing (i.e., increasing or remained the same), and then — non-increasing (decrease or remained unchanged).
// Mausoleum Array example:
// [1, 2, 2, 3, 4, 4, 3, 1];
// [1, 1];
// [2, 2, 1, 1];
// [1, 2, 3, 3, 2, 1].
// input/output example:
// n=1, [1,1]
// n=2, [1,1,2,2],[1,2,2,1],[2,2,1,1]
// n = 3,[3, 3, 2, 2, 1, 1],[2, 3, 3, 2, 1, 1],[2, 2, 3, 3, 1, 1],[1, 3, 3, 2, 2, 1],[1, 2, 3, 3, 2, 1],[1, 2, 2, 3, 3, 1],[1, 1, 3, 3, 2, 2],[1, 1, 2, 3, 3, 2],[1, 1, 2, 2, 3, 3]
```

公司：微软
分类：算法
[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/344)

## 给一个字符串比如'abca'，返回第一个不重复的字母

公司：易车
分类：算法
[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/334)

## 给定⼀个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效

```js
/*
  有效字符串需满⾜：
    1. 左括号必须⽤相同类型的右括号闭合。
   2. 左括号必须以正确的顺序闭合。
  注意空字符串可被认为是有效字符串。
  示例1：
   输⼊: "()"
   输出: true
  示例2：
   输⼊: "()[]{}"
   输出: true
  示例 3:
   输⼊: "(]"
   输出: false
  示例 4:
   输⼊: "([)]"
   输出: false
  示例 5:
   输⼊: "{[]}"
   输出: true
*/
```

公司：360、新东方

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/327)

答案：

```js
function fn(str) {
  const stack = []
  const leftMap = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  const rightMap = {
    ')': '(',
    ']': '[',
    '}': '{'
  }
  let cur
  for (let i = 0; i < str.length; i++) {
    cur = str[i]
    if (leftMap[cur]) {
      stack.push(cur)
    } else if (rightMap[cur]) {
      if (!stack.length) return false
      if (stack.pop() !== rightMap[cur]) return false
    }
  }
  return true
}
console.log(fn('()'));        // true
console.log(fn('()[]'));      // true
console.log(fn('()[]{}'));    // true
console.log(fn('(]'));        // false
console.log(fn('([)]'));      // false
console.log(fn('{[]}'));      // true
```

## 手动实现一个函数，给定一个数组[1,0,2,3,4,-1,-3]，输出任意两个值和为 0 的下标

公司：滴滴

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/321)

## 一个人每次只能走一层楼梯或者两层楼梯，问走到第 80 层楼梯一共有多少种方法

公司：快手

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/291)

## 给定一个数组，形如 [1, 1, 2 , 3, 3, 3, 3, 4, 6, 6]，给定一个数 n，例如 3，找出给定的数 n 在数组内出现的次数，要求时间复杂度小于 O(n)

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/243)

## 现在有随机整数数组，例如[2,11,20,160,3,1...]，请挑出数组内，三个随机整数和为 100 的所有数据

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/388)

## 统计一组整形数组的最大差值？

公司：心娱

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/365)

## 如何判断链表是否有环

公司：有赞

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/490)

## 介绍二叉搜索树的特点

公司：有赞

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/489)

## 手写数组去重函数(至少三种以上，说明时间复杂度)

公司：携程、心娱

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/443)

## 找到前 K 个最大的元素

公司：百分点

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/746)

## 介绍下 DFS 深度优先

公司：海风教育

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/739)

## 求 n 以内的所有素数，并说明时间复杂度

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/667)

## 按要求实现代码

```js
/* 
  根据传入参数n(数字)对一维数组(纯数字)按照距离n最近的顺序排序。(距离即数字与n的差值的绝对值)
*/
var arr = [7, 28, -1, 0, 7, 33];
function sort(n) {
  // your code
}
```

公司：高思教育

分类：算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/821)

```js
const sort = (arr, n) => {
  const obj = []
  for (const value of arr) {
    obj.push(
      {
        value,
        gap: Math.abs(value - n),
      },
    )
  }
  obj.sort((a, b) => a.gap - b.gap)
  return obj.map(item => item.value)
}

console.log(sort([7, 28, -1, 0, 7, 33], 7))
```
