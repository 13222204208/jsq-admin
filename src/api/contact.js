import request from '@/utils/request'


export function contactList(listQuery) {
  return request({
    url: '/contact-us',
    method: 'get',
    params: listQuery
  })
}

export function delContact(id) {
  return request({
    url: '/contact-us/'+id,
    method: 'delete'
  })
}

export function updateContact(id) {
  return request({
    url: '/contact-us/'+id,
    method: 'patch'
  })
}
