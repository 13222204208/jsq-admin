import request from '@/utils/request'


export function notepadList(listQuery) {
  return request({
    url: '/notepad',
    method: 'get',
    params: listQuery
  })
}


export function updateNotepad(id,status) {
  return request({
    url: '/notepad/'+id,
    method: 'patch',
    params:{
      status:status
    }
  })
}
