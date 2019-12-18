<template>
    <div class="CourseList">
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
                                        <li v-for="items in item.children" :key="items.id" :title="items.text" :class="{on:items.isClick}" @click="slChannelClick(items, channelList)">{{items.text}}</li>
                                    </ul>
                                </template>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="pc-right r">
                 <div class="cm-lesson-type">
                        <ul>
                            <li v-for="(item, index) in typeforsearch" :key="index" @click="courseTypeSwitch(index, item.Type)">
                                <img :src="item.typeIcon" alt="" v-show="item.itemAction == 0 ? 1 : 0">
                                <img :src="item.typeAction" alt="" v-show="item.itemAction == 1 ? 1 : 0">
                                <span v-text="item.typeName" ref="makeDiffer"></span>
                            </li>
                        </ul>
                    </div>
                <div class="cm-lesson">
                    <div class="cm-lesson-top clearfix">
                        <div class="cm-lesson-top1 l">
                            全部课程
                        </div>
                        <!-- <div class="cm-lesson-top2 l">
                            <template>
                                <span v-if="courseSort=='1'" class="on">最新  <img src="../assets/arrow-down4.png"> </span>
                                <span v-else @click="courseSort='1',  desc='CreateDate', getCourseList()">最新  <img src="../assets/arrow-down3.png"> </span>
                            </template>
                            <template>
                                <span v-if="courseSort=='2'" class="on">最热  <img src="../assets/arrow-down4.png"></span>
                                <span v-else @click="courseSort='2', desc='ClickCount', getCourseList()">最热  <img src="../assets/arrow-down3.png"> </span>
                            </template>
                        </div> -->
                        <div class="cm-lesson-top3 r">
                            <template>
                                <p class="on" v-if="showSort == '1'"><img src="../assets/sort1-img2.png"></p>
                                <p v-else @click="showSort=1"><img src="../assets/sort1-img1.png"></p>
                            </template>
                            <template>
                                <p class="on" v-if="showSort == '2'"><img src="../assets/sort2-img2.png"></p>
                                <p v-else @click="showSort=2"><img src="../assets/sort2-img1.png"></p>
                            </template>
                            <template>
                                <p class="on" v-if="showSort == '3'"><img src="../assets/sort3-img2.png"></p>
                                <p v-else @click="showSort=3"><img src="../assets/sort3-img1.png"></p>
                            </template>
                        </div>
                    </div>
                    <div class="cm-lesson-con">
                        <section v-if="showSort == '1'">
                            <course-video-list :list-data="videoList" :img-url="imgUrl"></course-video-list>
                            <div class="noData" v-if="videoList.length == 0">暂无数据</div>
                        </section>
                        <section v-if="showSort == '2'">
                            <course-table-list :list-data="videoList" :current-page="currentPage" :row="rows" :mid="CategoryId"></course-table-list>
                            <div class="noData" v-if="videoList.length == 0">暂无数据</div>
                        </section>
                        <section v-if="showSort == '3'">
                            <course-chart :list-data="videoList"></course-chart>
                            <div class="noData" v-if="videoList.length == 0">暂无数据</div>
                        </section>
                    </div>
                    <el-pagination
                        background
                        :page-size="this.rows"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="this.totalPageNumber">
                    </el-pagination>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { headerFix, footerFix, courseChart, courseTableList, courseVideoList, noDataImg } from '../components'
