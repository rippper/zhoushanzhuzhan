<template>
  <div class="home">
    <header-fix></header-fix>
    <div class="home_content">
      <!-- 顶部 -->
      <div class="top_part">
        <div class="banner_part">
          <div class="maintitle">
            图文资讯
          </div>
          <el-carousel :interval="5000" arrow="never" indicator-position="none" height="208px" ref="carousel" @change="((now, pre) => { change(now, pre) })">
            <el-carousel-item v-for="(item, index) in bannerImg" :key="index">
              <div class="bannerItem">
                <img :src="item.Img" alt="">
                <div class="bannerDetail" v-text="item.Detail"></div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="indicator_part">
            <ul>
              <li v-for="item in bannerImg.length" :key="item" v-text="item" @mouseenter="setActiveItem(item)" ref="indicatorItem"></li>
            </ul>
          </div>
        </div>
        <div class="news_list">
          <div class="newstitle">
            <div class="nt_left">
              <a href="javascript:;" :class="{ 'title_active': msgBoxType == 0 }" @mouseenter="titleTypeChange(0)">社交新闻</a>
              <a href="javascript:;" :class="{ 'title_active': msgBoxType == 1 }" @mouseenter="titleTypeChange(1)">通知公告</a>
            </div>
            <div class="nt_right">
              <a href="javascript:;">更多</a>
            </div>
          </div>
          <div class="content_list">
            <ul>
              <li>
                <ul>
                  <li class="content_item" v-for="(item, index) in socialNews" :key="index" v-show="msgBoxType == 0">
                    <span class="ct_left" v-text="item.msg" :title="item.msgAdd"></span>
                    <span class="ct_right" v-text="item.date"></span>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li class="content_item" v-for="(item, index) in notifiy" :key="index" v-show="msgBoxType == 1">
                    <span class="ct_left" v-text="item.msg" :title="item.msgAdd"></span>
                    <span class="ct_right" v-text="item.date"></span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="chat_part">
          <div class="chat_box">
            <a href="http://wpa.qq.com/msgrd?v=3&uin=2195778467&site=qq&menu=yes">
              <img src="../assets/qqonline.jpg" alt="">
            </a>
          </div>
          <div class="map_title">区县学习导航</div>
          <div class="map_content"></div>
        </div>
      </div>
      <!-- 中部 -->
      <div class="middle_part">
        <div class="mp_left">
          <div class="personalCenter">
            <img src="../assets/grzx_title.png" alt="">
            <div class="pc_chooselist">
              <ul>
                <li>
                  <img src="../assets/list_icon1.png" alt="">
                  <a href="javascript:;">课程统计</a>
                </li>
                <li>
                  <img src="../assets/list_icon2.png" alt="">
                  <a href="javascript:;">课程计划</a>
                </li>
                <li>
                  <img src="../assets/list_icon3.png" alt="">
                  <a href="javascript:;">我的收藏</a>
                </li>
                <li>
                  <img src="../assets/list_icon4.png" alt="">
                  <a href="javascript:;">考试统计</a>
                </li>
                <li>
                  <img src="../assets/list_icon5.png" alt="">
                  <a href="javascript:;">学分统计</a>
                </li>
                <li>
                  <img src="../assets/list_icon6.png" alt="">
                  <a href="javascript:;">我的通知</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="videoSource">
            <a href="javascript:;">
              <img src="../assets/yingxiangzl.jpg" alt="">
            </a>
          </div>
          <div class="rnakingList">
            <div class="ranklist_title">
              <div class="rt_left">排行榜</div>
              <div class="rt_right">
                <span class="rank_titlebtn"><a href="javascript:;" :class="{ 'rank_active': rankType == 0 }" @mouseenter="rankTypeChange(0)">社区学习</a></span> /
                <span class="rank_titlebtn"><a href="javascript:;" :class="{ 'rank_active': rankType == 1 }" @mouseenter="rankTypeChange(1)">学校学习</a></span> /
                <span class="rank_titlebtn"><a href="javascript:;" :class="{ 'rank_active': rankType == 2 }" @mouseenter="rankTypeChange(2)">课程排行</a></span>
              </div>
            </div>
            <div>

            </div>
          </div>
          <div class="teacherList"></div>
          <div class="conveniencePeople">
            <div class="cpe_title">便民服务</div>
            <div class="cpe_content">
              <ul>
                <li>
                  <a href="http://www.chsi.com.cn/xlcx/" target="_blank">学历查询</a>
                </li>
                <li>
                  <a href="https://gaokao.chsi.com.cn/sch/search--ss-on,option-qg,searchType-1,start-0.dhtml" target="_blank">高校查询</a>
                </li>
                <li>
                  <a href="http://www.zdic.net/" target="_blank">汉语字典</a>
                </li>
                <li>
                  <a href="http://xh.5156edu.com/" target="_blank">新华字典</a>
                </li>
                <li>
                  <a href="http://law.law-star.com/html/lawsearch.htm" target="_blank">法律条规</a>
                </li>
                <li>
                  <a href="http://www.boc.cn/pbservice/pb3/" target="_blank">个人理财</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mp_right">
          <ul>
            <li v-for="(item, index) in articleCommed" :key="index">
              <home-message-box  :articleModel="item"></home-message-box>
            </li>
          </ul>
        </div>
      </div>
      <div class="home_ad">
          <ul>
              <li :class="{'ad_action': item.jugment}" v-for="(item, index) in advpart" :key="index">
                  <a href="javascript:;">
                      <img :src="item.Image" alt="">
                  </a>
              </li>
          </ul>
      </div>
      <div class="home_onlineshow">
        <div class="ho_title">
          <div class="ho_title_left">
            网上展厅
          </div>
          <div class="ho_title_right">
            <a href="javascript:;">
              <img src="../assets/cg_more.png" alt="">
            </a>
          </div>
        </div>
        <div class="ho_content">
          <ul ref="rollpart" @mouseenter="rollStop()" @mouseleave="rollStart()">
            <li v-for="(item, index) in scrollList" :key="index">
              <a href="javascript:;">
                <img :src="item.Img" alt="">
              </a>
              <p class="home_hc_title" v-text="item.Title"></p>
              <p class="home_hc_author">作者：<span v-text="item.Author"></span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="home_bottom_part">
      <div class="home_socityfamily">
        <div class="home_socityfamily_title">
          <div class="home_st_left">社区之家</div>
          <div class="home_st_right">
            <a href="javascript:;">舟山风貌</a> /
            <a href="javascript:;">场地建设</a>
          </div>
        </div>
        <div class="home_socityfamily_content">
          <ul>
            <li v-for="(item, index) in socityFamily" :key="index">
              <a href="javascript:;">
                <img :src="item.Img" alt="">
                <p v-text="item.Title"></p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <footer-fix></footer-fix>
    </div>
  </div>
