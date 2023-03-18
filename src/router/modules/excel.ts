/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-18 02:51:17
 * @LastEditTime: 2023-03-18 17:20:55
 * @LastEditors: Amber
 */
// 基础页面布局，包含了头部导航，侧边栏等。
import basicLayout from "@/layouts/BasicLayout/index.vue"

// errorRouter
export default {
  path: '/excel',
  component: basicLayout,
  meta: {
    title: 'Excel',
    icon: 'FolderOpened'
  },
  children: [
    {
      path: 'export-excel',
      component: () => import('@/views/excel/export-excel.vue'),
      name: 'ExportExcel',
      meta: { title: 'Export Excel' }
    },
    {
      path: 'export-selected-excel',
      component: () => import('@/views/excel/select-excel.vue'),
      name: 'SelectExcel',
      meta: { title: 'Export Selected' }
    },
    {
      path: 'export-merge-header',
      component: () => import('@/views/excel/merge-header.vue'),
      name: 'MergeHeader',
      meta: { title: 'Merge Header' }
    },
    {
      path: 'upload-excel',
      component: () => import('@/views/excel/upload-excel.vue'),
      name: 'UploadExcel',
      meta: { title: 'Upload Excel' }
    }
  ]
}