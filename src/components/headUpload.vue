<template>
    <div class="per_uploadheader">
        <div class="per_changetitle">
            头像修改
        </div>
        <div class="per_imginfor">
            <div class="per_headpic">
                <img :src="imgAddress" alt="">
            </div>
            <div class="per_headinfor"> 
                <p><span class="per_typeerror" v-show="isJpg == 0 ? 1 : 0"></span><span class="per_typetrue" v-show="isJpg == 1 ? 1 : 0"></span>图片格式为jpg格式</p>
                <p><span class="per_typeerror" v-show="isBig == 0 ? 1 : 0"></span><span class="per_typetrue" v-show="isBig == 1 ? 1 : 0"></span>图片大小小于2MB</p>
            </div>
        </div>
        <div class="per_imgdetail">
            <input type="file" accept="image/jpeg" @change="update()" ref="headimg">
            <span>图片大小：<span v-text="imgSize"></span>KB</span>
        </div>
        <div class="per_buttonGroup">
            <button type="button" @click="imgUpState()">确定</button>
            <button type="button" @click="cancelChange()">取消</button>
        </div>
    </div>
</template>

<script>
import { UploadAttachment, SetUserPhoto } from '../service/getData'
import { mapMutations } from 'vuex'
export default {
    name: 'updateHeader',
    data () {
        return {
            imgSize: 0,
            isBig: 0,
            isJpg: 0,
            imgAddress: '',
            formData: '',
            imgName: '',
            imgSrc: ''
        }
    },
    props: {
        refleash: {
            type: Function
        }
    },
    methods: {
        ...mapMutations('PersonalCenter', ['SET_PERSONWINDOW_DISAPPEAR']),
        update (evt) {
            const e = window.event || evt
            const target = e.srcElement ? e.srcElement : e.target
            const file = new FileReader()
            const upDateFile = target.files[0]
            const arr = upDateFile.name.split('.')
            const fileType = arr[arr.length - 1]
            if (fileType != 'jpg') {
                this.$message.warning('请上传jpg文件！')
                return false
            }
            this.isJpg = 1
            file.readAsDataURL(target.files[0])
            const fileSize = (target.files[0].size / 1024).toFixed(0)
            if (fileSize > 2048) {
                this.$message.warning('上传文件过大！')
                return false
            }
            this.isBig = 1
            this.imgSize = fileSize
            file.onloadend = (ev) => {
                // 赋值给vue对象属性
                this.imgAddress = ev.target.result
            }
            // 修改显示图片地址
            this.imgAddress = file.result
            // 设置上传文件内容
            const temp = new FormData()
            const fileName = `${+new Date()}.${fileType}`
            temp.append('FileType', 'ImageUser')
            temp.append('FileCode', fileName)
            temp.append('FileName', fileName)
            this.imgName = fileName
            this.imgSrc = window.URL.createObjectURL(upDateFile)
            temp.append('file', upDateFile, fileName)
            this.formData = temp
        },
        cancelChange () {
            this.imgSize = 0
            this.imgAddress = ''
            this.$refs.headimg.value = ''
            this.formData = ''
            this.imgName = ''
            this.isJpg = 0
            this.isBig = 0
            this.SET_PERSONWINDOW_DISAPPEAR()
        },
        async imgUpState () {
            if (!this.formData) {
                this.$message.error('请先选择图片')
                return false
            }
            // console.log(this.formData)
            const res = await UploadAttachment(this.formData)
            const msg = await SetUserPhoto({
                PhotoUrl: this.imgName
            })
            if (res.IsSuccess) {
                this.cancelChange()
                this.$message.success('文件上传成功！')
                this.refleash()
            } else {
                this.$message.warning('文件上传失败！')
            }
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.per_uploadheader{
    width: 580px;
    height: 500px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background:#fff;
    .per_changetitle{
        height: 40px;
        line-height: 40px;
        background: #2e6ed0;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        color:#fff;
    }
    .per_uploadheader{
        width: 580px;
        height:400px;
    }
    .per_imginfor{
        background:#ececec;
        @extend %clearFix;
        .per_headpic{
            width:350px;
            height:350px;
            float:left;
            position: relative;
            img{
                width: 300px;
                height: 300px;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
            }
        }
        .per_headinfor{
            float: left;
            padding-top:120px;
            padding-left: 15px;
            p{
                height:40px;
                line-height: 40px;
                .per_typeerror, .per_typetrue{
                    display: inline-block;
                    width: 14px;
                    height:14px;
                    position: relative;
                    top: 2px;
                    margin-right:5px;
                }
                .per_typeerror{
                    background: url('../assets/per_jugementfalse.png') no-repeat;
                }
                .per_typetrue{
                    background: url('../assets/per_jugementtrue.png') no-repeat;
                }
            }
        }
        
    }
    .per_imgdetail{
        background:#ececec;
        padding-left: 15px;
        padding-bottom: 20px;
        input{
            margin-right: 10px;
            background:#ececec;
            border: 0;
        }
    }
    .per_buttonGroup{
        margin-top:12px;
        padding-left:360px;
        button{
            width:85px;
            height:40px;
            line-height: 40px;
            border-radius: 40px;
            border:0;
            cursor: pointer;
            &:first-of-type{
                margin-right:15px;
                background: #58d7fb;
                background: linear-gradient(to right,#58d7fb,#2cabfa );
                color:#fff;
            }
            &:last-of-type{
                &:hover{
                    color:#fff;
                    background:#781e2f;
                }
            }
        }
    }
    
}

</style>