</template>

<script>
import { headerFix, footerFix, homeMessageBox } from '../components'
export default {
  name: 'home',
  data () {
    return {
      bannerImg: [
        {
          Img: require('../assets/home_banner1.jpg'),
          Detail: '舟山蓉浦学院喜获2019年全国...'
        },
        {
          Img: require('../assets/home_banner2.jpg'),
          Detail: '舟山蓉浦学院喜获2019年全国...'
        },
        {
          Img: require('../assets/home_banner3.jpg'),
          Detail: '舟山蓉浦学院喜获2019年全国...'
        }
      ],
      msgBoxType: 0,
      socialNews: [
        {
          msg: '2019舟山市全民终身学习活动周精彩回顾',
          date: '2019-11-21',
          msgAdd: '2019舟山市全民终身学习活动周精彩回顾'
        },
        {
          msg: '2019舟山市全民终身学习活动周精彩回顾',
          date: '2019-11-21',
          msgAdd: '2019舟山市全民终身学习活动周精彩回顾'
        },
        {
          msg: '2019舟山市全民终身学习活动周精彩回顾',
          date: '2019-11-21',
          msgAdd: '2019舟山市全民终身学习活动周精彩回顾'
        },
        {
          msg: '2019舟山市全民终身学习活动周精彩回顾',
          date: '2019-11-21',
          msgAdd: '2019舟山市全民终身学习活动周精彩回顾'
        },
        {
          msg: '2019舟山市全民终身学习活动周精彩回顾',
          date: '2019-11-21',
          msgAdd: '2019舟山市全民终身学习活动周精彩回顾'
        },
        {
          msg: '2019舟山市全民终身学习活动周精彩回顾',
          date: '2019-11-21',
          msgAdd: '2019舟山市全民终身学习活动周精彩回顾'
        }
      ],
      notifiy: [
        {
          msg: '2019年舟山市家庭教育规划课题和实验项目立项评...',
          date: '2019-12-03',
          msgAdd: '2019年舟山市家庭教育规划课题和实验项目立项评审结果的通知'
        }
      ],
      articleCommed:[
        {
          Img: require('../assets/hl_oldManEdu.png'),
          articleList: [
            {
              ArticleName: '老年人家庭角色的改变'
            },
            {
              ArticleName: '老年心理与健康（01）'
            },
            {
              ArticleName: '说不完的婆婆和媳妇'
            }
          ]
        },
        {
          Img: require('../assets/hl_familyedu.png'),
          articleList: []
        },
        {
          Img: require('../assets/hl_restLife.jpg'),
          articleList: []
        },
        {
          Img: require('../assets/hl_moneymanage.jpg'),
          articleList: []
        },
        {
          Img: require('../assets/hl_culture.jpg'),
          articleList: []
        },
        {
          Img: require('../assets/hl_work.png'),
          articleList: []
        },
        {
          Img: require('../assets/hl_training.jpg'),
          articleList: []
        },
        {
          Img: require('../assets/hl_oecomonic.png'),
          articleList: []
        },
        {
          Img: require('../assets/hl_preedu.jpg'),
          articleList: []
        },
        {
          Img: require('../assets/hl_inovate.png'),
          articleList: []
        },
        {
          Img: require('../assets/hl_peoplelife.jpg'),
          articleList: []
        },
        {
          Img: require('../assets/hl_fishmantraining.png'),
          articleList: []
        }
      ],
      rankType: 0,
      advpart: [
        {
          Image: require('../assets/lxyz01.png'),
          jugment: true
        },
        {
          Image: require('../assets/lxyz02.png'),
          jugment: false
        },
        {
          Image: require('../assets/lxyz03.png'),
          jugment: false
        },
        {
          Image: require('../assets/lxyz04.png'),
          jugment: false
        }
      ],
      adIndex: 0,
      advRobot: '',
      socityFamily: [
        {
          Img: require('../assets/socity_family.jpg'),
          Title: '我市两位教师喜获...'
        },
        {
          Img: require('../assets/socity_family.jpg'),
          Title: '我市两位教师喜获...'
        },
        {
          Img: require('../assets/socity_family.jpg'),
          Title: '我市两位教师喜获...'
        },
        {
          Img: require('../assets/socity_family.jpg'),
          Title: '我市两位教师喜获...'
        },
        {
          Img: require('../assets/socity_family.jpg'),
          Title: '我市两位教师喜获...'
        },
        {
          Img: require('../assets/socity_family.jpg'),
          Title: '我市两位教师喜获...'
        },
        {
          Img: require('../assets/socity_family.jpg'),
          Title: '我市两位教师喜获...'
        }
      ],
      scrollList: [
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        },
        {
          Img: require('../assets/scrollImg.png'),
          Title: '文明我先行',
          Author: '余显定'
        }
      ],
      rollpartRobot: ''
    }
  },
  mounted () {
    this.advRobot = setInterval(() => {
      this.adIndex++
      this.adChange(this.adIndex)
    }, 5000)
    this.rollStart()
  },
  beforeDestroy () {
    clearInterval(this.advRobot)
    clearInterval(this.rollpartRobot)
  },
  methods: {
    change (now, pre) {
      this.$refs.indicatorItem.forEach(item => {
        item.style.background = "#fff"
        item.style.color = "#1072aa"
      })
      this.$refs.indicatorItem[now].style.background = "#1072aa"
      this.$refs.indicatorItem[now].style.color = "#fff"
    },
    setActiveItem (index) {
      this.$refs.carousel.setActiveItem(index - 1)
    },
    titleTypeChange (index) {
      this.msgBoxType = index
    },
    rankTypeChange (index) {
      this.rankType = index
    },
    adChange (index) {
      if (index == this.advpart.length - 1) {
        this.adIndex = -1
      }
      this.advpart.forEach(item => {
        item.jugment = false
      })
      this.advpart[index].jugment= true
    },
    rollStop () {
        clearInterval(this.rollpartRobot)
    },
    rollStart () {
      this.rollpartRobot = setInterval(() => {
          this.$refs.rollpart.style.left = this.$refs.rollpart.offsetLeft - 1 + 'px'
          if (this.$refs.rollpart.offsetLeft <= -1536) {
              this.$refs.rollpart.style.left = '0px'
          }
      }, 30)
    }
  },
  components: {
    headerFix,
    footerFix,
    homeMessageBox
  }
}
</script>

