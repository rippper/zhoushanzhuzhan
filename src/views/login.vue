<template>
    <div class="login">
        <div class="main">
            <div class="content">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="账号登录" name="first">
                        <form>
                            <div class="form-group">
                                <img src="../assets/account-img.png" alt="">
                                <input type="text" placeholder="请输入用户名/身份证号" v-model="account">
                            </div>
                            <div class="form-group">
                                <img src="../assets/password-img.png" alt="">
                                <input type="password" placeholder="请输入密码" v-model="passWord" @keydown="keysearch">
                            </div>
                        </form>
                        <div class="tab-handle clearfix">
                            <div class="remember l">
                                <label class="clearfix">
                                    <div class="option l">
                                        <input type="checkbox" class="hidden-input" v-model="remember">
                                        <span class=""></span>
                                    </div>
                                    <div class="option-val l">
                                        记住账号
                                    </div>   		
                                </label>  
                            </div>
                            <div class="register r">
                                还没有账户？<router-link to="/register">立即注册</router-link>
                            </div>
                        </div>
                        <el-button type="primary" @click.native="login">登录</el-button>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { GenerateCode, LoginCode, KickOut } from '../service/getData'
import { mapActions, mapState } from 'vuex'
import { getStore, setStore } from '../service/utils'
import { MessageBox, Message } from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm

export default {
    name: 'loginPart',
    data () {
        return {
            headerIndex: '0',
            activeName: 'first',
            account: '',
            passWord: '',
            remember: '',
            backUrl: '',
            backPath: ''
        }
    },
    created () {
        this.getUserAgent()
        // 首先在这里获取用户登录信息 因为点确定去修改密码页面以后 回退会依然带着用户信息 如果有用户信息 跳去首页
    },
    mounted () {
        let backUrl = this.$route.query.currentUrl || this.$route.query.page
        if (backUrl) {
            this.backUrl = backUrl
        } else {
            this.backUrl = { name: 'home' }
        }
        this.account = localStorage.getItem('account')
        this.password = localStorage.getItem('passWord')
        this.remember = getStore('remember')
    },
    computed: {
        ...mapState({
            userAgent: (state) => state.UserLogin.userAgent
        })
    },
    methods: {
        ...mapActions('UserLogin', [
            'getUserAgent', 
            'getUserInformation', 
            'saveUserInfo'
        ]),
        handleClick (tab, event) {
            // console.log(tab, event);
        },
        keysearch (evt) {
            let theEvent = window.event || evt
            let code = theEvent.keyCode || theEvent.which || theEvent.charCode
            if (code == 13) {
                this.login()
            }
        },
    //  获取验证码
        async generateCode () {
           let data = GenerateCode()
           if (data.IsSuccess) {
            //  设计图暂无验证码功能
           }
        },
        async kickOut (kickUserId) {
            let res = await KickOut({ kickUserId: kickUserId })
            if (res.Type == 1) {
                this.login()
            }
        },
        // 登录
        async login () {
            if (!this.account || !this.passWord) {
                this.$message('用户名或密码不能为空')
                return
            } 
            let data = await LoginCode({
                    Account: this.account,
                    Password: this.passWord,
                    NeedVc: false,
                    RememberMe: this.remember
                }
            )
            // console.log(data)
            if (data.Type == 1) {
                if (this.remember) {
                    this.getUserInformation()
                    localStorage.setItem('account', this.account)
                    localStorage.setItem('passWord', this.passWord)
                    setStore('remember', true)
                } else {
                    localStorage.setItem('account', '')
                    localStorage.setItem('passWord', '')
                    setStore('remember', true)
                }
                if (this.backUrl == "admin") {
                    window.location.href = 'http://test46.jy365.net/admin'
                } else {
                    this.$router.replace(this.backUrl)
                }
            } else if (data.Type == 3) {
              if (window.confirm('帐号在别的地方登录，是否踢出？')) {
                this.kickOut(data.Message)
                return true
              } else {
                return false
              }
            } else if (data.Type == 4) {
              Message('此电脑已经有用户登录，您不能用其他帐号再次登录！')
            } else if (data.Type == 5) {
              Message('平台当前在线人数到达上限，请稍后再试！')
            } else if (data.Type == 6) {
              Message(data.Message)
            } else if (data.Type == 10) {
              Message('您还不是本平台成员，将为您转向您所在的平台：' + data.Message, 2)
            } else if (data.Type == 11) {
              Message(data.Message)
            } else if (data.Type == 12 || data.Type == 13) {
              Message(data.Message)
            //   $scope.getVerifyCode();
            } else if (data.Type == 14) {
                this.$confirm(data.Message + ',请修改密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                }).catch(() => {
                    // 点击取消的操作
                    if (this.remember) {
                        this.getUserInformation()
                        localStorage.setItem('account', this.account)
                        localStorage.setItem('passWord', this.passWord)
                        setStore('remember', true)
                    } else {
                        localStorage.setItem('account', '')
                        localStorage.setItem('passWord', '')
                        setStore('remember', true)
                    }
                    if (this.backUrl == "admin") {
                        window.location.href = 'http://test46.jy365.net/admin'
                    } else {
                        this.$router.replace(this.backUrl)
                    }
                })
            } else {
              Message(data.Message)
            }
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
    .login{
        .main{
            width: 1200px;
            margin: 35px auto 15px;
            height: 390px;
            background: url("../assets/login-bg.png") 185px 0px no-repeat;
            .content{
                width: 300px;
                height: 310px;
                margin: 45px 192px 50px 710px;
                .el-tabs {
                    .el-tabs__nav-scroll{
                        .el-tabs__nav{
                            margin-left: 26px;
                        }
                        .el-tabs__item{
                            font-size: 16px;
                            font-weight: bold;
                            color: #555;
                            height: 60px;
                            line-height: 60px;
                            text-align: center;
                        }
                    }
                    .el-tabs__content{
                        margin-top: 25px;
                        form{
                            .form-group{
                                height: 44px;
                                margin-bottom: 25px;
                                img{
                                    width: 44px;
                                    height: 44px;
                                    vertical-align: bottom;
                                }
                                input{
                                    width: 252px;
                                    height: 42px;
                                    border: 1px solid #dcdcdc;
                                    text-indent: 15px;
                                }
                            }
                        }
                        .tab-handle{
                            .remember{
                                color: #555;
                                position: relative;
                                label{
                                    .option{
                                       .hidden-input {
                                            opacity: 0;
                                            position: absolute;
                                            z-index: -1;
                                            height: 18px;
                                            width: 18px;
                                            top: 0px;
                                        }
                                        input[type=checkbox]+span {
                                            display: inline-block;
                                            height: 14px;
                                            width: 14px;
                                            background-color: transparent;
                                            border: 1px solid #0ea0fa;
                                            margin-right: 9px;
                                            vertical-align: middle;
                                        }
                                        input[type=checkbox]:checked+span {
                                            background: url(../assets/remember-dh.png) no-repeat 0px 2px;
                                        }
                                    }
                                }
                            }
                            .register{
                                a{
                                    color: #089efa;
                                    &:hover{
                                        text-decoration: underline;
                                    }
                                }
                            }
                        }
                        .el-button{
                            margin-top: 30px;
                            width: 300px;
                            height: 48px;
                            padding: 0;
                            border-radius: 25px;
                            background-image: linear-gradient(to right, #48d3fb, #089efa);
                            border: none;
                        }
                        .login-code{
                            display: block;
                            margin: 0 auto;
                        }
                    }
                }                
            }
        }
        .bottom{
            margin-top: 45px!important;
        }
    }
</style>
