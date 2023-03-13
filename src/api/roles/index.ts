/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-12 21:03:50
 * @LastEditTime: 2023-03-13 19:33:26
 * @LastEditors: Amber
 */
// import type {  } from './types'
import type { RootResponseType } from "@/types/axios"
import request from '@/utils/request'

export const getRoutes = () => {
  return request<RootResponseType>({
    url: '/api/roles/getRoutes',
    method: 'get'
  })
}

export const getRoles = () => {
  return request<RootResponseType>({
    url: '/api/roles/getRoles',
    method: 'get',
  })
}

export const createRole = (data: any) => {
  return request<RootResponseType>({
    url: '/api/roles/getRoles',
    method: 'post',
    data
  })
}

export const delRole = (id: number) => {
  return request<RootResponseType>({
    url: '/api/roles/delRole',
    method: 'delete',
    data: id
  })
}

export const updateRole = (data: any) => {
  return request<RootResponseType>({
    url: '/api/roles/getRoles',
    method: 'put',
    data
  })
}