<template>
    <div class="PersonalColCourse">
        <div class="per_typeresearch">
            <ul>
                <li v-for="(item, index) in typeforsearch" :key="index" @click="differType(index,item.Type)">
                    <img :src="item.typeIcon" alt="" v-show="item.itemAction == 0 ? 1 : 0">
                    <img :src="item.typeAction" alt="" v-show="item.itemAction == 1 ? 1 : 0">
                    <span v-text="item.typeName" ref="makeDiffer"></span>
                </li>
            </ul>
        </div>
        <div class="per_myColClass">
            <ul>
                <li class="per_classItem clearFix" v-for="(item,index) in perVideoList" :key="index">
                <div class="per_clscheckbox pull-left">
                    <img src="../assets/per-checkout.png" @click="checkjugment(index)" v-show="jugement[index] == 0 ? true : false" alt>
                    <img src="../assets/per-check.png" @click="checkjugment(index)" v-show="jugement[index] == 1 ? true : false" alt>
                </div>
                <div class="pull-left">
                    <p class="per_video"><span v-text="item.Label" :title="item.Name" @click="linkToCourse(item.Id)"></span></p>
                    <p class="per_timeandscore">
                    <span class="per_Time">
                        <img src="../assets/per-time.png" alt />
                        观看时间：
                        <span v-text="item.CreateDate"></span>
                    </span>
                    <span class="per_studyscore">
                        <img src="../assets/per-shoucang.png" alt />
                        学分：
                        <span v-text="item.Credit"></span>
                    </span>
                    </p>
                    <div class="per_progressbox clearFix">
                    <el-progress
                        class="per_progress pull-left"
                        :stroke-width="15"
                        :percentage="item.BrowseScore"
                        :show-text="false"
                    ></el-progress>
                    <span class="per_progressinfor pull-left">
                        进度：
                        <span v-text="item.BrowseScore"></span>%
                    </span>
                    </div>
                </div>
                <div class="per_colcourseimgbox">
                    <img class="per_normalpic" :src="item.Img" alt v-show="item.Img == null || item.Img == 'noMessage' ? false : true">
                    <img class="per_errorpic" src="/images/per-error.png" alt v-show="item.Img == null || item.Img == 'noMessage' ? true : false">
                    <div class="per_videoimgshedow" @click="linkToCourse(item.Id)"><span class="per_countinePlay"></span>播放</div>
                </div>
                </li>
            </ul>
            <div class="per_noneinfor" v-if="contentInfor">
                <h1>暂无任何内容</h1>
            </div>
        </div>
        <div class="per_bodyBottom clearFix">
            <div class="pull-left">
                <div class="per_selectall" @click="selectAll()">
                    <img src="../assets/per-checkout.png" alt ref="checkall" />
                    <span>全选</span>
                </div>
                <button class="per_delete" type="button" @click="deleteClass()">删除</button>
            </div>
            <div class="per_singlepage pull-right">
                <el-pagination 
                :current-page.sync="currentPage"
                background layout="prev, pager, next" 
                @current-change="currentchange()"
                :total="totalPage"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { wordsL, pageCal } from '../service/helpPlugin'
