import request from '@/utils/request'


export function teamList(listQuery) {
  return request({
    url: '/team',
    method: 'get',
    params: listQuery
  })
}


export function updateTeam(id,status) {
  return request({
    url: '/team/'+id,
    method: 'patch',
    params:{
      status:status
    }
  })
}
