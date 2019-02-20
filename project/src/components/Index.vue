<template>
    <div class="container" id="indexPage">
        <myHeader></myHeader> 
        <!-- 商机 -->
        <div class="momentListLim clearfix">
            <img class="banner" src="./../assets/index/newBanner.png" alt="" width="100%">
            <div class="advertisement">discover a business opportunity</div>
            <div class="advertisement_list layoutWrap">
                <ul class="clearfix">
                    <li class="lt">
                        <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:1}}">
                        <div class="itemWrap">
                            <img src="./../assets/index/item1.png" alt="">
                            <div class="itemBot">
                                <p class="itemTitle">商秘</p>
                                <p class="itemTitleEn">Best Secretary</p>
                                <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:1}}">&lt;&lt;&lt;</router-link>
                            </div>
                        </div>
                        </router-link>
                    </li>
                    <li class="lt">
                        <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:2}}">
                        <div class="itemWrap">
                            <img src="./../assets/index/item2.png" alt="">
                            <div class="itemBot">
                                <p class="itemTitle">商模</p>
                                <p class="itemTitleEn"> Top Model</p>
                                <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:2}}">&lt;&lt;&lt;</router-link>
                            </div>
                        </div>
                        </router-link>
                    </li>
                    <li class="lt">
                        <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:5}}">
                        <div class="itemWrap">
                            <img src="./../assets/index/item3.png" alt="">
                            <div class="itemBot">
                                <p class="itemTitle">商旅</p>
                                <p class="itemTitleEn">Business Tourism</p>
                                <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:5}}">&lt;&lt;&lt;</router-link>
                            </div>
                        </div>
                        </router-link>
                    </li>
                    <li class="lt">
                        <router-link class="gotoView" :to="{ name: 'Business_lian', params: {}}">
                        <div class="itemWrap">
                            <img src="./../assets/index/item4.png" alt="">
                            <div class="itemBot">
                                <p class="itemTitle">商恋</p>
                                <p class="itemTitleEn">Businessman Love</p>
                                <router-link class="gotoView" :to="{ name: 'Business_lian', params: {}}">&lt;&lt;&lt;</router-link>
                            </div>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 商脉 -->
        <div class="sMaiListLim layoutWrap clearfix">
            <div class="titleItem_index">
                <h1>商友人脉</h1>
                <h3 class="secondeT">From your contacts</h3>
            </div>
            <ul class="clearfix">
                <li>
                    <router-link :to="{ name: 'Business_mai', query: {identityId:4}}">
                        <img src="./../assets/index/sm2.png" alt="">
                        <div class="introDetailsWrap"></div>
                        <div class="introDetails isIntroDetailsShow">
                            <h2>商人</h2>
                            <div class="titleEn">Businessman</div>
                            <div class="intro">聚合商界精英，助力企业发展。为商人的生意和生活提供一站式服务！</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Business_cheng', params: {}}">
                        <img src="./../assets/index/sm1.png" alt="">
                        <div class="introDetailsWrap"></div>
                        <div class="introDetails isIntroDetailsShow">
                            <h2>商城</h2>
                            <div class="titleEn">Shopping Mall</div>
                            <div class="intro">你有产品，我有平台。关键是我们不收进店费，让你的产品零成本卖卖卖！</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <!-- <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:6}}"> -->
                    <router-link class="gotoView" :to="{ name: 'DoctorList', query: {identityId:6}}">
                        <img src="./../assets/index/sm3.png" alt="">
                        <div class="introDetailsWrap"></div>
                        <div class="introDetails isIntroDetailsShow">
                            <h2>名医</h2>
                            <div class="titleEn">Famous Doctor</div>
                            <div class="intro">全国三甲医院、各大专科名医、科室主任，享绿色通道，为企业家健康保驾护航！</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <!-- <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:3}}"> -->
                    <router-link class="gotoView" :to="{ name: 'LawyerList', query: {identityId:3}}">
                        <img src="./../assets/index/sm4.png" alt="">
                        <div class="introDetailsWrap"></div>
                        <div class="introDetails isIntroDetailsShow">
                            <h2>律师</h2>
                            <div class="titleEn"> Famous Lawyer</div>
                            <div class="intro">全国知名律师应有尽有！专业强、素质高、业务好，帮企业维权，助中国经济！</div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 其他 -->
        <div class="otherListLim layoutWrap clearfix">
            <div class="titleItem_index">
                <h1>发现商机</h1>
                <h3 class="secondeT">Find your opportunity</h3>
            </div>
            <ul class="clearfix">
                <li v-for="item in linkData" v-bind:key="item.index">
                    <router-link :to="{ name: item.linkTo, params: {}}">
                        <p><img :src="item.imgUrl" alt=""></p>
                        <div class="title">{{item.text}}</div>
                        <div class="titleEn">{{item.en}}</div>
                        <div class="cont">{{item.intro}}</div>
                    </router-link>
                </li>
            </ul>
        </div>

        <!-- 合作伙伴 -->
        <div class="layoutWrap partnerCooperative clearfix">
            <div class="titleItem_index">
                <h1>合作伙伴</h1>
                <h3 class="secondeT">Cooperative partner</h3>
            </div>
            <ul class="clearfix">
                <li v-for="item in cooperativePartnersDatas" v-bind:key="item.key">
                    <a href="javascript:;"><img :src="item.linkPhoto" alt="" width="218" height="100"></a>
                </li>
                <!-- <li><a href="javascript:;"><img src="./../assets/index/Cpartner2.png" alt=""></a></li> -->
            </ul>
        </div>
        <!-- footer -->
        <div id="footer">
            <myFooter></myFooter>
        </div>
    
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>

