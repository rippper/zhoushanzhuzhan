<template>
    <div class="playSC">
        <div style="display:none" class="getToken"></div>
        <div class="main clearfix">
            <div class="video l" id="video">
                <div id="myplayer" ref="myplayer" v-if="showPlayMp4"></div>
                <div id="h5" v-if="showPlayH5">
                    <iframe v-if="isH5" frameborder="0" :src="H5src"></iframe>
                    <img v-if="!isH5" :src="H5src" alt="">
                </div>
                <div id="JY" v-if="showPlayJy">
                    <iframe frameborder="0" :src="jyIframeSrc"></iframe>
                </div>
                <div id="multiMedia" v-if="showPlayMultiMedia">
                    <iframe frameborder="0" :src="multiMediaSrc"></iframe>
                </div>
                <div id="nativeCourse" v-if="showPlayNative">
                    <iframe frameborder="0" :src="nativeSrc" ></iframe>
                </div>
                <div id="pdfCourse" v-if="showPlayPdf">
                    <div class="pdfVideo">
                        <iframe :src="pdfSrc" frameborder="0"></iframe>
                    </div>
                </div>
                <div id="Scorm" v-if="showPlayScorm">
                    <iframe frameborder="0" :src="scormIframeSrc"></iframe>
                </div>
                <div id="JyScorm" v-if="showPlayJyScorm">
                    <iframe frameborder="0" :src="jyScormSrc"></iframe>
                </div>
            </div>
            <!-- 名称：mp4测试 -->
            <div class="comment l" id="comment">
                <div class="toggleSid">
                    <img src="../assets/slide-left.jpg" alt="" v-if="noFullScreen" @click="fullScreen()">
                    <img src="../assets/slide-right.jpg" alt="" v-else @click="noFullScreenF()">
                </div>
                <div class="side_section">
                    <div class="side_info">
                        <div class="info">
                            <div class="name">
                                {{resultCourseDetail.Name}}
                            </div>
                            <div class="text clearfix">
                                <p class="l">教师: {{resultCourseDetail.Teacher || '暂无'}}</p>
                                <p class="r">时长：{{resultCourseDetail.Duration}}</p>
                            </div>
                            <div class="rate">
                                <el-rate
                                    v-model="valueStar"
                                    :colors="colors"
                                    void-color="#409EFF"
                                    score-template="{valueStar}">
                                    >
                                </el-rate>
                            </div>
                            <div class="progress">
                                <el-progress :percentage="browseScore" :stroke-width="10"></el-progress>
                            </div>
                            <div class="describe">
                                课程描述：{{resultCourseDetail.Description}}
                            </div>
                        </div>
                        <div class="myTab">
                            <section class="myTabTitle">
                                <p class="tab active" @click="tabClick(1)"><i class="el-icon-edit-outline"></i>笔记</p>
                                <p class="tab" @click="tabClick(2)"><i class="el-icon-tickets"></i>评论</p>
                            </section>
                            <section class="myTabCon">
                                <div class="tab-panel clearfix" v-if="noteShow">
                                    <input type="text" v-model="noteTitle" class="tpTitle" placeholder="标题">
                                    <textarea name="" v-model="noteText" placeholder="请输入笔记内容"></textarea>
                                    <el-button @click="saveNote()">保存</el-button>
                                    <div style="clear:both"></div>
                                    <div class="courseNote">
                                        <ul> 
                                            <!-- v-for="item in courseNoteList" :key="item.Id" -->
                                            <li class="clearfix" v-for="item in noteList" :key="item.Id">
                                                <div class="title clearfix">
                                                    <div class="name l">
                                                        标题:{{item.Name}}
                                                    </div>
                                                    <div class="time r">
                                                        {{item.CreateDate|dateFilter3('yyyy-MM-dd')}}
                                                    </div>
                                                </div>
                                                <div class="content">
                                                    {{item.Content}}
                                                </div>
                                                <div class="delete" @click="deleteNoteH(item.Id)">
                                                    <el-button>删除</el-button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="tab-panel clearfix" v-if="commentShow">
                                        <el-rate
                                        v-model="valueStar2"
                                        :colors="colors"
                                        void-color="#409EFF"
                                        score-template="{valueStar2}">
                                        >
                                    </el-rate>
                                    <textarea name="" id="" v-model="commentText" placeholder="请输入评论内容"></textarea>
                                    <el-button @click="getCourseCommentAdd()">保存</el-button>
                                    <div style="clear: both"></div>  
                                    <div class="courseComment">
                                        <ul> 
                                            <li v-for="item in courseCommentList" :key="item.Id">
                                                <div class="title clearfix">
                                                    <div class="name l">
                                                        用户:{{item.UserName}}
                                                    </div>
                                                    <div class="time r">
                                                        {{item.CreateDate|dateFilter3('yyyy-MM-dd')}}
                                                    </div>
                                                </div>
                                                <div class="content">
                                                    {{item.Comment}}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- 课间测验modal框 -->
            <el-dialog
                title="课间小测验"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose"
            >
            <div class="dg-body" >
                <section v-if="questionItem[0]">
                    <div class="dgb-title">
                        {{questionItem[0].title}}
                    </div>
                    <ul>
                        <li v-for="(item, index) in questionItem[0].options" 
                            :key="index"
                            @click="optionSelect(questionItem[0].options, item, index)"
                            :class="{
                                optionSelectCheck: item.isClick == true && item.isCheck == false,
                                optionSelectWrong: item.isClick == true && item.isCheck == true && questionItem[0].answer != item.flag
                            }"
                            >
                            {{item.showFlag}}.{{item.title}}
                        </li>
                    </ul>
                </section>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkOptionAnswer(questionItem[0], questionItem[0].options)">确 定</el-button>
            </span>
            </el-dialog>   
    </div>
