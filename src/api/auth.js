import request from '@/utils/request'

export function getRedirectUrl () {
  return request({
    url: '/',
    method: 'get'
  })
}
