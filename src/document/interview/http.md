# 网络&与安全汇总

## 说一下 Http 缓存策略，有什么区别，分别解决了什么问题

公司：滴滴、头条、网易、易车、脉脉、掌门一对一、虎扑、挖财、爱范儿

分类：网络&安全

### 答案&解析

#### 1）浏览器缓存策略

浏览器每次发起请求时，先在本地缓存中查找结果以及缓存标识，根据缓存标识来判断是否使用本地缓存。如果缓存有效，则使用本地缓存；否则，则向服务器发起请求并携带缓存标识。根据是否需向服务器发起HTTP请求，将缓存过程划分为两个部分：强制缓存和协商缓存，强缓优先于协商缓存。

- 强缓存，服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行比较缓存策略。
- 协商缓存，让客户端与服务器之间能实现缓存文件是否更新的验证、提升缓存的复用率，将缓存信息中的Etag和Last-Modified
通过请求发送给服务器，由服务器校验，返回304状态码时，浏览器直接使用缓存。

HTTP缓存都是从第二次请求开始的：

第一次请求资源时，服务器返回资源，并在response header中回传资源的缓存策略；
第二次请求时，浏览器判断这些请求参数，击中强缓存就直接200，否则就把请求参数加到request header头中传给服务器，看是否击中协商缓存，击中则返回304，否则服务器会返回新的资源。这是缓存运作的一个整体流程图：
img

#### 2）强缓存

- 强缓存命中则直接读取浏览器本地的资源，在network中显示的是from memory或者from disk
- 控制强制缓存的字段有：Cache-Control（http1.1）和Expires（http1.0）
- Cache-control是一个相对时间，用以表达自上次请求正确的资源之后的多少秒的时间段内缓存有效。
- Expires是一个绝对时间。用以表达在这个时间点之前发起请求可以直接从浏览器中读取数据，而无需发起请求
- Cache-Control的优先级比Expires的优先级高。前者的出现是为了解决Expires在浏览器时间被手动更改导致缓存判断错误的问题。如果同时存在则使用Cache-control。

#### 3）强缓存-expires

- 该字段是服务器响应消息头字段，告诉浏览器在过期时间之前可以直接从浏览器缓存中存取数据。
- Expires 是 HTTP 1.0 的字段，表示缓存到期时间，是一个绝对的时间 (当前时间+缓存时间)。在响应消息头中，设置这个字段之后，就可以告诉浏览器，在未过期之前不需要再次请求。
- 由于是绝对时间，用户可能会将客户端本地的时间进行修改，而导致浏览器判断缓存失效，重新请求该资源。此外，即使不考虑修改，时差或者误差等因素也可能造成客户端与服务端的时间不一致，致使缓存失效。

- 优势特点
  - 1、HTTP 1.0 产物，可以在HTTP 1.0和1.1中使用，简单易用。
  - 2、以时刻标识失效时间。
- 劣势问题
  - 1、时间是由服务器发送的(UTC)，如果服务器时间和客户端时间存在不一致，可能会出现问题。
  - 2、存在版本问题，到期之前的修改客户端是不可知的。

#### 4）强缓存-cache-control

- 已知Expires的缺点之后，在HTTP/1.1中，增加了一个字段Cache-control，该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求。

- 这两者的区别就是前者是绝对时间，而后者是相对时间。下面列举一些 Cache-control 字段常用的值：(完整的列表可以查看MDN)

  - max-age：即最大有效时间。
  - must-revalidate：如果超过了 max-age 的时间，浏览器必须向服务器发送请求，验证资源是否还有效。
  - no-cache：不使用强缓存，需要与服务器验证缓存是否新鲜。
  - no-store: 真正意义上的“不要缓存”。所有内容都不走缓存，包括强制和对比。
  - public：所有的内容都可以被缓存 (包括客户端和代理服务器， 如 CDN)
  - private：所有的内容只有客户端才可以缓存，代理服务器不能缓存。默认值。

- Cache-control 的优先级高于 Expires，为了兼容 HTTP/1.0 和 HTTP/1.1，实际项目中两个字段都可以设置。

