/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-11 21:25:12
 * @LastEditors: Amber
 */
export interface MyResponseType<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface Params {
  page: number;
  limit: number;
}