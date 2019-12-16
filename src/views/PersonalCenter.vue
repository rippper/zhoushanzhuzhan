<template>
    <div class="personalCenter">
        <header-fix></header-fix>
        <div class="personal_Content">
            <div class="personal_top clearFix">
                <div class="personal_login pull-left">
                    <div class="personal_loginback">
                    <img :src="perHeadAddress" alt="">
                    </div>
                    <button class="personal_submitHPBtn" type="button" @click="SET_HEADCHANGE_APPEAR()">上传头像</button>
                    <p>您好，欢迎进入个人中心！</p>
                </div>
                <div class="personal_infor pull-left">
                    <div class="per_mainmsg">
                    <div>
                        <p>
                        <span class="per_name" v-text="perInfor.Name || '暂无'"></span>
                        <span class="per_sex">
                            （
                            <span v-text="perInfor.Sex || '暂无'"></span>
                            ）
                        </span>
                        </p>
                    </div>
                    <div class="per_local">
                        所在地区：
                        <span v-text="perInfor.GroupName || '暂无'"></span>
                    </div>
                    <div class="per_ranks">
                        工作职称：
                        <span v-text="perInfor.Business || '暂无'"></span>
                    </div>
                    </div>
                    <div class="per_scoreBox">
                    <div class="per_score" v-text="perInfor.SumCredit"></div>
                    <div>学分</div>
                    </div>
                    <div class>
                    <div class="pull-left">
                        <button class="per_check" type="button" @click="linkToMyExam()">成绩查询</button>
                        <a class="per_tocenter" v-if="perInfor.Type == 'Admin'" href="http://test46.jy365.net/admin">后台管理中心</a>
                    </div>
                    <div class="per_flxed pull-right">
                        <ul class="clearFix">
                        <li>
                            <router-link to="/personalCenter/personalPassword" @click="changecolor(0)">
                            <img src="../assets/per-key.png" alt  v-show="perLaberN[0] == 0 ? 1 : 0">
                            <img src="../assets/per-keyaction.png" alt  v-show="perLaberN[0] == 1 ? 1 : 0">
                            <span ref="perPassword">修改密码</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/personalCenter/personalInfor" @click="changecolor(1)">
                            <img src="../assets/per-write.png" alt="" v-show="perLaberN[1] == 0 ? 1 : 0">
                            <img src="../assets/per-writeaction.png" alt="" v-show="perLaberN[1] == 1 ? 1 : 0">
                            <span ref="perInfor">修改资料</span>
                            </router-link>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            <div class="personal_body clearFix">
                <div class="personal_body_l pull-left">
                    <div class="per_labeldart">
                    <img src="../assets/per-fourboxs.png" alt />
                    个人中心
                    </div>
                    <div class="per_lablebody">
                    <ul>
                        <li v-for="(item,index) in perLabel" :key="index" @click="linkStyle(index)">
                        <router-link class="secoundlinks" :to="item.perLinkAddress" ref="secoundlink">
                            <span v-text="item.perTab"></span>
                            <i class="el-icon-d-arrow-right"></i>
                        </router-link>
                        </li>
                    </ul>
                    </div>
                </div>
                <div class="personal_body_r pull-left clearFix">
                    <router-view @getchildvalue="linkStyle" ref="son" @makereload="reloading"></router-view>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { headerFix, footerFix } from '../components'
