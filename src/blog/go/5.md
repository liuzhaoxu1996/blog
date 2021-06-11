# Map

## 一. Map声明

```go
m := map[string]int{"one": 1, "two": 2, "three": 3}

m1 := map[string]int{}
m1["one"] = 1

// make参数: 第一个是map类型, 第二个是cap, 没有len
m2 := make(map[string]int, 10)
```

:::warning Map元素的访问, 与其他主要编程语言的差异
在访问的key不存在时, 仍会返回零值, 不能通过返回nil来判断元素是否存在

```go

// 可以通过if判断来判断访问的key是否存在;

if v, ok := m["four"]; ok {
	// 存在
	t.Log("four", v)
} else {
	// 不存在
	t.Log("Not existing")
}
```
:::


## 二. Map遍历

```go
package map_ext

func TestTravelMap(t *testing.T) {
	m1 := map[string]int{"one": 1, "two": 2, "three": 3}

	for k, v := range m1 {
		t.Log(k, v)
	}
}
```

:::warning
go中是没有Set方法的
:::

## 三. Map实现工厂模式

Map的value可以是一个函数, 所以可以利用Map实现工厂模式

```go
package map_ext

import "testing"

func TestMapWithFunValue(v *testing.T) {
	m := map[int]func(op int) int{}
	m[1] = func(op int) int { return op }
	m[2] = func(op int) int { return op * op }
	m[3] = func(op int) int { return op * op * op }
	t.Log(m[1](2), m[2](2), m[3](2))
}

// expect: 2 4 8
```


## 四. 实现Set

Go的内置集合中没有Set实现, 可以通过map[type]bool来实现

1. 元素的唯一性
2. 基本操作
	- 添加元素
	- 判断元素是否存在
	- 删除元素
	- 元素个数

```go
func TestMapForSet(t *testing.T) {
	mySet := map[int]bool{}
	mySet[1] = true
	n := 3
	if mySet[n] {
		t.Log("%d is existing", n)
	} else {
		t.Log("%d is not existing", n)
	}
}
```

:::tip 删除元素
delete(mySet, 1)
:::


