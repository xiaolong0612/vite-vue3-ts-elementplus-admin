/*
 * @Description: 加载插件文件
 * @Author: Amber
 * @Date: 2023-03-12 12:50:25
 * @LastEditors: Amber
 * @LastEditTime: 2023-03-15 01:48:14
 */
import type { createApp } from 'vue'

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = import.meta.glob('./*.ts')
  Object.keys(files).map(async (key)=>{
    files[key]().then((rs:any) => {
      rs.default(app)
    })
  })
}
