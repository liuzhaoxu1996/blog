# Go的行为定义与实现

Go到底是不是面向对象语言, Go的官方解释: "Yes and No."

## 一. 结构体

结构体是将另个或者多个任意类型的命名变量组合在一起的聚合数据类型。

1. 对数据进行封装: 

```go
type Employee struct {
  Id string
  Name string
  Age int
}
```

2. 实例创建及初始化

```go
type Employee struct {
  Id string
  Name string
  Age int
}
func TestCreateEmployeeObj(t *testing.T) {
  e := Employee{"0", "Bob", 20}
  e1 := Employee{Name: "Mike", Age: 30}
  e2 := new(Employee) // 返回指针
  e2.Id = "2"
  e2.Age = 22
  e2.Name = "Rose"
  t.Log(e)               // expect: ID:0-Name:Bob-Age=20
  t.Log(e1)              // expect: ID:-Name:Mike-Age=30
  t.Log(e1.Id)           // expect: 
  t.Log(e2)              // expect: ID:2-Name:Rose-Age=22
  t.Log("e is %T", e)    // expect: e is encap.Employee
  t.Log("e2 is %T", e2)  // expect: e is *encap.Employee
}

```

## 二. 定义结构体方法

```go
func (e *Employee) String() string{
  return fmt.Sprintf("ID:%s/Name:%s/Age:%d", e.Id, e.Name, e.Age)
}
```

