import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/token'
import { hasPermission } from '@/utils/hasPermission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('GetInfo')
          const accessRoutes = await store.dispatch('GenerateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          await store.dispatch('FedLogout')
          Message.error(error || 'error generateRoutes')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }

    // if (store.getters.role.length === 0) {
    //   store.dispatch('GetInfo').then((res) => {
    //     next({ ...to, replace: true })
    //   })
    // } else {
    //   next()
    // }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
