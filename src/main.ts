/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-12 12:05:52
 * @LastEditors: Amber
 */
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import { loadAllPlugins } from './plugins'

import './permission'

import '@/styles/_tailwind.css'
import '@/styles/_index.scss'

const app = createApp(App)

// 加载所有插件  包含mock
loadAllPlugins(app)

app.use(pinia)
app.use(router)

app.mount('#app')
