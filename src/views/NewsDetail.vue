<template>
    <div class="NewsDetail">
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
                <div class="title">
                    {{articleContent.Name}}
                </div>
                <div class="tip">
                    <div class="tip-con  clearfix">
                        <p>来源:{{articleContent.Source || '暂无'}}</p>
                        <p>发布时间:{{articleContent.CreateDate}}</p>
                        <p>作者：{{articleContent.Author}}</p>
                        <p class="collect" v-if="isFavourite" @click="getFavoriteDelete()"><img src="../assets/collect-img2.png" alt="">已收藏</p>
                        <p class="collect" v-else @click="getFavoriteAdd()"><img src="../assets/collect-img.png" alt="">未收藏</p>
                        
                    </div>
                </div>
                <div class="banner" v-show="bannerShow">
                    <div class="oli_swiper">
                        <ul ref="swiper">
                            <li v-for="(item, index) in bannerImg" :key="index">
                                <img :src="item.Url" alt="">
                            </li>
                        </ul>
                        <div class="oli_leftButton" @click="bannerTo(bannerIndex-1)">&lt;</div>
                        <div class="oli_rightButton" @click="bannerTo(bannerIndex+1)">&gt;</div>
                    </div>
                    <div class="oli_swiperBottom">
                        <div class="oli_leftBtn" @click="move('left')" ref="bottomLeft">&lt;</div>
                        <div class="oli_bottomLength">
                            <ul ref="swiperBottom">
                                <li v-for="(item, index) in bottomImg" :key="index" ref="btnBottom" @click="bottomTo (index)">
                                    <img :src="item.Url" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="oli_rightBtn" @click="move('right')" ref="bottomRight">&gt;</div>
                    </div>
                </div>
                <div class="content" v-html="articleContent.Content">
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { headerFix, footerFix, menuList } from '../components'
import { GetArticleChannelInfoList, NoticeCategory, ArticleContent, FavoriteAdd, FavoriteDelete, FavoriteExist, SetArticleRed } from '../service/getData'
import { throttle } from '../service/helpPlugin'
import { Message } from 'element-ui'
export default {
    name: 'NewsDetail',
    data () {
        return {
            id: this.$route.query.id,
            mid: this.$route.query.mid,
            menuIcon: require('../assets/classify.png'),
            menuListTitle: '文章分类',
            menuData: [],
            sortShow: true,
            menuListShow: true,
            titleText1: '新闻',
            titleText2: 'News',
            titleText3: '新闻',
            articleContent: [],
            isFavourite: false,
            bannerShow: false,
            bannerImg: [],
            bottomImg: [],
        }
    },
    mounted () {
        this.render()
    },
    methods: {
        goMenuList (item) {
            this.$router.push({ path: '/newslist', query: { Name: item.Name, Id: item.Id } })
        },
        culWidth () {
            this.$refs.swiper.style.width = (this.bannerImg.length) * 769 + 'px'
            this.$refs.swiperBottom.style.width = (this.bannerImg.length) * 142 + 'px'
        },
        bottomTo: throttle(function (index) {
            this.$refs.btnBottom.forEach(item => {
                item.style.border = '2px solid #fff'
            })
            if (index <= 2) {
                this.$refs.swiperBottom.style.left = 0
            } else if ((index > 2 && index <= this.bottomImg.length - 3) && this.bottomImg.length > 5) {
                this.$refs.swiperBottom.style.left = -(index - 2) * 125 + 'px'
            } else if (index > this.bottomImg.length - 4) {
                this.$refs.swiperBottom.style.left = -(this.bottomImg - 3) * 125 + 'px'
            }
            this.$refs.btnBottom[index].style.border = '2px solid #ff0'
            this.bannerTo(index)
        }, 300),
        move: throttle(function (ways) {
            let self = this
            if (ways == 'left' && self.$refs.swiperBottom.offsetLeft < 0) {
                self.$refs.swiperBottom.style.left = self.$refs.swiperBottom.offsetLeft + 125 + 'px'
            } else if (ways == 'right' && self.$refs.swiperBottom.offsetLeft > -self.bottomImg.length * 125 + 711) {
                self.$refs.swiperBottom.style.left = self.$refs.swiperBottom.offsetLeft - 125 + 'px'
            }
            if (self.$refs.swiperBottom.offsetLeft == 0 && ways == 'left') {
                this.$message.warning('图集已经到顶')
            } else if (self.$refs.swiperBottom.offsetLeft == (this.bannerImg.length - 5) * -125 && ways == 'right') {
                this.$message.warning('图集已经到底')
            }
        }, 300),
        bannerTo: throttle(function (index) {
            let self = this
            let timer = null
            this.bannerIndex = index
            if (this.bannerIndex < 0) {
                this.bannerIndex = 0
                this.$message({
                    message: '图集已经到顶',
                    type: 'warning'
                })
                return ''
            } else if (this.bannerIndex > this.bannerImg.length - 1) {
                this.bannerIndex = this.bannerImg.length - 1
                this.$message({
                    message: '图集已经到底',
                    type: 'warning'
                })
                return ''
            }
            let totalDistance = this.bannerIndex * - 680
            let currentDistance = self.$refs.swiper.offsetLeft
            let speed = round()
            function round () {
                if (totalDistance - currentDistance >= 0) {
                    let sum = (totalDistance - currentDistance) / 30
                    return sum
                } else if (totalDistance - currentDistance < 0) {
                    let sum = (totalDistance - currentDistance) / -30
                    return sum
                }
            } // 测算轮播切换速度
            
            timer = setInterval(function () {
                if (currentDistance < totalDistance) {
                    self.$refs.swiper.style.left = self.$refs.swiper.offsetLeft + speed + 'px'
                    if (self.$refs.swiper.offsetLeft >= totalDistance) {
                        self.$refs.swiper.style.left = totalDistance + 'px'
                        clearInterval(timer)
                    }
                } else if (currentDistance > totalDistance) {
                    self.$refs.swiper.style.left = self.$refs.swiper.offsetLeft - speed + 'px'
                    if (self.$refs.swiper.offsetLeft <= totalDistance) {
                        self.$refs.swiper.style.left = totalDistance + 'px'
                        clearInterval(timer)
                    }
                }
            }, 10)
            this.bottomTo(this.bannerIndex, 'nature')
            this.localIndex = this.bannerIndex + 1
        }, 300),
        async render () {
            let articleChannel = await GetArticleChannelInfoList({ parentId: 0 })
            let Notice = await NoticeCategory({ parentId: 0 })
            let Content = await ArticleContent({ Id: this.id })
            let Favorite = await FavoriteExist({ Id: this.id, type: 'Article' })

            if (articleChannel.IsSuccess) {
                    let data1 = articleChannel.Data.ArticleCategoryResult.map((item) => {
                        item.Id == this.mid ? item.isClick = true : item.isClick = false
                        return item
                    })
                    this.menuData = data1
            }
            if (Notice.IsSuccess) {
                this.menuData2 = Notice.Data.ListData
            }
            if (Content.IsSuccess) {
                this.articleContent = Content.Data
                if (!Content.Data.IsRead) {
                    this.getSetArticleRed()
                }
                if (Content.Data.ImageList.length > 0 && Content.Data.Img != 'none') {
                    this.bannerImg = Content.Data.ImageList
                    this.bottomImg = Content.Data.ImageList
                    this.bannerIndex = 0
                    this.culWidth()
                    this.bannerShow = true
                    if (Content.Data.ImageList.length <= 5) {
                        this.$refs.bottomLeft.style.visibility = 'hidden'
                        this.$refs.bottomRight.style.visibility = 'hidden'
                    } else {
                        this.$refs.bottomLeft.style.visibility = 'visible' 
                        this.$refs.bottomRight.style.visibility = 'visible'
                    }
                }
            }
            if (Favorite.Type == 2) {
                this.isFavourite = false
            } else {
                    this.isFavourite = true
            }
            
        },
        async getFavoriteDelete () {
            let data = await FavoriteDelete({ ids: [this.id], type: 'Article' })
            if (data.Type == 1) {
                Message('您已取消收藏该作品')
                this.isFavourite = false
            }
        },
        async getFavoriteAdd () {
            let data = await FavoriteAdd({ mainId: this.id, type: 'Article' })
            if (data.Type == 1) {
                Message('您已成功收藏该作品')
                this.isFavourite = true
            }
        },
        async getSetArticleRed () {
            let data = await SetArticleRed({ Id: this.id })
            if (data.IsSuccess) {
                // console.log(data.Message)
            }
        }
    },
    components: {
        headerFix,
        footerFix,
        menuList
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.NewsDetail{
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
            background: #fff;
            padding: 30px 0;
            .title{
                width: 675px;
                margin: 0 auto;
                font-size: 24px;
                color: #333;
                text-align: center;
                font-weight: bold;
            }
            .tip{
                width: 675px;
                margin: 0 auto;
                border-bottom: 1px solid #dfdfdf;
                .tip-con{
                    display: table;
                    margin: 25px auto 10px;
                    p{
                        color: #999;
                        margin-right: 12px;
                        font-size: 14px;
                        float: left;
                        img{
                            margin: 0 5px;
                            // width: 12px;
                            // height: 12px;
                        }
                        &.collect{
                            cursor: pointer;
                        }
                    }
                }
            }
            .banner{
                .oli_swiper{
                    width: 680px;
                    height: 452px;
                    margin: 0 auto;
                    overflow: hidden;
                    position: relative;
                    background:#cdcdcd;
                    &:hover{
                        .oli_leftButton,.oli_rightButton{
                            opacity: 1;
                        }
                    }
                    ul{
                        @extend %clearFix;
                        position: absolute;
                        top:0;
                        left:0;
                        li{
                            float:left;
                            width: 680px;
                            height: 452px;
                            text-align: center;
                            img{
                                max-width: 680px;
                                height: 452px;
                            }
                        }
                    }
                    .oli_leftButton,.oli_rightButton{
                        width:48px;
                        height:48px;
                        font-size: 25px;
                        text-align: center;
                        line-height: 48px;
                        background:rgba(0,0,0,0.4);
                        border-radius: 48px;
                        color:#fff;
                        position: absolute;
                        margin-top: -24px;
                        transition: 0.5s;
                        opacity: 0;
                        cursor: pointer;

                    }
                    .oli_leftButton{
                        top:50%;
                        left:24px;
                    }
                    .oli_rightButton{
                        top:50%;
                        right:24px;
                    }
                }
                .oli_imgIntroduction{
                    text-align: center;
                    line-height: 66px;
                    height: 66px;
                    span{
                        font-size: 16px;
                    }
                    .oli_allPage{
                        margin-right:16px;
                    }
                    .oli_currentPage{
                        font-size: 24px;
                        color: #66a3fd;
                    }
                }
                .oli_swiperBottom{
                    width: 680px;
                    height: 81px;
                    overflow: hidden;
                    margin: 20px auto 0;
                    @extend %clearFix;
                    .oli_bottomLength{
                        float:left;
                        width: 624px;
                        height: 81px;
                        overflow: hidden;
                        position: relative;
                        ul{
                            @extend %clearFix;
                            position: absolute;
                            top:0;
                            left:0;
                            transition: 0.3s;
                            li{
                                margin: 0 2px;
                                border: 2px solid #fff;
                                width: 121px;
                                height: 81px;
                                text-align: center;
                                background: #cdcdcd;
                                float: left;
                                &:first-of-type{
                                    border: 2px solid #ff0;
                                }
                                img{
                                    height: 77px;
                                    max-width: 117px;
                                    vertical-align: middle
                                }
                            }
                        }
                    }
                    .oli_leftBtn,.oli_rightBtn{
                        float:left;
                        height:81px;
                        width:28px;
                        text-align: center;
                        line-height: 81px;
                        color:#fff;
                        background:rgba(0,0,0,0.4);
                        visibility: hidden;
                        cursor: pointer;
                    }
                }
            }
            .content{
                width: 675px;
                margin: 30px auto 0;
                line-height: 24px;
                color: #555;
                text-indent: 0;
                min-height: 270px;
                img{
                    max-width: 675px;
                    display: block;
                    margin: 0 auto;
                }
                span{
                    text-indent: 30px;
                    display: block;
                }
            }
        }
    }
}
</style>
