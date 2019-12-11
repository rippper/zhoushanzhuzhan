import Api from './api'
import fetch from './fetch'

/*
 * 检查用户登录状态
 */
export const Authorization = (data) => fetch.post(Api.Authorization.url,
  { ...Api.Authorization.data, ...data })
/*
 * 获取用户信息 
 */
export const GetUserInfo = (data) => fetch.post(Api.GetUerInfo.url,
  { ...Api.GetUerInfo.data, ...data })
/*
 * 生成验证码
 */
export const GenerateCode = (data) => fetch.post(Api.GenerateCode.url,
  { ...Api.GenerateCode.data, ...data })
/*
 * 踢出其他地方登录
 */
export const KickOut = (data) => fetch.post(Api.KickOut.url,
  { ...Api.KickOut.data, ...data })
/*
 * 验证码登录
 */
export const LoginCode = (data) => fetch.post(Api.LoginCode.url,
  { ...Api.LoginCode.data, ...data })
/*
 *
 */
export const LoginOut = (data) => fetch.post(Api.LoginOut.url,
  { ...Api.LoginOut.data, ...data })
/* 将所有的API封装起来 */
const allApi = {}
for (let key in Api) {
  if (Api[key].method === 'get') {
    if (key === 'GetNoticeInfoContent') {
      allApi[key] = (data) => fetch.get(Api[key].url + '/' + data.Id, { ...Api[key].data, ...data })
    } else {
      allApi[key] = (data) => fetch.get(Api[key].url, { ...Api[key].data, ...data })
    }
  } else if (Api[key].method === 'formData') {
    allApi[key] = (data, config) => fetch.postFormData(Api[key].url, data, config)
  } else {
    allApi[key] = (data) => fetch.post(Api[key].url, { ...Api[key].data, ...data })
  }
}
export default allApi
