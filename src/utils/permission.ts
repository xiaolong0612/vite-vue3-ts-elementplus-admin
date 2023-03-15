/*
 * @Description:
 * @Author: Amber
 * @Date: 2021-01-12 10:20:08
 * @LastEditors: Amber
 * @LastEditTime: 2023-03-11 19:30:34
 */
import { useUserStore } from '@/stores/user'

export const checkPermission = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const roles = useUserStore().roles
    const permissionRoles = value
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    return false
  }
}
