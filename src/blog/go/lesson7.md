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


## 二. 可变参数

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

## 四. 指针

对比 c++，go 指针简单之处在于不能运算

示例： 表示修改 a 的指针

```go
var a int = 2
var pa *int = &a
*pa = 3
fmt.Println(a)
```

## 五. 参数传递

- go语言只能使用值传递
- c++语言既有值传递又有引用传递

示例：c++ demo

```cpp
void pass_by_val(int a) {
	a++;
}

void pass_by_ref(int &a) {
	a++;
}

int main() {
	int a = 3;
	
	pass_by_val(a);
	printf("After pass_by_val: %d\n", a);

	pass_by_ref(a);
	printf("After pass_by_ref: %d\n", a);
}

// 结果：
// After pass_by_val: 3
// After pass_by_ref: 4
```
原因：pass_by_val属于值传递，pass_by_ref属于引用传递。值传递相当于 copy 一份

