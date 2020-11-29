# 如何创建和使用 Flutter 路由与导航?

示例:

1.通过别名的方式, 定义路由

```dart
MaterialApp(
    ...
    //注册路由
    routes:{
        "second_page":(context)=>SecondPage(),
    },
);
//使用名字打开页面Navigator.pushNamed(context,"second_page");
Navigator.pushNamed(context,"second_page");
```

2. 直接通过 MaterialPageRoute 方法, 把页面注入

```dart
class FirstScreen extends StatelessWidget {
    @override Widget build(BuildContext context) {
        return RaisedButton(
            //打开页面
            onPressed: ()=> Navigator.push(context, MaterialPageRoute(builder: (context) => SecondScreen()));
        );
    }
}
```