<style lang="scss">
@import '../style/mixin';
.home{
  width: 100%;
  max-width: 1440px;
  min-width: 1025px;
  margin: 0 auto;
  background: url('../assets/bd_background.png') no-repeat;
  background-size: 100%;
  .home_content{
    width: 1000px;
    margin: 15px auto 0;
    .top_part{
      margin-bottom:8px;
      @extend %clearFix;
      .banner_part{
        width: 280px;
        float: left;
        position: relative;
        .maintitle{
          height: 33px;
          line-height: 33px;
          padding-left: 26px;
          margin-bottom: 8px;
          font-weight: bold;
          color: #1072aa;
          background: url('../assets/title_jt.png') no-repeat 10px 50%;
          background-color: #f7f7f7;
        }
        .el-carousel{
          .bannerItem{
            position: relative;
            cursor: pointer;
            img{
              width: 280px;
              height: 208px;
            }
            .bannerDetail{
              width: 280px;
              height: 32px;
              line-height: 32px;
              background: rgba(0,0,0,0.6);
              font-size: 13px;
              font-family: "黑体", "Arial Narrow";
              text-indent: 10px;
              color: #fff;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
          
        }
        .indicator_part{
          position: absolute;
          bottom: 5px;
          right: 10px;
          z-index: 10;
          ul{
            @extend %clearFix;
            li{
              float: left;
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              margin-right: 3px;
              font-size: 12px;
              background: #fff;
              color: #1072aa;
              cursor: pointer;
              &:first-of-type{
                background: #1072aa;
                color: #fff;
              }
            }
          }
        }
      }
      .news_list{
        float: left;
        width: 424px;
        height: 250px;
        padding-left: 10px;
        background: url('../assets/line_bg.png');
        overflow: hidden;
        .newstitle{
          height: 33px;
          line-height: 33px;
          padding-left: 26px;
          border-bottom: 3px solid #1072aa;
          background: url('../assets/title_jt.png') no-repeat 10px 50%;
          background-color: #f7f7f7;
          @extend %clearFix;
          .nt_left{
            float: left;
            a{
              display: inline-block;
              width: 111px;
              line-height: 33px;
              text-align: center;
              font-size: 14px;
              font-weight: bold;
            }
            .title_active{
              background: url('../assets/tjj_16.jpg') no-repeat;
              background-size: 111px 33px;
              color: white;
              text-shadow: 3px 3px 3px #015388;
            }
          }
          .nt_right{
            float: right;
            padding-right: 8px;
            a{
              font-family: "黑体", "Arial Narrow";
              font-size: 12px;
              color: #4e4e4e;
            }
          }
        }
        .content_list{
          width: 414px;
          height: 100%;
          padding: 4px 0 0 14px;
          background: #def1fc;
          ul{
            .content_item{
              width: 378px;
              height: 24px;
              line-height: 24px;
              padding-left: 12px;
              background: url('../assets/li_bg.png') no-repeat 0 50%;
              @extend %clearFix;
              .ct_left{
                float: left;
                font-family: 宋体;
                color: Black;
                font-size: 12px;
              }
              .ct_right{
                float: right;
                color: #4e4e4e;
                padding-right: 5px;
                font-family: "黑体", "Arial Narrow";
                font-size: 12px;
              }
            }
          }
        }
      }
      .chat_part{
        float: left;
        padding-left: 10px;
        width: 274px;
        height: 250px;
        background: url('../assets/line_bg.png');
        .chat_box{
          border-top: 1px dotted #1072aa;
          a{
            display: inline-block;
          }
          img{
            width: 274px;
          }
        }
        .map_title{
          height: 33px;
          line-height: 33px;
          padding-left: 26px;
          background: url('../assets/title_jt.png') no-repeat 10px 50%;
          background-color: #f7f7f7;
          font-size: 14px;
          font-weight: bold;
          font-family: "黑体", "Arial Narrow";
          color: #1e82d2;
        }
        .map_content{
          height: 125px;
          background: #fff;
        }
      }
    }
    .middle_part{
      @extend %clearFix;
      .mp_left{
        float: left;
        width: 280px;
        .personalCenter{
          margin-bottom: 8px;
          .pc_chooselist{
            height: 76px;
            border-left: 1px solid #dbdbdb;
            border-right: 1px solid #dbdbdb;
            border-bottom: 1px solid #dbdbdb;
            background: #fff;
            ul{
              padding-top:15px;
              @extend %clearFix;
              li{
                float: left;
                width: 33%;
                text-align: center;
                margin-bottom: 8px;
                img{
                  margin-right:3px;
                }
                a{
                  font-size: 12px;
                  color: #000;
                  &:hover{
                    color: #f00;
                  }
                }
              }
            }
          }
        }
        .rnakingList{
          .ranklist_title{
            height: 33px;
            margin-top: 10px;
            background: url('../assets/title_jt.png') no-repeat 10px 50%;
            background-color: #f7f7f7;
            @extend %clearFix;
            .rt_left{
              float: left;
              line-height: 33px;
              padding-left: 26px;
              font-size: 14px;
              font-weight: bold;
              color: #1e82d2;
            }
            .rt_right{
              float: right;
              height: 33px;
              font-size: 12px;
              color: #1e82d2;
              &:before{
                content: '';
                height: 100%;
                display: inline-block;
                vertical-align: middle;
              }
              .rank_titlebtn{
                display: inline-block;
                color: #333;
                vertical-align: middle;
                a{
                  display: inline-block;
                  padding: 0 5px;
                  border-radius: 16px;
                }
                .rank_active{
                  background: #1e82d2;
                  color: #fff;
                }
              }
            }
          }
        }
        .teacherList{

        }
        .conveniencePeople{
          background: #fff;
          .cpe_title{
            height: 33px;
            line-height: 33px;
            padding-left: 26px;
            margin-top: 10px;
            background: url('../assets/title_jt.png') no-repeat 10px 50%;
            background-color: #f7f7f7;
            font-size: 14px;
            font-weight: bold;
            color: #1e82d2;
          }
          .cpe_content{
            height: 140px;
            width: 212px;
            padding-left: 10px;
            margin: 0 auto;
            margin-top: 13px;
            ul{
              @extend %clearFix;
              li{
                float: left;
                height: 25px;
                line-height: 25px;
                margin-bottom: 22px;
                white-space: nowrap;
                font-size: 12px;
                display: block;
                overflow: hidden;
                a{
                  display: inline-block;
                  width: 63px;
                  height: 25px;
                  padding-left: 42px;
                  &:hover{
                    color: #f00;
                  }
                }
                &:first-of-type{
                  a{
                    background: url('../assets/bmfw.png') no-repeat;
                  }
                }
                &:nth-of-type(2){
                  a{
                    background: url('../assets/gxcx.png') no-repeat;
                  }
                }
                &:nth-of-type(3){
                  a{
                    background: url('../assets/hyzd.png') no-repeat;
                  }
                }
                &:nth-of-type(4){
                  a{
                    background: url('../assets/grlc.png') no-repeat;
                  }
                }
                &:nth-of-type(5){
                  a{
                    background: url('../assets/grlc.png') no-repeat;
                  }
                }
                &:last-of-type{
                  a{
                    background: url('../assets/bmfw.png') no-repeat;
                  }
                }
              }
            }
          }
        }
      }
      .mp_right{
        float: right;
        width: 710px;
        padding-top: 9px;
        & > ul{
          @extend %clearFix;
          & > li{
            float: left;
            background: #fff;
            margin-left: 12px;
            margin-bottom: 7px;
          }
        }
      }
    }
    .home_ad{
      width: 1000px;
      margin: 0 auto ;
      ul{
        height: 100px;
        position: relative;
        li{
          position: absolute;
          top: 0;
          left:0;
          opacity: 0;
          transition: 0.5s;
          a{
            display: inline-block;
            img{
              width: 1000px;
            }
          }
        }
        .ad_action{
          opacity: 1;
          z-index: 10;
        }
      }
    }
    .home_onlineshow{
      width: 1000px;
      height: 280px;
      margin: 10px 0;
      border: 1px solid #d3d3d3;
      background:#fff;
      border-radius: 3px;
      .ho_title{
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        background: url('../assets/cg_titlebg.png') no-repeat;
        font-size: 14px;
        font-weight: bold;
        @extend %clearFix;
        .ho_title_left{
          float: left;
        }
        .ho_title_right{
          float: right;
          padding-right: 8px;
        }
      }
      .ho_content{
        width: 980px;
        height: 220px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        ul{
          width: 3072px;
          position: absolute;
          top: 0;
          left: 0;
          margin-top: 13px;
          @extend %clearFix;
          li{
            float:left;
            margin: 0 6px;
            text-align: center;
            img{
              width: 180px;
              height: 150px;
            }
            .home_hc_title{
              font-size: 14px;
              margin-top: 10px;
            }
            .home_hc_author{
              font-size: 12px;
              margin-top: 8px;
              color: #989898; 
            }
          }
        }
      }
    }
  }
  .home_bottom_part{
    width: 100%;
    min-width: 1000px;
    max-width: 1440px;
    min-height: 470px;
    margin: 0 auto;
    background: url('../assets/bot_bg.png') no-repeat 0 100%;
    .home_socityfamily{
      width: 1000px;
      margin: 0 auto;
      .home_socityfamily_title{
        height: 33px;
        background: #F7F7F7;
        @extend %clearFix;
        .home_st_left{
          float: left;
          line-height: 33px;
          background: url('../assets/title_jt.png') no-repeat 10px 50%;
          padding-left: 26px;
          font-size: 14px;
          font-weight: bold;
          color: #1e82d2;
        }
        .home_st_right{
          float: right;
          margin-top: 10px;
          margin-right: 8px;
          font-size: 12px;
          a{
            font-family: "黑体", "Arial Narrow";
            &:hover{
              color: #f00;
            }
          }
        }
      }
      .home_socityfamily_content{
        height: 185px;
        padding-left: 10px;
        ul{
          padding-top: 16px;
          @extend %clearFix;
          li{
            float: left;
            margin-left: 7px;
            margin-right: 6px;
            &:hover{
              p{
                color:#f00;
              }
            }
            a{
              display: inline-block;
              img{
                width: 127px;
                height: 140px;
                padding-bottom: 7px;
              }
              p{
                text-align: center;
                font-size: 12px;
                font-family: "黑体", "Arial Narrow";
              }
            }
          }
        }
      }
    }
  }
}
</style>
