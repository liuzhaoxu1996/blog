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

(1) 利用card

```dart
Card(   
  shape: RoundedRectangleBorder(
  borderRadius: BorderRadius.circular(12), // 圆形: 宽度的一半
  ),
  clipBehavior: Clip.antiAlias, // 裁切方式: 抗锯齿
  elevation: 0, // 阴影
  child: Image.network(...)
)
```

(2) 利用clipRRect

```dart
ClipRRect(
  borderRadius: BorderRadius.circular(12),
  child: Image.network(…)
)
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

## 文字溢出(...)

```dart
// limitedBox用于指定最大宽高
limitedBox(
    maxWidth: 130,
    child: Text(
        _poiName(),
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: TextStyle(color: Colors.white, fontSize: 12)
    )
)

String _poiName() {
    return item.article.pios == null || item.article.pois.length == 0 ? '未知' : item.article.pois[0]?.poiName ?? '未知';
}
```
