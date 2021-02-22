import request from '@/utils/request'


export function positionList(listQuery) {
  return request({
    url: '/position',
    method: 'get',
    params: listQuery
  })
}


export function updatePosition(id,status) {
  return request({
    url: '/position/'+id,
    method: 'patch',
    params:{
      status:status
    }
  })
}