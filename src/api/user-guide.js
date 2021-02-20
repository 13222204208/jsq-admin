import request from '@/utils/request'


export function userGuide() {
  return request({
    url: '/user-guide',
    method: 'get',
  })
}


export function updateUserGuide(id, params) {
  return request({
    url: '/user-guide/'+id,
    method: 'patch',
    params:params
  })
}
