import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局设置导航守卫
router.beforeEach(function (to, from, next) {
  // 开启进度条
  nprogress.start()
  // 判断拦截范围
  if (to.path.startsWith('/home')) {
    // 判断是否进入 home 判断有无token
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
// 全局后置守卫
router.afterEach(function () {
  // 关闭进度条
  nprogress.done()
})
export default router
