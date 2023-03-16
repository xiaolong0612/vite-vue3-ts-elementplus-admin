/*
 * @Description: element plus
 * @Author: Amber
 * @Date: 2023-03-11 22:27:56
 * @LastEditTime: 2023-03-16 20:41:26
 * @LastEditors: Amber
 */
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { getStoreItem } from "@/utils"
import { messages } from "@/locales"
import settings from "@/setting"

const locale:string = getStoreItem(localStorage.APP, 'lang') as string || settings.lang

export default function loadComponent(app: any) {
  app.use(ElementPlus, {
    locale: (messages as any)[locale],
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}