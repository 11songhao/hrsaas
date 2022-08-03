import { getUserInfoApi, getUserInfoDetail, login } from '@/api/user'
import { settTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payLoad) {
      state.token = payLoad
    },
    setUserInfo(state, payLoad) {
      state.userInfo = payLoad
    }
  },
  actions: {
    async getToken(context, payLoad) {
      const res = await login(payLoad)
      console.log(res)
      context.commit('setToken', res)
      settTokenTime()
    },
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserInfoDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
      // setTimeout(() => {
      //   const res = { name: '张三' }
      //   context.commit('setUserInfo', res)
      // }, 1000)
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  }
}
