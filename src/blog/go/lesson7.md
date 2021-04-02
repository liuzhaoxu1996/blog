# 函数

## 一. 函数是一等公民

1. 可以有多个返回值

2. 所有参数都是值传递: slice, map, channel 会有传引用的错觉

3. 函数可以作为变量的值

4. 函数可以作为参数和返回值

可以有多个返回值 示例: 

```go
package fn_test 

func returnMultiValues() (int, int) {
	return rand.Inta(10), rand.Inta(20)
}

func TestFn(t *testing.T) {
	a, _ := returnMultiValues()
	t.Log(a) // expect: "10"
}
```


## 二. 可变长参数

```go
package fn_test 

func Sum(ops, ...int) {
	ret := 0
	for _, op := range ops {
		ret += op
	}
	return ret
}

func TestVarParam(t *testing.T) {
	t.Log(Sum(1, 2, 3, 4))
	t.Log(Sum(1, 2, 3, 4, 5))
}
```

## 三. defer 函数: 延时执行

```go
package fn_test 

func TestDefer(t *testing.T) {
	defer func() {
		t.Log("clear resources")
	}()
	t.Log("Started")
	// panic 中断函数
	panic("Fatal error") // defer仍会执行
	// 除了defer, panic之后的其他函数都不执行
}
```


