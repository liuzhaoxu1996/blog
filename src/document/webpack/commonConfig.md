# build-cli

构建通用 webpack 配置

[build-cli](https://github.com/liuzhaoxu1996/build-cli) 旨在能够 **快速构建项目**, **规范目录结构**, **开发规范** 等。 接入者可快速开发业务, 无需考虑打包构建等头疼问题。

![设计](https://p3.ssl.qhimg.com/t0132bd7c6d008a753f.png)

## 如何接入？

- **新项目接入**

```shell

# npm install -g build-cli 目前还没发布正式版

build init <template-name> <project-name>
```

Example:

```shell
build init webpack demo
```

上面的命令从 [build-webpack-template](https://github.com/liuzhaoxu1996/build-webpack-template) 中提取模板，提示您输入一些信息，并在 demo 处生成项目。

- **老项目接入**

老项目接入时, sobuild 会将用户重新配置的信息合并到 package.json 文件中

## 当前可用的模板

- [build-webpack-template](https://github.com/liuzhaoxu1996/build-webpack-template): 通用 webpack 构建模板

## 可扩展

你也可以使用自己构建的模板, 参照 build-webpack-template 构建自己的通用配置即可

build 使用 `ejs`模板语法, 使用[metalsmith](https://github.com/segmentio/metalsmith)读取 meta.js 或者 meta.json 配置

包含以下字段:

- `prompts`: 用于收集用户选项数据

- `filter`: 用于有条件的过滤器文件进行渲染。

- `skipInterpolation`: 不执行 ejs 编译文件

- `complete`: 可以在生成模板后钩子。
