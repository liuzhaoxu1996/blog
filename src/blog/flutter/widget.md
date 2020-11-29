# StatelessWidget 和 StatefulWidget

## StatelessWidget

- Container
- Text
- Icon
- CloseButton
- BackButton
- Chip
- Divider
- Card
- AlertDialog

## StatefulWidget

- MaterialApp: 根节点
- Scaffold: flutter 帮我们封装的带有 appbar, 导航栏, 侧边栏的组件
- AppBar
- BottomNavigationBar: 底部导航栏
- RefreshIndicator
- Image
- TextField
- PageView

::: tip 对比

**StatelessWidget VS StatefulWidget**

简单总结:

1. 当我们的 Widget 是 StatelessWidget，那么当他的内容被创建出来之后，就不能再改变了。相反 StatefulWidget 就可以。

2. StatelessWidget 里是不能使用 setState, 而 StatefulWidget 是可以的

:::
