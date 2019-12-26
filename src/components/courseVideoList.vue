<template>
    <div class="courseVideoList">
        <ul>
            <li class="lesson-brief1" v-for="item in listData" :key="item.Id" @click="goDetail(item.Id)">
                <!-- v-for="item in data" :key="item.id" -->
                <div class="lb1-con">
                    <div class="lb1-con-hd" @mouseover="item.shadowShow=true" @mouseleave="item.shadowShow=false">
                        <error-image :src="imgUrl+item.Img" class="lb1-con-hd-img"></error-image>
                        <img src="../assets/course-shadow.png" class="lb1-con-hd-shadow" v-if="item.shadowShow"/>
                    </div>
                    <div class="lb1-con-bd">
                        <p class="lb1-con-bd-p1">{{item.Name}}</p>
                        <p class="lb1-con-bd-p2">点击量: <span>{{item.ClickCount}}</span></p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import errorImage from './errorImage'
export default {
    name: 'courseVideoList',
    data () {
        return {
            shadowShow: false
        }
    },
    props: {
        listData: {
            type: Array
        },
        imgUrl: {
            type: String
        }
    },
    methods: {
       goDetail (Id) {
           const { href } = this.$router.resolve({ 
               path: '/coursedetail',
               query: { id: Id }
            })
            window.open(href, "_blank")
       }
    },
    components: {
        errorImage
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .courseVideoList{
        ul{
            @extend %clearFix;
            li{
                &.lesson-brief1{
                    width: 205px;
                    height: 215px;
                    border: 1px solid #fff;
                    float: left;
                    margin: 20px 18px 0;
                    .lb1-con{
                        width: 205px;
                        margin: 0 auto;
                        margin-top: 9px;
                        .lb1-con-hd {
                            position: relative;
                            width: 205px;
                            height: 145px;
                            cursor: pointer;
                            .lb1-con-hd-img {
                                width: 205px;
                                height: 145px;
                                position: absolute;
                                top: 0;
                                .trueImg{
                                    width: 205px;
                                    height: 145px;
                                }
                            }
                            .lb1-con-hd-shadow {
                                width: 205px;
                                height: 145px;
                                position: absolute;
                                top: 0;
                                z-index: 1;
                            }
                        }
                        .lb1-con-bd {
                            width: 205px;
                            color: #333;
                            .lb1-con-bd-p1 {
                                font-size: 14px;
                                color: #333;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                margin-top: 5px;
                                height: 24px;
                                line-height: 24px;
                            }
                            .lb1-con-bd-p2 {
                                font-size: 12px;
                                color: #999;
                                height: 24px;
                                line-height: 24px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
