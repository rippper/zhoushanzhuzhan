<template>
    <div class="headerfix">
      <div class="head_part">
        <div class="hp_Inner">
          <div class="hp_userlogin">
            <div v-if="!userInfo.Account">
              您好！欢迎来到舟山终身学习网!
              <router-link class="ul_button" to="/login">登录</router-link>
              <a class="ul_button" href="javascript:;">注册</a>
              <a class="hp_clickbtn" href="javascript:;">忘记密码</a>
            </div>
            <div v-else>
              您好！<span v-text="userInfo.Account"></span>欢迎来到舟山终身学习网；您目前的学分：<span></span>；学习币：<span></span>；您有0条通知！
              <router-link class="lo_clickbtn" to="/personalcenter">个人中心</router-link> |
              <a class="lo_clickbtn" href="javascript:;">资料修改</a> |
              <a class="lo_clickbtn" href="javascript:;" @click="loginOut">退出系统</a>
            </div>
          </div>
          <div class="hp_setpart">
            <a href="javascript:;">设为首页</a> |
            <a href="javascript:;">加入收藏</a>
          </div>
        </div>
      </div>
      <div class="head_banner">
        <div class="hb_left">
          <img src="../assets/zssy_logo.png" alt="">
          <img class="logo_words" src="../assets/ht_words.gif" alt="">
        </div>
        <div class="hb_right">
          <ul>
            <li v-for="(item, index) in bannerImg" :key="index" ref="bannerImg"><img :src="item.Img" alt=""></li>
          </ul>
        </div>
      </div>
      <div class="head_nav">
        <ul>
          <li>
            <router-link to="/">网站首页</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/newslist', query: { Id: 134 } }">新闻信息</router-link>
            <ul>
              <li>
                <router-link :to="{ path: '/newslist', query: { Id: 139 } }">通知公告</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/newslist', query: { Id: 135 } }">社教新闻</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/newslist', query: { Id: 138 } }">图文咨询</router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/courselist">课程中心</router-link>
            <ul>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '老年教育' } }">老年教育</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '家庭教育' } }">家庭教育</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '微课程' } }">微课程</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '初中教育' } }">初中教育</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '小学教育' } }">小学教育</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '学前教育' } }">学前教育</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '幼儿教育' } }">幼儿教育</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '人生规划' } }">人生规划</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '创新课堂' } }">创新课堂</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '早教课堂' } }">早教课堂</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '海洋经济' } }">海洋经济</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '舟山特色课程' } }">舟山特色课程</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '培训之窗' } }">培训之窗</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '职场纵横' } }">职场纵横</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '文化科普' } }">文化科普</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '家庭理财' } }">家庭理财</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '休闲保健' } }">休闲保健</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '渔农民培训' } }">渔农民培训</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/courselist', query: { title: '游学专题' } }">游学专题</router-link>
              </li>
            </ul>
          </li>
          <li>
            <a href="http://www.zsxxnet.cn/UnivElders/">老年教育</a>
          </li>
          <li>
            <a href="http://www.zsxxnet.cn/jtjy/jtjy.aspx">家庭教育</a>
          </li>
          <li>
            <a href="http://www.zsxxnet.cn/elelib/tipmessage.aspx">电子资源</a>
          </li>
          <li>
            <a href="http://www.zsxxnet.cn/hall/Pro_More.aspx">网上展厅</a>
            <ul>
              <li>
                <a href="http://www.zsxxnet.cn/hall/Pro_More.aspx?TypeId=3">摄影作品展</a>
              </li>
              <li>
                <a href="http://www.zsxxnet.cn/hall/Pro_More.aspx?TypeId=2">国画作品展</a>
              </li>
              <li>
                <a href="http://www.zsxxnet.cn/hall/Pro_More.aspx?TypeId=1">书法作品展</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="http://www.zsxxnet.cn/artical/Article_List.aspx?typeid=144">社区教研</a>
          </li>
          <li>
            <a href="http://www.zsxxnet.cn/CommHouse.aspx">社区之家</a>
            <ul>
              <li>
                <a href="http://www.zsxxnet.cn/artical/Article_List.aspx?typeid=140">成果展示</a>
              </li>
              <li>
                <a href="http://www.zsxxnet.cn/zsScene.aspx">舟山风貌</a>
              </li>
              <li>
                <a href="http://www.zsxxnet.cn/sourceshare/space.aspx">场地建设</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="http://www.zsxxnet.cn/usercenter/JianyanList.aspx">建言献策</a>
          </li>
          <li>
            <a href="http://www.zsxxnet.cn/AreaMap.aspx">区县平台</a>
            <ul>
              <li>
                <a href="http://dh.zsxxnet.cn/">定海区</a>
              </li>
              <li>
                <a href="http://pt.zsxxnet.cn/">普陀区</a>
              </li>
              <li>
                <a href="http://ds.zsxxnet.cn/">岱山县</a>
              </li>
              <li>
                <a href="http://ss.zsxxnet.cn/">嵊泗县</a>
              </li>
              <li>
                <a href="http://lc.zsxxnet.cn/">临城新区</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="head_msg">
        <div class="msg_left">
          <div class="ml_date">
            今天是：<span v-text="year"></span>年<span v-text="mouth"></span>月<span v-text="day"></span>日
          </div>
          <div class="ml_weather">
            天气预报：
          </div>
        </div>
        <div class="head_right">
          <el-input placeholder="请输入内容" v-model="contentInfor" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="搜索课程" value="1"></el-option>
              <el-option label="搜索文章" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searcher()"></el-button>
          </el-input>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { LoginOut } from '../service/getData'
