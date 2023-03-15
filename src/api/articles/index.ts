/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-12 21:03:50
 * @LastEditTime: 2023-03-15 02:39:24
 * @LastEditors: Amber
 */
import request from '@/utils/request'
import type { Params } from "@/types/axios"
import type { ArticleDataModel } from "./types"

export const getArticles = (data: Params) => {
  return request<ArticleDataModel>({
    url: '/api/articles/getArticles',
    method: 'post',
    data
  })
}