import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/'
import Login from './views/login'
import Main from './views/home/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'

    },
    {
      path: '*',
      component: () => import('./views/404.vue')
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '', // 什么都不写默认二级路由组件
          component: Main
        },
        {
          // 评论列表
          path: 'comment',
          component: () => import('./views/comment')
        },
        {
          path: 'material',
          component: () => import('./views/material')
        },
        {
          path: 'articles',
          component: () => import('./views/articles')
        },
        {
          // 修改文章
          path: 'publish/:articleId',
          component: () => import('./views/publish')
        },
        {
          // 新建组件
          path: 'publish',
          component: () => import('./views/publish')
        },
        {
          // 账户信息
          path: 'account',
          component: () => import('./views/account')
        },
        {
          // 图文数据
          path: 'gradata',
          component: () => import('./views/fans')
        }
      ]
    },
    {
      path: '/login',
      component: Login

    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
