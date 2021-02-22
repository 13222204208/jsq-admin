import request from '@/utils/request'



export function userList(listQuery) {
  return request({
    url: '/user',
    method: 'get',
    params: listQuery
  })
}


export function updateUser(id) {
  return request({
    url: '/user/'+id,
    method: 'patch'
  })
}
