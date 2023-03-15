/*
 * @Description: zip
 * @Author: Amber
 * @Date: 2023-03-13 22:18:53
 * @LastEditTime: 2023-03-15 02:37:33
 * @LastEditors: Amber
 */
// 基础页面布局，包含了头部导航，侧边栏等。
import basicLayout from "@/layouts/BasicLayout/index.vue"

// zipsRouter
export default {
  path: '/zip',
  component: basicLayout,
  alwaysShow: true,
  meta: {
    title: 'Zip',
    icon: 'Download'
  },
  children: [
    {
      path: 'download',
      component: () => import('@/views/zip/index.vue'),
      name: 'ExportZip',
      meta: { title: 'Export Zip' }
    }
  ]
}