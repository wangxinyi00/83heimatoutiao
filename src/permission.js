import router from './router'
// 全局设置导航守卫
router.beforeEach(function (to, from, next) {
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
export default router