export default {
    name: 'headerfix',
    data () {
      return {
        loginType: false,
        bannerImg: [
          {
            Img: require('../assets/ht_banner0.png')
          },
          {
            Img: require('../assets/ht_banner1.png')
          },
          {
            Img: require('../assets/ht_banner2.png')
          },
          {
            Img: require('../assets/ht_banner3.png')
          }
        ],
        bannerIndex: 0,
        timerRobot: '',
        contentInfor: '',
        select: '',
        year: '',
        mouth: '',
        day: ''
      }
    },
    mounted () {
      this.timerRobot = setInterval(this.bannerTo, 8000);
      this.getDate()
    },
    beforeDestroy () {
      clearInterval(this.timerRobot)
    },
    methods: {
      ...mapActions('UserLogin', [
        'getUserInformation', 
        'saveUserInfo'
      ]),
      bannerTo () {
        this.bannerIndex = ++this.bannerIndex
        this.bannerIndex > 3 ? this.bannerIndex = 0 : this.bannerIndex
        this.$refs.bannerImg.forEach(item => {
          item.style.opacity = 0
          item.style.zIndex = 1
        })
        this.$refs.bannerImg[this.bannerIndex].style.opacity = 1
        this.$refs.bannerImg[this.bannerIndex].style.zIndex = 2
      },
      getDate () {
        let date = new Date()
        this.year = date.getFullYear()
        this.mouth = date.getMonth() + 1
        this.day = date.getDate()
      },
      async loginOut () {
        let data = await LoginOut()
        if (data.Type == 1) {
          this.saveUserInfo({})
          window.localStorage.removeItem('ASPXAUTH')
          window.localStorage.removeItem('userInfo')
        }
        if (!this.$route.meta.isSkip) {
          this.$router.push({ path: '/login' })
        }
      },
      searcher () {
        if (this.select == '') {
          this.$message.warning('请先选择搜索类型！')
          return false
        }
        if (this.select == 1) {
          if (this.contentInfor == '') {
            this.$message.warning('请先输入关键字！')
            return false
          }
          this.$router.push({ path: '/courselist', query: { keyWords: this.contentInfor } })
        } else if (this.select == 2) {
          if (this.contentInfor == '') {
            this.$message.warning('请先输入关键字！')
            return false
          }
          this.$router.push({ path: '/newslist', query: { keyWords: this.contentInfor } })
        }
      }
    },
    computed: {
      ...mapState({
        userInfo: (state) => state.UserLogin.userInfo
      })
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.headerfix{
  font-size: 12px;
  .head_part{
    min-width: 1025px;
    .hp_Inner{
      width: 1000px;
      height: 34px;
      line-height:34px;
      padding: 0 35px 0 28px;
      margin: 0 auto;
      box-sizing: border-box;
      @extend %clearFix;
      .hp_userlogin{
        float:left;
        .ul_button{
          width: 47px;
          height: 23px;
          line-height: 23px;
          margin: 4px 0 0 6px;
          text-align: center;
          background: #fff;
          display: inline-block;
        }
        .hp_clickbtn{
          margin-left: 6px;
          color: #4e4e4e;
          &:hover{
            color: #f00;
          }
        }
        .lo_clickbtn{
          color: #4e4e4e;
          &:hover{
            color: #f00;
          }
        }
      }
      .hp_setpart{
        float: right;
      }
    }
  }
  .head_banner{
    width: 1000px;
    height: 221px;
    margin: 0 auto;
    @extend %clearFix;
    .hb_left{
      float: left;
      width: 362px;
      margin-top: 70px;
      .logo_words{
        margin-top:15px;
      }
    }
    .hb_right{
      float:right;
      width:521px;
      ul{
        position: relative;
        li{
          position: absolute;
          top: 0;
          left: 0;
          transition: 1s;
          opacity: 0;
          &:first-of-type{
            opacity: 1;
          }
        }
      }
    }
  }
  .head_nav{
    width: 1000px;
    
    margin: 0 auto;
    & > ul{
      padding: 5px 0 8px 8px;
      background: url('../assets/nav_bg.png') no-repeat;
      background-size: 100%;
      @extend %clearFix;
      & > li{
        float: left;
        margin-right: 5px;
        position: relative;
        &:hover{
          ul{
            max-height: 500px;
          }
        }
        & > a{
          width: 85px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          font-weight: bold; 
          color: #fff;
          text-align: center;
          display: inline-block;
          text-shadow: 3px 3px 3px #015388;;
        }
        ul{
          max-height: 0px;
          position: absolute;
          top: 31px;
          right: 0;
          transition: 0.5s;
          overflow: hidden;
          z-index: 20;
          li{
            border-bottom: 1px solid #fff;
            a{
              width: 85px;
              height: 24px;
              line-height: 24px;
              background: #f6f6f6;
              color: #2b2b2b;
              opacity: 0.9;
              text-align: center;
              display: inline-block;
              z-index: 10;
              &:hover{
                background: #fda443;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .head_msg{
    width: 1000px;
    height: 35px;
    margin: 10px auto 0;
    @extend %clearFix;
    .msg_left{
      float: left;
      @extend %clearFix;
      .ml_date{
        float: left;
        width: 210px;
        height: 24px;
        line-height: 24px;
        padding: 8px 0 0 35px;
        font-weight: bold;
        color: #1e82d2;
      }
      .ml_weather{
        float: left;
        height: 24px;
        line-height: 24px;
        padding-top: 8px;
        font-weight: bold;
        color: #1e82d2;
      }
    }
    .head_right{
      float: right;
      width: 395px;
      height: 32px;
      input{
        height: 32px;
        line-height: 32px;
      }
      .el-input--suffix{
        .el-input__inner{
          padding-left: 5px;
          width:95px;
          text-align: center;
        }
      }
      .el-input-group__append{
        width:48px;
        padding: 0;
        position: relative;
        button{
          width: 40px;
          padding: 0;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
        }
      }
      
      .el-input__inner{
        width: 250px;
      }
      .el-select__caret{
        line-height: 32px;
      }
    }
  }
}
</style>