# 部署

## 1. 设置 FLutter 镜像(非必须)

由于在国内访问 Flutter 可能会受到限制，Flutter 官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中：

```sh
//Macintosh HD⁩ ⁨Users⁩ ⁨ 你的用户名 ⁨.bash_profile / .zshrc
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

::: warning 注意
注意：此镜像为临时镜像，并不能保证一直可用，大家可以从 [Using Flutter in China](https://flutter.dev/community/china) 上获得有关镜像服务器的最新动态。
:::

## 2. 获取 Flutter SDK

1. 点 Flutter 官网下载其最新可用的安装包。

2. 解压安装包到你想安装的目录，如：

```sh
$ cd ~/development
$ unzip ~/Downloads/flutter_macos_v1.2.1-stable.zip
```

3. 添加 flutter 相关工具到 path 中：

```sh
$ cd ~
$ vim .bash_profile
```

然后添加：

```sh
export PATH=/Users/你的用户名/Documents/flutter/bin:\$PATH
```

之后保存文件。运行 flutter doctor 上面 path 配置完成之后，需要关闭终端重新打开，然后运行：

```sh
$ flutter doctor
```

该命令检查你的环境并在终端窗口中显示报告。Dart SDK 已经在捆绑在 Flutter 里了，没有必要单独安装 Dart。 仔细检查命令行输出以获取可能需要安装的其他软件或进一步需要执行的任务（以粗体显示）：

例如：

```sh
[-] Android toolchain - develop for Android devices
• Android SDK at /Users/obiwan/Library/Android/sdk
Android SDK is missing command line tools; download from https://goo.gl/XxQghQ
• Try re-installing or updating your Android SDK,
visit https://flutter.dev/setup/#android-setup for detailed instructions.
```

一般的错误会是 XCode 或 Android Studio 版本太低、或者没有 ANDROID_HOME 环境变量等，可参考一下环境变量的配置来检查你的环境变量：

```sh
# Macintosh HD⁩ ⁨Users⁩ ⁨ 你的用户名 ⁨.bash_profile / .zshrc
# Android 环境变量
export ANDROID_HOME=/Users/你的用户名/Library/Android/sdk
# Android 模拟器路径
export PATH=${PATH}:${ANDROID_HOME}/emulator
# Android tools 路径
export PATH=${PATH}:${ANDROID_HOME}/tools
# Android 平台工具路径
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
# Android NDK 路径
ANDROID_NDK_HOME=/Users/你的用户名/Library/Android/ndk/android-ndk-r10e
# FLutter 镜像
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
# Flutter 环境变量
export PATH=/Users/jph/Documents/flutter/bin:\$PATH
```

::: tip 提示
第一次运行一个 flutter 命令（如 flutter doctor）时，它会下载它自己的依赖项并自行编译。以后再运行就会快得多。
:::

## 3. 创建 flutter 项目

```sh
$ flutter create 项目名称
```

## 4. 运行 flutter 项目

```sh
$ cd 项目

$ flutter run
```

## 5. 使用 flutter 插件

-   [插件官网](https://pub.dev/)

-   [常用插件](https://juejin.im/post/6844904014853701645)
