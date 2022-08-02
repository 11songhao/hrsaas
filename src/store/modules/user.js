import { login } from "@/api/user";
export default {
  namespaced: true,
  state: { 
    token: ''
   },
  mutations: {
    setToken(state, payLoad) {
      state.token = payLoad
    }
  },
  actions: {
    async getToken(context, payLoad) {
      const res = await login(payLoad)
      console.log(res);
      context.commit('setToken', res)
    }
  }
}
