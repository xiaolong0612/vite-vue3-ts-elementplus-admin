import type { User } from '@/types'
import request from '@/utils/request'
type user = {
  username: string
}
export const userApi = (data: user) => {
  console.log(data)
  return request<User>({
    url: '/test',
    method: 'post',
    data: data
  })
}