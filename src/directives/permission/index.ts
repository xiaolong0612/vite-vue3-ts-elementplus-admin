/*
 * @Description: 权限指令
 * @Author: Amber
 * @Date: 2023-03-15 01:17:47
 * @LastEditors: Amber
 * @LastEditTime: 2023-03-15 01:17:47
 */
import { useUserStore } from '@/stores/user'
import type { Directive } from 'vue'

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const roles = useUserStore().roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role: any) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    }
  }
}
