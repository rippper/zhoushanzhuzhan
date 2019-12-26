<template>
    <div class="elcresindex">
        <header-fix></header-fix>
        <div class="elc_content">
            <div class="elc_brandcoin">
                <span class="elc_location">您当前的位置是：</span>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>海图资源</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="elc_infor">
                <h1>使用须知</h1>
                <p class="elc_pager">1、舟山终身学习网已实现与舟山海洋数字图书馆资源共享（简称海图），您在学习网平台可同时畅享学习网与海图丰富的电子资源，而无需切换平台与账号（仅限舟山市民）</p>
                <p>2、使用流程：</p>
                <p class="elc_secfloor">1）首次登录学习网时需要完善实名信息（身份证、姓名、手机）</p>
                <p class="elc_secfloor elc_pager">2）到线下就近图书馆开通海图功能（已经在舟山各县区图书馆正常借阅的用户无需此步流程）</p>
                <p class="elc_pager">3、咨询电话：2036727</p>
            </div>
            <div class="elc_button">
                <router-link to="/elcbooklist">
                    <div class="elc_startto">浏览资源</div>
                </router-link>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { headerFix, footerFix } from '../components'
export default {
    name: 'elcresindex',
    data () {
        return {

        }
    },
    mounted () {
        this.testMethods()
    },
    methods: {
        testMethods () {
            // this.$jsonp('http://www.zsodl.cn/sso-jsonp.jsp?loginType=4&userName=yfadmin&password=iC29MsX67yPPpPda&libCode=330901000').then((res) => {
            //     console.log(res)
            // }).catch((err) => {
            //     console.log(err)
            // })
            // this.$jsonp('http://www.zsodl.cn/outElec.jsp').then((res) => {
            //     console.log(res)
            // })
        }
    },
    components: {
        headerFix,
        footerFix
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
    .elcresindex{
        max-width: 1440px;
        width: 100%;
        margin:0 auto;
        background: url('../assets/bd_background.png') no-repeat;
        .elc_content{
            width: 1000px;
            margin: 0 auto;
            background: #fff;
            .elc_brandcoin{
                height: 40px;
                padding-left: 35px;
                margin-top: 20px;
                background: #F7F7F7;
                &::before{
                    content: '';
                    height: 100%;
                    display: inline-block;
                    vertical-align: middle;
                }
                .elc_location{
                    font-size: 12px;
                    display: inline-block;
                }
                .el-breadcrumb{
                    display: inline-block;
                    position: relative;
                    top: 2px;
                }
            }
            .elc_infor{
                padding: 0 10px;
                h1{
                    text-align: center;
                    margin-top: 25px;
                    margin-bottom: 25px;
                    font-weight: bold;
                }
                p{
                    font-size: 24px;
                }
                .elc_secfloor{
                    text-indent: 2em;
                }
                .elc_pager{
                    margin-bottom: 24px;
                }
            }
            .elc_button{
                @extend %clearFix;
                .elc_startto{
                    float: right;
                    width: 116px;
                    height: 32px;
                    line-height: 32px;
                    padding-left: 40px;
                    margin-top: 20px;
                    margin-right: 20px;
                    margin-bottom: 40px;
                    box-sizing: border-box;
                    color: #fff;
                    background: #a7bd2e url('../assets/bofang.png') no-repeat 20px center;
                    cursor: pointer;
                }
            }
        }
    }
</style>