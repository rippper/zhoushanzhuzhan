
/**
 * 页面接口api
 */
const API_URL = '/api'
const Pages = '/pages'
const User = '/User'
const Home = '/Home'
const Course = '/Course'
const File = '/File'
const CourseProcess = '/CourseProcess'
const Article = '/article'
const Production = '/production'
// const Collection = '/Collection'
export default {
  // 检查用户登录状态
  Authorization: {
    url: API_URL + Pages + '/Authorization',
    data: {}
  },
  // 保持用户在线状态
  KeepOnline: {
    url: API_URL + User + '/KeepOnline',
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
  // 课程分类-左侧导航 
  CourseCategory: {
    url: API_URL + Course + '/CourseCategory',
    data: {}
  },
  // 课程中心课程列表
  CourseList: {
    url: API_URL + Course + '/CourseList',
    data: {}
  },
  // 课程内容
  CourseContent: {
    url: API_URL + Course + '/CourseContent',
    data: {}
  },
  // 获取课程视频的内容
  Play: {
    url: API_URL + Home + '/Play',
    data: {}
  },
  // 获取精英课程-三分屏课程的信息
  PlayJY: {
    url: API_URL + Home + '/PlayJY',
    data: {}
  },
  // 获取MP4视频数据
  PlayJwplay: {
    url: API_URL + Home + '/PlayJwplay',
    data: {}
  },
  // 课程播放页评论
  CourseComment2: {
    url: API_URL + '/Page' + '/CourseComment',
    data: {}
  },
  // 课程播放页添加笔记
  AddNote: {
    url: API_URL + '/Page' + '/AddNote',
    data: {}
  },
  // 防伪造请求
  AntiForgeryToken: {
    url: API_URL + '/Page' + '/AntiForgeryToken',
    data: {}
  },
  // 课程播放页删除笔记
  DelNote: {
    url: API_URL + Course + '/DelNote',
    data: {}
  },
  // 课程播放页添加评论
  CourseCommentAdd: {
    url: API_URL + '/Page' + '/CourseCommentAdd',
    data: {}
  },
  // Refresh接口
  Refresh: {
    url: API_URL + '/CourseProcess' + '/Refresh',
    data: {}
  },
  // 查看收藏
  FavoriteExist: {
    url: API_URL + User + '/FavoriteExist',
    data: { }
  },
  // 添加收藏
  FavoriteAdd: {
    url: API_URL + User + '/FavoriteAdd',
    data: {}
  },
  // 取消收藏
  FavoriteDelete: {
    url: API_URL + User + '/FavoriteDelete',
    data: {}
  },
  // 获取文章频道列表信息
  GetArticleChannelInfoList: {
    url: API_URL + Article + '/GetArticleChannelInfoList',
    data: {}
  },
  // 获取文章频道列表信息
  NoticeCategory: {
    url: API_URL + Article + '/NoticeCategory',
    data: {}
  },
  // 首页新闻轮播-学习展示-地方动态
  GetArticleInfoList: {
    url: API_URL + Article + '/GetArticleInfoList',
    data: {}
  },
  // 获取文章内容
  ArticleContent: {
    url: API_URL + Article + '/ArticleContent',
    data: {}
  },
  // 记录已读 给积分
  SetArticleRed: {
    url: API_URL + Article + '/SetArticleRed',
    data: {}
  },
  // 我的课程
  MyCenter: {
    url: API_URL + Course + '/MyCenter',
    data: {}
  },
  // 记录mp4视频进度
  SingleProcess: {
    url: API_URL + '/CourseProcess' + '/SingleProcess',
    data: {}
  },
  // 删除我的课程删除学习中的课程
  DelUserCourseReg: {
      url: API_URL + Course + '/DelUserCourseReg',
      data: {}
  },
  // 首页课程频道分类以及列表
  CourseCategoryWithCourse: {
    url: API_URL + Course + '/CourseCategoryWithCourse',
    data: {}
  },
  // 首页课程频道分类以及列表
  ProductionInfoList: {
    url: API_URL + Production + '/ProductionInfoList',
    data: {}
  },
  // 获取课程计划
  StudyPlanGet: {
    url: API_URL + Course + '/StudyPlanGet',
    data: {}
  },
  // 上传用户图片
  SetUserPhoto: {
    url: API_URL + User + '/SetUserPhoto'
  },
  //  附件上传
  UploadAttachment: {
    url: API_URL + File + '/UploadAttachment',
    data: {}
  },
  // 上传计划修改
  StudyPlanUpdate: {
    url: API_URL + Course + '/StudyPlanUpdate',
    data: {}
  },
  // 添加新的修改计划
  StudyPlanAdd: {
    url: API_URL + Course + '/StudyPlanAdd',
    data: {}
  },
  // 我的课程收藏
  MyCourseCollect: {
      url: API_URL + User + '/MyCourseFavorite',
      data: { Rows: 5 }
  },
  // 我的文章收藏
  MyEssayCollect: {
    url: API_URL + User + '/MyArticleFavorite',
    data: { Rows: 6 }
  },
  // 删除收藏
  CollectDelete: {
    url: API_URL + User + '/FavoriteDelete',
    data: {}
  },
  // 获取课程笔记
  CourseNoteList: {
    url: API_URL + Course + '/CourseNoteList',
    data: {}
  },
  // 获取笔记信息
  NoteUpdate: {
    url: API_URL + Course + '/NoteUpdate',
    data: {}
  },
}
