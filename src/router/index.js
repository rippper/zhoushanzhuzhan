import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CourseList from '../views/CourseList.vue'
import CourseDetail from '../views/CourseDetail.vue'
import playSC from '../views/playSC.vue'
import NewsDetail from '../views/NewsDetail.vue'
import NewsList from '../views/NewsList.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import PersonalClass from '../views/PersonalClass.vue'
import PersonalMyCourse from '../views/PersonalMyCourse.vue'
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
  },
  {
    path: '/personalcenter',
    name: 'personalcenter',
    meta: { title: '个人中心' },
    component: PersonalCenter,
    redirect: '/personalcenter/personClass',
    children: [
      {
        name: 'personClass',
        path: 'personClass',
        component: PersonalClass,
        meta: { title: '我的课程' },
        redirect: '/personalcenter/personclass/personalmycourse',
        children: [
          {
            name: 'personalmycourse',
            meta: { title: '个人中心-我的课程' },
            path: 'personalmycourse',
            component: PersonalMyCourse
          }
        ]
      }
    ]
  }
]

export default routes
