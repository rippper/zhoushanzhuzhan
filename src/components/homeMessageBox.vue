<template>
    <div class="homemessagebox">
        <a class="pic_Img" href="javascript:;" @click="LinkToCourselist()">
            <img :src="articleModel.Image" alt="">
        </a>
        <ul>
            <li v-for="(item, index) in articleModel.Course" :key="index">
                <a href="javascript:;" @click="LinkToCourseDetail(item.Id)">{{'·' + item.Name | wordLimit(15)}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'homeMessageBox',
    props: {
        articleModel: {
            type: Object
        }
    },
    methods: {
        LinkToCourselist () {
            this.$router.push({ path: '/courselist', query: {title: this.articleModel.text} })
        },
        LinkToCourseDetail (Id) {
            this.$router.push({ path: '/coursedetail', query: { id: Id } })
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.homemessagebox{
    width: 212px;
    height: 184px;
    padding: 5px;
    border: 1px solid #dcdddd;
    border-radius: 4px;
    .pic_Img{
        display: inline-block;
        width: 214px;
        height: 107px;
        img{
            width: 214px;
            height: 107px;
        }
    }
    ul{
        margin-top: 5px;
        li{
            height: 24px;
            line-height: 24px;
            a{
                font-size: 12px;
                font-family: "黑体", "Arial Narrow";
                &:hover{
                    color: #f00;
                }
            }
        }
    }
}
</style>