import { GetUserInfo } from '../service/getData'
export default {
    name: 'PersonalCenter',
    data () {
        return {
            perHeadAddress: '',
            perInfor: {},
            perLaberN: [0, 0],
            perLabel: [
                {
                    perLinkAddress: '/personalCenter/personClass',
                    perTab: '我的课程'
                },
                {
                    perLinkAddress: '/personalCenter/personplan',
                    perTab: '课程计划'
                },
                {
                    perLinkAddress: '/personalCenter/personCollect/',
                    perTab: '我的收藏'
                },
                {
                    perLinkAddress: '/personalCenter/studyNote',
                    perTab: '学习笔记'
                },
                {
                    perLinkAddress: '/personalCenter/personalRanks',
                    perTab: '学习排名'
                },
                {
                    perLinkAddress: '/personalCenter/personalStudyFile',
                    perTab: '学习档案'
                },
                {
                    perLinkAddress: '/personalCenter/personalTestCenter',
                    perTab: '考试中心'
                },
                {
                    perLinkAddress: '/personalCenter/personalmyexam',
                    perTab: '我的考试'
                }
            ]
        }
    },
    mounted () {
        this.render()
    },
    methods: {
        linkStyle (indexnum) {
            this.perLaberN = [0, 0]
            this.$refs.perPassword.style.color = '#d1d1d1' 
            this.$refs.perInfor.style.color = '#d1d1d1'
            this.$refs.secoundlink.forEach(item => {
                item.$el.style.cssText = ''
            })
            if (indexnum == 8) {
                this.perLaberN = [1, 0]
                this.$refs.perPassword.style.color = '#2cabfa'
            } else if (indexnum == 9) {
                this.perLaberN = [0, 1]
                this.$refs.perInfor.style.color = '#2cabfa'
            } else {
                this.$refs.secoundlink[indexnum].$el.style.cssText = 'background: #66a3fd;color: #fff;'
            }
        },
        reloading () {
            this.render()
        },
        async render () {
            let msg = await GetUserInfo()
            this.perHeadAddress = msg.Model.Avatar
            this.perInfor = msg.Model
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
.personalCenter{
    background: url('../assets/bd_background.png') no-repeat;
    .personal_Content{
        .personal_top {
            width: 1000px;
            margin: 5px auto 0;
            .personal_login {
                width: 275px;
                height: 253px;
                background: url("../assets/per-titleimg1.png") no-repeat 100%;
                position: relative;
                &::after{
                    content:"";
                    width:275px;
                    height:121px;
                    margin-top:131px;
                    background:url('../assets/per-titleimg2.png') no-repeat;
                    background-size:275px 121px;
                    display: block;
                }
                .personal_loginback{
                    width:136px;
                    height:136px;
                    margin-left:-68px;
                    background:url('../assets/per-headerback.png');
                    position: absolute;
                    top:29px;
                    left:50%;
                    img{
                        width:130px;
                        height:130px;
                        border-radius: 130px;
                        position: relative;
                        top:3px;
                        left: 3px;
                    }
                }
                .personal_submitHPBtn{
                    width:88px;
                    height:28px;
                    margin-left:-44px;
                    border:0;
                    border-radius: 28px;
                    color:#fff;
                    background:#feac30;
                    background:linear-gradient(to bottom,#feac30,#ff7d37);
                    position: absolute;
                    top:142px;
                    left:50%;
                    cursor:pointer;
                }
                p{
                    width:100%;
                    text-align: center;
                    color:#fff;
                    font-size: 16px;
                    font-weight: 500;
                    position: absolute;
                    top:204px;
                }
            }
            .personal_infor {
                width: 704px;
                height: 254px;
                padding: 13px 30px 0 30px;
                margin-left: 21px;
                background: #fff;
                box-sizing: border-box;
                position: relative;
                &:before {
                    content: "";
                    width: 8px;
                    height: 24px;
                    background: #66a3fd;
                    display: block;
                    position: absolute;
                    top: 22px;
                    left: 0;
                }
                .per_mainmsg {
                    border-bottom: 1px solid #efefef;
                    .per_name {
                        font-size: 26px;
                    }
                    .per_sex {
                        color: #c6c6c6;
                        font-size: 12px;
                    }
                    .per_local {
                        height: 28px;
                        line-height: 28px;
                        margin-top: 22px;
                        padding: 0 0 16px 38px;
                        background: url("../assets/per-local.png") no-repeat;
                        color: #c6c6c6;

                        span {
                        color: #363636;
                        }
                    }
                    .per_ranks {
                        height: 28px;
                        line-height: 28px;
                        padding: 0 0 20px 38px;
                        background: url("../assets/per-bag.png") no-repeat;
                        color: #c6c6c6;

                        span {
                        color: #363636;
                        }
                    }
                }
                .per_scoreBox {
                    width: 89px;
                    height: 99px;
                    border-radius: 5px;
                    color: #999;
                    text-align: center;
                    position: absolute;
                    right: 30px;
                    top: 20px;
                    box-shadow: 0 0 5px #cecece;
                    .per_score {
                        height: 64px;
                        line-height: 64px;
                        color: #363636;
                        font-size: 18px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                }
                .per_check {
                    width: 108px;
                    height: 36px;
                    margin: 24px 18px 0 10px;
                    background:#089ffa;
                    background: linear-gradient(to right, #6adbfc, #089ffa);
                    border: 0;
                    border-radius: 36px;
                    color: #fff;
                    cursor: pointer;
                }
                .per_tocenter {
                    color: #2e6ed0;
                }
                .per_flxed {
                    margin-top: 16px;
                    ul {
                        li {
                            float: left;
                            padding: 0 20px;
                            a{
                                color: #d1d1d1;
                            }
                            &:first-of-type {
                                position: relative;
                                &:after {
                                    content: "";
                                    width: 1px;
                                    height: 40px;
                                    margin-top: 5px;
                                    background: #d1d1d1;
                                    position: absolute;
                                    top: 0;
                                    right: -1px;
                                    display: block;
                                }
                                img {
                                    width: 25px;
                                    height: 28px;
                                    display: block;
                                    margin: 0 auto;
                                }
                            }
                            &:nth-of-type(2) {
                                margin-left: 1px;
                                img {
                                    width: 27px;
                                    height: 23px;
                                    margin: 5px auto 0;
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }
        }
        .personal_body {
            width: 1000px;
            margin: 20px auto 0;
            .per_labeldart {
                width: 275px;
                height: 72px;
                line-height: 72px;
                padding-left: 24px;
                box-sizing: border-box;
                background: #2e6ed0;
                color: #fff;
                font-size: 24px;
            }
            .per_lablebody {
                padding: 21px 20px 29px 20px;
                background: #fff;
                ul {
                    li {
                        .secoundlinks{
                            width: 205px;
                            height: 40px;
                            line-height: 40px;
                            background: #efefef;
                            border-radius: 5px;
                            margin-bottom: 10px;
                            padding-left: 30px;
                            position: relative;
                            display: block;
                            &:hover{
                                background: #66a3fd;
                                color: #fff; 
                            }
                            i {
                                position: absolute;
                                top: 12px;
                                right: 23px;
                                &:before {
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                    .active {
                        background: #66a3fd;
                        color: #fff;
                    }
                }
            }
            .personal_body_r {
                margin-left: 21px;
                width: 704px;
                background: #fff;
            }
        }
    }
}
</style>