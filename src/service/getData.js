import Api from './api'
import fetch from './fetch'

/*
 * 检查用户登录状态
 */
export const Authorization = (data) => fetch.post(Api.Authorization.url,
  { ...Api.Authorization.data, ...data })
/*
 * 保持用户在线
 */
export const KeepOnline = (data) => fetch.post(Api.KeepOnline.url,
  { ...Api.KeepOnline.data, ...data })
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
 * 用户登出
 */
export const LoginOut = (data) => fetch.post(Api.LoginOut.url,
  { ...Api.LoginOut.data, ...data })
/*
 * 课程分类-左侧导航
 */
export const CourseCategory = (data) => fetch.post(Api.CourseCategory.url,
  { ...Api.CourseCategory.data, ...data })
/*
 * 课程中心课程列表
 */
export const CourseList = (data) => fetch.post(Api.CourseList.url,
  { ...Api.CourseList.data, ...data })
/**
 * 课程内容
 */
export const CourseContent = (data) => fetch.post(Api.CourseContent.url,
  { ...Api.CourseContent.data, ...data })
/*
 * 获取视频内容
 */
export const Play = (data) => fetch.post(Api.Play.url,
  { ...Api.Play.data, ...data })
/*
 * 获取jy精英-三分屏课程信息PlayJY
 */
export const PlayJY = (data) => fetch.post(Api.PlayJY.url,
  { ...Api.PlayJY.data, ...data })
/*
 * 获取mp4视频内容
 */
export const PlayJwplay = (data) => fetch.post(Api.PlayJwplay.url,
  { ...Api.PlayJwplay.data, ...data })
/**
 * 记录mp4视频进度
 */
export const CourseComment2 = (data) => fetch.post(Api.CourseComment2.url,
  { ...Api.CourseComment2.data, ...data })
/**
 * 课程添加笔记
 */
export const AddNote = (data) => fetch.post(Api.AddNote.url,
  { ...Api.AddNote.data, ...data })
/**
 * 防伪造请求
 */
export const AntiForgeryToken = (data) => fetch.post(Api.AntiForgeryToken.url,
  { ...Api.AntiForgeryToken.data, ...data })
/**
 * 课程删除笔记
 */
export const DelNote = (data) => fetch.post(Api.DelNote.url,
  { ...Api.DelNote.data, ...data })
/**
 * 课程播放页添加评论
 */
export const CourseCommentAdd = (data) => fetch.post(Api.CourseCommentAdd.url,
  { ...Api.CourseCommentAdd.data, ...data })
/**
 * 查看收藏 
 */
export const FavoriteExist = (data) => fetch.post(Api.FavoriteExist.url,
  { ...Api.FavoriteExist.data, ...data })
/**
 * 添加收藏
 */
export const FavoriteAdd = (data) => fetch.post(Api.FavoriteAdd.url,
  { ...Api.FavoriteAdd.data, ...data })
/**
 * 删除收藏
 */
export const FavoriteDelete = (data) => fetch.post(Api.FavoriteDelete.url,
  { ...Api.FavoriteDelete.data, ...data })
/**
 * 获取文章频道列表信息 parentId
 */
export const GetArticleChannelInfoList = (data) => fetch.post(Api.GetArticleChannelInfoList.url,
  { ...Api.GetArticleChannelInfoList.data, ...data })
/**
 * 文章页面公告列表
 */
export const NoticeCategory = (data) => fetch.post(Api.NoticeCategory.url,
  { ...Api.NoticeCategory.data, ...data })
/**
 *首页通知公告
 */
export const GetArticleInfoList = (data) => fetch.post(Api.GetArticleInfoList.url,
  { ...Api.GetArticleInfoList.data, ...data })
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
