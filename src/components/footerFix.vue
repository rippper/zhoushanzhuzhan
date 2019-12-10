<template>
    <div class="footerfix">
        <div class="ft_friendLink">
            <ul>
                <li>
                    <select>
                        <option value="#">==社区教育中心==</option>
                        <option value="">精英在线终身学习网</option>
                        <option value="">“悦听”听书吧</option>
                    </select>
                </li>
                <li>
                    <select>
                        <option value="#">==社区教育友情链接==</option>
                        <option value="">上海终身学习网</option>
                        <option value="">湖南社区教育</option>
                        <option value="">长沙终身学习网</option>
                        <option value="">浙江社区教育网</option>
                    </select>
                </li>
                <li>
                    <select>
                        <option value="#">==主要新闻媒体==</option>
                        <option value="">新浪</option>
                        <option value="">腾讯</option>
                        <option value="">搜狐</option>
                        <option value="">网易</option>
                    </select>
                </li>
                <li>
                    <select>
                        <option value="#">==常用搜索引擎==</option>
                        <option value="">百度</option>
                        <option value="">google</option>
                    </select>
                </li>
                <li>
                    <select>
                        <option value="#">===教育站点链接===</option>
                        <option value="http://www.zsrpxy.com">舟山蓉浦学院</option>
                        <option value="http://www.zjce.edu.cn">浙江社区教育网</option>
                        <option value="http://zsjy.zhoushan.gov.cn/">舟山教育网</option>
                        <option value="http://www.dinghai.gov.cn/col/col1495746/index.html">定海区教育网</option>
                        <option value="http://jyt.zj.gov.cn/">浙江省教育厅</option>
                    </select>
                </li>
                <li>
                    <select>
                        <option value="#">===常用网站链接===</option>
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
    name: 'footerFix'
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