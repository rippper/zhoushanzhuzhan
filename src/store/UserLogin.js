import { setStore, userAgent, getStore, getPCUrl } from '../service/utils'
import { GetUserInfo } from '../service/getData'
import { 
    GET_USERINFO,
    GET_USERAGENT,
    GET_NETWORKTYPE,
    SAVE_USERINFO
} from './mutation-types'

const UserLogin = {
    namespaced: true,
    state: {
        userInfo: getStore('userInfo') || {}, // 用户信息
        userAgent: getStore('userAgent') || {}, // 浏览器设备信息
        wxIndexUrl: getPCUrl('#/home'),
        wxLoginUrl: getPCUrl('#/userLogin'),
        netWorkType: '' // 网络类型
    },
    mutations: {
        [GET_USERINFO] (state, userInfo) {
            state.userInfo = userInfo
        },
        // 获取userAgent
        [GET_USERAGENT] (state, userAgent) {
            state.userAgent = userAgent
        },
        // 获取网络类型
        [GET_NETWORKTYPE] (state, netWorkType) {
            state.netWorkType = netWorkType
        },
        // 保存用户信息
        [SAVE_USERINFO] (state, userInfo) {
            state.userInfo = userInfo
        }
    },
    getters: {

    },
    actions: {
        async getUserInformation ({ state, commit }, payload) {
            let data = await GetUserInfo(payload)
                setStore('userInfo', data.Model || {})
                commit(GET_USERINFO, data.Model || {})
        },
        saveUserInfo ({ state, commit }, payload) {
            setStore('userInfo', payload || {})
            commit(SAVE_USERINFO, payload || {})
        },
        getUserAgent ({ state, commit }, payload) {
            let data = userAgent()
            commit('GET_USERAGENT', data)
        }
    }
}

export default UserLogin
