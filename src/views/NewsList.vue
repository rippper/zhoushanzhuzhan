<template>
    <div class="newslist">
        <header-fix></header-fix>
        <div class="main clearfix">
            <div class="pc-left l">
                 <menu-list
                    :menu-icon="menuIcon"
                    :menu-list-title="menuListTitle"
                    :menu-data="menuData"
                    :go-menu-list="goMenuList"
                    :sort-title="sortShow"
                    :menu-list-show="menuListShow"
                    :title-text1="titleText1"
                    :title-text2="titleText2"
                    :title-text3="titleText3"
                ></menu-list>
            </div>
            <div class="pc-right r">
                <div class="cm-lesson">
                    <div class="cm-lesson-top clearfix">
                        <div class="cm-lesson-top1 l">
                            新闻文章
                        </div>
                        <div class="cm-lesson-top3 r">
                            <template>
                                <p class="on" v-if="showSort == '2'"><img src="../assets/sort2-img2.png"></p>
                                <p v-else @click="showSort='2'"><img src="../assets/sort2-img1.png"></p>
                            </template>
                            <template>
                                <p class="on" v-if="showSort == '3'"><img src="../assets/sort3-img2.png"></p>
                                <p v-else @click="showSort='3'"><img src="../assets/sort3-img1.png"></p>
                            </template>
                        </div>
                    </div>
                    <div class="cm-lesson-con">
                        <section v-if="showSort == '2'">
                            <article-table-list :list-data="articleList" :mid="CategoryId" :current-page="currentPage" :row="rows"></article-table-list>
                        </section>
                        <section v-if="showSort == '3'">
                            <article-chart :list-data="articleList" :mid="CategoryId"></article-chart>
                        </section>
                    </div>
                    <el-pagination
                        background
                        :current-page.sync="currentPage"
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
import { headerFix, footerFix, menuList, articleTableList, articleChart } from '../components'
import articleIcon from '../assets/classify.png'
import { GetArticleChannelInfoList, NoticeCategory, GetArticleInfoList } from '../service/getData'
export default {
    name: 'NewsList',
    data () {
        return {
            menuIcon: articleIcon,
            CategoryId: this.$route.query.Id ? this.$route.query.Id : 134,
            menuListTitle: '新闻分类',
            menuData: [
                {
                    Id: 134,
                    Name: "新闻信息",
                    isClick: false,
                },
                {
                    Id: 138,
                    Name: "图文资讯",
                    isClick: false,
                },
                {
                    Id: 135,
                    Name: "社教新闻",
                    isClick: false,
                },
                {
                    Id: 139,
                    Name: "通知公告",
                    isClick: false,
                },
                {
                    Id: 140,
                    Name: "社区之家",
                    isClick: false,
                },
                {
                    Id: 144,
                    Name: "社区教研",
                    isClick: false,
                },
                {
                    Id: 164,
                    Name: "政策法规",
                    isClick: false,
                },
            ],
            desc: 'Id',
            sortShow: true,
            menuListShow: true,
            titleText1: '新闻',
            titleText2: 'News',
            titleText3: '新闻',
            titleName: '文章标题',
            showSort: '2',
            articleList: [],
            currentPage: 1,
            totalPageNumber: 0,
            page: '1',
            rows: 12,
            keyword: this.$route.query.keyWords ? this.$route.query.keyWords : ''
        }
    },
    mounted () {
        this.getArticleChannelInfoList()
        this.getNoticeCategory()
        this.getArticleInfoList()
    },
    methods: {
        handleCurrentChange (val) {
            this.articleList = []
            this.page = val
            this.currentPage = val 
            this.getArticleInfoList()
        },
        goMenuList (item, menu) {
            // console.log(item, menu)
            // this.$set(item,'isClick', true)
            this.currentPage = 1
            this.$router.push({ path: '/newslist', query: { Id: item.Id } })
            item.isClick = true
        },
        getArticleChannelInfoList () {
            this.menuData.forEach(item => {
                if (item.Id == this.CategoryId) {
                    item.isClick = true
                } else {
                    item.isClick = false
                }
            })
        },
        async getNoticeCategory () {
            let data = await NoticeCategory({ parentId: 0 })
            if (data.IsSuccess) {
                this.menuData2 = data.Data.ListData
            }
        },
        async getArticleInfoList () {
            let data = await GetArticleInfoList({ 
                CategoryId: this.CategoryId,
                Page: this.page,
                Rows: this.rows, 
                Sort: this.desc, 
                Order: 'desc',
                BeginDate: this.startDate,
                EndDate: this.endDate,
                Keyword: this.keyword
            })
            if (data.IsSuccess) {
                this.articleList = data.Data.List
                this.totalPageNumber = Number(data.Data.TotalCount)
            }
        },
    },
    watch: {
        $route (value) {
            this.currentPage = 1
            this.articleList = []
            if (this.$route.query.keyWords && !this.$route.query.Id){
                this.keyword = this.$route.query.keyWords
                this.CategoryId = 134
                this.getArticleInfoList()
                this.getArticleChannelInfoList()
            } else if (!this.$route.query.keyWords && this.$route.query.Id) {
                this.CategoryId = this.$route.query.Id
                this.keyword = ''
                this.getArticleInfoList()
                this.menuData.forEach((itemS) => {
                    if (itemS.Id != this.CategoryId) {
                        itemS.isClick = false
                    } else {
                        itemS.isClick = true
                    }  
                })
            }
        }
    },
    components: {
        headerFix,
        footerFix,
        menuList,
        articleTableList,
        articleChart
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.newslist{
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
        }
        .pc-right{
            width: 725px;
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
