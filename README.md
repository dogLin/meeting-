# 会议系统
本项目为公司会议系统的前端。使用Angular5与angular/material UI组件。除此之外还使用了`angular-jwt` `date-fns` `echarts` `element-angular` `ngx-echarts` `ngx-toastr` 模块。

## 模块作用


| 模块 | 用途 
--------- | ----------
 [angular-jwt](https://github.com/auth0/angular-jwt) | 用来做前端token的过期校验与token解析的
 [date-fns](https://github.com/date-fns/date-fns) | 时间格式化与时间比较等
 [echarts]() [ngx-echarts](https://github.com/xieziyu/ngx-echarts) | 图表，实现31段均衡的调音界面
  [element-angular](https://github.com/ElemeFE/element-angular) | 调音界面的单选按钮使用的，其实没必要，可以替换掉使用的组件，并删除该依赖
 [ngx-toastr](https://github.com/scttcper/ngx-toastr) | 信息提示 |

 模块的具体用法查看对应的仓库内的文档

## 目录结构
项目的主要内容都在app目录下，下面列出app目录下文件夹的作用
| 目录 | 作用 |
------- | -----
auth | 用户模块，包含用户登录的页面以及登陆与已登录是的路由守护服务
core | 核心模块， 主要封装了http服务实现通用的错误与成功处理与token和用户服务，以及http请求拦截器，实现每个请求自动带上token
create | 新建会议模块， 对应创建会议页面
devices | 设备模块， 这个模块里的内容最多，对应设备管理页面，同时按照UI图封装了几个组件，包括调音、数字输入、旋转调音组件。需要注意的是旋转调音与31路调音的逻辑
home | 首页模块， 对应页面上的首页
list | 会议列表模块， 对应会议列表页面，包含了会议详情页面
manage | 控制台模块， 对应登录后的整个页面的布局，包含了自己写得目录组件
music | 音乐库模块， 对应音乐库页面
room | 会议是模块， 对应会议室页面，以及该页面内的会议室管理与编辑页面
service | 服务目录，目录包括调用后台的api服务，设备控制、会议管理、弹框、socket以及工具服务
share | 共享模块,主要是一些共享的模块与组件。模块主要是material的模块。组件包括头像、选择用户、删除确认、弹框组件、会议室缩略图、用户列表等。需要注意的是timepicker没写，可以完善，以便其它地方时间选择器的调用

## 可优化
create 与 devices模块是内容比较多的地方，写得也比较乱，后期可以改善。devices的旋钮组件按照num-input组件设计成双向绑定。create中的timepicker抽象以及使用angular的表单，让验证更直观
