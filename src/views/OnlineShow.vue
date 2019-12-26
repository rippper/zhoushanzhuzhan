<template>
    <div class="onlineshow">
        <header-fix></header-fix>
        <div class="upld_windows" v-if="upLoadWindow" @click.self="upLoadWindow = false">
            <div class="upload_box">
                <div class="ub_title">
                    作品上传
                </div>
                <div class="ub_tcp">
                    <span>上传类型：</span>
                    <el-select v-model="updateType" placeholder="活动区域" size="mini" name="上传图片">
                        <el-option label="上传图片" value="1"></el-option>
                        <el-option label="上传视频" value="2"></el-option>
                    </el-select>
                    <span class="ub_tcptype">作品分类：</span>
                    <el-select v-model="productType" placeholder="活动区域" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </div>
                <div class="ub_picupdate">
                    <textarea placeholder="有什么新鲜事？和大家一起分享吧！（200字以内）" v-model="trendData.textArea"></textarea>
                    <div class="picAdd" v-if="updateType == 1">
                        <ul>
                            <li class="upload-item" v-for="(item,index) in picList" :key="index">
                                <img class="uploaded_attach" :src="item.Url" alt="upload">
                                <span class="delete_btn" alt="delete" @click="deleteAttach(index)"></span>

                            </li>
                            <li class="upload-btn" v-show="picList.length < 15">
                                <img 
                                    class="uploaded_attach"
                                    src="../assets/upload-cross.png" 
                                    alt="upload"
                                >
                                <input type="file" ref="attach" @change="onchangeImgFun($event)">
                            </li>
                        </ul>
                    </div>
                </div>
                <div>

                </div>
                <div class="ub_juge">
                    <div class="ubbtn_part">
                        <div class="ubbtn_pass">确认</div>
                        <div class="ubbtn_cancel">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="online_content">
            <div class="oli_bodyleftpart">
                <div class="oli_leftparttitle">
                    <span class="oli_logo"></span>
                    <span>全部分类</span>
                </div>
                <div class="oli_leftpartcontent">
                    <el-scrollbar>
                        <ul class="oli_typelist">
                            <li v-for="(item, index) in allType" :key="index">
                                <div class="oli_leftexample">
                                    <no-data-img :src="item.Img" alt=""></no-data-img>
                                    <div class="oli_labelname">
                                        <div v-text="item.ProductionCategoryName" @click="changeType(item.Id, 'title', index)" ref="titles"></div>
                                        <p v-text="item.EngName"></p>
                                    </div>
                                </div>
                                <div class="oli_buttonlist">
                                    <ul>
                                        <li 
                                        v-for="(itemson,indexson) in item.ProductionCategory" 
                                        :key="indexson" 
                                        v-text="itemson.ProductionCategoryName"
                                        @click="changeType(itemson.Id, 'button', indexson)"
                                        ref="buttons"
                                        ></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </div>
            <div class="oli_bodyrightpart">
                <div class="oli_rightbodycontent">
                    <div class="per_bodytitle">
                        全部作品
                        <a href="javascript:;" @click="changeOrder('newtype')" ref="news">最新
                            <span class="oli_yellowdown" v-show="news == 1 ? 1 : 0"></span>
                            <span class="oli_graydown" v-show="news == 0 ? 1 : 0"></span>
                        </a>
                        <a href="javascript:;" @click="changeOrder('hottype')" ref="hot">最热
                            <span class="oli_yellowdown" v-show="hot == 1 ? 1 : 0"></span>
                            <span class="oli_graydown" v-show="hot == 0 ? 1 : 0"></span>
                        </a>
                        <div class="production_upload" @click="Upload">作品上传</div>
                    </div>
                    <div class="per_bodycontent">
                        <ul class="clearFix">
                            <li class="pull-left" v-for="(item, index) in productList" :key="index" @click="lineto(item.Id)">
                                <div class="per_productimg">
                                    <img :src="item.Image" alt="">
                                    <div class="per_producttitleinfor">
                                        <span class="per_producticon"></span>
                                        <span class="per_productnum" v-text="item.EnclosureCount + 1"></span>
                                    </div>
                                </div>
                                <div class="per_productimg"></div>
                                <div class="per_productimg"></div>
                                <p class="per_producttitle" v-text="item.ProductionName"></p>
                                <p class="per_proimginfor"><span>点击量：</span><span v-text="item.ClickCount"></span><span></span><span v-text="item.AssistCount"></span></p>
                            </li>
                        </ul>
                        <div class="per_nothinginfor" v-if="noContent">
                            暂无数据
                        </div>
                    </div>
                    <div class="per_bodybottom">
                        <div class="per_singlepage">
                            <el-pagination
                                :current-page.sync="currentPage"
                                background
                                layout="prev, pager, next"
                                @current-change="currentchange()"
                                :total="totalPage">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { headerFix, footerFix, noDataImg } from '../components'
