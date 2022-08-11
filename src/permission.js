import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (!store.state.user.userInfo.userId) {
     await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const includes = whiteList.includes(to.path)
    if (includes) {
      next()
    } else {
      next('/login')
    }
  }
})
