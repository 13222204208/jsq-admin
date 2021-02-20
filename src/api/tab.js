import request from '@/utils/request'


export function storeTab(params) {
  return request({
    url: '/tab',
    method: 'post',
    params: params
  })
}

export function tabList() {
  return request({
    url: '/tab',
    method: 'get',
  })
}

export function delTab(id) {
  return request({
    url: '/tab/'+id,
    method: 'delete',
  })
}

export function editTab(id) {
  return request({
    url: '/tab/'+id+'/edit',
    method: 'get'
  })
}

export function updateTab(id, params) {
  return request({
    url: '/tab/'+id,
    method: 'patch',
    params:params
  })
}
