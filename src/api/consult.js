import request from '@/utils/request'


export function storeConsult(params) {
  return request({
    url: '/consult',
    method: 'post',
    params: params
  })
}

export function consultList() {
  return request({
    url: '/consult',
    method: 'get'
  })
}

export function editConsult(id) {
  return request({
    url: '/consult/'+id+'/edit',
    method: 'get'
  })
}

export function updateConsult(id, content) {
  return request({
    url: '/consult/'+id,
    method: 'patch',
    params:{'content':content}
  })
}
