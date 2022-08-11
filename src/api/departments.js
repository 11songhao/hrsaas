import request from '@/utils/request'

export function getDeptsApi() {
  return request({
    url: '/company/department'
  })
}

export function delateDeptsApi(id) {
  return request({
    url: `/company/department`+id,
    Method:'DELETE'
  })
}
