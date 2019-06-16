import request from '@/utils/request'

export function getPermissions (params) {
  return request({
    url: '/permission',
    method: 'get',
    params: {
      ...params
    }
  })
}
