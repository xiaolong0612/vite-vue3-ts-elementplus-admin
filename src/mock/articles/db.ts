/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 02:11:07
 * @LastEditTime: 2023-03-15 02:18:01
 * @LastEditors: Amber
 */
import type { ArticleModel } from '@/api/articles/types'
import Mock from 'mockjs'

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

export const articles = (page: number, limit: number) => {
  const data = {
    total: Mock.mock('@integer(10, 20)'),
    list: <Array<ArticleModel>>[]
  }
  for(let i = 0; i < limit; i++){
    data.list.push(Mock.mock({
      id: '@increment',
      timestamp: +Mock.Random.date('T'),
      author: '@first',
      reviewer: '@first',
      title: '@title(5, 10)',
      content_short: 'mock data',
      content: baseContent,
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft'],
      display_time: '@datetime',
      comment_disabled: true,
      pageviews: '@integer(300, 5000)',
      image_uri,
      platforms: ['a-platform']
    }))
  }
  
  return data
}