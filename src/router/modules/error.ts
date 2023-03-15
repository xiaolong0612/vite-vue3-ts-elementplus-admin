/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 01:25:49
 * @LastEditTime: 2023-03-15 01:29:20
 * @LastEditors: Amber
 */
// 基础页面布局，包含了头部导航，侧边栏等。
import basicLayout from "@/layouts/BasicLayout/index.vue"

// errorRouter
export default {
  path: '/error',
  component: basicLayout,
  meta: {
    title: 'Error Pages',
    icon: 'CloseBold'
  },
  children: [
    {
      path: '401',
      component: () => import('@/views/error-page/401.vue'),
      name: 'Page401',
      meta: { title: '401', noCache: true }
    },
    {
      path: '404',
      component: () => import('@/views/error-page/404.vue'),
      name: 'Page404',
      meta: { title: '404', noCache: true }
    }
  ]
}