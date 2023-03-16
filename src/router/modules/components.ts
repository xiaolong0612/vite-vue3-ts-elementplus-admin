/*
 * @Description: 小组件
 * @Author: Amber
 * @Date: 2023-03-13 22:18:53
 * @LastEditTime: 2023-03-16 15:23:13
 * @LastEditors: Amber
 */
// 基础页面布局，包含了头部导航，侧边栏等。
import basicLayout from "@/layouts/BasicLayout/index.vue"

// componentsRouter
export default {
  path: '/components',
  component: basicLayout,
  name: 'ComponentDemo',
  meta: {
    title: 'Components',
    icon: 'Menu'
  },
  children: [
    {
      path: 'json-editor',
      component: () => import('@/views/components-demo/json-editor.vue'),
      name: 'JSONEditor',
      meta: { title: 'JSON Editor' }
    },
    {
      path: 'schema-form',
      component: () => import('@/views/components-demo/schema-form.vue'),
      name: 'SchemaForm',
      meta: { title: 'Schema Form' }
    },
    {
      path: 'count-to',
      component: () => import('@/views/components-demo/count-to.vue'),
      name: 'CountTo',
      meta: { title: 'Count To' }
    }
  ]
}