import request from '@/utils/request'

export function getUsers (params) {
  return request({
    url: '/user',
    method: 'get',
    params: {
      ...params
    }
  })
}

export function getUserById (id) {
  return request({
    url: '/user/`id`',
    method: 'get'
  })
}

export function getUserByToken (token) {
  return request({
    url: '/user/current',
    method: 'get',
    params: { token }
  })
}
