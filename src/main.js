import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import './style/base.scss'
import ElementUI, { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Api from './service/api'
import { Authorization } from './service/getData'
import VueFilter from './filters'

Vue.use(ElementUI)
Vue.use(VueFilter)


Vue.config.productionTip = false

const getLoginStatus = (currentUrl) => {
  // let userInfo = store.state.userInfo
  // console.log(currentUrl)
  Authorization({ Controller: 'Do', action: currentUrl }).then(res => {
    // console.log(res)
    if (res.Data && res.Data.isauth) {
      // 清除定时器
      let timer = null
      clearInterval(timer)
      // 每60s请求一次后台 保持用户登录状态
      timer = setInterval(function () {
        Axios.post(Api.KeepOnline.url + '?_=' + +new Date()).then({ 
          function (response) {
          }
        })
      }, 60000)
    } else {
      console.log(res.Type)
      if (res.Type == 3) {
        MessageBox.confirm('在其他设备上已经登录', '', {
          confirmButtonText: '确定',
          callback: router.push({ name: 'login', query: { currentUrl: currentUrl } })
        })
      } else if (res.Type == 1) {
          router.push({ name: 'login', query: { currentUrl: currentUrl } })
      } else if (res.Type == 9) {
        MessageBox.confirm('在其他平台登录或被其他人登录', '', {
          confirmButtonText: '确定',
          callback: router.push({ name: 'Login', query: { currentUrl: currentUrl } })
        })
      } else if (res.Type == 10) {
        MessageBox.confirm('您还不是本平台会员，将前往您所在的平台' + ':' + res.Message, '', {
          confirmButtonText: '确定',
          callback: window.open('http://' + res.Message, '_blank')
        })
      } else if (res.Type == 11) {
        store.dispatch('saveUserInfo', {})
        window.localStorage.removeItem('userInfo')
        MessageBox.confirm('过期了', '', {
          confirmButtonText: '确定',
          callback: router.push({ name: 'Login', query: { currentUrl: currentUrl } })
        })
      } else if (res.Type == 13) {
        store.dispatch('saveUserInfo', {})
        window.localStorage.removeItem('userInfo')
        MessageBox.confirm(res.Message, '', {
          confirmButtonText: '确定',
          callback: router.push({ name: 'Login', query: { currentUrl: currentUrl } })
        })
      } else if (res.Type == 15) {
        MessageBox.confirm(res.Type + ':' + res.Message, '', {
          confirmButtonText: '确定'
        }).then(() => {
        })
      } else if (res.Type == 20) {
        // 登陆之后，跳转问卷调查
      } else {
        // MessageBox.confirm('请登录', '', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: ''
        // }).then(() => {
        //   router.push({ name: 'userLogin', query: { currentUrl: currentUrl } })
        // })
      }
    }
  })
}

const router = new VueRouter({
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('UserLogin/getUserAgent')
  let fromUrl = from.fullPath
  let href = window.location.href
  if (!/\/favicon\.ico/.test(href)) {
    localStorage.setItem('fromUrl', fromUrl)
  }
  if (!to.meta.isSkip) {
    if (JSON.stringify(store.state.UserLogin.userInfo) === '{}') {
      next({ path: '/Login' })
    }
  }
  next()
})

router.afterEach((to, from) => {
  // 存入当前url
  let currentUrl = to.fullPath
  let href = window.location.href
  if (!/\/favicon\.ico/.test(href)) {
    localStorage.setItem('currentUrl', currentUrl)
  }
  if (!to.meta.isSkip) {
    getLoginStatus(currentUrl)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
