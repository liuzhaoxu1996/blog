# 基础

## 一. 变量赋值

```go
// 第一种
var a int = 1
var b int = 2

// 第二种
var a int 
a = 1

// 第三种
a := 1

// 第四种 类型推断
var a = 1


// 第五种 交换ab值
a,b = b,a
```

## 二. 基本数据类型

1. `bool`
2. `string`
3. `int` `int8` `int16` `int32` `int64`
4. `uint` `uint8` `uint32` `uint64` `uintptr`
5. `byte // alias for uint8`
6. `rune // alias for int32, represents a Unicode code point`
7. `float32` `float64`
8. `complex64` `complex128`

## 三. 类型转化

1. Go语言不允许隐式类型转换
2. 别名和原有类型也不能进行隐式类型转换

例如: 

```go
package try_test

import (
	"testing"
)

type MyInt int64

func TestImplicit(t *testing.T) {
	var a int32 = 1
	var b int64
	b = int64(a)
	var c MyInt
	c = b //这种也是不可以的, 必须显示声明
	c = Myint(b) //这种是可以的
}
```

## 四. 类型的预定义值

1. 不支持指针运算

```go
func TestPoint(t *testing.T) {
	a := 1
	aPtr := &a
	aPtr = aPtr + 1 //go不允许指针运算
	t.Logf("%T %T", a, aPtr) // int, *int
}
```

2. string是值类型, 其默认的初始化值为空字符串, 而不是 nil

## 五. 算数运算符

1. `+` 相加
2. `-` 相减
3. `*` 相乘
4. `/` 相除
5. `%` 求余
6. `++` 自增
7. `--` 自减

## 六. 比较运算符

1. `==` 检测两个值是否相等
2. `!=` 检测两个值是否不相等
3. `>` 大于
4. `<` 小于
5. `>=` 大于等于
6. `<=` 小于等于 

:::tip 数组比较
数组比较跟JavaScript不一样, go数组会对数组内部元素进行比较, 如果内部元素相等, 就认为相等
:::

## 七. 逻辑运算符

1. `&&` 
2. `||`
3. `!`

## 八. 位运算符

1. `&`
2. `|`
3. `^`
4. `<<`
5. `>>`

## 九. 循环

1. 仅支持for关键字

```go
// 循环
for i := 0; i <= 9; i++ {
	...
}

// 无限循环
// 没有 while(true) {} 关键字
for {
	...
}
```

## 十. 判断

1. condition表达式结果必须为布尔值
2. 支持变量赋值:

```go
// 支持多段, 第一个语句是赋值, 第二个语句是条件
if var declaration; condition {
	// code...
}

// 业务场景
// 通过执行某个函数对变量赋值, 如果出错走到else
func TestIfMultiSec(t *testing.T) {
	if v,err := someFun(); err == nil {
		t.Log("1==1")
	} else {
		t.Log("err")
	}
}
```

## 十一. switch条件

1. 条件表达式不限制为常量或者整数;
2. 单个case中, 可以出现多个结果选项, 使用逗号分隔;
3. 与C语言等规则相反, Go语言不需要用break来明确退出一个case;
4. 可以不设定switch之后的条件表达式, 在这种情况下, 整个switch结构与多个if...else...的逻辑作用等同

```go
// 相当于if else这种也是可以的
switch {
	case 0 <= Num && Num <= 3: 
		fmt.Printf("0-3")
		// break 默认有break会执行
	case 4 <= Num && Num <= 6: 
		fmt.Printf("4-6")
	case 7 <= Num && Num <= 9: 
		fmt.Printf("7-9")
}

// case多个值, 这种也是可以的
switch i {
	case 0, 2: 
		t.Log("case 0 or 2")
		// break 默认有break会执行
	default:
		t.Log("default")
}
```

## 数组

1. 数组的声明

```go
// 声明一个数组, 内部是3个int类型的元素
var arr [3]int

// 或者
arr := [3]int{1, 2, 3, 4}
// 也可以不显示的声明个数
arr := [...]int{1, 3, 4, 5}
```

2. 数组的遍历

(1) 常规for
```go
for i:=0; i<len(arr3); i++ {

}
```
(2) range
```go
for idx, v := range arr {
	...
}

// 如果不需要idx, 要用 "_" 占位
for _, v := range arr {
	...
}
```

3. 截取

- a[开始索引(包含), 结束索引(不包含)]

```go
func TestArraySection(t *testing.T) {
	a := [...]int{1, 2, 3, 4, 5}
	t.Log(a[1:2]) 				// 2 
	t.Log(a[1:]) 				// 2, 3, 4, 5
	t.Log(a[1:len(a)]) 	// 2, 3, 4, 5
	t.Log(a[:3]) 				// 1, 2, 3
	t.Log(a[:]) 				// 1, 2, 3, 4, 5
}
```

:::warning
go不支持负数索引, 例如 `a[-1:]` `b[0:-1]`都不可以
:::

4. 切片(slice)

(1) 声明
```go
// 切片不声明长度
var s0 []int
```
(2) 添加元素

```go
s0 = append(s0, 1);
```
(3) 初始化

```go
s1 := []int{1, 2, 3, 4}
```

(4) 使用make声明切片

- make(切片, 可访问长度, 容量)

```go
s2 := make([]int, 3, 5)
```

5. 切片内部结构: 

- 指针ptr指向数组
- len: 元素的个数
- cap: 内部数组的容量

::: warning
(1) 容量随着append填充元素可动态伸缩, 并不是跟长度一致, 而是指数级伸缩, 长度扩展量为1,2,4,8,16...

(2) 不可以进行比较 

```go
// 下面的示例会报错, 两个切片是不允许比较的
func TestSliceComparing(t *testing.T) {
	a := []int{1, 2, 3, 4}
	b := []int{1, 2, 3, 4}
	if a == b {
		t.Log("equal")
	}
}
```

:::