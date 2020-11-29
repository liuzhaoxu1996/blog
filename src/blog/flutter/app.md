# 打开第三方 app

1. 安装 [url_launcher](https://pub.dev/packages/url_launcher/install)

2. 示例

打开浏览器

```dart
// 引入flutter材料设计包
import 'package:flutter/material.dart';
// 引入url_launcher插件
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(Scaffold(
	body: Center(
	  child: RaisedButton( // 按钮
		onPressed: _launchURL, // onPressed事件
		child: Text('打开浏览器'), // 按钮文案
	  ),
	),
  ));
}

// 打开浏览器方法
_launchURL() async {
  const url = 'https://flutter.dev';
  if (await canLaunch(url)) {
	await launch(url);
  } else {
	throw 'Could not launch $url';
  }
}

```

打开地图

```dart
// 引入flutter材料设计包
import 'package:flutter/material.dart';
// 引入url_launcher插件
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(Scaffold(
	body: Center(
	  child: RaisedButton( // 按钮
		onPressed: _openMap, // onPressed事件
		child: Text('打开地图'), // 文案
	  ),
	),
  ));
}
_openMap() {
	const url='geo:52.32.4.917'; // App提供者提供的schema
	if (await canLaunch(url)) {
		await launch(url);
	} else {
		// ios
		const url = 'http://maps.apple.com/?ll=52.32.4.917';
		if (await canLaunch(url)) {
			await launch(url);
		} else {
			throw 'cant\'t launch $url';
		}
	}
}
```
