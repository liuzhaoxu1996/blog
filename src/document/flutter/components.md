# 常用组件

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
    title: 'title',
    theme: ThemeData(
        primarySwatch: Colors.blue,
    )
    home: scaffold(
        floatingActionButton: FloatingActionButton(
            onPress: null,
            child: Text('点我'),
        )
    )
)
```

## PageView 轮播图

```dart
PageView(
    children: <Widget>[
        _item('Page1', Colors.deepPurple),
        _item('Page1', Colors.green),
        _item('Page1', Colors.red),
    ]
)
```

## 裁切

```dart
PhysicalModel(color: Colors.transparent,
    borderRadius: BorderRadius.circular(6),
    clipBehavior: Clip.antiAlias, // 抗锯齿
    child: xxx
)
```

## 宽度撑满

```dart
FrationallySizedBox(
    widthFactor: 1,
    child: Container(
        decoration: BoxDecoration(color: Color.red),
        child: Text('宽度盛满')
    ),
)
```

## 从左向右自动换行

```dart
Wrap(
    spacing: 8,
    runSpacing: 6,
    children: <Widget>[
    ]
)
```

## 填充

上下填充: 利用 Column 和 Expanded

<img src="https://p1.ssl.qhimg.com/t01634a974566c35422.png" width=200/>

```dart
Column(
    children: <Widget>[
        Text('列表'),
        Expanded(
            child: Container(
                decoration: BoxDecoration(color: Colors.red)
                child: Text('拉伸填满高度'),
            )
        )
    ]
)
```

## 监听手势

```dart
//红色container坐标
double _top = 0.0;
double _left = 0.0;
Stack(
    //使用Stack组件去叠加视图，便于直接控制视图坐标
    children: <Widget>[
        Positioned(
            top: _top,
            left: _left,
            child: GestureDetector(
                //手势识别
                child: Container(color: Colors.red,width: 50,height: 50),
                //红色子视图
                onTap: ()=>print("Tap"),
                //点击回调
                onDoubleTap: ()=>print("Double Tap"),
                //双击回调
                onLongPress: ()=>print("Long Press"),
                //长按回调
                onPanUpdate: (e) {
                    //拖动回调
                    setState(() {
                        //更新位置
                        _left += e.delta.dx; _top += e.delta.dy;
                    });
                },
            ),
        )
    ],
);
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
