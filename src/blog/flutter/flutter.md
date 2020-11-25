# 开发

## StatelessWidget 基础组件

- Container
- Text
- Icon
- CloseButton
- BackButton
- Chip
- Divider
- Card
- AlertDialog

## StatefulWidget 基础组件

- MaterialApp
- Scaffold
- AppBar
- BottomNavigationBar
- RefreshIndicator
- Image
- TextField
- PageView

::: tip 对比

**StatelessWidget VS StatefulWidget**

简单总结:

1.  当我们的 Widget 是 StatelessWidget，那么当他的内容被创建出来之后，就不能再改变了。相反 StatefulWidget 就可以。

2.  StatelessWidget 里是不能使用 setState, 而 StatefulWidget 是可以的

:::

## 页面生命周期

![](https://raw.githubusercontent.com/chenBingX/img/master/Flutter/State%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F2.png)

1.  初始化时期

- `createState`: Framework 调用会通过调用 createState 来创建一个 State。

- `initState`: 新创建的 State 会和一个 BuildContext 产生关联，此时认为 State 已经被安装好了，initState() 函数将会被调用。

2.  更新时期

    - `didChangeDependencies`:在 initState() 调用结束后，这个函数会被调用。事实上，当 State 对象的依赖关系发生变化时，这个函数总会被 Framework 调用。

    - `build`: 经过以上步骤，系统认为一个 State 已经准备好了，就会调用 build() 来构建视图。我们需要在这个函数中，返回一个 Widget。

    - `didUpdateWidget`:当 widget 的配置发生变化时，会调用这个函数。比如，Hot-reload 的时候就会调用这个函数。这个函数调用后，会调用 build()。

3.  销毁时期

    - `deactivate`: 当 State 被暂时从视图树中移除时，会调用这个函数。页面切换时，也会调用它，因为此时 State 在视图树中的位置发生了变化，需要先暂时移除后添加。

    - `dispose`:当 State 被永久的从视图树中移除，Framework 会调用该函数。在销毁前触发，我们可以在这里进行最终的资源释放。在调用这个函数之前，总会先调用 deactivate()。

::: warning 注意
重写的时候必须要调用 super.xxx()。
:::

示例:

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class WidgetLifecyle extends StatefulWidget {
  // 当构建一个新的widget时,这个会立即调用
  // 并且这个方法必须被覆盖
  @override
  _WidgetLifecyleState createState() => _WidgetLifecyleState();
}

class _WidgetLifecyleState extends State<WidgetLifecyle> {
  int _count = 0;

  // 这是创建widget时调用的除构造方法外的第一个方法
  // 通常会做一些初始化工作,比如channel的初始化,监听器的初始化等
  @override
  void initState() {
	print('-----initState-----');
	super.initState();
  }

  // 依赖变化时调用
  // 1: initstate初始化之后会立即调用
  // 2: 如果statefulwidgets依赖于InheritedWidget时, InheritedWidget变化时也会触发
  // InheritedWidget类似vuex, 高效的将数据在Widget树中向下传递和共享
  @override
  void didChangeDependencies() {
	print('------didChangeDependencies-----');
	super.didChangeDependencies();
  }

  // 这个一个必须实现的方法,相当于mounted
  // 他会在didChangeDependencies()之后立即调用
  // 另外当调用setState后也会再次调用该方法
  @override
  Widget build(BuildContext context) {
	print('-----build-----');
	return Scaffold(
	  appBar: AppBar(
		title: Text('Flutter页面生命周期'),
		leading: BackButton(),
	  ),
	  body: Center(
		  child: Column(children: <Widget>[
		RaisedButton(
		  onPressed: () {
			setState(() {
			  _count += 1;
			});
		  },
		  child: Text('点我'),
		),
		Text(_count.toString())
	  ])),
	);
  }

  @override
  void didUpdateWidget(covariant WidgetLifecyle oldWidget) {
	print('------didUpdateWidget------');
	super.didUpdateWidget(oldWidget);
  }

  // 很少使用,在组件被移除时调用
  @override
  void deactivate() {
	print('-----deactivate-----');
	super.deactivate();
  }

  // 组件被销毁时调用
  // 作用: 资源的释放, 监听器的卸载, channel的销毁等
  @override
  void dispose() {
	print('------dispose------');
	super.dispose();
  }
}

```

## App 生命周期

App 生命周期定义了 App 从启动到退出的全过程，其回调机制能够让我们可以根据 App 状态选择合适的时机做恰当的事情。

- resumed：可见的，并能响应用户的输入。
- inactive：处在不活动状态，无法处理用户响应。
- paused：不可见并不能响应用户的输入，但是在后台继续活动中。

**举例:**

initState 中注册监听器，在 didChangeAppLifecycleState 回调方法中打印当前 App 状态，最后在 dispose 中移除监听器。

```dart {37-49}
import 'package:flutter/material.dart';

// 如何获取Flutter应用生命周期
// WidgetsBindingObserver: 是一个Widgets绑定观察器, 通过它我们可以监听应用的生命周期
class AppLiftcycle extends StatefulWidget {
  @override
  _AppLiftcycleState createState() => _AppLiftcycleState();
}

class _AppLiftcycleState extends State<AppLiftcycle>
	with WidgetsBindingObserver {
  @override

  // 初始化state
  void initState() {
	WidgetsBinding.instance.addObserver(this);
	super.initState();
  }

  // 构建视图
  @override
  Widget build(BuildContext context) {
	return Scaffold(
	  appBar: AppBar(
		title: Text('App生命周期'),
		leading: GestureDetector(
		  onTap: () {
			Navigator.pop(context);
		  },
		  child: Icon(Icons.arrow_back),
		),
	  ),
	  body: Center(child: Text('App生命周期')),
	);
  }

  // 当app生命周期发生变化时, 会回调这个方法
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
	super.didChangeAppLifecycleState(state);
	print('state = $state');
	if (state == AppLifecycleState.paused) {
	  print('App进入后台');
	} else if (state == AppLifecycleState.resumed) {
	  print('App进入前台');
	} else if (state == AppLifecycleState.inactive) {
	  print('App处于非活动状态, 比如:来了个电话');
	}
  }

  // 销毁监听器
  @override
  void dispose() {
	WidgetsBinding.instance.removeObserver(this);
	super.dispose();
  }
}
```

## 打开第三方 app

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

## 自定义组件

步骤:

- 继承`StatelessWidget`或者`StatefullWidget`
- 声明构造函数与入参
- 重写 `build` 方法

::: tip 1. 为什么要用 final 修饰 Widget 的成员变量?

`final` 的要求就是 其声明的变量在赋值之后就不再改变，它并不像 `const` 要求等号的右边是编译时常数。
并且`widget` 与它的子类, 成员变量必须是 `final` 类型的
:::

::: tip 2. 如何设置必传参数?
`@required`关键字
:::

::: tip 3. 如何设置参数默认值?
与 javascript 一样, `this.name = 'xiaoming'`;
:::
