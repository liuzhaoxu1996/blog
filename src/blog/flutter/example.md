# 示例

## 1. menu 组件

![menu](https://p3.ssl.qhimg.com/t01090fb7cfdc206af3.png)

```dart
// /lib/widget/local_nav.dart
import 'package:flutter/material.dart';
import 'package:flutter_dart_learn/model/common_model.dart';

///网格卡片
class LocalNav extends StatelessWidget {
  final List<CommonModel> localNavList;

  const LocalNav({Key key, @required this.localNavList}) : super(key: key);

  /// context: 上下文, 没用到可以省略
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64,
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.all(
            Radius.circular(6),
          )),
      child: Padding(
        padding: EdgeInsets.all(7),
        child: _items(context),
      ),
    );
  }

  _items(BuildContext context) {
    if (localNavList == null) return null;
    List<Widget> items = [];
    localNavList.forEach((model) {
      items.add(_item(context, model));
    });
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: items,
    );
  }

  Widget _item(BuildContext context, CommonModel model) {
    return GestureDetector(
      onTap: () {},
      child: Column(
        children: <Widget>[
          Image.network(
            model.icon,
            width: 32,
            height: 32,
          ),
          Text(
            model.title,
            style: TextStyle(fontSize: 12),
          )
        ],
      ),
    );
  }
}

```
