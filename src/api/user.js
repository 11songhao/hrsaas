import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: data
  })
}
/**
 *  获取用户的基本资料
 *
 * **/
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 *  获取用户的基本资料
 *
 * **/
export const getUserInfoDetail=(id)=> {
  return request({
    url: `/sys/user/${id}`
  })
}
