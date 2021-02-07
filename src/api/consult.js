import request from '@/utils/request'


export function storeConsult(params) {
  return request({
    url: '/consult',
    method: 'post',
    params: params
  })
}

export function consultList(query) {
  return request({
    url: '/consult',
    method: 'get',
    params: query
  })
}

export function delConsult(id) {
  return request({
    url: '/consult/'+id,
    method: 'delete',
  })
}

export function editConsult(id) {
  return request({
    url: '/consult/'+id+'/edit',
    method: 'get'
  })
}

export function updateConsult(id, params) {
  return request({
    url: '/consult/'+id,
    method: 'patch',
    params:params
  })
}
