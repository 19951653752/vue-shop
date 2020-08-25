import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../components/Login') },
  { path: '/home', component: () => import('../components/Home') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转过来
  // next 是一个函数，表示放行

  // 如果用户要去登录页，则放行
  if(to.path === '/login') return next()
  // 如果用户没有登录，则强制跳转到登录页
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  // 用户登录，直接放行
  next()
})

export default router
