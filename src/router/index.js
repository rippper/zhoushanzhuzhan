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
import PersonalCollect from '../views/PersonalCollect.vue'
import PersonalColCourse from '../views/PersonalColCourse.vue'
import PersonalColNews from '../views/PersonalColNews.vue'
import PersonalNote from '../views/PersonalNote.vue'
import ElcResIndex from '../views/ElcResIndex.vue'
import ElcBookList from '../views/ElcBookList.vue'
import OnlineShow from '../views/OnlineShow.vue'
Vue.use(VueRouter)

/**
 * 重写路由的push方法,防止出现相同路径路由时报错
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

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
    meta: { title: '课程列表', isSkip: true },
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
    meta: { title: '新闻列表', isSkip: true },
    component: NewsList
  },
  {
    path: '/newsdetail',
    name: 'newsdetail',
    meta: { title: '新闻详情' },
    component: NewsDetail
  },
  {
    path: '/elcresindex',
    name: 'elcresindex',
    meta: { title: '电子资源', isSkip: true },
    component: ElcResIndex
  },
  {
    path: '/elcbooklist',
    name: 'elcbooklist',
    meta: { title: '电子书' },
    component: ElcBookList
  },
  {
    path: '/onlineshow',
    name: 'onlineshow',
    meta: { title: '网上展厅' },
    component: OnlineShow
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
        redirect: 'personclass/personalmycourse',
        children: [
          {
            name: 'personalmycourse',
            meta: { title: '我的课程-正在学习的课程' },
            path: 'personalmycourse',
            component: PersonalMyCourse
          }
        ]
      },
      {
        name: 'personalcollect',
        path: 'personalcollect',
        component: PersonalCollect,
        meta: { title: '我的收藏' },
        redirect: 'personalcollect/personalcolcourse',
        children: [
          {
            name: 'personalcolcourse',
            path: 'personalcolcourse',
            component: PersonalColCourse,
            meta: { title: '我的收藏-课程收藏' }
          },
          {
            name: 'personalcolnews',
            path: 'personalcolnews',
            component: PersonalColNews,
            meta: { title: '我的收藏-文章收藏' }
          }
        ]
      },
      {
        name: 'personalnote',
        path: 'personalnote',
        component: PersonalNote,
        meta: { title: '我的笔记' }
      }
    ]
  }
]

export default routes
