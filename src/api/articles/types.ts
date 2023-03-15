/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 02:07:18
 * @LastEditTime: 2023-03-15 02:31:13
 * @LastEditors: Amber
 */
export interface ArticleModel {
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

export interface ArticleDataModel {
  list: Array<ArticleModel>,
  total: number
}