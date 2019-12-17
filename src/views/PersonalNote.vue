<template>
    <div class="personalnote">
        <div class="per_bodytitle">学习笔记</div>
        <div class="per_notePartCont">
            <ul>
                <li class="clearFix" v-for="(item,index) in noteList" :key="index">
                    <div class="per_noteClikBox pull-left">
                        <img src="../assets/per-check.png" alt="" @click="checkjugment(index)" v-if="jugement[index] == 1 ? 1 : 0">
                        <img src="../assets/per-checkout.png" alt="" @click="checkjugment(index)" v-if="jugement[index] == 0 ? 1 : 0">
                    </div>
                    <div class="per_noteInfor pull-left">
                        <p class="per_noteInforLabel">标题：<span v-text="item.Name"></span></p>
                        <p class="per_noteInforcont" v-text="item.Content"></p>
                        <a 
                            class="per_noterewrite" 
                            id="per_noterewrite" 
                            :href="item.noteLink" 
                            @click="upDataNote(item.Id)"
                        >
                            <img src="../assets/per-rewrite.png" alt="">
                            <span>修改</span>
                        </a>
                    </div>
                </li>
            </ul>
            <div class="per_noneinfor" v-if="contentInfor">
              <h1>暂无任何内容</h1>
            </div>
        </div>
        <div class="per_bodyBottom clearFix">
            <div class="pull-left">
                <div class="per_selectall" @click="selectAll()">
                    <img src="../assets/per-checkout.png" alt  ref="checkall"/>
                    <span>全选</span>
                </div>
                <button class="per_delete" type="button" @click="deleteClass()">删除</button>
            </div>
            <div class="per_singlepage pull-right">
                <el-pagination
                    :current-page.sync="currentPage"
                    @current-change="render()"
                    type="danger"
                    background
                    layout="prev, pager, next"
                    :total="totalPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { CourseNoteList, NoteUpdate, DelNote } from '../service/getData'
import { SET_NOTECHANGE_APPEAR } from '../store/mutation-types.js'
import { pageCal, wordsL } from '../service/helpPlugin'
export default {
    name: 'PersonalNote',
    data () {
        return {
            noteList: [],
            currentPage: 1,
            totalPage: 0,
            jugement: [],
            checkAll: false,
            rows: 6,
            contentInfor: false
        }
    },
    mounted () {
        this.$emit('getchildvalue', '3')
        this.render()
    },
    methods: {
        ...mapMutations('PersonalCenter', ['SET_NOTECHANGE_APPEAR']),
        checkjugment (index) {
            if (this.jugement[index] == 0) {
                this.jugement.splice(index, 1, 1)
            } else {
                this.jugement.splice(index, 1, 0)
                if (this.checkAll == true) {
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                }
            }
        },
        selectAll () {
            if (this.checkAll == false) {
                for (let i = 0; i < this.jugement.length; i++) {
                    this.jugement.splice(i, 1, 1)
                }
                this.checkAll = true
                this.$refs.checkall.src = require('../assets/per-check.png')
            } else {
                this.checkAll = false
                this.$refs.checkall.src = require('../assets/per-checkout.png')
            }
        },
        async render () {
            let msg = await CourseNoteList({
                page: this.currentPage,
                rows: this.rows
            })
            this.noteList = msg.ListData
            if (this.noteList == 0) {
                this.contentInfor = true
            }
            this.totalPage = pageCal(msg.Count, this.rows)
            if (this.noteList.length < this.rows) {
                this.jugement = []
                for (let i = 0; i < this.noteList.length; i++) {
                    this.jugement.push(0)
                }
            } else {
                this.jugement = []
                for (let i = 0; i < this.rows; i++) {
                    this.jugement.push(0)
                }
            }
        },
        async deleteClass () {
            let delItem = []
            this.jugement.forEach((item, index) => {
                if (item == 1) {
                    delItem.push(this.noteList[index].Id)
                }
            })
            if (delItem.length == 0) {
                this.$message({
                    message: '请先选取笔记！',
                    type: 'warning'
                })
                return
            }
            if (delItem.length > 0) {
                let backInfor = []
                for (let i = 0; i < delItem.length; i++) {
                    let result = await DelNote({
                        noteId: delItem[i]
                    })
                    if (result.Type == 1) {
                        delItem[i] = 1
                    } else if (result.Type == 0) {
                        delItem[i] = 0
                        backInfor.push(this.noteList[i].Name)
                    }
                }
                if (backInfor.length == 0) {
                    this.$message({
                        message: '笔记删除成功！',
                        type: 'success'
                    })
                    this.currentPage = 1
                    this.render()
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                } else if (backInfor.length > 0) {
                    this.$message({
                        message: '笔记删除失败！',
                        type: 'error'
                    })
                }
            }
        },
        async upDataNote (index) {
            let msg = await NoteUpdate({
                noteId: index
            })
            let arr = [msg.Name, msg.Content, msg.CourseName, index, msg.Id]
            this.SET_NOTECHANGE_APPEAR(arr)
        }
    },
    computed: {
        ...mapState('PersonalCenter', {
            pernoteLabel: (state) => state.pernoteLabel, 
            pernoteInfor: (state) => state.pernoteInfor, 
            perNoteForLesson: (state) => state.perNoteForLesson
        })
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.personalnote{
    .per_bodytitle{
        height: 66px;
        border-bottom: 1px solid #efefef;
        line-height: 66px;
        font-size: 20px;
        font-weight: bold;
        color:#555;
        padding-left: 19px;
    }
    .per_notePartCont{
        ul{
            li{
                border:1px solid #efefef;
                &:hover{
                    .per_noteInfor{
                        .per_noterewrite{
                            display: block;
                            cursor: pointer;
                        }
                    }
                }
                .per_noteClikBox{
                    width:72px;
                    height:153px;
                    position: relative;
                    img{
                        position: absolute;
                        top:0;
                        right:0;
                        bottom:0;
                        left:0;
                        margin:auto;
                    }
                }
                .per_noteInfor{
                    width:605px;
                    position: relative;
                    .per_noteInforLabel{
                        color:#2e6ed0;
                        padding:0 19px 0 19px;
                        margin:20px 0 15px;
                        height:40px;
                        line-height: 40px;
                        border-top-left-radius:40px;
                        border-top-right-radius:40px;
                        border-bottom-right-radius:40px;
                        background:#f0f4fa;
                        display:inline-block;
                    }
                    .per_noteInforcont{
                        width:600px;
                        margin-left:5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-wrap: pre-wrap;
                    }
                    .per_noterewrite{
                        position: absolute;
                        top:25px;
                        right:0;
                        display: none;
                        img{
                            margin-right:7px;
                            position: relative;
                            bottom:2px;
                        }
                        span{
                            color:#2e6ed0;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
        .per_noneinfor{
            height:300px;
            line-height: 300px;
            text-align: center;
        }
    }
    .per_bodyBottom{
        height:75px;
        line-height: 75px;
        .per_selectall{
            display: inline-block;
            padding-left:31px;
            img{
                margin-right: 12px;
            }
            span{
                margin-right: 16px;
            }
        }
        .per_delete{
            border: 0;
            width: 56px;
            height: 28px;
            color: #fff;
            border-radius: 3px;
            background:#66a3fd;
            line-height: 28px;
        }
        .per_singlepage{    
            position: relative;
            top:50%;
            right:35px;
            margin-top:-14px;
            .el-pager {
                height:28px;
                li {
                    width:auto;
                }
            }
        }
    }
}
</style>
