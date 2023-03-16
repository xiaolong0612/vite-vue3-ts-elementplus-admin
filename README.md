English | [简体中文](./README.zh-CN.md)

> vite-vue3-ts-elementplus-admin is a management side template solution based on vite, vue3, ts, and element-plus. The project is written in the style of setup syntax sugar.

## Introduction

The base version of the project originates from PanJiaChen vue-element-admin。

Version：

vue2+js version：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

Merit：

vite
  - Fast service startup, using native ESM files, without packaging.
  - Lightweight and fast thermal overload, regardless of application size, is the ultimate fast module thermal overload (HMR)
  - Rich functions, supporting out-of-the-box use of TypeScript, JSX, CSS, etc.
  - True fragrance

vue3
  - The performance is 1.2~2 times faster than Vue2. The performance improvement is mainly achieved through the improvement of responsive system (vue3 uses proxy object to rewrite responsive) and compilation optimization (optimize compilation and rewrite virtual dom, optimize diff algorithm)
  - Vue3 is compiled on demand, and its volume is smaller than Vue2. Compared with Vue2, the overall volume of Vue3 has become smaller. In addition to removing some unused APIs, it is also important that any function of Tree shading, such as ref, reactive, computed, etc., is only packaged when it is used. Unused modules have been removed, and the overall volume of packaging has become smaller
  - Support composition API. Vue2 uses Options Api, while vue3 uses Composition Api
  - Better support for TS. Completely good support for TypeScript. Type verification has become the quality assurance of Vue3's large-scale project development, and it is also the future trend of the front-end
  - Exposed APIs for custom rendering
  - More advanced components are provided. Fragment component, Teleport component, suspend component


Project purpose：

- Study vue3+ts
- setup语法糖

Online demo address：

## Related items


### Ribbon

```text
- User Management
	- Login
	- Logout
	
- Permission Authentication
  - Page permission
  - Directive permission
  - Permission configuration page
  - Two-step login

- Multi-environment build
  - dev
  - prod

- Global Features
  - Dynamic sidebar (supports multi-level routing)
  - Dynamic breadcrumb
  - Tags-view (Tab page Support right-click operation)
  - Mock data
  - Responsive Sidebar

- Components
  - JSON Editor
  - Configured form
  - CountTo

- Excel
  - Export zip

- Error Page
  - 401
  - 404

- Advanced Example
  - Dashboard
  - Error Log
  - Clipboard
  - Weather View
  - Export PDF
  - Theme (dark or light)
  - i18n

- More functions are still under development, please look forward to
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

The project has been implemented with the latest technology, and Vue3 has upgraded the whole family bucket and the plug-in components involved

Project technology:

- vite
- vue3 + setup语法糖
- pinia
- typescript
- sass
- element-plus

## Getting started

```bash
# clone the project
git clone https://github.com/xiaolong0612/vite-vue3-ts-elementplus-admin.git

# enter the project directory
cd vite-vue3-ts-elementplus-admin

# install dependency
npm install

# It is recommended that you do not directly use cnpm to install dependencies. There will be various weird bugs. You can solve the problem of slow downloading speed of npm by following operations
npm install --registry=https://registry.npm.taobao.org

# develop
npm run dev
```

This will automatically open http://localhost:5174

## Build

```bash
# build for production environment---Including code format check
npm run build

# build for production environment
npm run build-only:prod

# build for test environment
npm run build-only:stage
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# code format check
npm run lint
```


## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE10, IE11, Edge                                             | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

## Discussion and exchange ( WeChat )

  <p align="left">
  <a  target="_blank">
    <img width="180" src="https://github.com/xiaolong0612/vite-vue3-ts-elementplus-admin/blob/main/WeChat.jpg" alt="wechat">
  </a>
</p>

## License

[MIT](https://github.com/xiaolong0612/vite-vue3-ts-elementplus-admin/LICENSE)

Copyright (c) 2023-present xiaolong0612
