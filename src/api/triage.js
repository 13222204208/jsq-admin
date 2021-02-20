import request from '@/utils/request'


export function triageList(listQuery) {
  return request({
    url: '/triage',
    method: 'get',
    params: listQuery
  })
}



export function delTriage(id) {
  return request({
    url: '/triage/'+id,
    method: 'delete',
  })
}