- 该字段可以在请求头或者响应头设置，可组合使用多种指令：

  - 可缓存性：
    - public：浏览器和缓存服务器都可以缓存页面信息
    - private：default，代理服务器不可缓存，只能被单个用户缓存
    - no-cache：浏览器器和服务器都不应该缓存页面信息，但仍可缓存，只是在缓存前需要向服务器确认资源是否被更改。可配合private，
    过期时间设置为过去时间。
    - only-if-cache：客户端只接受已缓存的响应
  - 到期
    - max-age=：缓存存储的最大周期，超过这个周期被认为过期。
    - s-maxage=：设置共享缓存，比如can。会覆盖max-age和expires。
    - max-stale[=]：客户端愿意接收一个已经过期的资源
    - min-fresh=：客户端希望在指定的时间内获取最新的响应
    - stale-while-revalidate=：客户端愿意接收陈旧的响应，并且在后台一部检查新的响应。时间代表客户端愿意接收陈旧响应
      的时间长度。
    - stale-if-error=：如新的检测失败，客户端则愿意接收陈旧的响应，时间代表等待时间。
  - 重新验证和重新加载
    - must-revalidate：如页面过期，则去服务器进行获取。
    - proxy-revalidate：用于共享缓存。
    - immutable：响应正文不随时间改变。
  - 其他
    - no-store：绝对禁止缓存
    - no-transform：不得对资源进行转换和转变。例如，不得对图像格式进行转换。
  - 优势特点
    - 1、HTTP 1.1 产物，以时间间隔标识失效时间，解决了Expires服务器和客户端相对时间的问题。
    - 2、比Expires多了很多选项设置。
  - 劣势问题
    - 1、存在版本问题，到期之前的修改客户端是不可知的。

#### 5）协商缓存

- 协商缓存的状态码由服务器决策返回200或者304
- 当浏览器的强缓存失效的时候或者请求头中设置了不走强缓存，并且在请求头中设置了If-Modified-Since 或者 If-None-Match 的时候，会将这两个属性值到服务端去验证是否命中协商缓存，如果命中了协商缓存，会返回 304 状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或者 ETag 属性。
- 对比缓存在请求数上和没有缓存是一致的，但如果是 304 的话，返回的仅仅是一个状态码而已，并没有实际的文件内容，因此 在响应体体积上的节省是它的优化点。
- 协商缓存有 2 组字段(不是两个)，控制协商缓存的字段有：Last-Modified/If-Modified-since（http1.0）和Etag/If-None-match（http1.1）
- Last-Modified/If-Modified-since表示的是服务器的资源最后一次修改的时间；Etag/If-None-match表示的是服务器资源的唯一标
识，只要资源变化，Etag就会重新生成。
- Etag/If-None-match的优先级比Last-Modified/If-Modified-since高。

#### 6）协商缓存-协商缓存-Last-Modified/If-Modified-since

- 1.服务器通过 Last-Modified 字段告知客户端，资源最后一次被修改的时间，例如 Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT
- 2.浏览器将这个值和内容一起记录在缓存数据库中。
- 3.下一次请求相同资源时时，浏览器从自己的缓存中找出“不确定是否过期的”缓存。因此在请求头中将上次的 Last-Modified 的值写入到请求头的 If-Modified-Since 字段
- 4.服务器会将 If-Modified-Since 的值与 Last-Modified 字段进行对比。如果相等，则表示未修改，响应 304；反之，则表示修改了，响应 200 状态码，并返回数据。
- 优势特点
  - 1、不存在版本问题，每次请求都会去服务器进行校验。服务器对比最后修改时间如果相同则返回304，不同返回200以及资源内容。
- 劣势问题
  - 2、只要资源修改，无论内容是否发生实质性的变化，都会将该资源返回客户端。例如周期性重写，这种情况下该资源包含的数据实际上一样的。
  - 3、以时刻作为标识，无法识别一秒内进行多次修改的情况。 如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是秒。
  - 4、某些服务器不能精确的得到文件的最后修改时间。
  - 5、如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可能没有变化，所以起不到缓存的作用。

#### 7）协商缓存-Etag/If-None-match

