<template>
  <div class="home">
    <header-fix></header-fix>
    <div class="home_floatBox" ref="floatBox">
      <img src="../assets/codepic.jpg" alt="">
      <p>舟山社区教育公众号</p>
    </div>
    <div class="home_content">
      <!-- 顶部 -->
      <div class="top_part">
        <div class="banner_part">
          <div class="maintitle">
            图文资讯
          </div>
          <el-carousel :interval="5000" arrow="never" indicator-position="none" height="208px" ref="carousel" @change="((now, pre) => { change(now, pre) })">
            <el-carousel-item v-for="(item, index) in bannerImg" :key="index">
              <div class="bannerItem" @click="bannerLink(item.ArticleId, item.ArticleChannel)">
                <img :src="item.ArticleImg" alt="">
                <div class="bannerDetail" v-text="item.ArticleTitle"></div>
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
              <a href="javascript:;" @click="LinkToNewsList">更多</a>
            </div>
          </div>
          <div class="content_list">
            <ul>
              <li>
                <ul>
                  <li class="content_item" v-for="(item, index) in socialNews" :key="index" v-show="msgBoxType == 0">
                    <router-link :to="{ path: '/newsdetail', query: { id: item.ArticleId, mid: item.ArticleChannel } }">
                      <span class="ct_left" :title="item.ArticleTitle">{{item.ArticleTitle | wordLimit(23)}}</span>
                      <span class="ct_right">{{item.ArticleCreateDate | dateFilter("yyyy-MM-dd")}}</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li class="content_item" v-for="(item, index) in notifiy" :key="index" v-show="msgBoxType == 1">
                    <router-link :to="{ path: '/newsdetail', query: { id: item.ArticleId, mid: item.ArticleChannel } }">
                      <span class="ct_left" :title="item.ArticleTitle">{{item.ArticleTitle | wordLimit(23)}}</span>
                      <span class="ct_right">{{item.ArticleCreateDate | dateFilter("yyyy-MM-dd")}}</span>
                    </router-link>
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
                  <router-link to="/personalcenter/personalcollect/personalcolcourse">我的收藏</router-link>
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
            <a href="http://www.zsxxnet.cn/video.htm" target="_blank">
              <img src="../assets/yingxiangzl.jpg" alt="">
            </a>
          </div>
          <div class="rankingList">
            <div class="ranklist_title">
              <div class="rt_left">排行榜</div>
              <div class="rt_right">
                <span class="rank_titlebtn"><a href="http://www.zsxxnet.cn/rank/UserGroupRank.aspx" :class="{ 'rank_active': rankType == 0 }" @mouseenter="rankTypeChange(0)">社区学习</a></span> /
                <span class="rank_titlebtn"><a href="http://www.zsxxnet.cn/rank/SchoolRank.aspx" :class="{ 'rank_active': rankType == 1 }" @mouseenter="rankTypeChange(1)">学校学习</a></span> /
                <span class="rank_titlebtn"><a href="http://www.zsxxnet.cn/rank/CourseRank.aspx" :class="{ 'rank_active': rankType == 2 }" @mouseenter="rankTypeChange(2)">课程排行</a></span>
              </div>
            </div>
            <div class="ranklist_content">
              <ul>
                <li v-show="rankType == 0">
                  <div class="ranklist_contable_title">
                    <div class="ranklist_ct_rank">排名</div>
                    <div class="ranklist_ct_socityname">社区名称</div>
                    <div class="ranklist_ct_score">学分</div>
                  </div>
                  <div class="ranklist_contable_list">
                    <ul>
                      <li v-for="(item, index) in socityRank" :key="index">
                        <div class="ranklist_cc_rank"><span :class="{ 'top_item': index < 3 }" v-text="item.Ranks"></span></div>
                        <div class="ranklist_cc_socityname" v-text="item.socityName"></div>
                        <div class="ranklist_cc_score" v-text="item.studyScore"></div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li v-show="rankType == 1">
                  <div class="ranklist_contable_title">
                    <div class="ranklist_ct_rank">排名</div>
                    <div class="ranklist_ct_socityname">学校名称</div>
                    <div class="ranklist_ct_score">人数</div>
                  </div>
                  <div class="ranklist_contable_list">
                    <ul>
                      <li v-for="(item, index) in schoolRank" :key="index">
                        <div class="ranklist_cc_rank"><span :class="{ 'top_item': index < 3 }" v-text="item.Ranks"></span></div>
                        <div class="ranklist_cc_socityname" v-text="item.schoolName"></div>
                        <div class="ranklist_cc_score" v-text="item.schoolPeople"></div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li v-show="rankType == 2">
                  <div class="ranklist_contable_title">
                    <div class="ranklist_ct_rank">排名</div>
                    <div class="ranklist_ct_socityname">课程名称</div>
                    <div class="ranklist_ct_score">次数</div>
                  </div>
                  <div class="ranklist_contable_list">
                    <ul>
                      <li v-for="(item, index) in courseRank" :key="index">
                        <div class="ranklist_cc_rank"><span :class="{ 'top_item': index < 3 }" v-text="item.Ranks"></span></div>
                        <div class="ranklist_cc_socityname" v-text="item.courseName"></div>
                        <div class="ranklist_cc_score" v-text="item.times"></div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="teachersList">
            <div class="teachersList_title">
              <div class="home_tt_left">名师风采</div>
              <div class="home_tt_right">
                <a href="javascript:;">
                  <img src="../assets/cg_more.png" alt="">
                </a>
              </div>
            </div>
            <div class="teachersList_content">
              <swiper :options="swiperOption" ref="mySwiper"  v-if="teacherList.length > 0" >
                <swiper-slide v-for="(item, index) in teacherList" :key="index">
                  <router-link :to="{path: '/NewsDetail', query: {id: item.ArticleId}}">
                    <img :src="item.ArticleImg" alt="">
                  </router-link>
                  <p class="name">{{item.ArticleTitle}}</p>
                </swiper-slide>
              </swiper>
              <div class="swiper-button-prev" slot="button-prev"><img src="../assets/msfcleft.jpg" alt=""></div>
              <div class="swiper-button-next" slot="button-next"><img src="../assets/msfcright.jpg" alt=""></div>
            </div>
          </div>
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
      <!-- 底部 -->
      <div class="home_ad">
          <ul>
              <li :class="{'ad_action': item.jugment}" v-for="(item, index) in advpart" :key="index">
                  <a href="http://www.zsxxnet.cn/education/index.aspxx">
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
            <a href="http://www.zsxxnet.cn/hall/Pro_More.aspx">
              <img src="../assets/cg_more.png" alt="">
            </a>
          </div>
        </div>
        <div class="ho_content">
          <ul ref="rollpart" @mouseenter="rollStop()" @mouseleave="rollStart()">
            <li v-for="(item, index) in scrollList" :key="index">
              <a :href= "`http://www.zsxxnet.cn/hall/Pro_Detail.aspx?id=${item.Id}`" >
                <img :src="item.Image" alt="">
              </a>
              <p class="home_hc_title" v-text="item.ProductionName"></p>
              <p class="home_hc_author">作者：<span v-text="item.AuthorName"></span></p>
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
                <error-Image :src="item.ArticleImg"></error-Image>
                <p>{{item.ArticleTitle | wordLimit(9)}}</p>
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
import Vue from 'vue'
import { headerFix, footerFix, homeMessageBox, errorImage } from '../components'
import { mapActions, mapState } from 'vuex'
import { GetArticleInfoList, CourseCategoryWithCourse, ProductionInfoList } from '../service/getData'
import { wordsL } from '../service/helpPlugin'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.use(swiper) 
Vue.use(swiperSlide)
export default {
  name: 'home',
  data () {
    return {
      bannerImg: [],
      msgBoxType: 0,
      socialNews: [],
      notifiy: [],
      articleCommed:[],
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
      socityFamily: [],
      scrollList: [],
      rollpartRobot: '',
      socityRank: [
        {
          Ranks: 1,
          socityName: '中湾社区',
          studyScore: 59383
        },
        {
          Ranks: 2,
          socityName: '桃湾社区',
          studyScore: 41186
        },
        {
          Ranks: 3,
          socityName: '大岙二村',
          studyScore: 29041
        },
        {
          Ranks: 4,
          socityName: '绿岛社区',
          studyScore: 24041
        },
        {
          Ranks: 5,
          socityName: '嘉和社区',
          studyScore: 22049
        },
        {
          Ranks: 6,
          socityName: '舟山社区大学',
          studyScore: 14041
        }
      ],
      schoolRank: [
        {
          Ranks: 1,
          schoolName: '新城学校',
          schoolPeople: 7882
        },
        {
          Ranks: 2,
          schoolName: '定海区二中集团北校区',
          schoolPeople: 1694
        },
        {
          Ranks: 3,
          schoolName: '定海小学',
          schoolPeople: 1638
        },
        {
          Ranks: 4,
          schoolName: '舟山市普陀区沈家门小学',
          schoolPeople: 1601
        },
        {
          Ranks: 5,
          schoolName: '舟山市第二小学',
          schoolPeople: 1268
        },
        {
          Ranks: 6,
          schoolName: '舟山市普陀区六横镇中心小学',
          schoolPeople: 1222
        },
      ],
      courseRank: [
        {
          Ranks: 1,
          courseName: '打电话',
          times: 1770
        },
        {
          Ranks: 2,
          courseName: '亲历两蒋日记到美国',
          times: 1730
        },
        {
          Ranks: 3,
          courseName: '谈礼仪（01）礼仪就在你身边',
          times: 1410
        },
        {
          Ranks: 4,
          courseName: '上海人过冬天',
          times: 1360
        },
        {
          Ranks: 5,
          courseName: '《诗经》的现代解读',
          times: 863
        },
        {
          Ranks: 6,
          courseName: '家家有本育儿经',
          times: 844
        }
      ],
      teacherList: [],
      timer: '',
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 3,
        centeredSlides: false,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        // autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  mounted () {
    this.advRobot = setInterval(() => {
      this.adIndex++
      this.adChange(this.adIndex)
    }, 5000)
    this.rollStart()
    window.addEventListener('scroll', this.getDistance)
    this.render()
    this.getArticleInfoList()
    this.getArticleInfoList2()
    this.getArticleInfoList3()
    this.getArticleInfoList4()
    this.getCourseCategoryWithCourse()
    this.getProductionInfoList()
  },
  beforeDestroy () {
    clearInterval(this.advRobot)
    clearInterval(this.rollpartRobot)
    clearInterval(this.timer)
    window.removeEventListener('scroll', this.getDistance)
  },
  methods: {
    bannerLink (Id, Mid) {
      this.$router.push({ path: '/newsdetail', query: { id: Id, mid: Mid } })
    },
    LinkToNewsList () {
      if (this.msgBoxType == 0) {
        this.$router.push({ path: '/newslist', query: { Id: 135 } })
      } else {
        this.$router.push({ path: '/newslist', query: { Id: 139 } })
      }
    },
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
    },
    round (currentDistance, totalDistance) {
      if (totalDistance - currentDistance >= 0) {
          let sum = Math.ceil((totalDistance - currentDistance) / 20)
          return sum
      } else if (totalDistance - currentDistance < 0) {
          let sum = Math.ceil((totalDistance - currentDistance) / -20)
          return sum
      }
    },
    getDistance () {
      let self = this
      clearInterval(self.timer)
      this.timer = setInterval(() => {
        let totalDistance = document.documentElement.scrollTop + 156
        let currentDistance = self.$refs.floatBox.offsetTop
        let speed = self.round(currentDistance, totalDistance)
        if (totalDistance > currentDistance) {
          self.$refs.floatBox.style.top = self.$refs.floatBox.offsetTop + speed + 'px'

        } else if (totalDistance < currentDistance) {
          self.$refs.floatBox.style.top = self.$refs.floatBox.offsetTop - speed + 'px'
        }
        if (speed == 0) {
          self.$refs.floatBox.style.top = totalDistance + 'px'
          clearInterval(self.timer)
        }
      }, 10)
    },
    // 首页bannner
    async render () {
      let swiperMsg = await GetArticleInfoList({
        CategoryId: 138,
        Page: 1,
        Rows: 3,
        Sort: 'Id',
        Order: 'desc'
      })
      if (swiperMsg.IsSuccess) {
        swiperMsg.Data.List.forEach((item, index) => {
          item.ArticleTitle = wordsL(item.ArticleTitle, 14) 
        })
        this.bannerImg = swiperMsg.Data.List
      }
    },
    // 社交新闻
    async getArticleInfoList () {
      let data = await GetArticleInfoList ({
        CategoryId: 135,
        Page: 1,
        Sort: 'Id',
        Order: 'desc',
        Rows: 9
      })
      if (data.IsSuccess) {
        this.socialNews = data.Data.List
      }
    },
    // 通知公告
    async getArticleInfoList2 () {
      let data = await GetArticleInfoList ({
        CategoryId: 139,
        Page: 1,
        Sort: 'Id',
        Order: 'desc',
        Rows: 9
      })
      if (data.IsSuccess) {
        this.notifiy = data.Data.List
      }
    },
    // 社区之家
    async getArticleInfoList3 () {
      let data = await GetArticleInfoList ({
        CategoryId: 140,
        Page: 1,
        Sort: 'Id',
        Order: 'desc',
        Rows: 7
      })
      if (data.IsSuccess) {
        this.socityFamily = data.Data.List
      }
    },
    // 名师风采
    async getArticleInfoList4 () {
      let data = await GetArticleInfoList ({
        CategoryId: 160,
        Page: 1,
        Sort: 'Id',
        Order: 'desc',
        Rows: 7
      })
      if (data.IsSuccess) {
        this.teacherList = data.Data.List
      }
    },
    //  课程频道及列表
    async getCourseCategoryWithCourse () {
      let data = await CourseCategoryWithCourse ({
        Page: 1,
        Sort: 'Sort',
        Order: 'desc',
        Rows: 12
      })
      this.articleCommed = data.ListData
      // console.log(this.articleCommed, 999)
    },
    // 网上展厅
    async getProductionInfoList () {
      let data = await ProductionInfoList ({
        ProductionCategoryId: '',
        Page: 1,
        Rows: 8,
        Sort: 'Id',
        Order: 'desc'
      })
      if (data.IsSuccess) {
        this.scrollList = data.Data.List.concat(data.Data.List) 
      }
    }
  },
  components: {
    headerFix,
    footerFix,
    homeMessageBox,
    errorImage
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
  background-color: #fff;
  background-size: 100%;
  position: relative;
  .home_floatBox{
    width: 113px;
    height: 132px;
    background: #fff;
    border: 1px solid #CCC;
    position: absolute;
    top: 156px;
    left: 20px;
    overflow: hidden;
    img{
      width: 114px;
    }
    p{
      height: 18px;
      line-height: 18px;
      color: #999;
      font-size: 12px;
      font-family: Arial Narrow;
      text-align: center;
    }
  }
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
                font-family: '宋体';
                color: Black;
                font-size: 12px;
                cursor: pointer;
                &:hover{
                  color: #f00;
                }
              }
              .ct_right{
                float: right;
                color: #4e4e4e;
                padding-right: 5px;
                font-family: "黑体", "Arial Narrow";
                font-size: 12px;
                cursor: pointer;
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
        .rankingList{
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
          .ranklist_content{
            width: 280px;
            height: 180px;
            ul{
              width:268px;
              margin: 0 auto;
              li{
                .ranklist_contable_title{
                  margin-top: 6px;
                  margin-bottom: 6px;
                  border-bottom: 1px solid #1e82d2;
                  @extend %clearFix;
                  div{
                    float:left;
                    height:24px;
                    line-height: 24px;
                    text-align: center;
                    font-size: 12px;
                  }
                  .ranklist_ct_rank{
                    width: 15%;
                  }
                  .ranklist_ct_socityname{
                    width: 65%;
                  }
                  .ranklist_ct_score{
                    width: 20%;
                  }
                }
                .ranklist_contable_list{
                  font-size: 12px;
                  ul{
                    li{
                      @extend %clearFix;
                      div{
                        float:left;
                        height: 22px;
                        text-align: center;
                      }
                      .ranklist_cc_rank{
                        width: 15%;
                        position: relative;
                        span{
                          width:20px;
                          height:13px;
                          line-height: 14px;
                          margin: auto;
                          background: #888;
                          font-family: Arial, Helvetica, sans-serif;
                          color: #fff;
                          display: inline-block;
                          position: absolute;
                          top: 0;
                          right: 0;
                          bottom: 0;
                          left: 0;
                        }
                        .top_item{
                          background: #1e82a0;
                        }
                      }

                      .ranklist_cc_socityname{
                        width: 65%;
                        line-height: 22px;
                      }
                      .ranklist_cc_score{
                        width: 20%;
                        line-height: 22px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .teachersList{
          width:280px;
          height:145px;
          border: 1px solid #e5e5e5;
          .teachersList_title{
            height: 33px;
            line-height: 33px;
            background-color: #f7f7f7;
            @extend %clearFix;
            .home_tt_left{
              float: left;
              background: url('../assets/title_jt.png') no-repeat 10px 50%;
              padding-left: 26px;
              font-weight: bold;
              color: #1e82d2;
            }
            .home_tt_right{
              float: right;
              padding-right: 8px;
            }
          }
          .teachersList_content{
            position: relative;
            .swiper-container{
              margin: 10px auto 0;
              width: 248px;
            }
            .swiper-wrapper{
              .swiper-slide{
                width: 56px;
                height: 69px;
                a{
                  img{
                    width: 56px;
                    height: 69px;
                  }
                }
              }
            }
            .swiper-button-prev{
              background: none;
              margin-top: -38px;
              width: auto;
              position: absolute;
              left: 5px;
            }
            .swiper-button-next{
              background: none;
              margin-top: -38px;
              width: auto;
              position: absolute;
              right: 5px;
            }
          }
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
