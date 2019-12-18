<template>
    <div class="CourseDetail">
        <header-fix></header-fix>
        <div class="main clearfix">
            <div class="pc-left l">
                <div class="c_left_menu_wrapper1">
                    <div class="treetitle"> 
                        <p><img src="../assets/book-icon.png"> 全部课程</p>
                    </div>
				</div>
                <div class="course-all">
                    <div class="course-all-con">
                        <el-scrollbar
                            wrap-class="view-list"
                            :gutter="4"
                            style="height:100%"
                            wrap-style="color: red;"
                            view-class="view-box" 
                            :native="false"
                        >
                            <div class="course-all-list" v-for="item in channelList" :key="item.id">
                                <div class="title clearfix">
                                    <div class="title-img l">
                                        <no-data-img :src="item.Image"></no-data-img>
                                    </div>
                                    <div class="title-text l">
                                        <p class="title-text1" @click="flChannelClick(item, channelList)" :class="{active:item.state=='open'}">{{item.text}}</p>
                                    </div>
                                </div>
                                <template v-if="item.children">
                                    <ul class="clearfix">
                                        <li v-for="items in item.children" :key="items.id" :title="items.text" :class="{on:items.isClick}" @click="slChannelClick(items, item, channelList)">{{items.text}}</li>
                                    </ul>
                                </template>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="pc-right r">
                <div class="mw-course-brief l">
					<div class="mw-course-brief1 clearfix">
						<div class="mwc-brief1-hd l">
							<img :src="imgUrl+courseContent.Img" v-if="courseContent.Img"/>
                            <img src="../assets/noDataPic2.png" alt="" v-else>
						</div>
						<div class="mwc-brief1-bd l">
							<div class="title" :title="courseContent.Name">
								{{courseContent.Name}}
							</div>
							<div class="s_brief clearfix">
								<p class="l"><span>所属分类:</span>{{courseContent.ChannelName}}</p>
								<p class="r"><span>表现形式:</span>{{courseContent.Type}}</p>
							</div>
							<div class="s_brief clearfix">
								<p class="l"><span>点击次数:</span>{{courseContent.ClickCount}}次</p>
								<p class="r"><span>总学分:</span>{{courseContent.Credit}}分</p>
							</div>
							<div class="brief_pre clearfix">
								<p class="text l">播放进度:</p>
								<el-progress :percentage="progress" :stroke-width="10"></el-progress>
							</div>
							<div class="mwc-brief1-handle clearfix">
                                <!-- <div class="playBtn" @click="toPlay(courseContent.Type, courseContent.Id)">
                                    继续播放
                                </div> -->
                                <router-link class="playBtn" target="_blank" :to="{path: '/playSC', query: { id: courseContent.Id}}">
                                    继续播放
                                </router-link> 
								<div class="collect r">
                                    <section v-if="isFavourite" @click="getFavoriteDelete()">
                                        <img src="../assets/collect-img2.png">
                                        <p>已收藏</p>
                                    </section>
                                    <section v-else @click="getFavoriteAdd()">
                                        <img src="../assets/collect-img.png">
                                        <p>收藏</p>
                                    </section>
								</div>
							</div>
						</div>
					</div>
					<div class="mw-course-brief2">
						<div class="mwc-brief2-title">
							<p>课程简介</p>
							<div class="line clearfix">
								<p class="line1 l"></p>
								<p class="line2 l"></p>
							</div>
						</div>
						<div class="mwc-brief2-con">
							{{courseContent.Description||'暂无简介'}}
						</div>
					</div>
				</div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { headerFix, footerFix, noDataImg } from '../components'
