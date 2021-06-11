# 字符串

## 一. 定义

1. string 是数据类型, 不是引用或指针类型

2. string 是只读的 byte slice, len 函数表示它所包含的 byte 数

3. string 的 byte 

示例: 

```go
package string_test

import (
	"testing"
)

func TestString(t *testing.T) {
	var s string
	t.Log(s) //expect 0 初始化为默认零值
	s = "hello"
	t.Log(len(s)) // expect 5

	// s[1] = "3" // string是不可变的byte slice, 不能修改string内部的元素
	s = "\xE4\x88\xA5"
	t.Log(s) // expect 严
	t.Log(len(s)) // expect 3
}
```

## 二. Unicode UTF8

1. Unicode 是一种字符集(code point: 一种字符编码)
2. UTF8 是 unicode 的存储实现 (转换为字节序列的规则)

```go
package string_test

import (
	"testing"
)

func TestString(t *testing.T) {
	var s string
	s = "中"
	t.Log(len(s)) // expect 3

	c := []rune(s) // rune是取出字符串的unicode
	t.Log(len(c)) // expect 1

	t.Logf("中 unicode %x", c[0]) // expect 中 unicode 4e2d (0x4e2d)
	t.Logf("中 utf8 %x", s) // expect 中 utf8 0xE4B8AD
	// 0xE4B8AD 在go中是这样存储 [0xE4, 0xB8, 0xAD] 到切片的
}
```

## 三. 遍历string

```go
package string_test

import (
	"testing"
)

func TestStringRune(t *testing.T) {
	s := "中华人民共和国"
	for _, c := range s {
		// %[1]c 表示后面第一个元素c
		// %[1]d 也是对应第一个元素c
		// 所以会输出 c 和 c的编码
		t.Logf("%[1]c %[1]d", c) // expect 中 20013
	}
}
```

## 四. string 操作方法

- `strings.Split(s, ",")`: 分割
- `strings.Join(parts, "-")`: 连接
- `strconv.Itoa(10)`: 整型转字符串
- `strconv.Atoi(10)`: 字符串转整型

:::warning
字符串转整型需要做一下判断

```go
if i,err := strconv.Atoi("10"); err==nil {
	t.Log(10 + i)
}
```

:::