import { CourseCategory, CourseList } from '../service/getData'
export default {
    name: 'CourseList',
    data () {
        return {
            channelList: [],
            channelId: this.$route.query.channel ? this.$route.query.channel : 0,
            videoList: [],
            showSort: '1',
            imgUrl: '',
            rows: 12,
            page: '1',
            desc: 'CreateDate',
            CategoryId: '',
            totalPageNumber: 0,
            currentPage: 1,
            ctitle: this.$route.query.title ? this.$route.query.title : '',
            typeforsearch: [ // 课程类型数组
                {
                    typeIcon: require('../assets/per-icongray3.png'),
                    typeAction: require('../assets/per-iconblue3.png'),
                    typeName: '单视频课程',
                    itemAction: 0,
                    Type: 'SingleCourse'
                },
                {
                    typeIcon: require('../assets/per-icongray7.png'),
                    typeAction: require('../assets/per-iconblue7.png'),
                    typeName: '三分频课程',
                    itemAction: 0,
                    Type: 'ThreeScreenCourse'
                }
            ]
        }
    },
    mounted () {
        this.getCourseChannel()
    },
    methods: {
        handleCurrentChange (val) {
            this.page = val
            this.currentPage = val 
            this.getCourseList()
        },
        flChannelClick (item, menu) {
            menu.forEach((itemf) => {
                itemf.state = closed
                let itemChildren = itemf.children || []
                itemChildren.forEach((itemC) => {
                    this.$set(itemC, 'isClick', false)
                })
            })
            item.state = 'open'
            this.channelId = item.id
            this.ctitle = item.text
            this.$router.push({ path: '/courselist', query: { title: this.ctitle } })
            this.getCourseList()
        },
        slChannelClick (item, menu) {
            menu.forEach((itemf) => {
                itemf.state = closed
                let itemChildren = itemf.children || []
                itemChildren.forEach((itemC) => {
                    this.$set(itemC, 'isClick', false)
                })
            })
            this.$set(item, 'isClick', true)
            this.channelId = item.id
            this.getCourseList()
        },
        courseTypeSwitch (index, type) {
            this.typeforsearch.forEach((item, index) => {
                item.itemAction = '0'
                this.$refs.makeDiffer[index].style = ''
            })
            this.typeforsearch[index].itemAction = '1'
            this.$refs.makeDiffer[index].style.color = '#66a3fd'
            this.typeCode = type
            this.getCourseList()
        },
        async getCourseList () {
            this.videoList = []
            let data = await CourseList({
                courseType: this.typeCode,
                page: this.page,
                rows: this.rows,
                sort: this.desc, 
                order: 'desc',
                channelId: this.channelId
            })
            let arr1 = data.ListData.map((item) => {
                item.shadowShow = false
                return item
            })
            this.videoList = arr1
            this.imgUrl = data.ImageCourse
            this.totalPageNumber = Number(data.Count)
        },
        async getCourseChannel () {
            let data = await CourseCategory({ channelId: 0, page: '1', rows: '9999' })
            let list1 = data.ListData
            list1.forEach((item) => {
                item.state = 'closed'
                if (this.ctitle && this.ctitle == item.text) {
                    if (this.channelId == 0) {
                        item.state = 'open'
                        this.channelId = item.id
                    } else {
                        item.children.forEach(items => {
                            if (items.id == this.channelId) {
                                this.$set(items, 'isClick', false)
                            }
                        })
                    }
                }
                return item
            })
            // if (this.channelId != 0 && this.FChannelId != 0) {
                
            // }
            this.channelList = list1
            this.getCourseList()
        }
    },
    watch: {
        ctitle (value) {
            console.log(111)
            this.getCourseList()
        }
    },
    components: {
        headerFix,
        footerFix,
        courseChart,
        courseTableList,
        courseVideoList,
        noDataImg
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.CourseList{
    max-width: 1440px;
    width: 100%;
    margin:0 auto;
    background: url('../assets/bd_background.png') no-repeat;
    .main{
        width: 1000px;
        margin: 20px auto 0;
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
            .cm-lesson-type{
                background: #fff;
                ul{
                    @extend %clearFix;
                    width: 600px;
                    margin: 10px auto;
                    padding: 10px 0;
                    li{
                        float: left;
                        width: 95px;
                        text-align: left;
                        color: #666;
                        height: 28px;
                        line-height: 28px;
                        margin-right: 72px;
                        cursor: pointer;
                        img{
                            margin-right: 3px; 
                        }
                        &:nth-child(4n){
                            margin-right: 0; 
                        }
                    }
                }
            }
            .cm-lesson{
                background: #fff;
                margin-top: 10px;
                min-height: 855px;
                position: relative;
                .cm-lesson-top {
                    height: 42px;
                    border-bottom: 1px solid #e8e8e8;
                    .cm-lesson-top1 {
                        font-size: 18px;
                        color: #333;
                        height: 42px;
                        line-height: 42px;
                        margin-left: 20px;
                        font-weight: bold;
                    }
                    .cm-lesson-top2 {
                        margin-left: 35px;
                        height: 42px;
                        line-height: 42px;
                        span {
                            margin-left: 20px;
                            cursor: pointer;
                            &.on{
                                color: #ff9c08;
                            }
                        }
                    }
                    .cm-lesson-top3{
                        p{
                            float: left;
                            width: 70px;
                            border-left: 1px solid #e8e8e8;
                            cursor: pointer;
                            height: 43px;
                            line-height: 43px;
                            text-align: center;
                            img {
                                width: 16px;
                                height: 17px;
                            }
                        }
                    }
                }
                .cm-lesson-con{
                    .noData{
                        text-align: center;
                        font-size: 18px;
                        margin: 30px auto;
                    }
                }
                .el-pagination{
                    display: table;
                    margin: 0 auto;
                    padding: 60px 0;
                    ul{
                        li{
                            &.active{
                                background: #ff9c08;
                            }
                            &:hover{
                                background: #ff9c08;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
