/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 01:16:43
 * @LastEditTime: 2023-03-15 01:58:24
 * @LastEditors: Amber
 */
import * as directives from '@/directives/list'
import type { createApp, Directive } from 'vue'

export function initDirectives(app: ReturnType<typeof createApp>) {
  Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string ]: Directive })[key])
  })
}