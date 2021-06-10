# 简介

## 1. Go
Go的诞生是2007年, 当时是为了解决Google内部所发现的一些问题及挑战:

1. 多核硬件架构
2. 超大规模分布式计算集群
3. web模式导致的前所未有的开发规模和更新速度

## 2. Go的创始人

1. Rob Pike: Unix的早起开发者, UTF-8创始人
2. Ken Thompson: Unix的创始人, C语言创始人, 1983年图灵奖
3. Robert Griesemer: Google V8 JS引擎开发者

## 3. Go的特点

1. 简单: Go的关键字只有**25**个, C语言有37个关键字, C++有84个关键字
2. 高效: Go不仅提供了**垃圾回收**机制, 也提供了直接的**指针访问**
3. 生产力: Go支持复合, 不支持继承
4. 云计算语言: docker kubernetes 
5. 区块链语言: ethereum Hyperledger

## 4. 准备开始Go冒险之旅~

1. 下载安装Go语言:

- [https://golang.org/doc/install](https://golang.org/doc/install);

2. 创建学习文件夹:

```sh
mkdir go-learning

cd go-learning

touch helloword.go
```

3. 编写 helloword.go 文件

```go
// 基本程序结构
package main // 包, 表名代码所在的模块

import "fmt" // 引入代码依赖

// 功能实现
func main() {
  fmt.Println("HelloWorld")
}
```

::: tip 说明
应用程序入口: 
  - 必须是main包: package main;

  - 必须是main的方法: func main();

  - 文件名不一定是 main.go;

  - Go中main函数不支持任何返回值

  - 通过os.Exit来返回状态

  - main函数不支持传入参数

  - 在程序中直接通过os.Args获取命令行参数
  ```go
  func main() {
    if len(os.Args)>1 {
      fmt.Println("HelloWorld", os.Args[1]);
    }
  }

  // 不支持mian函数传入参数
  // func main(arg []string)
  ```
:::

  