import { ProductionInfoList, ProductionCategoryInfoList, UploadAttachment } from '../service/getData'
import { pageCal } from '../service/helpPlugin'
export default {
    name: 'onlineshow',
    data () {
        return {
            allType: [],
            news: 1,
            hot: 0,
            productList: [],
            noContent: false,
            windowCoNDIdan: false,
            currentPage: 1,
            totalPage: 0,
            Rows: 9,
            Order: 'desc',
            Sort: 'CreateDate',
            upLoadWindow: false,
            updateType: 1, // 上传文件种类
            productType: '', // 作品类型 
            picList: [], // 图片上传列表
            trendData: { // 发布时提交的数据
                uploadPicList: [],
                textArea: ''
            }
        }
    },
    mounted () {
        this.render()
    },
    methods: {
        Upload () {
            this.upLoadWindow = true;
        },
        async changeOrder (condition) {
            this.productList = []
            if (condition == 'newtype') {
                this.$refs.hot.style.color = '#888'
                this.$refs.news.style.color = '#ff9c08'
                this.news = 1
                this.hot = 0
                this.Sort = 'CreateDate'
                this.Order = 'desc'
            } else if (condition == 'hottype') {
                this.$refs.hot.style.color = '#ff9c08'
                this.$refs.news.style.color = '#888'
                this.news = 0
                this.hot = 1
                this.Sort = 'ClickCount'
                this.Order = 'desc'
            }
            this.render()
        },
        async render () {
            let typeList = await ProductionCategoryInfoList({})
            let Infor = await ProductionInfoList({
                ProductionCategoryId: this.ProductionCategoryId,
                ProductionName: this.ProductionName,
                Order: this.Order,
                Sort: this.Sort,
                Page: 1,
                Rows: this.Rows
            })
            this.allType = typeList.Data.List
            this.productList = Infor.Data.List
            
            if (this.productList.length == 0) {
                this.noContent = true
            } else {
                this.noContent = false
            }
            this.allType.forEach(item => {
                item.EngName = item.EngName.toUpperCase()
            })
            this.currentPage = 1
            this.totalPage = pageCal(Infor.Data.TotalCount, this.Rows)
        },
        async changeType (index, type, listindex) {
            this.$refs.titles.forEach((item) => {
                item.style.color = ''
            })
            this.$refs.buttons.forEach((item) => {
                item.style.color = ''
                item.style.background = ''
            })
            if (type == 'title') {
                this.$refs.titles[listindex].style.color = '#FF9C08'
            }
            if (type == 'button') {
                this.$refs.buttons[listindex].style.color = '#fff'
                this.$refs.buttons[listindex].style.background = 'linear-gradient(to left,#58d7fb,#2cabfa)'
            }
            this.productList = []
            this.ProductionCategoryId = index
            this.ProductionName = ''
            this.timer = ''
            this.render()
            console.log(this.productList.length)
        },
        async currentchange () {
            this.productList = []
            let Infor = await ProductionInfoList({
                ProductionCategoryId: this.ProductionCategoryId,
                ProductionName: this.ProductionName,
                Sort: this.Sort,
                Order: this.Order,
                Page: this.currentPage,
                Rows: this.Rows
            })
            this.productList = Infor.Data.List
        },
        async onchangeImgFun (e) {
            this.picAdd = true
            this.videoAdd = false
            var file = e.target.files[0]
            // console.log(file)
            let arr = file.name.split('.')
            let fileType = arr[arr.length - 1]
            let formData = new FormData()
            let fileName = `${+new Date()}.${fileType}`
            this.imgName = fileName
            formData.append('FileType', 'ImageCircle')
            formData.append('FileCode', fileName)
            formData.append('FileName', fileName)
            formData.append('file', file, fileName)
            let res = await UploadAttachment(formData)
            if (res.IsSuccess) {
                let obj = {
                    Name: fileName,
                    Url: window.URL.createObjectURL(file),
                    Type: 'Pic'
                }
                let obj1 = {
                    Name: fileName,
                    Url: fileName,
                    Type: 'Pic'
                }
                this.picList.push(obj)
                this.trendData.uploadPicList.push(obj1)
            }
            // console.log(this.picList)
        },
        deleteAttach (index) {
            this.picList.splice(index, 1)
            this.trendData.uploadPicList.splice(index, 1)
        }
    },
    components: {
        headerFix,
        footerFix,
        noDataImg
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.onlineshow{
    max-width: 1440px;
    width: 100%;
    margin:0 auto;
    background: url('../assets/bd_background.png') no-repeat;
    .upld_windows{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        .upload_box{
            width: 900px;
            height: 660px;
            background: #fff;
            border-radius: 15px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            .ub_title{
                width: 100%;
                height: 40px;
                line-height: 40px;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                background: #2e6ed0;
                font-size: 18px;
                color: #fff;
                text-align: center;
            }
            .ub_tcp{
                width: 720px;
                padding-top: 30px;
                padding-bottom: 10px;
                margin: 0 auto;
                .ub_tcptype{
                    margin-left: 12px;
                }
            }
            .ub_picupdate{
                width:720px;
                margin: 0 auto;
                textarea{
                    height: 115px;
                    padding: 10px 15px;
                    border: 1px solid #e8e8e8;
                    box-sizing: border-box;
                    color: #999;
                }
                .picAdd{
                    width: 720px;
                    height: 290px;
                    margin-top: 60px;
                    overflow: auto;
                    ul{
                        width: 700px;
                        @extend %clearFix;
                        .upload-item{
                            position: relative;
                            height: 120px;
                            width: 120px;
                            margin-right: 20px;
                            float: left;
                            margin-top: 25px;
                            .uploaded_attach{
                                position: absolute;
                                width: 120px;
                                height: 120px;
                                top: 0;
                            }
                            .delete_btn{
                                position: absolute;
                                top: -12px;
                                right: -12px;
                                width: 24px;
                                height: 24px;
                                border-radius: 100%;
                                background: #fff url('../assets/hq-btn-delete.png') no-repeat;
                                background-size: 100%;
                                cursor: pointer;
                                &:hover{
                                    background: #fff url('../assets/hq-btn-deleteact.png') no-repeat;
                                    background-size: 100%;
                                }
                            }
                        }
                        .upload-btn{
                            position: relative;
                            float: left;
                            display: block;
                            height: 120px;
                            width: 120px;
                            margin-right: 20px;
                            margin-top: 25px;
                            cursor: pointer;
                            margin-top: 24px;
                            img{
                                position: absolute;
                                width: 120px;
                                height: 120px;
                                display: inline-block;
                            }
                            input{
                                position: absolute;
                                left: 0;
                                top: 0;
                                opacity: 0;
                                width: 120px;
                                height: 120px;
                                z-index: 1;
                            }
                        }
                    }
                }
            }
            .ub_juge{
                width: 100%;
                height: 50px;
                position: absolute;
                bottom: 0;
                left: 0;
                @extend %clearFix;
                .ubbtn_part{
                    float: right;
                    width: 300px;
                    height: 50px;
                    .ubbtn_pass, .ubbtn_cancel{
                        float:left;
                        width: 100px;
                        height: 40px;
                        line-height: 40px;
                        border-radius: 5px;
                        text-align: center;
                    }
                    .ubbtn_pass{
                        margin-right: 30px;
                        background: #2e6ed0;
                        color: #fff;
                    }
                    .ubbtn_cancel{
                        background: #cecece;
                        color: #333;
                    }
                }
            }
        }
    }
    .online_content{
        width:1000px;
        margin:15px auto 0;
        @extend %clearFix;

        .oli_bodyleftpart{
            @extend %pull-left;
            @extend %clearFix;
            width:276px;
            background:#fff;
            .oli_leftparttitle{
                height:72px;
                background:#2e6ed0;
                font-size: 24px;
                color:#fff;
                box-sizing: border-box;
                .oli_logo{
                    width:31px;
                    height:25px;
                    background:url('../assets/oli-books.png');
                    margin-left:25px;
                    margin-top:21px;
                }
                span{
                    @extend %pull-left;
                    &:nth-child(2){
                        margin-top:17px;
                        margin-left:7px;
                    }
                }
            }
            .oli_leftpartcontent{
                background:#fff;
                margin:28px 0 47px 21px;
                width:241px;
                height:766px;
                overflow: auto;
                .el-scrollbar{
                    height:100%;
                }
                .el-scrollbar__wrap {
                    overflow-x: hidden;
                }
                .el-scrollbar__thumb{
                    background:#2e6ed0;
                    width:4px;
                    border-radius: 0;
                }
                .is-horizontal{
                    display:none;
                }
                .is-vertical{
                    width:4px;
                    border-radius: 0;
                    background:#efefef;
                    opacity: 1;
                }
                .oli_typelist{
                    li{
                        padding:28px 0 0 0;
                        &:first-child{
                            padding:0;
                        }
                        .oli_leftexample{
                            @extend %clearFix;
                            img{
                                width:70px;
                                height:64px;
                                border-radius: 3px;
                                @extend %pull-left;
                            }
                            .oli_labelname{
                                padding-left: 11px;
                                float: left;
                                div{
                                    margin-top: 13px;
                                    font-weight: bold;
                                    color:#2e6ed0;
                                    cursor:pointer;
                                }
                                p{
                                    width: 150px;
                                    font-size: 12px;
                                    color:#ccc;
                                }
                            }
                        }
                        .oli_buttonlist{
                            ul{
                                @extend %clearFix;
                                li{
                                    @extend %pull-left;
                                    width:106px;
                                    height:32px;
                                    border-radius: 3px;
                                    padding:0;
                                    text-align: center;
                                    line-height: 32px;
                                    background:#efefef;
                                    margin-right:9px;
                                    margin-top:9px;
                                    cursor:pointer;

                                    &:hover{
                                        background: #58d7fb;
                                        background:linear-gradient(to left,#58d7fb,#2cabfa);
                                        color:#fff;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .oli_bodyrightpart{
            @extend %pull-left;
            margin-left:21px;
            .per_bodytitle{
                padding-left: 19px;
                border-bottom: 2px solid #efefef;
                height: 66px;
                font-size: 20px;
                font-weight: bold;
                line-height: 66px;
                display: block;
                color:#888;
                a{
                    font-size: 12px;
                    color:#888;
                    margin-left:37px;
                    font-weight: normal;
                    &:first-of-type{
                        color: #ff9c08;
                    }
                    .oli_yellowdown{
                        display: inline-block;
                        width:6px;
                        height:11px;
                        margin-left:5px;
                        background:url('../assets/oli-todown1.png');
                        position: relative;
                        top:1px;
                    }
                    .oli_graydown{
                        display: inline-block;
                        width:6px;
                        height:11px;
                        margin-left:5px;
                        background:url('../assets/oli-todown2.png');
                        position: relative;
                        top:1px;
                    }
                }
                .production_upload{
                    float: right;
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    margin: 20px 15px 0 0;
                    border-radius: 3px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: normal;
                    color: #fff;
                    background: #2cabfa;
                    cursor: pointer;
                    &:hover{
                        background: #2e6ed0;
                    }
                }
            }
            .oli_bodyrtop{
                width:703px;
                height:78px;
                background:#fff;
                padding-left:33px;
                box-sizing: border-box;
                color:#666;
                position: relative;
                &:before{
                    content:'';
                    display: inline-block;
                    vertical-align: middle;
                    height:100%;
                }
                .oli_searchName{
                    width:220px;
                    border:1px solid #cecece;
                    border-radius: 3px;
                    margin:0 45px 0 7px;
                    height:30px;
                    padding: 0 10px;
                }
                .el-date-editor{
                    margin-left:7px;
                    height:32px;
                    padding:0 10px;
                    border:1px solid #cecece;
                }
                button{
                    margin-left:10px;
                    border:0;
                    height:32px;
                    width:62px;
                    border-radius: 3px;
                    background: #58d7fb;
                    background:linear-gradient(to left,#58d7fb,#2cabfa);
                    color:#fff;
                    cursor: pointer;
                }
                .per_close{
                    height:24px;
                    width:24px;
                    position: absolute;
                    background:url('../assets/oli-close.png');
                    top:-7px;
                    right:-7px;
                    cursor: pointer;
                }
            }

            .oli_bodyrtop_hidden{
                margin-top: 40px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                background: url('../assets/key-hide-bg.png') no-repeat;
                box-sizing: border-box;
                position: relative;
                span{
                    position: absolute;
                    top: 4px;
                    right: 6px;
                    width: 86px;
                    height: 22px;
                    border-radius: 2px;
                    line-height: 22px;
                    text-align: center;
                    background: linear-gradient(to left,#58d7fb,#2cabfa);
                    color: #fff;
                    cursor: pointer;
                }
            }
            .oli_rightbodycontent{
                background:#fff;
                width:703px;
                .per_bodycontent{
                    padding-top: 21px;
                    border-bottom:2px solid #efefef;
                    ul{
                        li{
                            margin-left:10px;
                            margin-bottom:29px;
                            position: relative;
                            width:220px;

                            .per_productimg{
                                width:203px;
                                height:158px;
                                position: absolute;
                                background:#fff;
                                border: 1px solid #cecece;

                                img{
                                    width:203px;
                                    height:158px;
                                    vertical-align: middle;
                                }

                                .per_productclick{
                                    position: absolute;
                                    top:9px;
                                    left:11px;
                                }

                                &:first-of-type{
                                    z-index: 3;
                                }

                                &:nth-of-type(2){
                                    width:203px;
                                    height:157px;
                                    top:5px;
                                    left:6px;
                                    border:1px solid #cecece;
                                    z-index: 2;
                                }

                                &:last-of-type{
                                    width:203px;
                                    height:157px;
                                    top:10px;
                                    left:12px;
                                    border:1px solid #cecece;
                                }

                                .per_producttitleinfor{
                                    width: 56px;
                                    height: 32px;
                                    position: absolute;
                                    bottom: 0;
                                    right: 0;
                                    line-height: 32px;
                                    background:#4470b5;
                                    color:#fff;

                                    .per_producticon{
                                        position: relative;
                                        top:3px;
                                        display: inline-block;
                                        background:url('../assets/per-producticon.png');
                                        width:18px;
                                        height:17px;
                                        margin-left:6px;
                                    }

                                    .per_productnum{
                                        display: inline-block;
                                        text-align: center;
                                        width:32px;
                                    }
                                }

                            }

                            .per_producttitle{
                                margin-top:172px;
                                height:25px;
                                color:#888;
                            }
                            .per_proimginfor{
                                span{
                                    color:#d1d1d1;

                                    &:nth-of-type(3){
                                        margin:0 5px 0 60px;
                                        display: inline-block;
                                        width:18px;
                                        height:18px;
                                        background:url('../assets/per-fingericon.png');
                                        position: relative;
                                        top:2px;
                                    }
                                }
                            }
                        }   
                    }
                    .per_nothinginfor{
                        height: 80px;
                        padding-top:15px;
                        text-align: center;
                        font-size: 18px;
                        box-sizing: border-box;
                    }
                }
                .per_bodybottom{
                    height:78px;
                    text-align: center;
                    &:before{
                        content:'';
                        display: inline-block;
                        vertical-align: middle;
                        height:100%;
                    }
                    .per_singlepage{
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>