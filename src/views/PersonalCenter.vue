<template>
    <div class="personalCenter" ref="personal_container">
        <div class="personal_backgroundshadow" v-show="perWindow" @click.self="checkFinish()">
            <div class="personal_notechangebox" v-show="perNoteBox">
                <div class="personal_notechangetop">
                    <img src="../assets/per-rewritewhite.png" alt="">
                    <span>修改笔记</span>
                </div>
                <div class="personal_lesson clearFix">
                    <span class="personal_redicon"></span>
                    <span>课程:</span>
                    <span v-text="perNoteForLesson"></span>
                </div>
                <div class="personal_notechange">
                <p>
                    笔记<span>标题</span>
                    <span class="personal_notechange_titlelimit"><span v-text="noteLabel_forChange.length" ref="waringtitle"></span>/25</span>
                </p>
                    <input type="text" v-model="noteLabel_forChange" ref="noteLabel" @input="wordsLimit('noteLabel_forChange','waringtitle', 25)">
                <p>
                    笔记<span>正文</span>
                    <span class="personal_notechange_contentlimit"><span v-text="noteInfor_forChange.length" ref="waringcontent"></span>/250</span>
                </p>
                <textarea cols="30" rows="10" v-model="noteInfor_forChange" ref="noteContent" @input="wordsLimit('noteInfor_forChange', 'waringcontent', 250)"></textarea>
                </div>
                <div class="personal_buttondepart">
                    <button class="personal_reslove" type="button" @click="noteSubmit()">确认</button>
                    <button class="personal_reject" type="button" @click.self="checkFinish()">取消</button>
                </div>
            </div>
            <div class="personal_planchangebox" v-if="perPlanBox">
                <div class="personal_planchangetop">
                    <img src="../assets/per-rewritewhite.png" alt="">
                    <span><span v-text="planAddOrChange"></span>计划</span>
                </div>
                <div class="personal_planchangebody">
                    <p class="personal_coursename">课程<span>名称</span></p>
                    <div class="personal_coursebox">
                        <span class="personal_courseinname" v-text="planCourseName"></span>
                        <div class="personal_counameright">
                            <span class="personal_starname"><span class="personal_courseimg"></span>学分：</span><span v-text="planCredit"></span>
                            <button type="button" class="personal_gostudy" @click="linkToCourse(planCourseID)">去学习</button>
                        </div>
                    </div>
                    <p class="personal_coursename">学习<span>计划</span></p>
                    <div>
                        <span class="personal_plandata">计划开始日期：</span>
                        <el-date-picker
                        v-model="planStartTime_forChange"
                        type="date"
                        ref="planStartTime"
                        popper-class="start_time"
                        placeholder="选择日期">
                        </el-date-picker>
                        <span class="personal_plandata">计划完成日期：</span>
                        <el-date-picker
                        v-model="planFinishTime_forChange"
                        type="date"
                        ref="planEndTime"
                        popper-class="finish_time"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="personal_attention">
                        <div class="personal_attentiontime">
                        <p class="personal_coursename">提醒<span>周期</span></p>
                        <div>
                            <img src="../assets/per-checkout.png" alt="" v-show="planAwakePeriod == 1 ? 1 : 0" @click="SET_PLANAWAKEPERIOD(0)">
                            <img src="../assets/per-check.png" alt="" v-show="planAwakePeriod == 0 ? 1 : 0">
                            <span>每天提醒</span>
                            <img src="../assets/per-checkout.png" alt="" v-show="planAwakePeriod == 0 ? 1 : 0" @click="SET_PLANAWAKEPERIOD(1)">
                            <img src="../assets/per-check.png" alt="" v-show="planAwakePeriod == 1 ? 1 : 0">
                            <span>每周提醒</span>
                        </div>
                        </div>
                        <div class="personal_attentionway">
                            <p class="personal_coursename">提醒<span>方式</span></p>
                            <div>
                                <img src="../assets/per-checkout.png" alt="" v-show="planAwakeWay == 1 ? 1 : 0">
                                <img src="../assets/per-check.png" alt="" v-show="planAwakeWay == 0 ? 1 : 0">
                                <span>站内信</span>
                            </div>
                        </div>
                    </div>
                    <div class="personal_buttonpart">
                        <div class="personal_toright">
                        <button type="button" @click="planSubmit()">提交</button>
                        <button type="button" @click="checkFinish()">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <headUpload v-show="perHeadBox" :refleash="render"></headUpload>
        </div>
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
                        <a class="per_tocenter" v-if="perInfor.Type == 'Admin'" href="javascript:;">后台管理中心</a>
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
import { headerFix, footerFix, headUpload } from '../components'
import { GetUserInfo, StudyPlanUpdate, StudyPlanAdd, NoteUpdatePost } from '../service/getData'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'PersonalCenter',
    data () {
        return {
            perHeadAddress: '',
            perInfor: {},
            perLaberN: [0, 0],
            planAwakeWay: 0,
            perLabel: [
                {
                    perLinkAddress: '/personalCenter/personclass',
                    perTab: '我的课程'
                },
                {
                    perLinkAddress: '/personalCenter/personplan',
                    perTab: '课程计划'
                },
                {
                    perLinkAddress: '/personalCenter/personalcollect',
                    perTab: '我的收藏'
                },
                {
                    perLinkAddress: '/personalCenter/personalnote',
                    perTab: '学习笔记'
                },
                {
                    perLinkAddress: '/personalCenter/personalStudyFile',
                    perTab: '学习档案'
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
        ...mapMutations('PersonalCenter', ['SET_PERSONWINDOW_DISAPPEAR', 'SET_PLANSTARTTIME', 'SET_PLANFINISHTIME', 'SET_PLANAWAKEPERIOD', 'SET_NOTELABEL', 'SET_NOTEINFOR', 'OPEN_BOXSHADOW_APPEAR', 'SET_HEADCHANGE_APPEAR']),
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
        wordsLimit (element, label, inforLength) {
            if (this[element].length >= inforLength + 1) {
                this.$refs[label].style.color = '#f00'
            } else if (this[element].length < inforLength + 1) {
                this.$refs[label].style.color = ''
            }
        },
        stopmove (event) {
            let evt = window.event || event
            if(event){
                evt.preventDefault()
            }else{
                window.event.returnValue = false
            }
        },
        linkToCourse (courseId) {
            const { href } = this.$router.resolve({ path: '/courseDetail', query: { id: courseId } })
            window.open(href, '_blank')
        },
        checkFinish () {
            this.$confirm('确定是否取消修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.SET_PERSONWINDOW_DISAPPEAR()
            }).catch(() => {
                return false
            })
        },
        async planSubmit () {
            if (this.planStartTime == null || this.planFinishTime == null) {
                this.$message({
                message: '请填写时间',
                type: 'error'
                })
                return
            }
            let start = this.planStartTime.getTime()
            let end = this.planFinishTime.getTime()
            let awaketimes = null
            if (start >= end) {
                this.$message({
                message: '您所选取的时间不对，请选取正确的时间！',
                type: 'error'
                })
                return
            }
            this.planAwakePeriod == 0 ? awaketimes = '每天一次' : awaketimes = '每周一次'
            if (this.planAddOrChange == '修改') {
                let msg = await StudyPlanUpdate({
                Id: this.planID,
                CourseId: this.planCourseID,
                RemindDate: this.planStartTime,
                PlanFinishDate: this.planFinishTime,
                RemindCycle: awaketimes
                })
                if (msg.Type == 1) {
                this.$message({
                    message: msg.Message,
                    type: 'success'
                })
                this.SET_PERSONWINDOW_DISAPPEAR()
                } else {
                this.$message({
                    message: msg.Message,
                    type: 'error'
                })
                }
            } else if (this.planAddOrChange == '添加') {
                let msg = await StudyPlanAdd({
                CourseId: this.planCourseID,
                RemindDate: this.planStartTime,
                PlanFinishDate: this.planFinishTime,
                RemindCycle: awaketimes
                })
                if (msg.Message == '更新成功') {
                this.$message({
                    message: msg.Message,
                    type: 'success'
                })
                this.SET_PERSONWINDOW_DISAPPEAR()
                } else {
                this.$message({
                    message: msg.Message,
                    type: 'error'
                })
                }
            }
            this.$refs['son'].render()
        },
        async render () {
            let msg = await GetUserInfo()
            this.perHeadAddress = msg.Model.Avatar
            this.perInfor = msg.Model
        },
        async noteSubmit () {
            if (this.pernoteLabel.length >= 26 || this.pernoteInfor.length >= 251) {
                this.$message({
                message: '您所输入的内容超过字段限制请编辑字段长度。',
                type: 'warning'
                })
                return 
            }
            let changeInfor = await NoteUpdatePost({
                Id: this.perNoteIndex,
                Name: this.pernoteLabel,
                Content: this.pernoteInfor
            })
            if (changeInfor.Type == 1) {
                this.$message.success(changeInfor.Message)
                this.SET_PERSONWINDOW_DISAPPEAR()
                this.$refs['son'].render()
            } else {
                this.$message.error(changeInfor.Message)
            }
        }
    },
    computed: {
        ...mapState('PersonalCenter', {
            perWindow: state => state.perWindow,
            perNoteBox: state => state.perNoteBox,
            perPlanBox: state => state.perPlanBox,
            pernoteLabel: state => state.pernoteLabel,
            pernoteInfor: state => state.pernoteInfor,
            perNoteForLesson: state => state.perNoteForLesson,
            perNoteIndex: state => state.perNoteIndex,
            planAddOrChange: state => state.planAddOrChange,
            planID: state => state.planID,
            planCourseID: state => state.planCourseID,
            planCourseName: state => state.planCourseName,
            planCredit: state => state.planCredit,
            planStartTime: state => state.planStartTime,
            planFinishTime: state => state.planFinishTime,
            planAwakePeriod: state => state.planAwakePeriod,
            perHeadBox: state => state.perHeadBox
        }),
        planStartTime_forChange: {
            get () {
                return this.planStartTime
            },
            set (value) {
                this.SET_PLANSTARTTIME(value)
            }
        },
        planFinishTime_forChange: {
            get () {
                return this.planFinishTime
            },
            set (value) {
                this.SET_PLANFINISHTIME(value)
            }
        },
        noteLabel_forChange: {
            get () {
                return this.pernoteLabel
            },
            set (value) {
                this.SET_NOTELABEL(value)
            }
        },
        noteInfor_forChange: {
            get () {
                return this.pernoteInfor
            },
            set (value) {
                this.SET_NOTEINFOR(value)
            }
        }
    },
    watch: {
        perWindow (newName, oldName) {
            if (newName == true) {
                this.$refs.personal_container.addEventListener('mousewheel', this.stopmove, true)
            } else {
                this.$refs.personal_container.removeEventListener('mousewheel', this.stopmove, true)
            }
        }
    },
    components: {
        headerFix,
        footerFix,
        headUpload
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.personalCenter{
    max-width: 1440px;
    width: 100%;
    margin:0 auto;
    background: url('../assets/bd_background.png') no-repeat;
    .personal_backgroundshadow{
        width:100%;
        height:100%;
        position: fixed;
        background:rgba(0,0,0,0.3);
        z-index: 100;

        .personal_notechangebox{
            width:630px;
            height:579px;
            position:absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            margin:auto;
            background:#fff;

            .personal_notechangetop{
            height:48px;
            background:#2e6ed0;
            text-align: center;
            line-height: 48px;

            img{
                position: relative;
                bottom:2px;
            }

            span{
                margin-left:8px;
                font-size: 16px;
                color:#fff;
                font-weight: 500;
            }
            }

            .personal_lesson{
            height:64px;
            background:#efefef;

            span{
                float: left;

                &:nth-child(2){
                width:56px;
                height:24px;
                margin-top: 19px;
                margin-left:8px;
                text-align: center;
                font-size: 16px;
                color:#fff;
                border-radius: 3px;
                background: #089ffa;

                }

                &:last-child{
                margin-left: 8px;
                line-height:64px;
                color:#565656;
                }
            }
            .personal_redicon{
                width:18px;
                height:23px;
                margin-top:20px;
                margin-left:30px;
                background:url('../assets/per-noteimg1.jpg') no-repeat;
            }
            }

            .personal_notechange{
            width:570px;
            height:361px;
            margin:20px auto;

            p{
                font-size: 16px;
                font-weight: bold;
                margin-bottom:16px;
                position: relative;
                span{
                color:#2e6ed0;
                }
                .personal_notechange_titlelimit{
                position: absolute;
                right: 5px;
                }
                .personal_notechange_contentlimit{
                position: absolute;
                right: 5px;
                }
            }

            input{
                width:568px;
                height:38px;
                border:1px solid #e9e9e9;
                margin-bottom:20px;
                padding:0 15px;
                box-sizing: border-box;
            }

            textarea{
                height:236px;
                width:568px;
                border:1px solid #e9e9e9;
                padding:15px;
                box-sizing: border-box;
            }
            }

            .personal_buttondepart{

            .personal_reslove{
                margin-left:409px;
                width:96px;
                height:36px;
                background:linear-gradient(to right,#58d7fb,#2cabfa);
                border:none;
                border-radius: 36px;
                color:#fff;
                font-size:16px;
                font-weight: bold;
                cursor:pointer;
            }

            .personal_reject{
                margin-left:32px;
                border:none;
                font-size:16px;
                font-weight: bold;
                background:none;
                cursor:pointer;
            }
            }
        }
        .personal_planchangebox{
            width:630px;
            height:434px;
            position:absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            margin:auto;
            background:#fff;
            .personal_planchangetop{
            height:48px;
            background: #2e6ed0;
            text-align: center;
            line-height:48px;
            color:#fff;
            font-size: 16px;
            img{
                margin-right:5px;
            }
            }
            .personal_planchangebody{
            padding: 0 30px;
            .personal_coursename{
                margin-top:20px;
                margin-bottom:15px;
                font-size: 16px;
                font-weight: bold;
                color:#666;
                span{
                color: #2e6ed0;
                }
            }
            .personal_coursebox{
                @extend %clearFix;
                height:56px;
                background: #efefef;

                &::before{
                content:'';
                display: inline-block;
                vertical-align: middle;
                height: 100%;
                }

                .personal_counameright{
                height:56px;
                margin-right:20px;
                float:right;
                &::before{
                    content:'';
                    display: inline-block;
                    vertical-align: middle;
                    height: 100%;
                }
                }
                .personal_courseinname{
                margin-right:20px;
                margin-left:16px;
                }
                .personal_courseimg{
                display: inline-block;
                width:14px;
                height:14px;
                background:url('../assets/per-studystar.png');
                position: relative;
                top:3px;
                margin-right: 6px;
                }
                .personal_starname{
                color:#acacac;
                }
                .personal_gostudy{
                width:68px;
                height:24px;
                border-radius: 24px;
                border:1px solid #f00;
                color:#f00;
                margin-left:68px;
                cursor:pointer;
                }
            }
            .personal_plandata{
                color:#acacac;
            }
            .personal_attention{
                @extend %clearFix;
                .personal_attentiontime{
                    width:50%;
                    float:left;
                    img{
                        margin-right:10px;
                    }
                    span{
                        margin-right:40px;
                    }
                }
                .personal_attentionway{
                    float:left;
                    width:50%;
                    img{
                        margin-right:10px;
                    }
                    span{
                        margin-right:40px;
                    }
                }
            }
            .personal_buttonpart{
                margin-top:40px;
                @extend %clearFix;
                .personal_toright{
                float: right;
                button{
                    font-weight: bold;
                    cursor:pointer;
                    &:first-of-type{
                    width:96px;
                    height:36px;
                    border-radius: 36px;
                    background:#2e6ed0;
                    color:#fff;
                    border:0;
                    }
                    &:last-of-type{
                    width:96px;
                    height:36px;
                    background:#fff;
                    border:0;
                    }
                }
                }
            }
            }
            .el-date-editor{
                width:140px;
                margin-right:20px;
            
                input{
                    height:30px;
                    line-height: 30px;
                }
                .el-input__icon{
                    line-height: 30px;
                }
            }
        }
    }
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