- 为了解决上述问题，出现了一组新的字段 Etag 和 If-None-Match
- Etag 存储的是文件的特殊标识(一般都是 hash 生成的)，服务器存储着文件的 Etag 字段。之后的流程和 Last-Modified 一致，只是 Last-Modified 字段和它所表示的更新时间改变成了 Etag 字段和它所表示的文件 hash，把 If-Modified-Since 变成了 If-None-Match。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。
- 浏览器在发起请求时，服务器返回在Response header中返回请求资源的唯一标识。在下一次请求时，会将上一次返回的Etag值赋值给If-No-Matched并添加在Request Header中。服务器将浏览器传来的if-no-matched跟自己的本地的资源的ETag做对比，如果匹配，则返回304通知浏览器读取本地缓存，否则返回200和更新后的资源。
- Etag 的优先级高于 Last-Modified。
- 优势特点
  - 1、可以更加精确的判断资源是否被修改，可以识别一秒内多次修改的情况。
  - 2、不存在版本问题，每次请求都回去服务器进行校验。
- 劣势问题
  - 1、计算ETag值需要性能损耗。
  - 2、分布式服务器存储的情况下，计算ETag的算法如果不一样，会导致浏览器从一台服务器上获得页面内容后到另外一台服务器上进行验证时现ETag不匹配的情况。

## 前端安全、中间人攻击

公司：滴滴、边锋

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/16)

## V8 机制讲解

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/232)

## CDN 是什么？描述下 CDN 原理？为什么要用 CDN?

公司：头条、滴滴、网易

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/218)

## PWA 是什么？对 PWA 有什么了解

公司：头条、喜马拉雅

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/217)

## 说一下浏览器解析 Html 文件的过程

公司：伴鱼

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/193)

## 从输入 URL 到页面加载全过程

公司：头条、边锋、菜鸟网络、爱范儿、心娱

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/186)

## DNS 解析的具体过程

公司：边锋、寺库

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/184)

## 常见的 http 请求头都有哪些，以及它们的作用

公司：阿里、边锋、喜马拉雅、玄武科技

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/183)

## encoding 头都有哪些编码方式

公司：边锋

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/182)

## utf-8 和 asc 码有什么区别

公司：边锋

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/181)

## tcp 和 udp 有什么区别？tcp 怎样确保数据正确性？tcp 头包含什么？tcp 属于那一层？

公司：头条、边锋

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/180)

## 传输层和网络层分别负责什么，端口在什么层标记

公司：边锋

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/179)

## 介绍下 Https，和 http 的区别是什么？https 为什么比 http 安全？如何进行配置？

公司：边锋、老虎、脉脉、掌门一对一、喜马拉雅、寺库、腾讯应用宝、快手

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/178)

## 说一下加密握手的过程

公司：边锋、老虎

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/177)

## 对称加密和非对称加密的区别和用处

公司：边锋

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/176)

## 浏览器都有哪些进程，渲染进程中都有什么线程

公司：老虎

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/167)

## 说说浏览器渲染流程，分层之后在什么时候合成，什么是重排、重绘，怎样避免

公司：老虎

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/166)

## 什么是同源策略？什么是跨域？都有哪些方式会造成跨域？解决跨域都有什么手段？

公司：阿里、滴滴、老虎、完美世界、沪江、喜马拉雅、兑吧、寺库、玄武科技

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/165)

## 什么是 CORS，CORS 需要前端配置还是后端配置？

公司：酷狗

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/164)

## Http1 和 Http2 有什么区别，和 http1.1 相比，http2 都有什么特性

公司：完美世界、网易、脉脉、高思教育

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/361)

## 说一下 etag 和 lastmodify 的区别

公司：网易

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/353)

## 强缓存都有哪些方法来控制

公司：网易、易车

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/352)

## 协商缓存都有哪些参数

公司：网易、易车

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/351)

## 请求是异步的为什么会造成阻塞

公司：易车

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/341)

## CDN 有哪些优化静态资源加载速度的机制

公司：头条

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/326)

## 说一下 Nginx 的缓存策略，强缓存与弱缓存的区别，二者的使用场景

公司：高德

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/304)

## 请描述 CSRF、XSS 的基本概念、攻击原理和防御措施？

公司：自如、挖财、腾讯应用宝、沪江、喜马拉雅

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/274)

## 请描述提升页面性能的方式有哪些，如何进行首页加载优化

公司：自如

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/273)

## Http 报文的请求会有几个部分？请写出 HTTP 报文的组成部分

