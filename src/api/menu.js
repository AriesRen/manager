import request from '@/utils/request'

export function getMenus () {
  return request({
    url: '/menu',
    method: 'get'
  })
}