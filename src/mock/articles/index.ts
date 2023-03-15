/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 02:10:52
 * @LastEditTime: 2023-03-15 02:42:39
 * @LastEditors: Amber
 */
import type { responseConfig } from "@/types/mock";
import { paramObj } from "../util";
import { articles } from "./db";
const articlesApi = [
  {
    url: '/api/articles/getArticles',
    type: 'post',
    response: (config: responseConfig) => {
      const { page, limit } = paramObj(config.body)
      return {
        code: 200,
        message: '数据获取成功',
        data: articles(page, limit)
      }
    }
  }
]


export default articlesApi