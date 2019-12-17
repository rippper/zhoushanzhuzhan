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
 * 首页通知公告
 */
export const GetArticleInfoList = (data) => fetch.post(Api.GetArticleInfoList.url,
  { ...Api.GetArticleInfoList.data, ...data })
/**
 * 文章内容
 */
export const ArticleContent = (data) => fetch.post(Api.ArticleContent.url,
  { ...Api.ArticleContent.data, ...data })
/**
 * 记录已读
 */
export const SetArticleRed = (data) => fetch.post(Api.SetArticleRed.url,
  { ...Api.SetArticleRed.data, ...data })
/**
 * 我的课程
 */
export const MyCenter = (data) => fetch.post(Api.MyCenter.url,
  { ...Api.MyCenter.data, ...data })
/**
 * 我的课程删除学习中的课程
 */
export const DelUserCourseReg = (data) => fetch.post(Api.DelUserCourseReg.url,
  { ...Api.DelUserCourseReg.url, ...data })
/**
 * 记录mp4视频进度
 */
export const SingleProcess = (data) => fetch.post(Api.SingleProcess.url,
  { ...Api.SingleProcess.data, ...data })
/**
 * 获取课程计划
 */
export const StudyPlanGet = (data) => fetch.post(Api.StudyPlanGet.url,
  { ...Api.StudyPlanGet.data, ...data })
/**
 * 上传用户头像
 */
export const SetUserPhoto = (data) => fetch.post(Api.SetUserPhoto.url, { ...Api.SetUserPhoto.data, ...data })
/**
 * 附件上传
 */
export const UploadAttachment = (data, config) => fetch.postFormData(Api.UploadAttachment.url, data,
  config)
/**
 * 上传课程计划
 */
export const StudyPlanUpdate = (data) => fetch.post(Api.StudyPlanUpdate.url,
  { ...Api.StudyPlanUpdate.data, ...data })
/**
 * 添加课程计划
 */
export const StudyPlanAdd = (data) => fetch.post(Api.StudyPlanAdd.url,
  { ...Api.StudyPlanAdd.data, ...data })
/**
 *我的收藏课程   
 */
export const CourseCollect = (data) => fetch.post(Api.MyCourseCollect.url,
  { ...Api.MyCourseCollect.data, ...data })
/**
 * 我的收藏文章
 */
export const EssayCollect = (data) => fetch.post(Api.MyEssayCollect.url,
  { ...Api.MyEssayCollect.data, ...data })
/**
 * 我的收藏删除
 */
export const CollectDelete = (data) => fetch.post(Api.CollectDelete.url,
  { ...Api.CollectDelete.data, ...data })
/**
 * 获取课程笔记列表
 */
export const CourseNoteList = (data) => fetch.post(Api.CourseNoteList.url,
  { ...Api.CourseNoteList.data, ...data })
/**
 * 获取笔记信息信息
 */
export const NoteUpdate = (data) => fetch.get(Api.NoteUpdate.url,
  { ...Api.NoteUpdate.data, ...data })
/**
 * 修改笔记信息
 */
export const NoteUpdatePost = (data) => fetch.post(Api.NoteUpdate.url,
  { ...Api.NoteUpdate.data, ...data })
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