<script>
    import logo from './../assets/index/newLogo.png'
    import {getSMaiSelection,getSMaiListLim,getSMaiRecommend,getTissueSearchList,searchMomentListLim,cooperativePartners} from '@/api/api';
    import url1 from './../assets/index/sj1.png'
    import url2 from './../assets/index/sj2.png'
    import url3 from './../assets/index/sj3.png'
    import url4 from './../assets/index/sj4.png'
    import url5 from './../assets/index/sj5.png'
    import url6 from './../assets/index/sj6.png'
    import url7 from './../assets/index/sj7.png'
    import url8 from './../assets/index/sj8.png'
    export default {
        data() {
            return {
                logo:logo,
                form: {
                    keywords: ''
                },
                linkData: [
                    {
                        text: '商脉',
                        en:'Best Secretary',
                        linkTo:'Business_ji',
                        intro:'聚合商界精英，助力企业发展。为商人的生意和生活提供一站式服务！',
                        imgUrl:url1

                    },
                    {
                        text: '商会',
                        en:'Chamber of Commerce',
                        intro:'千家商会，万家灯火。让商蜜成为商会的家，永不打烊！立足中国，拥抱世界！',
                        linkTo:'Business_hui',
                        imgUrl:url2
                    },
                    {
                        text: '商报',
                        en:'Business Herald',
                        intro:'商业报道，铺天盖地。这里负责为您提供最专业、最权威、最全面的资讯！',
                        linkTo:'Business_bao',
                        imgUrl:url3
                    },
                    {
                        text: '商询',
                        en:'Consultation',
                        intro:'你有问题，我来回答；不满意，不付费。带着问题来，带回解决方案走！',
                        linkTo:'Business_xun',
                        imgUrl:url4
                    },
                    {
                        text: '商筹',
                        en:'Crowd Funding',
                        intro:'有困难，来众筹。产品、活动、公益等，只要你想，就会让你梦想成真！',
                        linkTo:'Business_chou',
                        imgUrl:url5
                    },
                    {
                        text: '商聚',
                        en:'Business Activity',
                        intro:'有活动，来商聚。兴趣爱好、专业技能、会议论坛，聚在一起才有力量！',
                        linkTo:'Business_ju',
                        imgUrl:url6
                    },
                    {
                        text: '商讯',
                        en:'Business News',
                        intro:'你想招标，我来投标。只要你有竞争力，合作机会就会带着温度跑过来！',
                        linkTo:'Business_article',
                        imgUrl:url7
                    },
                    {
                        text: '商道',
                        en:' Business Thought',
                        intro:'思想就是王道，新观念、金不换！商业思想让我们变得更好、做的更强！',
                        linkTo:'Business_dao',
                        imgUrl:url8
                    },
                ],
                cooperativePartnersDatas:[]
            }
        },
        methods: {
            onSubmit() {
                if(!this.form.keywords.trim()){
                    this.$message('请输入关键词');
                }
            },
            //获取合作伙伴
            cooperativePartners() {
                cooperativePartners().then(res => {
                    if (res.code === 200) {
                        this.cooperativePartnersDatas = res.result;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
        },
        mounted() {
            this.cooperativePartners();
        },
    }
</script>

<style>
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: #999;
        font-size: 18px;
    }
    
    input:-moz-placeholder,
    textarea:-moz-placeholder {
        color: #999;
        font-size: 18px;
    }
    
    input::-moz-placeholder,
    textarea::-moz-placeholder {
        color: #999;
        font-size: 18px;
    }
    
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
        color: #999;
        font-size: 18px;
    }
    .searchWrap .el-input-group__append button.el-button{
        background: #f10215;
        border-radius: 0;
        position: relative;
        right: -1px;
    }
    .searchWrap .el-input-group__append{
        border-radius: 0;
        padding: 0 18px;
    }
    .searchWrap .el-icon-search{
        color: #fff;
        font-size: 16px;
    }
    .searchWrap .el-input-group--append .el-input__inner{
        border-radius: 0;
    }
    #indexPage .searchWrap {
    display: none;  
    }
</style>

<style lang="less" scoped>
.container{
    background: #dddbdb;
}
.momentListLim{
    margin-bottom: 220px;
    width: 100%;
    img.banner{
        width: 100%;
    }
    // background: url('./../assets/index/newBanner.png') no-repeat;
    // background-size: cover;
    position: relative;
    .advertisement{
        position: absolute;
        width: 414px;
        height: 30px;
        line-height: 30px;
        background: #f10215;
        color: #fff;
        font-size: 18px;
        text-align: center;
        left: 50%;
        margin-left: -207px;
        // top: 226px;
        bottom: 200px;
    }
    .advertisement_list{
        position: absolute;
        bottom: -180px;
        left: 50%;
        margin-left: -600px;
        ul{
            li{
                border: 1px solid #fff;
                border-style: solid;
                width: 227px;
                padding: 7px 5px;
                margin-right: 95px;
                &:last-child{
                    margin-right: 0;
                }
                .itemWrap{
                    background: #fff;
                    height: 293px;
                    color: #626262;
                    text-align: center;
                    position: relative;
                    .itemTitle{
                        font-size: 20px;
                        margin-top: 8px;
                    }
                    .itemTitleEn{
                        font-size: 14px;
                    }
                    .itemBot{
                        height: 56px;
                        position: absolute;
                        width: 215px;
                        left: 0;
                        bottom: 16px;
                        background: #fff;
                        transition:.3s 0s ease-out;
                        a.gotoView{
                            background-color: rgb( 241, 2, 21 );
                            width: 84px;
                            height: 20px;
                            display: block;
                            text-align: center;
                            color: #fff;
                            line-height: 20px;
                            margin: 16px auto 0;
                            overflow:hidden;
                            opacity: 0;
                            &:hover{
                                opacity: 0.8;
                                // text-decoration: none;
                            }
                        }
                    }
                }
                &:hover{
                    .itemBot{
                        bottom: 76px;
                        a.gotoView{
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
}
.titleItem_index{
    margin-bottom: 40px;
    h1{
        font-size: 36px;
        color: #4b4b4b;
        text-align: center;
        font-weight: 500;
    }
    h3.secondeT{
        font-size: 24px;
        color: #4b4b4b;
        text-align: center;
        font-weight: 500;
        position: relative;
        margin: 0 auto;
        &::after{
            position: absolute;
            content: '';
            background-color: rgb( 241, 2, 21 );
            width: 51px;
            height: 6px;
            left: 50%;
            margin-left: -25px;
            bottom: -10px;
            display: block;
        }
    }
}
.sMaiListLim{
    ul{
        li{
            float: left;
            margin: 0 30px 26px 0;
            &:nth-child(2n){
                margin-right: 0;
                margin-bottom: 0;
            }
            a{
                display: block;
                width: 574px;
                height: 420px;
                overflow: hidden;
                position: relative;
                img{
                    display: block;
                    transition: all 0.6s;
                }
                .introDetailsWrap{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    opacity: 0.7;
                    left: 0;
                    top: 0;
                    display: none;
                }
                .introDetails{
                    position: absolute;
                    left:50%;
                    top:50%;
                    width: 360px;
                    height: 162px;
                    margin:-81px 0 0 -180px;
                    z-index: 99;
                    h2{
                        font-size: 24px;
                        color: #fff;
                        font-weight: 500;
                    }
                    .titleEn{
                            background-color: #f10215;
                            line-height: 24px;
                            width: 140px;
                            text-align: center;
                            font-size: 18px;
                            color: #fff;
                            margin: 14px 0;
                    }
                    .intro{
                        // color: #626262;
                        color: #fff;
                        font-size: 18px;
                    }
                }
                .introDetails_layer{
                    position: absolute;
                    left:115px;
                    bottom:64px;
                    width: 370px;
                    height: 100px;
                    h2{
                        font-size: 24px;
                        font-weight: 500;
                        color: #fff;
                    }
                    .titleEn{
                            background-color: #f10215;
                            line-height: 24px;
                            width: 145px;
                            font-size: 18px;
                            text-align: left;
                            text-indent: 5px;
                            color: #fff;
                            margin: 14px 0;
                    }
                    .intro{
                        color: #626262;
                        font-size: 18px;
                    }
                }
                .isIntroDetailsShow{
                    display: none;
                }
                &:hover{
                    img{
                        transform: scale(1.2);
                    }
                    .introDetailsWrap{
                        display: block;
                    }
                    .isIntroDetailsShow{
                        display: block;
                    }
                }
            }
        }
    }
}
.otherListLim{
    ul{
        li{
            float: left;
            border: 1px solid transparent;
            width: 279px;
            height: 355px;
            text-align: center;
            margin: 0 22px 22px 0;
            font-size: 18px;
            color: #626262;
            transition:.3s 0s ease-out;
            &:nth-child(4n){
                margin-right: 0;
                margin-bottom: 0;
            }
            &:hover{
                border: 1px solid rgb( 241, 2, 21 );
            }
            a{
                padding: 72px 30px 30px;
                display: block;
                text-decoration: none;
                .title{
                    font-size: 24px;
                    color: #000;
                }
                .titleEn{
                    background-color: rgb( 241, 2, 21 );
                    // width: 132px;
                    line-height: 24px;
                    margin: 12px auto;
                    color:#fff;
                }
            }
        }
    }
}
.partnerCooperative{
    width: 1160px;
    margin: 0 auto;
    ul{
        li{
            float: left;
            margin: 0 10px 5px 0;
            &:nth-child(5n){
                margin-right: 0;
            }
        }
    }
}
</style>