import { CourseCategory, CourseContent, FavoriteExist, FavoriteAdd, FavoriteDelete } from '../service/getData'
import { Message } from 'element-ui'
export default {
    name: 'CourseDetail',
    data () {
        return {
            id: this.$route.query.id,
            imgUrl: '',
            channelList:[],
            courseContent: [],
            progress: 0,
            isFavourite: false,
            ctitle: '',
            channelId: ''
        }
    },
    mounted () {
        this.render()
    },
    methods: {
        flChannelClick (item, menu) {
            this.ctitle = item.text
            this.$router.push({ path: '/courselist', query: { title: this.ctitle } })
        },
        slChannelClick (items, item, menu) {
            this.channelId = items.id
            this.ctitle = item.text
            this.$router.push({ path: '/courselist', query: { title: this.ctitle, channelId: this.channelId } })
        },
        async render () {
            let data = await CourseContent({ id: this.id })
            let favoriteData = await FavoriteExist({ Id: this.id, type: 'Course' })
            let courseCate = await CourseCategory({ channelId: 0, page: '1', rows: '9999' })
            this.courseContent = data.CourseModel
            this.imgUrl = data.ImageCourse
            if (data.CourseModel.BrowseScore < 0) {
                this.progress = 0 
            } else {
                this.progress = data.CourseModel.BrowseScore
            }
            if (favoriteData.Type == 2) {
                this.isFavourite = false
            } else {
                this.isFavourite = true
            }
            courseCate.ListData.forEach((item) => {
                item.state = 'closed'
                if (this.ctitle && this.ctitle == item.text) {
                    item.state = 'open'
                    this.channelId = item.id
                }
                return item
            })
            this.channelList = courseCate.ListData
            // console.log(this.channelList)
        },
        async getFavoriteDelete () {
            let data = await FavoriteDelete({ ids: [this.id], type: 'Course' })
            if (data.Type == 1) {
                Message('您已取消收藏该作品')
                this.isFavourite = false
            }
        },
        async getFavoriteAdd () {
            let data = await FavoriteAdd({ mainId: this.id, type: 'Course' })
            if (data.Type == 1) {
                Message('您已成功收藏该作品')
                this.isFavourite = true
            }
        }
    },
    components: {
        headerFix,
        footerFix,
        noDataImg
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.CourseDetail{
    max-width: 1440px;
    width: 100%;
    margin:0 auto;
    background: url('../assets/bd_background.png') no-repeat;
    .main{
        width: 1000px;
        margin: 5px auto 0;
        .pc-left{
            width: 261px;
            background: #fff;
            padding-bottom: 50px;
            .c_left_menu_wrapper1 {
                width: 100%;
                background: #fff;
                border: 1px solid #EDEDED;
                .treetitle {
                    width: 100%;
                    height: 72px;
                    border-top: 1px solid #fff;
                    background: #2c6ed0;
                    p {
                        width: 100%;
                        height: 72px;
                        line-height: 72px;
                        text-indent: 12px;
                        font-size: 24px;
                        color: #fff;
                    }
                }
            }
            .course-all{
                width: 100%;
                margin-top: 30px;
                height: 785px;
                .course-all-con {
                    width: 240px;
                    margin: 0 auto;
                    overflow-x: hidden;
                    height: 785px;
                    .el-scrollbar__wrap {
                        overflow-x: hidden;
                    }
                    .el-scrollbar__thumb{
                        background-color: #2c6ed0;
                    }
                    .el-scrollbar__bar.is-horizontal {
                        display: none;
                    }
                    .course-all-list {
                        margin-bottom: 20px;
                        .title {
                            width: 100%;
                            .title-img {
                                width: 70px;
                                height: 64px;
                                img {
                                    width: 70px;
                                    height: 64px;
                                }
                            }
                            .title-text {
                                margin-left: 10px;
                                .title-text1 {
                                    color: #2c6ed0;
                                    font-size: 16px;
                                    height: 24px;
                                    line-height: 24px;
                                    font-weight: bold;
                                    margin-top: 10px;
                                    cursor: pointer;
                                    &.active{
                                        color: #ff9c08;
                                    }
                                }
                                .title-text2 {
                                    color: #bbbbbb;
                                    font-size: 12px;
                                    height: 20px;
                                    line-height: 20px;
                                }
                            }
                        }
                        ul {
                            margin-right: -9px;
                            li {
                                float: left;
                                width: 106px;
                                height: 32px;
                                margin-right: 8px;
                                margin-top: 10px;
                                line-height: 32px;
                                text-align: center;
                                color: #555;
                                background: #f4f4f4;
                                font-size: 14px;
                                cursor: pointer;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                &:hover{
                                    color: #fff;
                                    background: url("../assets/school-list.png")
                                }
                                &.on{
                                    color: #fff;
                                    background: url("../assets/school-list.png")
                                }
                            }
                        }
                    }
                }
            }
        }
        .pc-right{
            width: 725px;
            .mw-course-brief{
                width: 705px;
                .mw-course-brief1 {
                    width: 685px;
                    padding: 20px;
                    height: 240px;
                    background: #fff;
                    .mwc-brief1-hd {
                        width: 300px;
                        height: 240px;
                        img {
                            width: 300px;
                            height: 240px;
                        }
                    }
                    .mwc-brief1-bd {
                        width: 350px;
                        margin-left: 30px;
                        .title {
                            font-weight: bold;
                            color: #555;
                            font-size: 20px;
                            line-height: 36px;
                            @include ellipsis_two();
                        }
                        .s_brief {
                            width: 100%;
                            line-height: 27px;
                            color: #989898;
                            p {
                                width: 140px;
                                text-align: left;
                                span {
                                    margin-right: 10px;
                                    width: 60px;
                                    text-align: right;
                                    display: inline-block;
                                }
                            }
                        }
                        .brief_pre{
                            color: #989898;
                            margin-top: 10px;
                            .el-progress{
                                float: left;
                                width: 280px;
                                margin-left: 5px;
                                margin-top: 2px;
                                .el-progress-bar{
                                    width:270px;
                                }
                                .el-progress__text{
                                    font-size: 14px!important;
                                }
                            }
                        }
                        .mwc-brief1-handle{
                            margin-top: 20px;
                            border-top: 1px solid #e8e8e8;
                            padding-top: 20px;
                                .playBtn {
                                float: left;
                                display: block;
                                width: 122px;
                                height: 47px;
                                line-height: 40px;
                                color: #fff;
                                font-size: 16px;
                                text-align: center;
                                background: url('../assets/play-bg.png') no-repeat;
                                cursor: pointer;
                            }
                            .collect {
                                text-align: center;
                                cursor: pointer;
                                img {
                                    width: 24px;
                                    height: 24px;
                                    display: block;
                                    margin: 0 auto;
                                }
                                p {
                                    height: 20px;
                                    line-height: 20px;
                                    color: #999;
                                }
                            }
                        }
                    }
                }
                .mw-course-brief2 {
                    width: 685px;
                    padding: 20px;
                    background: #fff;
                    margin-top: 15px;
                    height: 220px;
                    .mwc-brief2-title {
                        p {
                            font-size: 18px;
                            font-weight: bold;
                            line-height: 21px;
                            color: #555;
                        }
                        .line {
                            margin-top: 10px;
                            .line1 {
                                width: 70px;
                                height: 3px;
                                background: #66a3fd;
                            }
                            .line2 {
                                width: 685px;
                                height: 1px;
                                background: #e8e8e8;
                                margin-top: 1px;
                            }
                        }
                    } 
                    .mwc-brief2-con{
                        line-height: 30px;
                        color: #555;
                        padding-top: 10px;
                        @include ellipsis_two(6)
                    }
                }
            }
        }
    }
}
</style>