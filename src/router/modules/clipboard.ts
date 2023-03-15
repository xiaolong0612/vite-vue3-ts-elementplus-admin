/*
 * @Description: 粘贴板
 * @Author: Amber
 * @Date: 2023-03-15 01:28:50
 * @LastEditors: Amber
 * @LastEditTime: 2023-03-15 03:17:52
 */
import basicLayout from "@/layouts/BasicLayout/index.vue"

// clipboardRouter
export default {
  path: '/clipboard',
  component: basicLayout,
  meta: {
    title: 'Clipboard',
    icon: 'DocumentCopy'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/clipboard/index.vue'),
      name: 'Clipboard',
      meta: { title: 'Clipboard', noCache: true }
    }
  ]
}