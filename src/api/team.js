import request from '@/utils/request'

export function privacyList(listQuery) {
  return request({
    url: '/team-privacy',
    method: 'get',
    params: listQuery
  })
}

export function createPrivacy(params) {
  return request({
    url: '/team-privacy',
    method: 'post',
    params: params
  })
}

export function delPrivacy(id) {
  return request({
    url: '/team-privacy/'+id,
    method: 'delete',
  })
}

export function editPrivacy( id) {
  return request({
    url: '/team-privacy/'+id+'/edit',//只有一个团队隐私
    method: 'get',
  })
}

export function updatePrivacy( id,params) {
  return request({
    url: '/team-privacy/'+id,//只有一个团队隐私
    method: 'patch',
    params:params
  })
}

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
