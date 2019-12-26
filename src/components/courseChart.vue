<template>
    <div class="courseChart">
        <ul>
            <li class="lesson-brief2 clearfix" v-for="item in listData" :key="item.Id">
                <div class="lb2-left l">
                    <div class="lb2-right-hd clearfix">
                        <div class="lb2-right-hd1 ">
                            <p class="lb2-right-hd1-p1" :title="item.Name">
                                <router-link :to="{ path: '/courseDetail', query:{id: item.Id}}" target="_blank">
                                    {{item.Name}}
                                </router-link> 
                            </p>
                        </div>
                        <div class="lb2-right-hd2">
                            内容简介：{{item.Description || '暂无简介'}}
                        </div>
                        <div class="lb2-right-hd3 clearfix">
                            <div class="num l">
                                <img src="../assets/eye-1.png"> {{item.ClickCount}}
                            </div>
                            <div class="link r">
                                <router-link :to="{ path: '/courseDetail', query:{id: item.Id}}" target="_blank">
                                    查看详情
                                </router-link> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lb2-right l">
                    <router-link :to="{ path: '/courseDetail', query:{ id: item.Id } }" target="_blank">
                       <error-image :src="item.Img"></error-image>
                    </router-link> 
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import errorImage from './errorImage'
export default {
    name: 'courseChart',
    data () {
        return {

        }
    },
    props: {
        listData: {
            type: Array
        }
    },
    components: {
        errorImage
    }
}
</script>

<style lang="scss">
    @import "../style/mixin";

    .courseChart{
        ul{
            li{
                &.lesson-brief2 {
                    width: 100%;
                    border-bottom: 1px solid #e8e8e8;
                    padding-top: 23px;
                    padding-bottom: 23px;
                    .lb2-left {
                        width: 482px;
                        margin-left: 23px;
                        .lb2-right-hd {
                            width: 100%;
                            .lb2-right-hd1 {
                                width: 100%;
                                position: relative;
                                .lb2-right-hd1-p1 {
                                    height: 30px;
                                    line-height: 30px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    a {
                                        color: #333;
                                        font-size: 16px;
                                        font-weight: bold;
                                        &:hover{
                                            color: #2c6ed0;
                                        }
                                    }
                                }
                            }
                            .lb2-right-hd2 {
                                line-height: 22px;
                                text-indent: 15px;
                                color: #666;
                                @include ellipsis_two(2);
                            }
                            .lb2-right-hd3 {
                                line-height: 22px;
                                color: #666;
                                margin-top: 8px;
                                .num {
                                    color: #bbb;
                                    img{
                                        vertical-align: middle;
                                    }
                                }
                                .link{
                                    a {
                                        display: block;
                                        width: 75px;
                                        height: 30px;
                                        text-align: center;
                                        line-height: 30px;
                                        background: #f4f4f4;
                                        color: #bbb;
                                    }
                                }
                            }
                        }
                    }
                    .lb2-right {
                        margin-left: 29px;
                        width: 160px;
                        height: 100px;
                    }
                }
            }
        }
    }
</style>
