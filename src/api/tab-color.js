import request from '@/utils/request'

export function storeTabColor(params) {
  return request({
    url: '/tab-color',
    method: 'post',
    params: params
  })
}

export function tabColorList(listQuery) {
  return request({
    url: '/tab-color',
    method: 'get',
    params: listQuery
  })
}

export function delTabColor(id) {
  return request({
    url: '/tab-color/'+id,
    method: 'delete'
  })
}

export function editTabColor(id) {
  return request({
    url: '/tab-color/'+id+'/edit',
    method: 'get'
  })
}

export function updateTabColor(id,params) {
  return request({
    url: '/tab-color/'+id,
    method: 'patch',
    params:params
  })
}