公司：自如、滴滴

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/)

## 301，302，304 的区别

公司：自如

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/270)

## 说一下 https 获取加密秘钥的过程

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/414)

## localstorage、sessionStorage、indexDB 和 cookie 的区别

公司：掌门一对一、滴滴、兑吧、寺库

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/409)

## 点击一个按钮，浏览器会做些什么

公司：虎扑

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/402)

## TCP 三次握手

公司：菜鸟网络、头条

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/394)

## LocalStorage 加密原理

公司：腾讯应用宝

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/385)

## 说一下常见的状态码

公司：腾讯应用宝、喜马拉雅

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/383)

## 304 页面的原理

公司：腾讯应用宝

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/381)

## 客户端缓存有几种方式？浏览器出现 from disk、from memory 的策略是啥

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/573)

## 什么是 http？什么是 http2？说下 http 与 http2 的工作流程

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/572)

## 客户端如何发送 http 请求

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/571)

## http1.1 时如何复用 tcp 连接

公司：网易

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/)

## 介绍浏览器事件流向

公司：网易

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/527)

## cookie 放哪里，cookie 能做的事情和存在的价值

公司：滴滴

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/514)

## cookie 和 token 都存放在 header 里面，为什么只劫持前者

公司：滴滴

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/513)

## cookie 的引用为了解决什么问题

公司：寺库

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/478)

## 403、301、302 是什么

公司：喜马拉雅

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/438)

## HTTPS 怎么建立安全通道，Https 的加密过程

公司：喜马拉雅、寺库

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/437)

## 介绍下数字签名的原理

公司：喜马拉雅

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/435)

## 介绍一下网络的五层模型

公司：寺库

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/781)

## 介绍 SSL 与 TLS

公司：寺库

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/780)

## 服务端怎么做统一的状态处理

公司：宝宝树

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/774)

## 以下说法中对协议描述不正确的是？(单选题)

```js
A.HTTP 协议是在 TCP/IP 协议之上的应用层协议
B.HTTP 1.1 缺省支持 keep-alive
C.WebSocket 是由 Socket 发展而来的新规范
D.WebSocket 可以建立持久连接
```

公司：会小二

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/692)

## 以下哪些是 HTTP 请求中浏览器缓存机制会用到的协议头？(多选题)

```js
A.Last-Modified
B.Etag
C.Referer
D.Authorization
```

公司：会小二

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/691)

## 请写下你对协商缓存和强缓存的理解？

公司：会小二、58

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/680)

## 给出页面的加载顺序

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/677)

## 详细描述一个 http 请求从发起请求到收到响应的全部过程(越细越好)

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/669)

## 简述静态链接和动态链接的区别，并举例说明

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/668)

## 缓存有哪些？前端缓存有哪些？怎么用？如何和后台配合

公司：高思教育

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/656)

## Dom tree 和 cssdom 是如何合并成 render tree 的

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/652)

## CDN 分布式部署，如何处理用户请求最近的资源？

公司：快手

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/632)

## 说一下缓存有哪几种，具体都是怎么实现和比较的，缓存优先级，相互之间的对比

公司：快手

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/631)

## 说下你对浏览器缓存理解

公司：头条

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/629)

## Http 连接是如何复用的

公司：酷狗

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/623)

## 301、302 的 https 被挟持怎么办？

公司：网易

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/857)

## 介绍 Http2 特性，Http2 怎么确保文件同时传输不会报错

公司：网易

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/856)

## HTTP2.0的多路复⽤和HTTP1.X中的⻓连接复⽤有什么区别？

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/788)

## HTTP2.0多路复⽤有多好？

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/787)

## http请求由什么组成？

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/868)

## 列举并解释一下 http 的所有请求方法

公司：爱范儿、乘法云

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/851)

## 列举出在浏览器中，页面加载过程中发出了哪些事件？并画出这些事件的执行顺序？

公司：玄武科技

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/842)

## 请列出 HTTP/1.1 协议 Response 状态码：20x、30x、40x、50x 等各区间的含义，并说明 Action 在 Restful API 中分别使用哪些 Http 副词(action)表现出 CRUD?

公司：玄武科技

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/835)

## catch-control 有哪些设定值

公司：58

分类：网络&安全

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/816)
