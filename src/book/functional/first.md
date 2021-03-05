# 第一章: 函数式思想

本章内容

- 什么是函数式编程
- 纯函数
- 不变性和纯函数的原则
- 函数式编程技术及其对程序设计的影响

## 1.什么是函数式编程

函数式编程是一种强调以函数使用为主的软件开发风格, 目的是**执行并组合各种函数来实现更强大的功能**, 从而在系统中消除副作用并减少对状态的改变.

函数式编程属于声明式编程

::: tip 编程范式
命令式(过程式)编程: 很具体地告诉计算机如何执行某个任务

声明式编程: 这种范式会描述一系列的操作, 但并不会暴露它们是如何实现的或者是数据流如何穿过它们.
:::

## 2. 纯函数

- 仅取决于提供的输入, 而不依赖于任何在函数求值期间或调用间隔时可能变化的隐藏状态和外部状态

- 不会造成超出其作用域的变化, 例如修改全局对象或引用传递的参数

```js
// 例如
function showStudent(ssn) {
	const student = db.get(ssn);
	if (student !== null) {
		document.querySelector(`${elementId}`).innerHTML = `${student.ssn},
     ${student.firstname},
     ${student.lastname}`;
	} else {
		throw new Error("Student not found!");
	}
}

showStudent("88-888-8888");
```

分析这段代码的问题:

- 该函数为访问数据, 与一个外部变量(db)进行了交互
- 全局变量 elementId 可能随时改变, 难以控制
- HTML 元素直接修改了, HTML 本来是一个可变的, 共享的全局资源
- 如果没有找到学生, 该函数会返回一个异常, 导致整个程序执行结束

改进思路:

- 将这个长函数分解成多个具有单一职责的短函数
- 通过显式地将完成功能所需的依赖都定义为函数参数来减少副作用的数量

```javascript

// 柯里化
const curry = fn => {
	const args = [...arguments];
	return () => {
		return fn.apply(this, [...args, ...arguments]);
	};
};

// 查询学生信息
const find = curry(function(db, id) {
	const obj = db.get(id);
	if (obj === null) {
		throw new Error("Object not found");
	}
	return obj;
});

// 结构化信息数据
const csv = student => {
	return `${student.ssn}, ${student.firstname}, ${student.lastname}`;
};

// 添加到html页面
const append = curry(function(elementId, info) {
	document.querySelector(elementId).innerHTML = info;
});

// 组合函数
// https://gist.github.com/luijar/ce6b96f13e31cb153093
const compose = (...fns) => args => fns.reduceRight((acc, fn) => fn(acc), args)

const showStudents = compose(append('#student-info'), csv, find(db));

showStudents('88-888-8888');
```
- 这样, 它变的灵活了许多, 有三个可以被重用的组件函数
- 更重要的是, 与html, db的交互被移动到一个单独的函数中, 将纯函数从不纯的行为中提出来, 并通过柯里化对函数传参进行了优化.
- 纯函数返回值是透明的, 是可预测的


