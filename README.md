> vite-vue3-ts-elementplus-admin 是一个管理端模板解决方案，它是基于vite、vue3、ts、element-plus，项目都是以setup语法糖风格编写。

## 简介

项目的基础版本出自于源于花裤衩大佬的 vue-element-admin。

版本：

vue2+js版本：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

优点：

vite
- 极速的服务启动，使用原生 ESM 文件，无需打包。
- 轻量快速的热重载，无论应用程序大小如何，都始终极快的模块热重载（HMR）
- 丰富的功能，对 TypeScript、JSX、CSS 等支持开箱即用。
- 真香

vue3
- 性能比Vue2快1.2~2倍。性能的提升主要是通过响应式系统的提升(vue3使用proxy对象重写响应式)以及编译优化（优化编译和重写虚拟dom、优化diff算法）来完成

- Vue3 按需编译，体积比Vue2更小。相比Vue2，Vue3整体体积变小了，除了移出一些不常用的API，再重要的是Tree shanking任何一个函数，如ref、reactive、computed等，仅仅在用到的时候才打包，没用到的模块都被去掉，打包的整体体积变小

- 支持组合API(Composition Api)。vue2使用Options Api(选项api)，而vue3使用Composition Api(组合api)

- 更好的支持TS.完全良好的支持了TypeScript。类型校验成为了Vue3进行大型项目开发的质量保障，同时这也是面向了前端的未来趋势

- 暴露了自定义渲染的API

- 提供了更先进的组件。Frament（片段）组件、Teleport（传送）组件、suspense（暂停）组件


项目目的：

- 学习vue3+ts
- setup语法糖

在线demo演示地址：

## 相关项目


### 功能

```text
- 用户管理
	- 登录
	- 注销
	
- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布 (对应dev,build)
  - dev
  - prod
  
- 全局功能
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - mock 数据

- 错误页面
  - 404
  
-更多功能还在开发中，敬请期待
```



### 目录结构

```
admin
├─ .env.development			# 开发环境
├─ .env.production			# 开发本地本地
├─ .env.staging			# 测试环境
├─ README.md
├─ dist			# 打包dist
├─ mock			# mock服务
├─ public			# 静态资源
├─ src			# 源码
│  ├─ api			# 接口请求
│  ├─ assets			# 打包的资源
│  ├─ components			# 公共组件
│  ├─ layouts			# 全局Layouts
│  ├─ plugins			# 插件
│  ├─ router			# 路由
│  ├─ stores			# 全局store管理
│  ├─ styles			# 全局样式
│  ├─ types			# ts 声明
│  ├─ utils			# 全局公共方法
│ └─ views			# 所有业务页面
├─ tailwind.config.js     	  # tailwind 配置
├─ tsconfig.json     			 # ts 编译配置
└─ vite.config.js    		      # vite 配置

```

## HighLight

项目均已最新技术实现，Vue3配套升级全家桶和涉及的插件组件等

项目采用技术:

- vite
- vue3 + setup语法糖
- pinia
- typescript
- sass
- element-plus
## 开发

```bash
# 克隆项目
git clone https://github.com/xiaolong0612/vite-vue3-ts-elementplus-admin.git

# 进入项目目录
cd vite-vue3-ts-elementplus-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:5174

## 发布

```bash
# 构建生产环境---含语法检查
npm run build

# 构建生产环境
npm run build-only:prod

# 构建测试环境
npm run build-only:stage
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 代码格式检查
npm run lint
```


## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE10, IE11, Edge                                             | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

## 讨论交流

  <p align="left">
  <a  target="_blank">
    <img width="180" src="" alt="wechat">
  </a>
</p>

## License

[MIT](https://github.com/xiaolong0612/vite-vue3-ts-elementplus-admin/LICENSE)

Copyright (c) 2023-present xiaolong0612
