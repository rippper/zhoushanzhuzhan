<template>
    <div class="courseTableList">
        <div class="cm-lesson-title">
            <ul class="clearfix">
                <li class="cm-lesson-title1">编号</li>
                <li class="cm-lesson-title2">课程标题</li>
                <li class="cm-lesson-title3">点击数</li>
                <li class="cm-lesson-title3">学分</li>
                <li class="cm-lesson-title4">上传时间</li>
            </ul>
        </div>
        <table class="cml-table">
            <tr v-for="(item, index) in listData" :key="index">
                <th class="cm-lesson-content1">{{index + 1 + (currentPage-1) * row}}</th>
                <th class="cm-lesson-content2">
                    <router-link :to="{ path: '/courseDetail', query:{id: item.Id, mid: mid}}" target="_blank">
                        {{item.Name}}
                    </router-link> 
                </th>
                <th class="cm-lesson-content3">{{item.ClickCount}}</th>
                <th class="cm-lesson-content3">{{item.Credit}}</th>
                <th class="cm-lesson-content4">{{item.CreateDate|dateFilter('yyyy-MM-dd')}}</th>
            </tr>
        </table>
    </div>
</template>

<script>

export default {
    name: 'courseTableList',
    data () {
        return {
        }
    },
    props: {
        listData: {
            type: Array
        },
        currentPage: {
            type: Number
        },
        row: {
             type: Number
        },
        mid: {
            type: [String, Number]
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .courseTableList{
        .cm-lesson-title{
            width: 710px;
            margin: 0 auto;
            margin-top: 25px;
            ul{
                li{
                    float: left;
                    text-align: center;
                    height: 35px;
                    line-height: 35px;
                    background: #e9e9e9;
                    &.cm-lesson-title1{
                        width: 55px;
                        margin-right: 3px;
                    }
                    &.cm-lesson-title2 {
                        width: 400px;
                        margin-right: 3px;
                    }
                    &.cm-lesson-title3 {
                        width: 50px;
                        margin-right: 3px;
                    }
                    &.cm-lesson-title4 {
                        width: 140px;
                    }
                }
            }
        }
        .cml-table{
            width: 710px;
            margin: 0 auto;
            border: none;
            table-layout: fixed;
            tr {
                border-bottom: 1px solid #e9e9e9;
                th {
                    height: 48px;
                    line-height: 48px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: normal;
                    a {
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .cm-lesson-content1{
                    width: 55px;
                }
                .cm-lesson-content2{
                    width: 400px;
                }
                .cm-lesson-content3{
                    width: 50px;
                }
                .cm-lesson-content4{
                    width: 140px;
                }
                &:hover{
                    color: #2c6ed0;
                    a{
                        color: #2c6ed0;
                    }
                }
            }
        }
    }
</style>
