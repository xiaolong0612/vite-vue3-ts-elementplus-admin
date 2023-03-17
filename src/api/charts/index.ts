/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-17 13:30:11
 * @LastEditTime: 2023-03-17 13:34:54
 * @LastEditors: Amber
 */
import request from '@/utils/request'

export const lifeExpectancyTable = () => {
  return request({
    url: '/chartsApi/examples/data/asset/data/life-expectancy-table.json',
    method: 'get'
  })
}