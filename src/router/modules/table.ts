/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-17 21:53:34
 * @LastEditTime: 2023-03-18 02:27:27
 * @LastEditors: Amber
 */
import basicLayout from "@/layouts/BasicLayout/index.vue"

// clipboardRouter
export default {
  path: '/table',
  component: basicLayout,
  meta: {
    title: 'Table',
    icon: 'Grid'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index.vue'),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table.vue'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    }
  ]
}