<template>
    <div class="elcbooklist">
        <header-fix></header-fix>
        <div class="elcb_content">
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
            >
            </menu-list>
            <div class="elcb_inforList">
                <ul>
                    <li v-if="showIndex === 0">
                        <div class="ads_loc">
                            <p class="msgInfor">您当前的位置是：</p>
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>电子资源</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <ul class="fs_list">
                            <li v-for="(item, index) in menuData" :key="index">
                                <div class="lt_title">
                                    <p>
                                        <img src="../assets/dz_s3.gif" alt="">
                                        <span v-text="item.Name"></span>
                                    </p>
                                </div>
                                <div class="lt_list">
                                    <ul>
                                        <li v-for="(items, index) in item.Children" :key="index" v-show="index <= 5">
                                            <a :href="`http://www.zsodl.cn/goElecs.html?url=${items.link}&isopen=${items.isOpen1}&isauth=${items.isauth1}`" v-text="items.title" target="_blank"></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="lt_more">
                                    <span @click="showIndex = index + 1">更多</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li v-for="(item, index) in menuData" :key="index" v-show="showIndex - 1 == index">
                        <div class="ads_loc">
                            <p class="msgInfor">您当前的位置是：</p>
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item><a href="javascript:;" @click="showIndex = 0">电子资源</a></el-breadcrumb-item>
                                <el-breadcrumb-item v-text="item.Name"></el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <ul class="aft_list">
                            <li v-for="(items, index) in item.Children" :key="index">
                                <a :href="`http://www.zsodl.cn/goElecs.html?url=${items.link}&isopen=${items.isOpen1}&isauth=${items.isauth1}`" v-text="items.title" target="_blank"></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { headerFix, footerFix, menuList } from '../components'
import { deepClone } from '../service/helpPlugin'
export default {
    name: 'elcbooklist',
    data () {
        return {
            menuIcon: require('../assets/ebook-icon.png'),
            resouseDate: '',
            showIndex: 0,
            menuListTitle: '电子资源',
            sortShow: true,
            menuListShow: true,
            titleText1: '资源',
            titleText2: 'Sourse',
            titleText3: '资源',
            type: [],
            menuData: [],
            cloneMenu: ''
        }
    },
    mounted () {
        this.getMsg()
    },
    methods: {
        getMsg () {
            // let dates = this.getyyyyMMdd()
            // let pwdMd5 = md5('yfadmininfcn' + dates)
            // let idcard = 'yfadmin'
            // let url = "http://www.zsodl.cn/outElec.jsp" 
            // "http://www.zsodl.cn/sso-jsonp.jsp?loginType=3&userName=yfadmin&password=7facc8d4639f4fc1989949d8465ce20c&libCode=330901000"
            // http://10.36.30.6:8080/readercard/services/reader/getUserInfoByCard/
            this.$jsonp('http://www.zsodl.cn/sso-jsonp.jsp?loginType=3&userName=ZSC888888&password=123456&libCode=330901000').then((res) => {})
            
            this.$jsonp('http://www.zsodl.cn/outElec.jsp').then((res) => {
                this.resouseDate = res
                this.resouseDate.forEach((item) => {
                    if (item.title.indexOf("馆内试用") != -1) {
                         return false
                    }
                    // item.title = wordsL(item.title, 14)
                    if (this.type.indexOf(item.channelName) == -1) {
                        this.type.push(item.channelName)
                        this.menuData.push({
                            Id: item.channelId,
                            Name: item.channelName,
                            isClick: false,
                            Children: []
                        })
                    }
                    this.menuData.forEach((items) => {
                        if (items.Id == item.channelId) {
                            items.Children.push(item)
                        }
                    })
                    // console.log(this.menuData)
                })
                let Arr = {}
                this.cloneMenu = deepClone(this.menuData, Arr)
                console.log(this.cloneMenu)
                // console.log(this.menuData)
                // console.log(this.resouseDate)
            }).catch((err) => {
                console.log(err)
            })
        },
        getyyyyMMdd () {
            let d = new Date()
            let curr_date = d.getDate()
            let curr_month = d.getMonth() + 1
            let curr_year = d.getFullYear()
            String(curr_month).length < 2 ? (curr_month = '0' + curr_month) : curr_month
            String(curr_date).length < 2 ? (curr_date = '0' + curr_date) : curr_date
            let yyyyMMdd = curr_year + '' + curr_month + '' + curr_date
            return yyyyMMdd
        },
        goMenuList (item, menu) {
            this.menuData.forEach((items, index) => {
                if (item.Id == items.Id) {
                    this.showIndex = index + 1
                }
            })
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
.elcbooklist{
    max-width: 1440px;
    width: 100%;
    margin:0 auto;
    background: url('../assets/bd_background.png') no-repeat;
    .elcb_content{
        width: 1000px;
        margin: 12px auto 0;
        @extend %clearFix;
        .menuList{
            float: left;
            width: 261px;
            padding-bottom: 50px;
            background: #fff;
        }
        .elcb_inforList{
            float: right;
            width: 719px;
            padding-bottom: 30px;
            min-height: 548px;
            background: #fff;
            .ads_loc{
                height:44px;
                padding-left: 30px;
                box-sizing: border-box;
                background: #f7f7f7;
                &:before{
                    content: '';
                    display: inline-block;
                    height: 100%;
                    vertical-align: middle;
                }
                .msgInfor{
                    display: inline-block;
                }
                .el-breadcrumb{
                    display: inline-block;
                    position: relative;
                    top: 2px;
                }
            }
            .fs_list{
                & > li {
                    .lt_title{
                        width: 640px;
                        height: 26px;
                        margin: 20px auto 0;
                        border-bottom: 1px solid #166aab;
                        background: url('../assets/tit_bl.png') no-repeat left -10px;
                        p{
                            height: 22px;
                            line-height: 22px;
                            img{
                                position: relative;
                                bottom: 4px;
                            }
                            span{
                                font-size: 16px;
                                font-weight: bold;
                                font-family: "微软雅黑";
                                color: #166aab;
                            }
                        }
                    }
                    .lt_list{
                        width: 640px;
                        margin: 20px auto 0;
                        ul{
                            @extend %clearFix;
                            li{
                                float: left;
                                width: 195px;
                                height: 50px;
                                padding: 5px 0; 
                                position: relative;
                                a{
                                    text-indent: 1em;
                                    background: url('../assets/dz_s4.gif') no-repeat 0 6px;
                                    position: absolute;
                                    top: 50%;
                                    left: 0;
                                    transform: translate(0, -50%);
                                    &:hover{
                                        color: #f00;
                                    }
                                }
                            }
                        }
                    }
                    .lt_more{
                        width: 640px;
                        margin: 0 auto;
                        @extend %clearFix;
                        span{
                            float: right;
                            padding-right: 25px;
                            cursor: pointer;
                            &:hover{
                                color: #f00;
                            }
                        }
                    }
                }
            }
        }
        .aft_list{
            width: 640px;
            margin: 30px auto 0;
            @extend %clearFix;
            li{
                float: left;
                width: 195px;
                height: 50px;
                padding: 5px 0;
                margin: 0 0 0 15px; 
                position: relative;
                a{
                    text-indent: 1em;
                    background: url('../assets/dz_s4.gif') no-repeat 0 6px;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translate(0, -50%);
                    &:hover{
                        color: #f00;
                    }
                }
            }
        }
    }
}
</style>