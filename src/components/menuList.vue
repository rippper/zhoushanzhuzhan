<template>
    <div class="menuList">
        <div class="title" v-if="menuListShow">
            <p><img :src="menuIcon">{{menuListTitle}}</p>
        </div>
        <div class="sort">
            <div class="sortTitle clearfix" v-if="sortTitle">
                <div class="st-hd l clearfix">
                    <img src="../assets/news-icon.png">
                    <p>{{titleText1}}</p>
                </div>
                <div class="st-bd l">
                    <p class="st-bd-p1">{{titleText2}}</p>
                    <p class="st-bd-p2">{{titleText3}}</p>
                </div>
            </div>
            <ul>
                <li v-for="item in menuData"
                    :key="item.id"
                    @click="goMenuList(item, menuData)"
                    :class="{on:item.isClick}"
                    >
                    <!-- 参考党建基准的deleteItem -->
                    <p class="name">{{item.Name || item.text}}</p>
                    <!-- <p class="icon"><img src="../assets/nextPage.png"></p> -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
        }
    },
    props: {
        sortTitle: {
            type: Boolean,
            default: true
        },
        menuListShow: {
            type: Boolean,
            default: false
        },
        menuListTitle: {
            type: String
        },
        menuData: {
            type: Array
        },
        goMenuList: {
            type: Function
        },
        menuIcon: {
            type: String
        },
        titleText1: {
            type: String
        },
        titleText2: {
            type: String
        },
        titleText3: {
            type: String
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .menuList{
        .title{
            width: 100%;
            height: 72px;
            border-top: 1px solid #fff;
            background: #2c6ed0;
            p{
                width: 100%;
                height: 72px;
                line-height: 72px;
                text-indent: 12px;
                font-size: 24px;
                color: #fff;
                img{
                    vertical-align: middle;
                    margin-right: 8px;
                }
            }
        }
        .sort{
            width: 235px;
            margin: 25px auto 0;
            .sortTitle{
                width: 100%;
                height: 50px;
                .st-hd {
                    width: 56px;
                    height: 50px;
                    background: url('../assets/classify-tbg.png');
                    img {
                        margin-top: 8px;
                        margin-left: 7px;
                        float: left;
                    }
                    p {
                        width: 18px;
                        color: #fff;
                        margin-left: 8px;
                        float: left;
                        font-size: 16px;
                        line-height: 18px;
                        margin-top: 5px;
                    }
                }
                .st-bd {
                    margin-left: 10px;
                    width: 160px;
                    .st-bd-p1 {
                        color: #999999;
                        height: 24px;
                        line-height: 24px;
                    }
                    .st-bd-p2 {
                        color: #2c6ed0;
                        font-size: 20px;
                        font-weight: bold;
                        line-height: 22px;
                    }
                }
            }
            ul{
                li{
                    display: block;
                    height: 40px;
                    line-height: 40px;
                    background: #f4f4f4;
                    color: #555;
                    margin-top: 10px;
                    background:#f4f4f4 url("../assets/nextPage.png") no-repeat;
                    background-position: 207px 17px;
                    cursor: pointer;
                    .name{
                        float: left;
                        margin-left: 30px;
                    }
                    &:hover{
                       color: #fff;
                       background:#648ff7 url("../assets/nextPage2.png") no-repeat;
                       background-position: 207px 17px;
                    }
                    &.on{
                      color: #fff;
                       background:#648ff7 url("../assets/nextPage2.png") no-repeat;
                       background-position: 207px 17px;
                    }
                }
            }
        }
    }
</style>
