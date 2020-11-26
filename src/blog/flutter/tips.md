# 常用组件

## 给 text 设置颜色

- 使用 [flutter_color_plugin](https://pub.dev/packages/flutter_color_plugin/install) 的 ColorUtil 设置颜色

```dart
// 使用 flutter_color_plugin 插件的 ColorUtil
import 'package:flutter_color_plugin/flutter_color_plugin.dart';

// flutter
Text(style: TextStyle(color: ColorUtil.color('#a9ee00')))

// html
<span stlye="color: #a9ee00"></span>

```

## Card 组件

```dart
// 默认自带圆角, 阴影, 边框等效果的卡片
Card(
    color: Colors.blue,                 // 卡片颜色
    elevation: 5,                       // 阴影
    margin: EdgeInsets.all(10),         // margin: 10 10;
    child: Container(
        padding: EdgeInsets.all(10),    // padding: 10 10;
        child: Text(                    // 子元素
            'I am card',
            style: textStyle,
        )
    )
)
```

## AlertDialog 弹框

```
AlertDialog(
    title: Text('Title'),
    content: Text('this is a Alert component')
)
```

## [FloatingActionButton](https://api.flutter.dev/flutter/material/FloatingActionButton-class.html)

样式:

<img src="https://developer.android.com/training/material/images/fab.png"
width=300 height=200 />

```
return MaterialApp(
    home: scaffold(
        floatingActionButton: FloatingActionButton(
            onPress: null,
            child: Text('点我'),
        )
    )
)
```

## refreshIndicator 下拉刷新组件
