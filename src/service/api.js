
/**
 * 页面接口api
 */
const API_URL = '/api'
const Pages = '/pages'
const User = '/User'
const CourseProcess = '/CourseProcess'
// const Collection = '/Collection'
export default {
  // 检查用户登录状态
  Authorization: {
    url: API_URL + Pages + '/Authorization',
    data: {}
  },
  // 获取用户信息
  GetUerInfo: {
    url: API_URL + User + '/GetUserInfoModel',
    data: {}
  },
  // 生成验证码
  GenerateCode: {
    url: API_URL + CourseProcess + '/GenerateCode',
    data: {}
  },
  // 踢出其他地方登录
  KickOut: {
    url: API_URL + User + '/KickOut',
    data: {}
  },
  // 验证码登录
  LoginCode: {
    url: API_URL + User + '/LoginCode',
    data: {}
  },
  // 退出登录
  LoginOut: {
    url: API_URL + User + '/LoginOut',
    data: {}
  },
}
