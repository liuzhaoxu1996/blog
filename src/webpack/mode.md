# Mode

## Mode: 指定当前的构建环境:

-   production
-   development
-   none

## Mode 的内置函数功能

-   development: 默认开启:

    -   NamedChunksPlugin: 热更新
    -   NamedModulesPlugin

-   production: 默认开启:

    -   FlagDependencyUsagePlugin
    -   FlagIncludedChunksPlugin
    -   ModuleConcatenationPlugin
    -   NoEmitOnErrorsPlugin
    -   OccurrenceOrderPlugin
    -   SideEffectsFlagPlugin: 代码是否存在副作用
    -   TerserPlugin

-   none: 不开启任何优化选项
