# 常用用法

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

## 横向排列

```dart
Row(
    children: <Widget>[
    ]
)
```

## 圆角

```dart
borderRadius: BorderRadius.all(Radius.circular(10))
```

## Image

```dart
Image.network(
    'http://xxx',
    width: 100,
    height: 100
)
```

## 透明度

```dart
Opacity(
    opacity: 0.6,
    child: xxx,
)
```

## 监听ListView滚动时间

```dart
NotificationListener(
    onNotification: (scrollNotification) {
        if (scrollNotification is ScrollUpdateNotification && scrollNotification.depth == 0) {
            // 滚动且是列表滚动的时候
            _onSroll(scrollNotification.mitrics.pixels);
        }
    }
)
```
