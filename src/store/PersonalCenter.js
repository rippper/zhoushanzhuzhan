import { 
    SET_PERSONWINDOW_DISAPPEAR, 
    SET_HEADCHANGE_APPEAR, 
    SET_NOTECHANGE_APPEAR, 
    SET_NOTELABEL, 
    SET_NOTEINFOR, 
    SET_PLANCHANGE_APPEARCREATE, 
    SET_PLANCHANGE_APPEARFIX, 
    SET_PLANSTARTTIME, 
    SET_PLANFINISHTIME, 
    SET_PLANAWAKEPERIOD 
} from './mutation-types'
import { StudyPlanGet } from '../service/getData'

const PersonalCenter = {
    namespaced: true,
    state: {
        perWindow: false, // 窗口背部阴影打开情况true为打开，false关闭（要打开笔记或者计划窗口比继续先打开背部阴影）
        perNoteBox: false, // 笔记修改窗口打开情况同上
        perPlanBox: false, // 课程计划窗口打开情况同上
        perHeadBox: false, // 头像修改窗口打开情况同上
        pernoteLabel: '', // 课程标题
        pernoteInfor: '', // 课程内容
        perNoteForLesson: '', // 笔记关于哪门课程
        perNoteIndex: '', // 笔记ID
        planAddOrChange: '',
        planID: 0,
        planCourseID: 0,
        planCourseName: '',
        planCredit: 0,
        planStartTime: '',
        planFinishTime: '',
        planAwakePeriod: 0
    },
    mutations: {
        // 隐藏所有个人中心弹窗
        [SET_PERSONWINDOW_DISAPPEAR] (state) {
            state.perNoteBox = false
            state.perPlanBox = false
            state.perWindow = false
            state.perHeadBox = false
        },
        [SET_HEADCHANGE_APPEAR] (state) {
            state.perHeadBox = true
            state.perWindow = true
        },
        // 显示笔记修改弹窗
        [SET_NOTECHANGE_APPEAR] (state, arr) {
            state.pernoteLabel = arr[0]
            state.pernoteInfor = arr[1]
            state.pernoteId = arr[4]
            state.perNoteForLesson = arr[2]
            state.perNoteIndex = arr[3]
            state.perWindow = true
            state.perNoteBox = true
        },
        [SET_NOTELABEL] (state, value) {
            state.pernoteLabel = value
        },
        [SET_NOTEINFOR] (state, value) {
            state.pernoteInfor = value
        },
        // 显示计划添加窗口
        [SET_PLANCHANGE_APPEARCREATE] (state, arr) {
            state.perWindow = true
            state.perPlanBox = true
            state.planAddOrChange = '添加'
            state.planCourseID = arr[0]
            state.planCourseName = arr[1]
            state.planCredit = arr[2]
            state.planStartTime = new Date()
            state.planFinishTime = new Date()
            state.planAwakePeriod = 0
        },
        [SET_PLANCHANGE_APPEARFIX] (state, arr) {
            state.perWindow = true
            state.perPlanBox = true
            state.planAddOrChange = '修改'
            state.planID = arr[0]
            state.planCourseID = arr[1]
            state.planCourseName = arr[2]
            state.planCredit = arr[3]
            state.planStartTime = arr[4]
            state.planFinishTime = arr[5]
            if (arr[6] == '每天一次') {
                state.planAwakePeriod = 0
            } else if (arr[6] == '每周一次') {
                state.planAwakePeriod = 1
            } else {
                state.planAwakePeriod = 0
            }
        },
        // 设置计划开始时间
        [SET_PLANSTARTTIME] (state, value) {
            state.planStartTime = value
        },
        // 设置计划结束时间
        [SET_PLANFINISHTIME] (state, value) {
            state.planFinishTime = value
        },
        [SET_PLANAWAKEPERIOD] (state, value) {
            state.planAwakePeriod = value
        }
    },
    actions: {
        async setplanchangesappear ({ state, commit }, payload) {
            if (payload[0] == 0) {
                payload.splice(0, 2)
                commit(SET_PLANCHANGE_APPEARCREATE, payload)
            } else {
                console.log(payload)
                let msg = await StudyPlanGet({
                    planId: payload[1]
                })
                
                let start = new Date(msg.RemindDate)
                let end = new Date(msg.PlanFinishDate)
                let arr = [payload[1], payload[2], payload[3], payload[4], start, end, msg.RemindCycle]
                commit(SET_PLANCHANGE_APPEARFIX, arr)
            }
        }
    },
    getters: {
        
    }
}

export default PersonalCenter
