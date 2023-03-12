/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-11 22:27:56
 * @LastEditTime: 2023-03-11 22:45:01
 * @LastEditors: Amber
 */
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default function loadComponent(app: any) {
  app.use(ElementPlus, {
    locale: zhCn,
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}