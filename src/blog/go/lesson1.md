# Go

## 1. 简介
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

2. 开发环境构建:

- 在1.8版本前必须设置这个环境变量
- 1.8版本之后(含1.8) 如果没有设置使用默认值, 
  - mac: `~/.bash_profile`

3. 应用程序入口: 

  - 必须是main包: package main;
  - 必须是main的方法: func main();
  - 文件名不一定是 main.go;

4. 退出返回值

  - Go中main函数不支持任何返回值
  - 通过os.Exit来返回状态

5. 获取命令行参数

  - **main函数不支持传入参数**
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