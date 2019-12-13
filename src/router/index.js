import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CourseList from '../views/CourseList.vue'
import CourseDetail from '../views/CourseDetail.vue'
import playSC from '../views/playSC.vue'
import NewsDetail from '../views/NewsDetail.vue'
import NewsList from '../views/NewsList.vue'

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
  },
  {
    path: '/courselist',
    name: 'courselist',
    meta: { title: '课程列表' },
    component: CourseList
  },
  {
    path: '/coursedetail',
    name: 'coursedetail',
    meta: { title: '课程详情' },
    component: CourseDetail
  },
  {
    path: '/playSC',
    name: 'playSC',
    meta: { title: '课程视频' },
    component: playSC
  },
  {
    path: '/newslist',
    name: 'newslist',
    meta: { title: '新闻列表' },
    component: NewsList
  },
  {
    path: '/newsdetail',
    name: 'newsdetail',
    meta: { title: '新闻详情' },
    component: NewsDetail
  }
]

export default routes
