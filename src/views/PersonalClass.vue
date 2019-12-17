<template>
    <div class="personalclass">
        <div class="per_bodytitle clearFix">
            <span class="per_coubigtitle pull-left">我的课程</span>
            <ul class="pull-left clearFix">
                <li 
                    class="per_couTopLab" 
                    v-for="(item, index) in courseType" 
                    :key="index" 
                    oncut="return false;" 
                    ref="per_couTopLab" 
                    @click="checkwindows(index)" 
                    v-text=item
                >
                </li>
            </ul>
            <div class="per_bodytitleR">
                <div class="exam-title2-check l">
                    <el-select v-model="selectOptionsValue" placeholder="请选择">
                        <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <input type="text" name="" id="" value="" placeholder="输入课程名称" v-model="examName" @keydown="keysearch()" ref="coursepic" >
                <span @click="searchRender()"><img src="../assets/glass.png"></span>
            </div>
        </div>
        <div>
            <router-view @courseType="titleChange" :keys="examNameToSend" ref="grandson"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonalClass',
    data () {
        return {
            courseType: ['正在学习课程', '已完成课程', '指定课程'],
            examName: '',
            selectOptionsValue: '',
            examNameToSend: '',
            selectOptions: [
                {
                    value: 'all',
                    label: '所有'
                },
                {
                    value: 'learning',
                    label: '正在学习的课程'
                }, 
                {
                    value: 'finish',
                    label: '已完成课程'
                }, 
                {
                    value: 'pointer',
                    label: '指定课程'
                }
            ],
        }
    },
    mounted () {
        this.$emit('getchildvalue', '0')
    },
    methods: {
        checkwindows (numindex) {
            let self = this
            this.$refs.per_couTopLab.forEach((item, index) => {
                item.style.color = '#333'
            })
            this.$refs.per_couTopLab[numindex].style.color = '#2e6ed0'
            if (numindex == 0) {
                self.$router.push({ path: 'personalmycourse' })
            } else if (numindex == 1) {
                // self.$router.push({ path: '/personalCenter/personClass/personalmyfincou' })
            } else if (numindex == 2) {
                // self.$router.push({ path: '/personalCenter/personClass/personalmypointercourse' })
            }
        },
        titleChange (numindex) {
            this.$refs.per_couTopLab.forEach((item, index) => {
                item.style.color = '#333'
            })
            this.$refs.per_couTopLab[numindex - 1].style.color = '#2e6ed0'
        },
        keysearch (evt) {
            let theEvent = window.event || evt
            let code = theEvent.keyCode || theEvent.which || theEvent.charCode
            if (code == 13) {
                this.searchRender()
            }
        },
        searchRender () {
            switch (this.selectOptionsValue) {
                case 'all':
                    this.examNameToSend = this.examName
                    break
                case 'learning':
                    this.examNameToSend = this.examName
                    this.$router.push({ path: '/personalCenter/personClass/personalmycourse' })
                    break
                case 'finish':
                    this.examNameToSend = this.examName
                    // this.$router.push({ path: '/personalCenter/personClass/personalmyfincou' })
                    break
                case 'pointer':
                    this.examNameToSend = this.examName
                    // this.$router.push({ path: '/personalCenter/personClass/personalmypointercourse' })
                    break
                default:
                    this.examNameToSend = this.examName
            }
        },
        render () {
            this.$refs['grandson'].render()
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.personalclass{
    @extend %clearFix;
    .per_bodytitle {
        border-bottom: 1px solid #efefef;
        padding-left: 19px;
        .per_coubigtitle{
            height: 66px;
            font-size: 20px;
            font-weight: bold;
            line-height: 66px;
            display: block;
            color:#555;
        }

        ul{
            li{
                float:left;
                height:16px;
                margin-left:8px;
                margin-top:29px;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
    .per_bodytitleR{
        @extend %pull-right;
        margin-right: 20px;
        margin-top: 14px;
        width: 300px;
        height: 34px;
        line-height: 34px;
        border-radius: 5px;
        border: 1px solid #dddddd;
        .exam-title2-check {
            .el-select {
                width:78px;
                .el-input__inner{
                    width: 60px;
                    height: 34px;
                    line-height: 34px;
                    border: none;
                    text-indent: 5px;
                    padding: 0;
                    text-align: center;
                }
                .el-input__suffix{
                    right:3px;
                    .el-input__icon{
                        width: 12px;
                        line-height: 34px;
                    }
                }
            }
        }
        input {
            width: 180px;
            height: 34px;
            line-height: 34px;
            border-left: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
            text-indent: 10px;
        }
        span {
            img{
                vertical-align: middle;
                margin-left: 8px;
                cursor: pointer;
            }
        }
    }
}
</style>