</template>

<script>
import { Play, PlayJY, PlayJwplay, CourseComment2, AddNote, AntiForgeryToken, DelNote, CourseCommentAdd } from '../service/getData'
import Api from '../service/api'
// import Axios from 'axios'
import Vue from 'vue'
import fetch from '../service/fetch'
import { formatDate, rsaEnscrypt } from '../service/utils'
import { Message } from 'element-ui'
let ListDiv = Vue.extend({
    template: '<ul class="urllist"><li v-for="(item,index) in data" @click="getQuaUrl(item,index)" :data-url="item.Url" :class="{active:item.Quality == 0}"><span v-if="item.Quality == 0">标清</span><span v-if="item.Quality == 1">高清</span><span v-if="item.Quality == 2">超清</span><span v-if="item.Quality == 3">1080</span></li></ul>',
    methods: {
        getQuaUrl (item, index) {
            this.$emit('getQua', item, index)
        }
    },
    props: {
        data: Array
    },
    created () {
    }
})
export default {
    data () {
        return {
            videoSrc: '',
            id: '',
            valueStar: 0,
            valueStar2: 0,
            boxValue: 0,
            colors: ['#ea544a', '#ea544a', '#ea544a'],
            noteShow: true,
            dialogVisible: false,
            commentShow: false,
            noFullScreen: true,
            noteTitle: '',
            noteText: '',
            userId: '',
            allPlayInfo: {},
            commentList: [],
            commentText: '',
            noteList: [],
            loadOnce: 0,
            browseScore: 0,
            play: '',
            playType: '',
            playUrl: {},
            options: '',
            resultCourseDetail: {},
            resultCourseNote: {},
            player: null,
            playMp4Data: {},
            params: null,
            listStr: '',
            timeStack: [],
            questionObj: {},
            question: {},
            questionItem: [],
            MportalId: '',
            MlastPosition: '',
            MlastLocation: '',
            checkedAnswer: 0,
            urls: '',
            MuserId: '',
            McourseId: '',
            increaseTimer: null,
            MprocessCheckTimer: null,
            trailTimer: null,
            playStatus: 'stop',
            MtimePool: {
                startTime: 0,
                increaseTime: 0,
                totalTime: 0
            },
            k: 0,
            timerI: null,
            jwwarning: null,
            AntiForgeryToken: '',
            courseCommentList: [],
            checkedIndex: '',
            position1: '',
            showPlayMp4: false,
            showPlayJy: false,
            jyIframeSrc: '',
            showPlayScorm: false,
            scormIframeSrc: '',
            showPlayPdf: false,
            pdfSrc: '', // pdf文件地址
            showPlayJyScorm: false,
            jyScormSrc: '',
            showPlayMultiMedia: false,
            multiMediaSrc: '',
            showPlayNative: false,
            nativeSrc: false,
            showPlayH5: false,
            H5src: '',
            isH5: false,
            H5time: 0
        }
    },
    mounted () {
        this.getAntiForgeryToken()
        this.getVideo()
        this.getCourseComment()
    },
    created () {
        this.id = this.$route.query.id
        // this.pdfSrc = pdf.createLoadingTask(this.pdfSrc)
    },
    methods: {
        async getVideo () {
            let response = await Play({ id: this.id })
            console.log(response)
            if (response.Status == 200) {
                this.allPlayInfo = response.Data
                this.videoSrc = response.Data.PlayPage
                this.userId = response.Data.UserId
                this.noteList = response.Data.resultCourseNote
                // this.beforeUnLoad(this.userId)
                if (response.Data && response.Data.Content == null) {
                    if ((response.Data.PortalId) && (response.Data.UserId) && (response.Data.CourseId)) {
                        // refresh
                        if (this.loadOnce == 0) {
                            this.refresh(this.allPlayInfo.PortalId, this.allPlayInfo.UserId, this.allPlayInfo.CourseId)
                            this.loadOnce = 1
                        }
                        this.options = response.Data.PlayPage
                        this.playUrl.url = response.Data.PlayPage
                        this.playType = response.Data.PlayType
                        this.resultCourseDetail = response.Data.resultCourseDetail
                        console.log(this.resultCourseDetail.Duration)
                        this.resultCourseNote = response.Data.resultCourseNote
                        this.browseScore = Number(response.Data.resultCourseDetail.BrowseScore)
                        this.valueStar = response.Data.resultCourseDetail.StudentGrade
                        if (this.playType == 'Single') {
                            this.showPlayMp4 = true
                        } else if (this.playType == 'JYAicc') {
                            this.showPlayJy = true
                        } else if (this.playType == 'Scorm') {
                            this.showPlayScorm = true
                        } else if (this.playType == 'Office') {
                            this.showPlayPdf = true
                        } else if (this.playType == "JYScorm") {
                            this.showPlayJyScorm = true
                        } else if (this.playType == "VR" || this.playType == "H5RichCourse") {
                            this.showPlayMultiMedia = true
                        } else if (this.playType == "NativeRichCourse") {
                            this.showPlayNative = true
                        } else if (this.playType == "H5") {
                            this.showPlayH5 = true
                        }
                    } else {
                        alert('数据无效，请检查api')
                        window.close()
                    }
                } else if (response.Data && response.Data.Content) {
                    alert('同时只能打开一门课程,请关闭之前页面,并于' + response.Data.Content + '秒后重试！')
                    window.close()
                }
                this.getVideoData()
            } else {
                alert(response.Message)
                window.close()
            }
        },
        async getAntiForgeryToken () {
            let data = await AntiForgeryToken()
            let html = data.html
            let anti = document.querySelectorAll('.getToken')
            anti[0].insertAdjacentHTML('beforeend', html)
            this.AntiForgeryToken = document.querySelectorAll('.getToken input')[0].value
        },
        beforeUnLoad (id) {
            fetch.post(Api.ClearPlayingCourse.url + '?' + Math.round(Math.random() * 10000), { userid: id }).then({
                function (response) {
                } 
            })
        },
        tabClick (num) {
            let tabLi = document.getElementsByClassName('tab')
            for (let i = 0; i < tabLi.length; i++) {
                tabLi[i].classList.remove('active')
                if (num == 1) {
                    this.noteShow = true
                    this.commentShow = false
                    tabLi[0].classList.add('active')
                } else if (num == 2) {
                    this.noteShow = false
                    this.commentShow = true
                    tabLi[1].classList.add('active')
                }
            }
        },
        fullScreen () {
            this.noFullScreen = false
            let commentDiv = document.getElementById('comment')
            let videoDiv = document.getElementById('video')
            commentDiv.classList.add('commentW1')
            videoDiv.classList.add('videoW1')
        },
        noFullScreenF () {
            this.noFullScreen = true
            let commentDiv = document.getElementById('comment')
            let videoDiv = document.getElementById('video')
            commentDiv.classList.remove('commentW1')
            videoDiv.classList.remove('videoW1')
        },
        refresh (PortalId, userId, courseid) {
            let errorTimes = 0
            let fresh = () => {
                let dateNow = new Date()
                let now = formatDate(dateNow, 'yyyy-MM-dd hh:mm:ss')
                // let now = new Date().format('yyyy-MM-dd hh:mm:ss')
                fetch.post(Api.Refresh.url, {
                    PortalId: PortalId,
                    userId: userId,
                    courseid: courseid,
                    time: now
                    }, { timeout: 10000 }
                ).then((data) => {
                    errorTimes = 0
                    if (data) {
                        if (data.Type === 401) {
                            clearTimeout(timer)
                            document.body.innerHTML = '' // 屏蔽页面
                            if (confirm('消息：用户已登出，是否登陆？  点击取消将关闭页面')) {
                                this.$router.push('userLogin')
                            } else {
                                window.close()
                            }
                        } else if (data.Type == 1) {
                            //console.log(data.Type)
                        } else {
                            clearTimeout(timer)
                            document.body.innerHTML = ''
                            alert(data.Message)
                            this.$router.push('/')
                        }
                    } else {
                        clearTimeout(timer)
                        document.body.innerHTML = ''
                        alert('出现错误 将返回首页')
                        this.$router.push('/')
                    }
                    // eslint-disable-next-line 
                    }).catch((error, status) => {
                        // console.log(error)
                        errorTimes++
                        if (errorTimes === 3) {
                            errorTimes = 0
                            alert('和平台通讯出错！')
                        }
                    })
                }
            var timer = setInterval(fresh, 10000)
            return timer
        },
        initVideo (url) {
            // eslint-disable-next-line
            this.player = jwplayer('myplayer').setup({
                flashplayer: '../plugins/jwplayer/jwplayer.flash.swf',
                file: url,
                autostart: 'true',
                width: '100%',
                height: '100%'
            })
            this.initPlay()
            this.timerI = setInterval(this.func_, 1000)
        },
        getVideoData () {
            if (this.playType == 'Single') {
                this.getMp4Data()
            } else if (this.playType == 'JYAicc') {
                this.getJYData()
            } else if (this.playType == 'Scorm') {
                this.getScormData()
            } else if (this.playType == 'Office') {
                this.getPdfData()
            } else if (this.playType == "JYScorm") {
                this.getJYScormData()
            } else if (this.playType == "VR" || this.playType == "H5RichCourse") {
                this.getVRHCData()
            } else if (this.playType == "NativeRichCourse") {
                this.getNRCData()
            } else if (this.playType == "H5") {
                this.getH5Data()
            }
        },
        async getMp4Data () {
            let response = await PlayJwplay({ courseid: this.allPlayInfo.CourseId })
            this.playMp4Data = response.Data
            this.MportalId = response.Data.PortalId
            this.urls = response.Data.Urls
            this.MuserId = response.Data.UserId
            this.McourseId = response.Data.CourseId
            this.MlastPosition = response.Data.LastPostion
            this.MlastLocation = response.Data.Location
            this.question = response.Data.Question
            this.question.map((item) => {
                this.timeStack.push(item.time)
                this.questionObj[item.time] = item
            })
            this.initVideo(this.playMp4Data.Url)
        },
        async getJYData () {
            let response = await PlayJY({ courseid: this.allPlayInfo.CourseId })
            // let playMJyData = response.Data
            let BatchId = response.Data.BatchId
            let CourseId = response.Data.CourseId
            // let LastPostion = response.Data.LastPostion
            let PortalId = response.Data.PortalId
            let PortalURL = response.Data.PortalURL
            let Url = response.Data.Url
            let UserId1 = response.Data.UserId
            this.jyIframeSrc = Url + '?url=' + PortalURL + '/api/CourseProcess/JYProcess?batchId=' + BatchId + '&portalId=' + PortalId + '&UserId=' + UserId1 + '&courseId=' + CourseId
            if (!PortalId || !UserId1 || !CourseId) {
                alert('数据无效，请检查api')
                window.close()
            } else if (!Url || !PortalURL) {
                alert('没有视频资源!')
                window.close()
            }
        },
        async getH5Data () {
            let response = await PlayJwplay({ courseid: this.allPlayInfo.CourseId })
            if (response.Data.Url.indexOf('.html') > -1) {
                this.isH5 = true
            } else {
                this.isH5 = false
            }
            this.H5src = response.Data.Url
            this.PortalId = response.Data.PortalId
            this.userId = response.Data.UserId
            this.courseid = response.Data.CourseId
            setInterval(() => {
                this.H5time++
                if (this.H5time % 15 === 0 && this.H5time > 0) {
                    this.sendH5Progress(this.H5time)
            }
            }, 1000)
        },
        async getScormData () {
            if (this.allPlayInfo) {
                this.scormIframeSrc = this.playUrl.url
            }
        },
        async getPdfData () {
            if (this.allPlayInfo) {
                this.pdfSrc = this.playUrl.url
                // console.log(this.pdfSrc, 999)
            }
        },
        async getJYScormData () {
            if (this.allPlayInfo) {
                this.jyScormSrc = this.playUrl.url
            }
        },
        async getVRHCData () {
            if (this.allPlayInfo) {
                this.multiMediaSrc = this.playUrl.url
            }
        },
        async getNRCData () {
            if (this.allPlayInfo) {
                this.nativeSrc = this.playUrl.url
            }
        },
        sendH5Progress: function (t) {
            fetch.post(Api.SingleProcess.url, {
                PortalId: this.PortalId,
                userid: this.userId,
                courseid: this.courseid,
                positionen: rsaEnscrypt(t.toString())
            }, this.AntiForgeryToken).then((data) => {
                this.browseScore = data.BrowseScore
                // console.log(this.browseScore, 999)
            }, function () {
                alert("网路异常，将刷新!")
                window.location.reload()
            })
        },
        _sendProcess: function () {
            if (this.player.getPosition()) {
                fetch.post(Api.SingleProcess.url, {
                    PortalId: this.MportalId,
                    userid: this.MuserId,
                    courseid: this.McourseId,
                    positionen: rsaEnscrypt(this.player.getPosition().toString())
                }).then((data) => {
                    this.browseScore = data.BrowseScore
                }).catch((error) => {
                    // console.log(error)
                    alert('网路异常，将刷新!')
                    window.location.reload()
                })
            }
            setTimeout(this._sendProcess, 30000) // 30s发送一次进度
        },
        // 时间池流程：时间池为最后一次进度时间累加当前播放页停留时间，即允许用户随意拖动，不影响进度时间
        _TimePoolInstall: function () {
            this.MtimePool.startTime = parseFloat(this.MlastLocation) + 1
            this.increaseTimer = setInterval(() => {
                // 只有在播放且当前播放位置接近时间池时，时间池才会向前走
                if (this.player.getState() == 'PLAYING' && this.player.getPosition() > (this.MtimePool.totalTime - 5)) {
                    this.MtimePool.increaseTime += 1
                }
            }, 1000)
            this.MprocessCheckTimer = setInterval(this._processCheck, 1000)
        },
        _processCheck: function () {
            this.MtimePool.totalTime = this.MtimePool.startTime + this.MtimePool.increaseTime
            let curProcess = this.player.getPosition() - 3
            this.position1 = Math.floor(this.player.getPosition())
            if (this.player.getState() == 'PLAYING') {
                if (curProcess > this.MtimePool.totalTime) {
                    this.playStatus = 'stop'
                    this.player.play(false)
                    Message('请不要在未播放区域拖动，否则可能丢失进度！')
                    this.player.seek(this.MtimePool.totalTime - 1)
                    this.playStatus = 'play'
                }
            }
            if (this.timeStack.indexOf(this.position1) > -1) {
                clearInterval(this.MprocessCheckTimer)
                this.playStatus = 'stopTest'
                this.checkedAnswer = 0
                this.dialogVisible = true
                this.player.play(false)
                this.questionItem = this.questionObj[this.position1].Item
            }
        },
        _jwWarning: function () {
            let jwrail = document.getElementsByClassName('jwrail')
            let theWidth = jwrail[0].offsetWidth
            let left1 = this.MtimePool.totalTime / this.player.getDuration() * theWidth
            let jwoverlay = document.getElementsByClassName('jwoverlay')
            let left2 = parseInt(jwoverlay[0].offsetWidth, 10)
            this.jwwarning.style.left = jwoverlay[0].offsetWidth
            if (left1 < left2) {
              this.jwwarning.style.display = 'block'
            } else {
              this.jwwarning.style.display = 'none'
            }
        },
        // 启动时间池样式捕捉时间池;
        // 多次触发开关
        func_: function () {
            if (this.k < 1) {
              let jwrail = document.getElementsByClassName('jwrail')
              let bufferJ = document.querySelectorAll('.jwrail .Buffer')
              if (jwrail.length >= 1) {
                jwrail[0].insertAdjacentHTML('beforeend', '<span id="jwwarning">禁止拖动至此</span>')
                this.jwwarning = document.getElementById('jwwarning')
                bufferJ[0].insertAdjacentHTML('afterend', '<span class="jwwarningbuffer"></span>')
                let jwduration = document.querySelectorAll('.jwright .jwduration')
                jwduration[0].insertAdjacentHTML('afterend', '<span class="jwquality"><i class="qualityname">高清</i></span>')
                let jwquality = document.querySelector('.jwquality')
                let _this = this
                let ld = new ListDiv({ propsData: { data: _this.urls } }).$mount()
                ld.$on('getQua', (item, index) => {
                    let url1 = item.Url
                    let position = this.player.getPosition()
                    let qualityname = document.querySelectorAll('.qualityname')
                    if (qualityname[0].innerHTML.trim() != item.Name) {
                        qualityname[0].innerHTML = item.Name
                        _this.player.pause(true)
                        let liName = document.querySelectorAll('.urllist li')
                        for (let j = 0; j < liName.length; j++) {
                            liName[j].classList.remove('active')
                            liName[index].classList.add('active')
                            _this.player.url = url1
                            _this.player.play(true)
                            _this.player.seek(position)
                        }
                    }
                })
                jwquality.append(ld.$el)
                let jwright = document.querySelectorAll('.jwright')
                this.k++
                let jwwarningbuffer = document.querySelectorAll('.jwwarningbuffer')
                this.trailTimer = setInterval(() => {
                  let theTime1 = this.MtimePool.totalTime
                  let duration = this.player.getDuration()
                  let theWidth1 = jwrail[0].offsetWidth
                  let cssLeft = (theTime1 < duration ? (theTime1 / duration * theWidth1 + 'px') : (duration / duration * theWidth1 + 'px'))
                  jwwarningbuffer[0].style.left = cssLeft
                }, 100)
                window.clearInterval(this.timerI)
                jwrail[0].onmousemove = () => {
                  this._jwWarning()
                }
                jwrail[0].onmouseout = () => {
                  jwright[0].style.display = 'none'
                }
              }
            }
        },
        initPlay: function () {
            // 启动时间池;
            this._TimePoolInstall()
            // 启动定期发送进度;
            setTimeout(this._sendProcess, 8000)
            // 从上次播放位置开始播放;
            if (this.MlastPosition != null && this.MlastPosition != '无数据') {
            //   console.log(this.MlastPosition, 888)
              this.playStatus = 'play'
              this.player.seek(this.MlastPosition)
            }
        },
        handleClose (done) {
        },
        async getCourseComment () {
            let data = await CourseComment2({ id: this.id, page: 1, rows: 100, sort: 'Id', order: 'Desc' })
            console.log(data)
            this.courseCommentList = data.Data.ListData
        },
        optionSelect (arr, item, index) {
            arr.forEach((itemS) => {
               this.$set(itemS, 'isClick', false)
               this.$set(itemS, 'isCheck', false)
            })
            item.isClick = true
            this.checkedIndex = index
        },
        checkOptionAnswer (obj, arr) { 
            // isCheck 为要检查的选项 错误才变红 
            arr.forEach((itemS) => {
               this.$set(itemS, 'isCheck', false)
            })
            arr[this.checkedIndex].isCheck = true
            if (obj.answer == arr[this.checkedIndex].flag) {
                this.dialogVisible = false
                this.position1 += 1
                this.player.seek(this.position1)
                this.player.play(true)
                setTimeout(() => {
                    this.MprocessCheckTimer = setInterval(this._processCheck(), 1000)
                }, 500)
            }
        },
        async saveNote () {
            let data = await AddNote({
                Name: this.noteTitle,
                Content: this.noteText,
                CourseId: this.id,
                __RequestVerificationToken: this.AntiForgeryToken
            })
            Message('笔记添加成功')
            this.getVideo() 
        },
        async deleteNoteH (id) {
            let data = await DelNote({
                Id: id,
                __RequestVerificationToken: this.AntiForgeryToken
            })
            Message('笔记删除成功')
            this.getVideo() 
        },
        async getCourseCommentAdd () {
            let data = await CourseCommentAdd({
                mainId: this.id,
                parentId: 0,
                rate: this.valueStar2,
                content: this.commentText,
                __RequestVerificationToken: this.AntiForgeryToken
            })
            this.commentText = ''
            if (data.IsSuccess) {
                Message('评论添加成功')
                this.getCourseComment()
            } else {
                Message(data.Message)
            }
        }
    },
    watch: {
    },
    destroyed () {
        clearInterval(this.increaseTimer)
        clearInterval(this.MprocessCheckTimer)
        clearInterval(this.trailTimer)
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .playSC{
        background: #ebebeb;
        height: 100vh;
        .main{
            width: 100%;
            font-size: 14px;
            height: 100%;
            .video{
                overflow: hidden;
                position: relative;
                height: 100%;
                width: 99%;
                #myplayer{
                    .jwgroup .jwrail .jwwarning {
                        display: none;
                        position: relative;
                        line-height: 30px;
                        border-radius: 5px;
                        margin-top: -35px;
                        margin-left: 30px;
                        padding: 0px 5px;
                        z-index: 1007;
                        left: 0;
                        color: #f0ad4e;
                        background-color: rgba(62, 62, 64, 0.8);
                        border: 1px solid #111;
                    }
                    .jwgroup .jwrail .jwwarningbuffer {
                        height: 30px;
                        width: 5px;
                        border-radius: 5px;
                        background-color: #f0ad4e;
                    }
                    .jwcontrolbar .jwcenter {
                        right: 150px !important;
                    }
                    .jwright .jwquality {
                        position: relative;
                        top: -4px;
                        width: 46px;
                        height: 34px;
                        font-size: 12px;
                        line-height: 36px;
                        color: rgb(210,210,210);
                        text-align: center;
                        cursor: pointer;
                    }
                    .jwright .jwquality i {
                        font-style: normal;
                    }
                    .jwright .jwquality:hover .urllist {
                        display: block;
                    }
                    .jwright .jwquality .urllist {
                        display: none;
                        position: absolute;
                        padding: 10px;
                        bottom: 34px;
                        background: #3c3c3f;
                        border-radius: 4px;
                    }
                    .jwquality .urllist li {
                        text-align: center;
                        color: rgb(210,210,210);
                        span{
                            color: #fff;
                        }
                    }
                    .jwquality .urllist li:hover span,
                    .jwquality .urllist li.active span{
                        color: #ec4747;
                    }
                }
                #h5 {
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                    img {
                        display: block;
                        margin: 0 auto;
                    }
                }
                #multiMedia {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                #JY {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                #nativeCourse {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                #JyScorm {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                #pdfCourse{
                    width: 100%;
                    iframe {
                        width: 100%;
                        height: 100vh;
                    }
                }
                #Scorm {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100vh;
                    }
                }
            }  
            .videoW1{
                width: 74%;
                height: 625px;
            }
            .comment{
                position: relative;
                width: 1%;
                height: 100%;
                padding-left: 0;
                overflow: hidden;
                z-index: 1000;
                .toggleSid{
                    width: 12px;
                    height: 83px;
                    cursor: pointer;
                    display: inline-block;
                    margin-top: 250px;
                    position: absolute;
                    z-index: 1000;
                    left: 0;
                }
                .side_section{
                    // display: none;
                    background: #ebebeb;
                    height: 100%;
                    z-index: 1001;
                    width: 92%;
                    position: absolute;
                    left: 28px;
                    .side_info{
                        background: #ebebeb;
                        min-height: 100px;
                        padding: 14px 10px;
                        .info{
                            width: 80%;
                            color: #666;
                            font-size: 12px;
                            line-height: 20px;
                            .name{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                text-align: left;
                                font-size: 14px;
                                color: #323232;
                                line-height: 28px;
                                font-weight: normal;
                            }
                            .progress{
                                padding: 5px 0;
                                .el-progress-bar__outer{
                                    background: #fff;
                                }
                            }
                            .describe{
                                color: #656565;
                                margin-top: 7px;
                                font-size: 12px;
                                word-spacing: 4px;
                                text-align: justify;
                            }
                            
                        }
                        .myTab{
                            margin-top: 10px;
                            margin-left: 10px;
                            .myTabTitle{
                                @extend %clearFix;
                                p{
                                    float:left;
                                    padding: 12px 20px;
                                    font-size: 16px;
                                    color: #333;
                                    border: 2px solid #d3d3d3;
                                    background-color: #e6e6e6;
                                    color: #666;
                                    border-bottom-color: transparent;
                                    cursor: pointer;
                                    &.active{
                                        color: #333;
                                        background-color: #fff;
                                        border: 2px solid #d9d9d9;
                                        border-bottom-color: transparent;
                                        text-align: center;
                                    }
                                }
                            }
                            .myTabCon{
                                overflow: hidden;
                                margin-top: 20px;
                                .tab-panel{
                                    .tpTitle{
                                        margin-bottom: 15px;
                                        width: 90%;
                                        height: 34px;
                                        padding: 6px 12px;
                                        background-color: #fff;
                                        background-image: none;
                                        border: 1px solid #ccc;
                                        border-radius: 4px;
                                        font-size: 14px;
                                        line-height: 1.42857143;
                                        color: #555;
                                        display: block;
                                    }
                                    textarea{
                                        margin-top: 5px;
                                        padding: 6px 12px;
                                        background-color: #fff;
                                        background-image: none;
                                        border: 1px solid #ccc;
                                        border-radius: 4px;
                                        width: 90%;
                                        height: 80px;
                                        margin-bottom: 15px;
                                    }
                                    .el-button{
                                        float:right;
                                        margin-right: 5% 
                                    }
                                    .courseComment{
                                        overflow: auto;
                                        max-height: 300px;
                                        ul{
                                            li{
                                                border-bottom: 1px solid #ccc;
                                                padding: 10px;
                                                .title{
                                                    padding: 5px 0;
                                                    text-align: left;
                                                    .name{
                                                        font-size: 14px;
                                                        color: #333;
                                                    }
                                                    .time{
                                                        color: #999;
                                                        font-size: 12px;
                                                    }
                                                }
                                                .content{
                                                    padding: 5px 0;
                                                    text-align: left;
                                                }
                                            }
                                        }
                                    }
                                    .courseNote{
                                       ul{
                                           li{
                                               border-bottom: 1px solid #ccc;
                                               padding: 10px;
                                               .title{
                                                   padding: 5px 0;
                                                    text-align: left;
                                                    .name{
                                                        width: 170px;
                                                        font-size: 14px;
                                                        color: #333;
                                                    }
                                                    .time{
                                                        color:#999;
                                                        font-size: 12px;
                                                    }
                                                }
                                                .content{
                                                    padding: 5px 0;
                                                    text-align: left;
                                                }
                                                .delete{
                                                    float: right;
                                                    .el-button{
                                                        padding: 5px 12px; 
                                                    }
                                                }
                                           }
                                       }
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .commentW1{
                width: 24%;
                padding-left: 24px;
            }
        }
        .el-dialog__wrapper{
            .el-dialog__header{
                border-bottom: 1px solid #e5e5e5;
                .el-dialog__headerbtn{
                    display: none
                }
            }
            .el-dialog__body{
                .dg-body{
                    .dgb-title{
                        background: #DDD;
                        padding: 10px;
                        font-size: 16px;
                        line-height: 2;
                        margin-bottom: 20px;
                        border-radius: 4px;
                        border-bottom: 1px solid #e5e5e5;
                    }
                    ul{
                        li{
                            width: 100%;
                            padding: 10px;
                            background: #EEE;
                            border-radius: 4px;
                            margin-bottom: 15px;
                            &.optionSelectCheck{
                                background:#cfe8fb;
                            }
                            &.optionSelectWrong{
                                background:#f0ccce;
                            }
                        }
                    }
                } 
            }
        }
    }
</style>
