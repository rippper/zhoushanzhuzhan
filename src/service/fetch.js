import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

/**
 * ajax请求
 */
//
axios.defaults.baseURL = ''
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 拦截器
axios.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})


function checkCode (res) {
  if (res.status === -404) {
    console.log(res.msg)
  }
  return res
}

export default {
  post (url, data) {
    data = qs.stringify(data) || {}
    return axios({
      method: 'post',
      url,
      data
    }).then(
      (response) => {
        return response.data
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
      }
    )
  },
  postFormData (url, formData, config = {}) {
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    }).then(
      (response) => {
        return response.data
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
        Message('服务器异常')
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params: params
    }).then(
      (response) => {
        return response.data
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
        Message('服务器异常')
      }
    )
  }
}
