# 通用配置

构建通用 webpack 配置

## 构建配置抽离成 npm 包的意义

**1. 通用性**

-   业务开发无需关注构建配置
-   统一团队构建脚本

**2. 可维护性**

-   构建配置合理拆分
-   README 文档，ChangeLog 文档等

**3. 质量**

-   冒烟测试、单元测试、测试覆盖率
-   持续集成

## 构建配置管理的方案

-   通过多个配置文件管理不同环境的构建

-   将构建配置设计成一个库

-   抽成一个命令行工具进行管理

## 构建配置包设计

-   通过多个配置文件管理不同环境的构建

    -   基础配置：webpack.base.js
    -   开发环境：webpack.dev.js
    -   生产环境：webpack.prod.js
    -   ssr 环境：webpack.ssr.js

-   将构建配置设计成一个库

    -   规范：Git commit 日志、README、ESLint 规范
    -   质量：冒烟测试、单元测试、测试覆盖率和 CI

-   构建包功能设计

![an image](https://p3.ssl.qhimg.com/t0172a88768aa06f860.png)

-   目录结构设计
