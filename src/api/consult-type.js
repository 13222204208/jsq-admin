import request from '@/utils/request'


export function storeConsultType(params) {
  return request({
    url: '/consult-type',
    method: 'post',
    params: params
  })
}

export function ConsultTypeList() {
  return request({
    url: '/consult-type',
    method: 'get'
  })
}

export function editConsultType(id) {
  return request({
    url: '/consult-type/'+id+'/edit',
    method: 'get'
  })
}

export function updateConsultType(id, title) {
  return request({
    url: '/consult-type/'+id,
    method: 'patch',
    params:{'title':title}
  })
}
