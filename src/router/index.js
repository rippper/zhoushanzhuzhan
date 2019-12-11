import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '舟山终身学习网', isSkip: true },
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '用户登录', isSkip: true },
    component: Login
  }
]

export default routes
