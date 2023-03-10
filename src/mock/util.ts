// get请求从config.url获取参数，post从config.body中获取参数
export function paramObj(request: string = '', type:string = 'post',) {
  if (type === 'post') {
    return JSON.parse(request)
  } else {
    const search = request.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )
  }
  
}