import { CourseCollect, CollectDelete } from '../service/getData'
export default {
    name: 'PersonalColCourse',
    data () {
        return {
            perVideoList: [],
            Rows: 5,
            currentPage: 1,
            totalPage: 0,
            checkAll: false,
            jugement: [],
            contentInfor: false,
            typeforsearch: [
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
        this.$emit('seoundRank', '0')
        this.render()
    },
    methods: {
        checkjugment (index) {
            if (this.jugement[index] == 0) {
                this.jugement.splice(index, 1, 1)
            } else {
                this.jugement.splice(index, 1, 0)
                if (this.checkAll == true) {
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                }
            }
        }, // 判断选择状态
        selectAll () {
            if (this.checkAll == false) {
                for (let i = 0; i < this.jugement.length; i++) {
                    this.jugement.splice(i, 1, 1)
                }
                this.checkAll = true
                this.$refs.checkall.src = require('../assets/per-check.png')
            } else {
                for (let i = 0; i < this.jugement.length; i++) {
                    this.jugement.splice(i, 1, 0)
                }
                this.checkAll = false
                this.$refs.checkall.src = require('../assets/per-checkout.png')
            }
        }, // 判断是否全选
        linkToCourse (courseId) {
            const { href } = this.$router.resolve({ path: '/courseDetail', query: { id: courseId } })
            window.open(href, '_blank')
        },
        differType (index, type) {
            this.typeforsearch.forEach((item, index) => {
                item.itemAction = '0'
                this.$refs.makeDiffer[index].style = ''
            })
            this.typeforsearch[index].itemAction = '1'
            this.$refs.makeDiffer[index].style.color = '#66a3fd'
            this.render(type)
        }, // 不同种类视频筛选功能
        async deleteClass () {
            let delItem = []
            this.jugement.forEach((item, index) => {
                if (item == 1) {
                    delItem.push(this.perVideoList[index].Id)
                }
            })
            if (delItem.length > 0) {
                let result = await CollectDelete({
                    Type: 'Course',
                    ids: delItem
                })
                if (result.Type == 1) {
                    this.$message({
                        message: '课程删除成功！',
                        type: 'success'
                    })
                    this.typeforsearch.forEach((item, index) => {
                        if (index < this.typeforsearch.length - 1) {
                            if (item.itemAction == 1) {
                                this.render(item.Type)
                                this.checkAll = false
                                this.$refs.checkall.src = require('../assets/per-checkout.png')
                                return false
                            }
                        } else if (index == this.typeforsearch.length - 1) {
                            if (item.itemAction == 1) {
                                this.render(item.Type)
                                this.checkAll = false
                                this.$refs.checkall.src = require('../assets/per-checkout.png')
                                return false
                            }
                            this.render()
                            this.checkAll = false
                            this.$refs.checkall.src = require('../assets/per-checkout.png')
                        }
                    })
                } else if (result.Type == 0) {
                    this.$message({
                        message: '课程删除失败！',
                        type: 'error'
                    })
                }
            } else {
                this.$message.warning('请选择需要取消收藏的课程')
            }
        }, // 删除课程，重新获取数据
        async render (Type) {
            let that = this
            if (Type == undefined) {
                Type = 'All'
            }
            let data = await CourseCollect({
                courseType: Type,
                Page: '1'
            })
            data.Data.forEach((item) => {
                if (item.Img == '') {
                    item.Img = 'noMessage'
                }
            })
            this.perVideoList = data.Data
            if (this.perVideoList.length == 0) {
                this.$message({
                    message: '您还未添加任何一条课程收藏哦！',
                    type: 'warning'
                })
                this.contentInfor = true
            }
            this.checkAll = false
            this.currentPage = 1
            this.$refs.checkall.src = require('../assets/per-checkout.png')
            if (this.perVideoList.length < 5) {
                this.jugement = []
                for (let i = 0; i < this.perVideoList.length; i++) {
                    this.jugement.push(0)
                }
            } else {
                this.jugement = [0, 0, 0, 0, 0]
            }// 设置起始选择属性，0为未选1为已选
            
            this.perVideoList.forEach((item, index) => {
                item.CreateDate = item.CreateDate.substr(0, 16)
                item.Label = wordsL(item.Name, 28)
                // console.log(item.Name)
                let result = item.Credit.toString()
                let n = result.lastIndexOf('.')
                if (n == -1) {
                    item.Credit = item.Credit + '.00'
                } else if (n == 1) {
                    item.Credit = item.Credit + '0'
                }
            })// 修改数据渲染格式
            this.totalPage = pageCal(that.perVideoList[0].Count, that.Rows)
        }, // 获取数据渲染
        async currentchange () {
            let data = await CourseCollect({
                courseType: 'All',
                Page: this.currentPage
            })
            this.perVideoList = data.Data
            if (this.perVideoList.length < 5) {
                this.jugement = []
                for (let i = 0; i < this.perVideoList.length; i++) {
                    this.jugement.push(0)
                }
            } else {
                this.jugement = [0, 0, 0, 0, 0]
            }
            this.checkAll = false
            this.$refs.checkall.src = require('../assets/per-checkout.png')
            this.perVideoList.forEach((item, index) => {
                item.CreateDate = item.CreateDate.substr(0, 16)
                item.Label = wordsL(item.Name, 28)
                // console.log(item.Name)
                let result = item.Credit.toString()
                let n = result.lastIndexOf('.')
                if (n == -1) {
                    item.Credit = item.Credit + '.00'
                } else if (n == 1) {
                    item.Credit = item.Credit + '0'
                }
            })
        } // 翻页功能
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.PersonalColCourse{
    .per_typeresearch{
        ul{
            @extend %clearFix;
            width: 643px;
            margin: 0 auto;
            margin-top: 23px;
            padding-top: 22px;
            background: #efefef;
            border-radius: 5px;
            li{
                padding-left: 20px;
                margin-bottom: 19px;
                margin-left: 45px;
                float:left;
                position: relative;
                cursor:pointer;
                img{
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translate(0, -50%);
                }
            }
        }
    }
    .per_myColClass{
        ul{
            li{
                width:704px;
                position: relative;
                border-bottom:1px solid #efefef;
                .per_clscheckbox {
                width: 75px;
                height: 168px;
                line-height: 168px;
                text-align: center;
                line-height: 168px;
                }
                .per_video{
                    margin-top:34px;
                    font-weight: bold;
                    color:#565656;
                    font-size: 16px;
                    span{
                        cursor: pointer;
                        &:hover{
                            color:#66a3fd;
                        }
                    }
                }
                .per_timeandscore{
                    margin-top:18px;
                    font-size: 14px;
                    .per_Time{
                        font-size: inherit;
                        color:#bbb;
                        img{
                            width:14px;
                            position:relative;
                            bottom:2px;
                        }
                    }
                    .per_studyscore{
                        margin-left:39px;
                        font-size: inherit;
                        color:#ff9c07;
                        img{
                            width:14px;
                            position:relative;
                            bottom:2px;
                        }
                    }
                }
                .per_progressbox{
                    margin-top:25px;
                    .per_progress{
                        width:296px;
                        display:inline-block;
                    }
                    .per_progressinfor{
                        height:15px;
                        line-height: 15px;
                        font-size: 12px;
                        color:#bbb;
                        margin-left:12px;
                    }
                } 
                .per_colcourseimgbox{
                    margin:24px 30px 0 0;
                    width:180px;
                    height:120px;
                    text-align: center;
                    float: right;
                    position: relative;
                    &:hover{
                        .per_videoimgshedow{
                            display: block;
                        }
                    }
                    .per_normalpic{
                        height:120px;
                        width:180px;
                    }
                    .per_errorpic{
                        height:120px;
                    }
                    .per_videoimgshedow{
                        display: none;
                        text-align: center;
                        width:180px;
                        height:120px;
                        position: absolute;
                        top:0;
                        left:0;
                        background:rgba(0,0,0,0.4);
                        color:#fff;
                        cursor: pointer;
                        &:before{
                            content:'';
                            display: inline-block;
                            height:100%;
                            vertical-align: middle;
                        }
                        span{
                            display: inline-block;
                            width:18px;
                            height:18px;
                            background:url('../assets/per-videotoplay.png');
                            position: relative;
                            top:4px;
                            right:8px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .per_noneinfor{
            height:300px;
            line-height: 300px;
            text-align: center;
        }
    }
    .per_bodyBottom{
        height:75px;
        line-height: 75px;
        .per_selectall{
            display: inline-block;
            padding-left:31px;
            img{
                margin-right: 12px;
            }
            span{
                margin-right: 16px;
            }
        }
        .per_delete{
            border: 0;
            width: 56px;
            height: 28px;
            color: #fff;
            border-radius: 3px;
            background:#66a3fd;
            line-height: 28px;
        }
        .per_singlepage{    
            position: relative;
            top:50%;
            right:35px;
            margin-top:-14px;
            .el-pager {
                height:28px;
                li {
                    width:auto;
                }
            }
        }
    }
}
</style>