/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-12 21:10:58
 * @LastEditors: Amber
 */
export interface RootResponseType<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface Params {
  page: number;
  limit: number;
}