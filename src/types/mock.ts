// 定义参数类型
export interface MockParams {
  url: string
  type: string
  data?: any
  params?: any
  response(option?: any): Record<string, unknown>
}

// 默认response
export interface responseConfig {
  body: string
}