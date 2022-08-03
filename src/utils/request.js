import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// // request interceptor
// service.interceptors.request.use((config) => {
//   // if (store.state.user.token) return config
//   // const currentTime = Date.now()
//   // const tokenTime = getTokenTime()
//   // const timeout = 10 * 1000
//   // if (currentTime - tokenTime > timeout) {
//   //   console.log('跳到登录页')
//   // } else {
//   //   config.headers.Authorization = 'Bearer ' + store.state.user.token
//   // }
//   // return config

//   // if (store.state.user.token) {
//   //   const currentTime = Date.now()
//   //   const tokenTime = getTokenTime()
//   //   const timeout = 10 * 1000
//   //   if (currentTime - tokenTime > timeout) {
//   //     console.log('跳到登录页')
//   //   } else {
//   //     config.headers.Authorization = 'Bearer ' + store.state.user.token
//   //   }
//   // }
//   // return config

//   if (store.state.user.token) {
//     const currentTime = Date.now()
//     const tokenTime = getTokenTime()
//     const timeout = 10 * 1000
//     if (currentTime - tokenTime > timeout) {
//       console.log('跳到登录页')
//     } else {
//       config.headers.Authorization = 'Bearer ' + store.state.user.token
//     }
//   }
//   return config
// })
// request interceptor
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeOut()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
})

// response interceptor
service.interceptors.response.use(
  (res) => {
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    // if (error.response.status === 401) {
    //    await store.dispatch('user/logout')
    //   router.push('/login')
    // } else {
    //   Message.error(error.message)
    // }
    // return Promise.reject(error)
    if (error?.response?.status === 401) {
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
