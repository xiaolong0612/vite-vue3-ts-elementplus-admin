/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-13 19:43:46
 * @LastEditTime: 2023-03-15 02:10:17
 * @LastEditors: Amber
 */

export interface Articles {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}