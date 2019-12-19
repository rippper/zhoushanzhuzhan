<template>
    <div class="footerfix">
        <div class="ft_friendLink">
            <ul>
                <li>
                    <select v-model="socityAddress" @change="LinkTo('socityAddress')">
                        <option value="">==社区教育中心==</option>
                        <option value="http://www.jylll.com/">精英在线终身学习网</option>
                        <option value="http://ting.jy365.net">“悦听”听书吧</option>
                    </select>
                </li>
                <li>
                    <select v-model="friendAddress" @change="LinkTo('friendAddress')">
                        <option value="">==社区教育友情链接==</option>
                        <option value="http://www.shlll.net/home">上海终身学习网</option>
                        <option value="http://www.hnlearning.com/sqjy">湖南社区教育</option>
                        <option value="http://www.cszsjy.com">长沙终身学习网</option>
                        <option value="http://www.zjce.edu.cn">浙江社区教育网</option>
                    </select>
                </li>
                <li>
                    <select v-model="newsAddress" @change="LinkTo('newsAddress')">
                        <option value="">==主要新闻媒体==</option>
                        <option value="http://www.sina.com.cn/">新浪</option>
                        <option value="http://www.qq.com/">腾讯</option>
                        <option value="http://www.sohu.com/">搜狐</option>
                        <option value="https://www.163.com/">网易</option>
                    </select>
                </li>
                <li>
                    <select v-model="searchAddress" @change="LinkTo('searchAddress')">
                        <option value="">==常用搜索引擎==</option>
                        <option value="https://www.baidu.com/">百度</option>
                        <option value="http://www.google.com.hk/">google</option>
                    </select>
                </li>
                <li>
                    <select v-model="eduAddress" @change="LinkTo('eduAddress')">
                        <option value="">===教育站点链接===</option>
                        <option value="http://www.zsrpxy.com">舟山蓉浦学院</option>
                        <option value="http://www.zjce.edu.cn">浙江社区教育网</option>
                        <option value="http://zsjy.zhoushan.gov.cn/">舟山教育网</option>
                        <option value="http://www.dinghai.gov.cn/col/col1495746/index.html">定海区教育网</option>
                        <option value="http://jyt.zj.gov.cn/">浙江省教育厅</option>
                    </select>
                </li>
                <li>
                    <select v-model="userAddress" @change="LinkTo('Address')">
                        <option value="">===常用网站链接===</option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="foot_depart">
            <div class="bottom_part">
                舟山蓉浦学院（舟山社区大学）主办　地址：临城新区长升路228号　咨询电话：0580-2036727
                <a id="botton">邮箱：zssqjy@qq.com</a>
                <p>QQ:70290021</p>
            </div>
            <div class="foot_address">
                <div class="address_content">备案号浙ICP备05083451号-3</div>
                <div class="address_content">浙公网安备 33090002000168号</div>
            </div>
            <div class="credential_icon">
                <a href="javascript:;">
                    <img src="../assets/blue.png" alt="">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footerFix',
    data () {
        return {
            socityAddress: '',
            friendAddress: '',
            newsAddress: '',
            searchAddress: '',
            eduAddress: '',
            userAddress: ''
        }
    },
    methods: {
        LinkTo (value) {
            switch (value) {
                case 'socityAddress': 
                    this.socityAddress == "" ? window.open("http://www.zsxxnet.cn/", "_blank") : window.open(this.socityAddress, "_blank")
                    break
                case 'friendAddress': 
                    this.friendAddress == "" ? window.open("http://www.zsxxnet.cn/", "_blank") : window.open(this.friendAddress, "_blank")
                    break
                case 'newsAddress': 
                    this.newsAddress == "" ? window.open("http://www.zsxxnet.cn/", "_blank") : window.open(this.newsAddress, "_blank")
                    break
                case 'searchAddress': 
                    this.searchAddress == "" ? window.open("http://www.zsxxnet.cn/", "_blank") : window.open(this.searchAddress, "_blank")
                    break
                case 'eduAddress': 
                    this.eduAddress == "" ? window.open("http://www.zsxxnet.cn/", "_blank") : window.open(this.eduAddress, "_blank")
                    break
                case 'address': 
                    this.userAddress == "" ? window.open("http://www.zsxxnet.cn/", "_blank") : window.open(this.userAddress, "_blank")
                    break
            }
            
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.footerfix{
    width: 1000px;
    margin: 20px auto 0;
    .ft_friendLink{
        width:1000px;
        height: 32px;
        background: url('../assets/link_bg.png');
        ul{
            @extend %clearFix;
            padding: 6px 0 6px 30px;
            li{
                float:left;
                margin-right: 8px;
                select{
                    width: 150px;
                    height: 18px;
                    font-size: 12px;

                }
            }
        }
    }
    .foot_depart{
        width: 960px;
        text-align: center;
        line-height: 24px;
        margin: 30px auto 10px;
        color: #000;
        position: relative;
        .bottom_part{
            padding-top: 15px;
        }
        #botton{
            &:hover{
                color: #f00;
            }
        }
        .foot_address{
            width: 100%;
            display: inline-block;
        }
        .address_content{
            width: 50%;
            display: inline-block;
        }
        .credential_icon{
            position: absolute;
            bottom: -75px;
            right: 60px;
        }
    }
}
</style>