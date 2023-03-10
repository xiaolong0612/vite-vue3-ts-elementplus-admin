import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { mockRequest } from './mock'
import './permission'

// import '@/styles/tailwind.css'
import '@/styles/index.scss'

/**
 * 测试环境下 引入自定义的mockRequest
 * 因为mockRequest不是默认导出的：export default{}
 * 所以引入时需要加大括号，这种可以引入多个
 */
// if (import.meta.env.MODE === 'development') {
  mockRequest()
// }

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)

app.mount('#app')
