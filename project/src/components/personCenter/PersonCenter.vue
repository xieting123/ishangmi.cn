<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap">
            <div class="infoDetail_top clearfix">
                <div class="left lt">
                    <div class="infoTop clearfix">
                        <div class="head_Portraits lt">
                            <!-- <img class="searchIcon" src="./../../assets/personCenter/head_Portraits.png" /> -->
                            <img class="searchIcon" :src="avatar" alt="头像"/>
                        </div>
                        <div class="head_info lt">
                            <p>
                                <span class="name">{{nickname}}</span>
                                <span class="identification" v-if="verifyStatus===2">
                                    <i></i>
                                    实名认证
                                </span>
                                <!-- <span class="company singleEllipsis" :title="company">{{company}}</span> -->
                                <!-- <span class="identity">{{position}}</span> -->
                                <!-- <span class="identity" v-if="identityShow">{{identityType===1?'技能达人':'商务人士'}}</span> -->
                            </p>
                            <p class="clearfix">
                                <!-- <span v-for="(item, index) in identityData" v-bind:key="item.key" :class="'label type'+(index+1)">{{item.identityName}}</span> -->
                                <!-- <span class="label type1" v-if="JSON.stringify(identityData) != '{}'">{{identityData.identityName}}</span> -->
                            </p>
                            <p class="perCompanyWrap">{{workInfoData[0].company}}</p>
                            <p class="perPositionWrap" style="margin-top:5px;" v-if="workInfoData[0].position!==''">
                                {{workInfoData[0].position}}
                                <img class="searchIcon" src="../../assets/personCenter/prev.png" width="16" v-if="perWorkInfoDetailShow" title="查看详情" @click="perWorkInfoDetailShowChange(1)"/>
                                <img class="searchIcon" src="../../assets/personCenter/next.png" width="16" v-if="!perWorkInfoDetailShow" @click="perWorkInfoDetailShowChange(2)"/>
                                <ul class="perWorkInfoDetail" v-if="!perWorkInfoDetailShow">
                                    <li v-for="item in workInfoData" v-bind:key="item.key">
                                        <p>{{item.company}}</p>
                                        <p>{{item.position}}</p>
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    <div class="infoBottom">
                        <h3>自我介绍</h3>
                        <p v-if="aboutme!=''" :title="aboutme">{{aboutme}}</p>
                        <!-- <p>清新硬朗的英伦户外男装形象，颠覆了传统英国品牌给人们的严肃印象，让人们看到了英国男士血液中阳光与阳刚，当然还有蕴藏着的绅士风度。</p> -->
                        <div v-if="aboutme==''" class="noData">暂无简介</div>
                    </div>
                </div>
                <div class="right lt">
                    <router-link :to="{ name: 'PerInfo', params: {}}" class="editP">
                        <img class="searchIcon" src="./../../assets/personCenter/personEditor.png" /> 编辑
                    </router-link>
                    <!-- <router-link v-if="this.isVip===false" :to="{ name: 'UpgradeMember', params: {}}" class="upgrade ">升级会员</router-link> -->
                    <router-link :to="{ name: 'UpgradeMember', params: {}}" class="upgrade ">升级会员</router-link>
                    <div class="groups">
                        <ul class="clearfix">
                            <li>
                                <router-link :to="{ name: 'Account', query: {userId:userId}}" class="login lt">
                                    <img class="searchIcon" src="./../../assets/personCenter/personAccount.png" />
                                    <span>我的账户</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'Videos', params: {}}" class="login lt">
                                    <img class="searchIcon" src="./../../assets/personCenter/personvideo.png" />
                                    <span>我的视频</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'Identification', params: {}}" class="login lt">
                                    <img class="searchIcon" src="./../../assets/personCenter/pesonNameAuthentication.png" v-if="verifyStatus===2"/>
                                    <img class="searchIcon" src="./../../assets/personCenter/pesonNameAuthenticationNo.png" v-if="verifyStatus!==2"/>
                                    <span v-if="verifyStatus===2">已认证</span>
                                    <span v-if="verifyStatus!==2">未认证</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="bottom clearfix">
                <div class="left lt">
                    <template>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="商道" name="1" class="tabsContentWrap1">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_dao'}">
                                        已发布（<span>{{totalCount}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_dao.length==0" style="line-height:80px;color:#999;text-align:center;margin-top: 0px;">暂无内容！！！</p>
                                    <ul>
                                        <li v-for="item in business_dao" v-bind:key="item.index" class="listItem">
                                            <h3>
                                                <router-link :to="{ name: 'MyBusiness_dao_detail', query: {newsId:item.id}}" class="login lt">
                                                {{item.newsTitle}}
                                                </router-link>
                                            </h3>
                                            <p class="content" v-html="item.newsContent"></p>
                                            <div class="other otherItem">
                                                <span class="time">
                                                    {{item.updateTime|formatDate}}
                                                </span>
                                                <span class="like other_icon">
                                                    <i></i>{{item.likeCount}}
                                                </span>
                                                <span class="message other_icon">
                                                    <i></i>{{item.commentCount}}
                                                </span>
                                                <!-- <span class="money other_icon">
                                                    <i></i>{{item.money}}
                                                </span> -->
                                            </div>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(1)" v-if="business_dao.length!==0">{{viewMoreFlag?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane> 
                            <el-tab-pane label="商机" name="2" class="tabsContentWrap2">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_ji'}">
                                        已发布（<span>{{totalCount1}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_ji.length==0" style="line-height:80px;color:#999;text-align:center;margin-top:-15px;">暂无内容！！！</p>
                                    <ul>
                                        <li v-for="item in business_ji" v-bind:key="item.index" class="listItem">
                                            <div class="top" :data-id="item.id">
                                                <div class="left clearfix">
                                                    <img class="lt defaultAvatarShow_little" :src="avatar" alt="头像"/>
                                                    <div class="info">
                                                        <p>
                                                            <span class="name">{{nickname}}</span>
                                                        </p>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div class="center">
                                                <p>{{item.content}}</p>
                                            </div>
                                            <div class="botWrap">
                                                <div class="provide multiEllipsis" v-if="item.supplyInfo">
                                                    <img src="./../../assets/index/provide.png" alt="">
                                                    {{item.supplyInfo}}
                                                </div>
                                                <div class="provide multiEllipsis" v-if="item.demandInfo">
                                                    <img src="./../../assets/index/require.png" alt="">
                                                    {{item.demandInfo}}
                                                </div>
                                            </div>
                                            <div class="other otherItem">
                                                <span class="time">
                                                    {{item.createTime|formatDate}}
                                                </span>
                                                <span class="like other_icon">
                                                    <i></i>{{item.likeCount}}
                                                </span>
                                                <span class="message other_icon">
                                                    <i></i>{{item.commentCount}}
                                                </span>
                                                <!-- <span class="money other_icon">
                                                    <i></i>{{item.money}}
                                                </span> -->
                                            </div>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(2)" v-if="business_ji.length!==0">{{viewMoreFlag1?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商会" name="3" class="tabsContentWrap3">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_hui'}">
                                        已发布（<span>{{totalCount2}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_hui.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul class="clearfix">
                                        <li v-for="item in business_hui" v-bind:key="item.index" class="listItem">
                                            <router-link :to="{ name: 'MyBusiness_hui_detail', query: {tissueId:item.tissueId}}">
                                            <div class="topImg">
                                                <img :src="item.tissueCoverPhoto" alt="">
                                                <div class="shanghuiTx">
                                                    <img :src="item.userAvatar" alt="" width="58" height="58">
                                                </div>
                                            </div>
                                            <div class="bottomInfo">
                                                <div class="name">{{item.userName}}</div>
                                                <h3 class="chamName">{{item.tissueName}}</h3>   
                                                <div class="chamDetails clearfix">
                                                    {{item.tradeName}}
                                                    <span class="peoNum rt"><span>{{item.personCount}}</span>人</span>
                                                </div>   
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(3)" v-if="business_hui.length!==0">{{viewMoreFlag2?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商询" name="4" class="tabsContentWrap4">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_xun'}">
                                        已发布（<span>{{totalCount3}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_xun.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul>
                                        <li v-for="item in business_xun" v-bind:key="item.index" class="listItem">
                                            <div class="top">
                                                <div class="left clearfix">
                                                    <img :src="item.trUser.avatar" class="lt defaultAvatarShow_little"/>
                                                    <div class="info">
                                                        <p>
                                                            <span class="name">{{item.trUser.name}}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="time">{{item.createTime|formatDate}}</div>
                                                <div class="consultationStatu going" v-if="item.consultationStatu===1">进行中</div>  
                                                <div class="consultationStatu isEnd" v-if="item.consultationStatu===2">已结束</div>   
                                                <div class="money">￥{{item.rewardMoney}}</div>
                                            </div>
                                            <div class="center">
                                                <div class="title">
                                                    <span>{{item.consultationTitle}}</span>
                                                </div>
                                            </div>
                                            <div class="botWrap">
                                                <div class="provide">
                                                    <img src="./../../assets/index/answerIcon.png" alt=""> 
                                                    <div class="content" v-html='item.consultationContent'></div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(4)" v-if="business_xun.length!==0">{{viewMoreFlag3?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商筹" name="5" class="tabsContentWrap5">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_chou'}">
                                        已发布（<span>{{totalCount4}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_chou.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul class="clearfix">
                                        <li v-for="item in business_chou" v-bind:key="item.index" class="listItem">
                                            <router-link class="linkTo" :to="{ name: 'MyBusiness_chou_detail', query: {fundId:item.id}}">
                                            <div class="topImg">
                                                <img :src="item.fundCover" alt="">
                                            </div>
                                            <div class="botContent">
                                                <h4 class="title">{{item.fundTitle}}</h4>
                                                <p class="details">
                                                    <span>融资目标：</span>
                                                    <span>{{item.fundAmount}} 元</span>
                                                </p>
                                                <p class="details">
                                                    <span>结束时间：</span>
                                                    <span>{{item.endTime|formatDate}}</span>
                                                </p>
                                                <div class="progressWrap">
                                                    <div class="curProgress" :style="'width:'+item.proWid+'px'">
                                                        <div class="progressBar">{{item.percentage}}</div>
                                                        <div class="beyondBar"></div>
                                                    </div>
                                                </div>
                                                <div class="other">
                                                    <div class="otherItem">
                                                        <img src="../../assets/index/money.png" width="24" alt="">
                                                        <span>已筹款 {{item.obtainAmount}} 元</span>
                                                    </div>
                                                    <div class="otherItem">
                                                        <img src="../../assets/index/headPortrait.png" width="24" alt="">
                                                        <span>支持数 {{item.supportCount}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(5)" v-if="business_chou.length!==0">{{viewMoreFlag4?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商聚" name="6" class="tabsContentWrap6">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_ju'}">
                                        已发布（<span>{{totalCount5}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_ju.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul class="clearfix">
                                        <li v-for="item in business_ju" v-bind:key="item.index" class="listItem">
                                            <div class="topImg">
                                                <img :src="item.cover" alt="">
                                            </div>
                                            <div class="botContent">
                                                <h4 class="title">{{item.title}}</h4>
                                                <div class="timeWrap">
                                                    <div class="provide">
                                                        <img src="./../../assets/index/time.png" alt="" width="24"> 
                                                        <p>{{item.beginTime}}开始～</p> {{item.endTime}}截止
                                                    </div>
                                                    <div class="provide">
                                                        <img src="./../../assets/index/positioning.png" alt="" width="24"> 
                                                        {{item.addressDetail}}
                                                    </div>
                                                </div>
                                                <div class="botOther">
                                                    <router-link class="btnDanger" v-if="item.signedUp===false" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}">立即报名</router-link>
                                                    <a href="javascript:;" class="btnDisabled" v-if="item.signedUp===true">已报名</a>
                                                    <p class="num clearfix">
                                                        <span class="lt">共{{item.signUpCount}}人报名</span>
                                                        <router-link class="rt" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}">查看详情</router-link>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(6)" v-if="business_ju.length!==0">{{viewMoreFlag5?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商品" name="7" class="tabsContentWrap7">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_pin'}">
                                        已发布（<span>{{totalCount6}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_pin.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul class="clearfix">
                                        <li v-for="item in business_pin" v-bind:key="item.index" class="listItem">
                                            <router-link class="linkTo" :to="{ name: 'MyBusiness_pin_detail', query: {goodsId:item.id}}">
                                            <div class="topImg">
                                                <img :src="item.goodsCover" alt="">
                                            </div>
                                            <div class="botContent">
                                                <h4 class="title">{{item.goodsName}}</h4>
                                                <div class="purchase clearfix">
                                                    <span class="lt">￥{{item.sellingPrice}}</span>
                                                    <span class="rt">{{item.salesValume}}人购买</span>
                                                </div>
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(7)" v-if="business_pin.length!==0">{{viewMoreFlag6?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
                <div class="right imgCarousel lt">
                    <div class="imgTitle clearfix">
                         <router-link :to="{ name: 'Myphotos', params: {}}" class="myPic lt">
                             我的相册
                            <img class="searchIcon" src="./../../assets/personCenter/personEditor.png" />
                        </router-link>
                        <router-link :to="{ name: 'Myphotos', params: {}}" class="more rt">more</router-link>
                    </div>
                    <div class="carouselWrap">
                    <template>
                        <el-carousel trigger="click" height="700px">
                        <div class="noData" v-if="isAlbums">您还没有上传图片！</div>
                        <el-carousel-item v-for="item in 1" :key="item">
                           <div class="picItemWrap" v-for="item in albums" v-bind:key="item.index">
                               <img :src="item.imgUrl" alt="">
                           </div>
                        </el-carousel-item>
                        </el-carousel>
                    </template>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import avatar from './../../assets/personCenter/head_Portraits.png'
    import {
        myProfileByToken,
        getListLim,
        getAvenuesList,//商道
        momentListLimByUserId,//商机
        myTisssueList,//商会
        getConsultationList,//商询
        getFundList,//商筹
        getMyActivityListLim,//商聚
        getMyGoodsListLim,//商品
    } from '../../api/api'
    export default {
        data() {
            return {
                activeName: '1',
                business_dao: [],
                business_ji: [],
                business_hui: [],
                business_xun: [],
                business_chou: [],
                business_ju: [],
                business_pin: [],
                totalCount:0,
                totalCount1:0,
                totalCount2:0,
                totalCount3:0,
                totalCount4:0,
                totalCount5:0,
                totalCount6:0,
                moreFlagSize1:4,
                moreFlagSize2:4,
                moreFlagSize3:3,
                moreFlagSize4:4,
                moreFlagSize5:3,
                moreFlagSize6:3,
                moreFlagSize7:3,
                viewMoreFlag:false,
                viewMoreFlag1:false,
                viewMoreFlag2:false,
                viewMoreFlag3:false,
                viewMoreFlag4:false,
                viewMoreFlag5:false,
                viewMoreFlag6:false,
                albums:[],
                isAlbums:false,
                avatar:avatar,
                nickname:'',
                company:'',
                position:'',
                aboutme:'',
                identityType:'',
                identityData:{},
                identityShow:false,
                isVip:false,
                verifyStatus:'',
                userId:'',
                workInfoData:[
                    {company:'',position:''}
                ],
                perWorkInfoDetailShow:true
            }
        },
        methods: {
            perWorkInfoDetailShowChange(isF){
                if(isF === 1){
                    this.perWorkInfoDetailShow = false;
                }else{
                    this.perWorkInfoDetailShow = true;
                }
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            //获取相册分页
            getListLim(pageNum) {
                let vm = this;
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId,
                    pageNum:pageNum,
                    pageSize:3
                }
                getListLim(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        if(res.result.list.length){
                            vm.albums = res.result.list;
                        }else{
                            this.isAlbums = true;
                        }
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
            //获取用户本地存储信息
            getLoginInfo(){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.avatar = infoDatas.avatar;
                this.name = infoDatas.name;
                this.company = infoDatas.company;
                this.position = infoDatas.position;
                this.aboutme = infoDatas.aboutme;
                this.identityData = infoDatas.userIdentity?infoDatas.userIdentity:[];
                this.identityShow = infoDatas.userIdentity?true:false;
                this.identityType = infoDatas.identityType;
                this.isVip = infoDatas.isVip;
                this.verifyStatus = infoDatas.verifyStatus;
                this.userId = infoDatas.id;
            },
            //获取自己的个人信息
            myProfileByToken(){
                myProfileByToken().then(res => {
                    if (res.code === 200) {
                        this.avatar = res.result.avatar;
                        this.nickname = res.result.nickname;
                        this.company = res.result.company;
                        this.aboutme = res.result.aboutme;
                        this.position = res.result.position;
                        this.identityData = res.result.userIdentity?res.result.userIdentity:{};
                        this.identityShow = res.result.userIdentity?true:false;
                        this.identityType = res.result.identityType;
                        this.isVip = res.result.isVip;
                        this.verifyStatus = res.result.verifyStatus;
                        this.userId = res.result.id;
                        this.workInfoData = res.result.companyPositionList.length>0?res.result.companyPositionList:[{company:'',position:''}];
                    } 
                    // else {
                    //     this.$message({
                    //         message: res.msg,
                    //         type: 'error'
                    //     });
                    // }
                }, err => {
                    console.log(err)
                });
            },
            //发布的商道列表
            getAvenuesList(pageNum,pageSize) {
                if(localStorage.getItem('perInfo')){
                    var userId = JSON.parse(localStorage.getItem('perInfo')).id;
                    var data = {
                        userId :userId ,
                        pageNum:pageNum,
                        pageSize:pageSize
                    }
                }
                getAvenuesList(data).then(res => {
                    if (res.code === 200) {
                        this.business_dao = res.result.list;
                        this.totalCount = res.result.pagination.totalCount;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },
            //发布的商机列表
            momentListLimByUserId(pageNum,pageSize) {
                if(localStorage.getItem('perInfo')){
                    var userId = JSON.parse(localStorage.getItem('perInfo')).id;
                    var data = {
                        userId :userId ,
                        pageNum:pageNum,
                        pageSize:pageSize
                    }
                }
                momentListLimByUserId(data).then(res => {
                    if (res.code === 200) {
                        this.business_ji = res.result.list;
                        this.totalCount1 = res.result.pagination.totalCount;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },
            //查询已创建的商会
            myTisssueList(pageNum,pageSize) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    createId:userId,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                myTisssueList(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.business_hui = res.result.list;
                        this.totalCount2 = res.result.pagination.totalCount;
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
            //发布的商询列表
            getConsultationList(pageNum,pageSize) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getConsultationList(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.business_xun = res.result.list;
                        this.totalCount3 = res.result.pagination.totalCount;
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
            //发布的商筹列表
            getFundList(pageNum,pageSize) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getFundList(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.business_chou = res.result.list;
                        this.totalCount4 = res.result.pagination.totalCount;
                        if(res.result.list.length){
                            //进度条相关处理
                            this.business_chou.forEach((self)=> {
                                // self.fundAmount = 100;
                                // self.obtainAmount = 50;
                                if(!self.obtainAmount) self.obtainAmount=0;
                                let proWid = parseInt(self.obtainAmount/self.fundAmount*194);
                                let percentage = Number(self.obtainAmount/self.fundAmount*100).toFixed(2);
                                percentage+='%';
                                self.proWid = proWid;
                                self.percentage = percentage;
                            });
                        }
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
            //发布的商聚列表
            getMyActivityListLim(pageNum,pageSize) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    // createId:userId,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getMyActivityListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.business_ju = res.result.list;
                        this.totalCount5 = res.result.pagination.totalCount;
                    } 
                    // else {
                    //     this.$message({
                    //         message: res.msg,
                    //         type: 'error'
                    //     });
                    // }
                }, err => {
                    console.log(err)
                });
            },
            //发布的商品列表
            getMyGoodsListLim(pageNum,pageSize) {
                let data = {
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getMyGoodsListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.business_pin = res.result.list;
                        this.totalCount6 = res.result.pagination.totalCount;
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
            //查看更多
            viewMore(flag) {
            	if(flag === 1){
                    if(this.totalCount>this.moreFlagSize1){
                        this.moreFlagSize1+=4;
                        this.getAvenuesList(1,this.moreFlagSize1);
                    }else{
                        this.viewMoreFlag = true;
                    }
            	}
            	else if(flag === 2){
                    if(this.totalCount1>this.moreFlagSize2){
                        this.moreFlagSize2+=4;
                        this.momentListLimByUserId(1,this.moreFlagSize2);
                    }else{
                        this.viewMoreFlag1 = true;
                    }
            	}
            	else if(flag === 3){
                    if(this.totalCount2>this.moreFlagSize3){
                        this.moreFlagSize3+=3;
                        this.myTisssueList(1,this.moreFlagSize3);
                    }else{
                        this.viewMoreFlag2 = true;
                    }
            	}
            	else if(flag === 4){
                    if(this.totalCount3>this.moreFlagSize4){
                        this.moreFlagSize4+=4;
                        this.getConsultationList(1,this.moreFlagSize4);
                    }else{
                        this.viewMoreFlag3 = true;
                    }
                }
                else if(flag === 5){
                    if(this.totalCount4>this.moreFlagSize5){
                        this.moreFlagSize5+=3;
                        this.getFundList(1,this.moreFlagSize5);
                    }else{
                        this.viewMoreFlag4 = true;
                    }
                }
                else if(flag === 6){
                    if(this.totalCount5>this.moreFlagSize6){
                        this.moreFlagSize6+=3;
                        this.getMyActivityListLim(1,this.moreFlagSize6);
                    }else{
                        this.viewMoreFlag5 = true;
                    }
                }
                else if(flag === 7){
                    if(this.totalCount6>this.moreFlagSize7){
                        this.moreFlagSize7+=3;
                        this.getMyGoodsListLim(1,this.moreFlagSize7);
                    }else{
                        this.viewMoreFlag6 = true;
                    }
                }
            },
        },
        //过滤器
        filters: {
            formatDate(time){
                let oldDate = new Date(time)
                let newDate = new Date()
                var dayNum = "";
                var getTime = (newDate.getTime() - oldDate.getTime())/1000;

                if(getTime < 60*5){
                    dayNum = "刚刚";
                }else if(getTime >= 60*5 && getTime < 60*60){
                    dayNum = parseInt(getTime / 60) + "分钟前";
                }else if(getTime >= 3600 && getTime < 3600*24){
                    dayNum = parseInt(getTime / 3600) + "小时前";
                }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
                    dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
                }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
                }else if(time >= 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
                }

                let year   = oldDate.getFullYear();
                let month  = oldDate.getMonth()+1;
                let day    = oldDate.getDate();
                let hour   = oldDate.getHours(); 
                let minute = oldDate.getMinutes(); 
                let second = oldDate.getSeconds(); 
                // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                return dayNum;
            }
        },
        mounted() {
            // this.getLoginInfo();
            this.myProfileByToken();
            this.getListLim(1);
            this.getAvenuesList(1,4);//商道
            this.momentListLimByUserId(1,4);//商机
            this.myTisssueList(1,3);//商会
            this.getConsultationList(1,4);//商询
            this.getFundList(1,3);//商筹
            this.getMyActivityListLim(1,3);//商聚
            this.getMyGoodsListLim(1,3);//商品
        }
    }
</script>
<style>
.left .el-tabs__item.is-active,.left .el-tabs__item:hover{
    color: #ea141c;
}
.left .el-tabs__active-bar{
    width: 0!important;
}
.left .el-tabs__nav-wrap::after{
    display: none;
}
.el-tabs__header{
    margin-bottom: 5px;
}
.left .el-tabs__item{
    font-size: 18px;
    color: #333333;
}
/* 轮播 */
.imgCarousel .el-carousel__indicator .el-carousel__button {
    width: 12px;
    height: 12px;
    border: 1px solid red;
    border-radius: 100px;
    background: none;
}

.imgCarousel .is-active .el-carousel__button {
    background: red;
}

.imgCarousel .el-carousel__indicators--outside {
    margin-top: 20px;
}
.bottom .left .el-tab-pane{
    position: relative;
}
.el-tabs__content .listWrap li .content img{
    width: 200px;
    height: 200px;
    margin: 15px;
    margin-left: 0;
}
</style>

<style lang="less" scoped>
    .noData {
        line-height: 60px;
        text-align: center;
        color: #999;
        font-size: 20px;
    }
    .infoDetail_top {
        height: 348px;
        padding-top: 58px;
        border-bottom: 1px solid rgb( 204, 204, 204); // box-shadow: 0 4px 0 rgb( 220, 220, 220 );
        .left {
            width: 600px;
            background: url('./../../assets/personCenter/leftBg.png') no-repeat;
            background-position: 566px 8px;
            .infoTop {
                .head_Portraits {
                    width: 110px;
                    height: 110px;
                    border-radius: 100px;
                    overflow: hidden;
                    text-align: center;
                    line-height: 110px;
                    border: 4px solid rgb( 255, 102, 51);
                    box-sizing: content-box;
                    img {
                        width: 100%;
                        height: 100%;
                        // width: 106px;
                        // height: 106px;
                        display: block;
                        position: relative;
                        left: 0;
                        top: 0;
                        &::after { 
                            content: '';
                            background: url('./../../assets/index/IdCard.png') no-repeat;
                            display: block;
                            position: absolute;
                            z-index: 2;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-size: cover;
                            background-color: #fff;
                        }
                    }
                }
                .head_info {
                    width: 422px;
                    margin-left: 30px;
                    p {
                        &:first-child {
                            margin: 14px 0 10px;
                            font-size: 16px;
                            color: #333;
                        }
                        span.name {
                            font-size: 26px;
                            margin-right: 8px;
                        }
                        span.identification {
                            border-width: 1px;
                            border-color: rgb( 73, 172, 126);
                            border-style: solid;
                            border-radius: 2px;
                            width: 76px;
                            height: 21px;
                            line-height: 19px;
                            color: #49ac7e;
                            font-size: 12px;
                            text-align: right;
                            display: inline-block;
                            padding: 0 4px;
                            box-sizing: border-box;
                            position: relative;
                            top: -5px;
                            i {
                                display: block;
                                width: 14px;
                                height: 15px;
                                background: url('./../../assets/personCenter/identifi.png') no-repeat;
                                position: absolute;
                                top: 2px;
                            }
                            margin-right: 16px;
                        }
                        span.company {
                            color: #49ac7e;
                            position: relative;
                            top: 2px;
                            display: inline-block;
                            margin-right: 12px;
                            max-width: 140px;
                        }
                        span.identity {
                            position: relative;
                            top: -4px;
                            display: inline-block;
                            padding-left: 15px;
                             &::before {
                                content: '';
                                position: absolute;
                                left: 0;
                                top: 3px;
                                width: 1px;
                                height: 17px;
                                background: #ccc;
                            }
                        }
                        span.label {
                            border-radius: 6px;
                            background: rgb( 73, 172, 126);
                            width: 99px;
                            height: 43px;
                            display: block;
                            float: left;
                            font-size: 16px;
                            color: #fff;
                            text-align: center;
                            line-height: 43px;
                            margin-right: 16px;
                            &:last-child {
                                margin-right: 0;
                            }
                            &.type2 {
                                background: #16b6f2;
                            }
                            &.type3 {
                                background: #7e72b1;
                            }
                        }
                    }
                    p.perCompanyWrap,p.perPositionWrap{
                        color: #878787;
                        font-size: 16px;
                    }
                    p.perPositionWrap{
                        position: relative;
                        img{
                            cursor: pointer;
                            display: inline-block;
                        }
                        .perWorkInfoDetail{
                            position: absolute;
                            left: 0;
                            top: 28px;
                            width: 312px;
                            background-color: rgba(0, 0, 0, 0.4);
                            color: #fff;
                            border-radius: 6px;
                            z-index: 9999;
                            padding: 12px;
                            li{
                                border-bottom: 1px solid #fff;
                                &:last-child{
                                    border-bottom: none;
                                }
                            }
                            p{
                                color: #fff;
                                margin: 6px 0;
                            }
                        }
                    }
                }
            }
            .infoBottom {
                font-size: 16px;
                h3 {
                    color: #49ac7e;
                    margin-top: 28px;
                }
                p {
                    margin-top: 10px;
                    color: #666;
                    line-height: 28px;
                    padding-right: 60px;
                    max-height: 84px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    position: relative;
                }
            }
        }
        .right {
            width: 600px;
            position: relative;
            .editP {
                position: absolute;
                right: 0;
                top: 24px;
                cursor: pointer;
                font-size: 18px;
                color: #333;
                display: block;
                img {
                    vertical-align: bottom;
                }
            }
            .upgrade{
                position: absolute;
                right: 100px;
                top: 28px;
                text-decoration: underline;
                &:hover{
                    text-decoration: none;
                }
            }
            .groups {
                li {
                    float: left;
                    margin: 76px 30px 0;
                    a {
                        display: block;
                        width: 130px;
                        height: 130px;
                        border: 1px solid rgb( 231, 76, 60);
                        border-radius: 100%;
                        text-align: center;
                        img {
                            display: block;
                            margin: 28px auto 14px;
                        }
                    }
                    &:first-child+li {
                        a {
                            img {
                                margin: 32px auto 15px;
                            }
                        }
                    }
                    &:first-child+li+li {
                        a {
                            border: 1px solid #49ac7e;
                            img {
                                margin: 20px auto 10px;
                            }
                        }
                    }
                }
            }
        }
    }
    .bottom{
        .left{
            width: 754px;
            padding-right: 40px;
            margin-top: 30px;
            border-right: 1px solid #eee;
            .title{
                color: #677b90;
                font-size: 14px;
            }
        }
        .imgCarousel{
            width: 445px;
            height: 800px;
            background: #ecf0f1;
            padding: 20px 40px;
            .imgTitle{
                font-size: 24px;
                color:#333;
                line-height: 36px;
                margin-bottom: 30px;
                a.myPic{
                    display: block;
                    &:hover{
                        text-decoration: none;
                    }
                    img{
                        vertical-align: text-bottom;
                        position: relative;
                        left: 3px;
                    }
                }
                a.more{
                    font-size: 18px;
                    color:#999;            
                }
            }
            .carouselWrap{
                .picItemWrap{
                    margin-bottom: 12px;
                    width: 369px;
                    img{
                        width: 369px;
                        height: 208px;
                    }
                }
            }
        }
    }
    ul>li {
        .otherItem{
            margin-top: 5px;
            font-size: 16px;
            color: #677b90;
            span.other_icon{
                margin-left: 30px;
                position: relative;
                i{
                    display: inline-block;
                    cursor: pointer;
                    margin-right: 4px;
                    width: 16px;
                    height: 16px;
                    background: url('./../../assets/personCenter/giveLike.png') no-repeat;
                }
            }
            span.like{
            }
            span.message{
                i{
                    position: relative;
                    top: 2px;
                    background: url('./../../assets/personCenter/comments.png') no-repeat;
                }
            }
            span.money{
                i{
                    position: relative;
                    top: 2px;
                    background: url('./../../assets/personCenter/personMoney.png') no-repeat;
                }
            }
        }
        a.linkTo{
            text-decoration: none;
        }
    }
    .listWrap li{
        padding: 16px 0;
        border-bottom: 1px solid #cccccc;
    }
    .tabsContentWrap1{
        .listWrap{
            ul{
                li{
                    &:first-child{
                        margin-top: 5px;
                    }
                    &:last-child{
                        border: none;
                    }
                    padding: 16px 0;
                    border-bottom: 1px solid rgb( 204, 204, 204 );
                    h3{
                        margin-bottom: 24px;
                        a{
                            font-size: 16px;
                            color: #333333;
                        }
                    }
                    .content{
                        font-size: 14px;
                        color: #333333;
                        line-height: 30px;
                    }
                }
            }
            p{
                margin-top: 20px;
                a.more{
                    font-size: 14px;
                    color: #666;
                }
            }
        }
    }
    .tabsContentWrap2{
        .listWrap{
            margin-top: 15px;
            li{
                padding: 16px 0;
                border-bottom: 1px solid #cccccc;
                .top {
                    position: relative;
                    .left {
                        position: relative;
                        margin-top: 0;
                        .info {
                            float: left;
                            margin-left: 20px;
                            p:first-child {
                                margin-top: 12px;
                                .name {
                                    font-size: 20px;
                                    color: #333;
                                }
                                &+p {
                                    color: #333;
                                    font-size: 16px;
                                    margin-top: 10px;
                                    span.fSpan {
                                        color: #339966;
                                        margin-right: 6px;
                                    }
                                }
                            }
                        }
                    }
                    .operation{
                        position: absolute;
                        right: 0;
                        top: 0;
                        a{
                            display: block;
                            width: 24px;
                            height: 24px;
                            float: left;
                            img{
                                width: 100%;
                                vertical-align: bottom;
                            }
                            &:first-child{
                                margin-right: 28px;
                                position: relative;
                                &::after{
                                    position: absolute;
                                    top: 0;
                                    right: -14px;
                                    width: 1px;
                                    height: 26px;
                                    background: #ddd;
                                    content: '';
                                }
                            }
                        }
                    }
                }
                .center {
                    margin-top: 32px;
                    font-size: 18px;
                    color: #999;
                    position: relative;
                    p{
                        max-height: 108px;
                        min-height: 32px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        position: relative;
                    }
                    .time{
                        font-size: 20px;
                        color: #677b90;
                        line-height: 62px;
                        border-bottom: 1px solid #b5c8db;
                    }
                }
                .botWrap {
                    font-size: 16px;
                    color: #666;
                    margin-top: 20px;
                    &>div {
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        // white-space: nowrap;
                        height: 64px;
                        line-height: 32px;
                        position: relative;
                        padding-left: 54px;
                        img {
                            vertical-align: bottom;
                            margin-right: 10px;
                            top: 4px;
                            left: 0;
                            position: absolute;
                        }
                        .require img {
                            margin-top: 2px;
                        }
                    }
                }
            }
        }
    }
    .tabsContentWrap3{
        .listWrap{
            li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                margin: 28px 22px 0 0;
                border: 1px solid #eeeeee;
                cursor: pointer;
                &>a{
                    display: block;
                    &:hover{
                        text-decoration: none;
                    }
                }
                // &:hover{
                //     box-shadow: 1px 1px 16px rgba(0,0,0,.3);
                // }
                &:nth-child(3n){
                    margin-right: 0;
                }
                .topImg{
                    width: 220px;
                    position: relative;
                    margin-bottom: 30px;
                    min-height: 149px;
                    &>img{
                        width: 100%;
                        height: 144px;
                    }
                    .shanghuiTx{
                        width: 58px;
                        height: 58px;
                        overflow: hidden;
                        border-radius: 100px;
                        position: absolute;
                        left: 50%;
                        margin-left: -29px;
                        bottom: -29px;
                        z-index: 99;
                    }
                }
                .bottomInfo{
                    padding: 0 12px 12px;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    .name{
                        font-size: 16px;
                        color: #333;
                        line-height: 50px;
                        text-align: center;
                        border-bottom: 1px solid #eeeeee;
                    }
                    .chamName{
                        font-size: 18px;
                        color: #333;
                        line-height: 30px;
                        margin-top: 10px;
                    }
                    .chamDetails{
                        font-size: 16px;
                        color: #666;
                        line-height: 30px;  
                    }
                }
            }
        }
    }
    .tabsContentWrap4{
        .listWrap{
            li{
                .top {
                    position: relative;
                    .left {
                        position: relative;
                        .info {
                            float: left;
                            margin-left: 20px;
                            p:first-child {
                                margin-top: 12px;
                                .name {
                                    font-size: 20px;
                                    color: #333;
                                }
                                &+p {
                                    color: #333;
                                    font-size: 16px;
                                    margin-top: 10px;
                                    span.fSpan {
                                        color: #339966;
                                        margin-right: 6px;
                                    }
                                }
                            }
                        }
                    }
                    .time{
                        font-size: 16px;
                        color: #999;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                    .consultationStatu{
                        color: #999;
                        font-size: 16px;
                        font-weight: 400;
                        position: absolute;
                        right: 0;
                        top: 40px;
                    }
                    .going{
                        color: #ff6600;
                    }
                    .money{
                        font-size: 20px;
                        color: #f10707;
                        width: 110px;
                        height: 78px;
                        line-height: 78px;
                        text-align: right;
                        position: absolute;
                        right: 0;
                        top: 55px;
                    }
                }
                .center {
                    margin-top: 20px;
                    font-size: 16px;
                    color: #666666;
                    position: relative;
                    padding-right: 150px;
                    .title{
                        font-size: 16px;
                        color: #333333;
                        margin-bottom: 20px;
                    }
                }
                .botWrap {
                    font-size: 16px;
                    color: #666;
                    margin-top: 13px;
                    max-width: 870px;
                    &>div {
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        // white-space: nowrap;
                        line-height: 32px;
                        position: relative;
                        padding-left: 54px;
                        img {
                            vertical-align: bottom;
                            margin-right: 10px;
                            top: 2px;
                            left: 0;
                            position: absolute;
                        }
                        .require img {
                            margin-top: 2px;
                        }
                    }
                }
            }
        }
    }
    .tabsContentWrap5{
        .listWrap{
            li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                border:1px solid #eee;
                margin: 28px 26px 0 0;
                width: 220px;
                box-sizing: border-box;
                &:nth-child(3n){
                    margin-right: 0;
                }
                .topImg{
                    width: 220px;
                    height: 128px;
                    position: relative;
                    &>img{
                        width: 99%;
                        height: 128px;
                        vertical-align: middle;
                    }
                    .imgTitle{
                        position: absolute;
                        width: 100%;
                        height: 36px;
                        line-height: 36px;
                        padding: 0 16px;
                        font-size: 18px;
                        color: #fff;
                        left: 0;
                        bottom: 0;
                        background:rgba(0,0,0,0.6);
                    }
                }
                .botContent{
                    padding: 0 12px 4px;
                    h4.title{
                        font-size: 16px;
                        color:#333;
                        margin-top: 16px;
                        margin-bottom: 6px;
                        font-weight: 500;
                        min-height: 46px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    }
                    p.details{
                        font-size: 12px;
                        color:#1a1a1a;
                        margin: 8px 0;
                    }
                    .progressWrap{
                        margin-top: 38px;
                        margin-bottom: 15px;
                        width: 100%;
                        height: 5px;
                        background: #ccc;
                        position: relative;
                        .curProgress{
                            background-color: rgb( 254, 122, 122 );
                            width: 161px;
                            position: absolute;
                            left:0;
                            top: 0;
                            height: 5px;
                            .progressBar{
                                font-size: 14px;
                                color:#fe7a7a;
                                position: absolute;
                                top: -23px;
                                left: 0;
                                // right: -27px;
                                // right: -0;
                            }
                        }
                        .curProgress.beyond{
                            width: 100%;
                            .progressBar{
                                color: #4cbedf;
                            }
                            .beyondBar{
                                position: absolute;
                                width: 34px;
                                height: 5px;
                                background: #4cbedf;
                                right: 0;
                                top: 0;
                            }
                        }
                    }
                    .other{
                        .otherItem{
                            width: 100%;
                            &:first-child{
                                margin-bottom: 12px;
                            }
                        }
                        font-size: 18px;
                        color: #999;
                        margin-top: 14px;
                        span{
                            min-width: 120px;
                        }
                        img{
                            vertical-align: text-bottom;
                        }
                    }
                }
            }
        }
    }
    .tabsContentWrap6{
        .listWrap{
            li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                border:1px solid #eee;
                margin: 28px 26px 0 0;
                width: 220px;
                box-sizing: border-box;
                &:nth-child(3n){
                    margin-right: 0;
                }
                .topImg{
                    width: 220px;
                    height: 128px;
                    position: relative;
                    &>img{
                        width: 99%;
                        height: 128px;
                        vertical-align: middle;
                    }
                }
                .botContent{
                    padding: 0 13px 22px;
                    h4.title{
                        font-size: 16px;
                        color:#333;
                        margin-top: 16px;
                        margin-bottom: 6px;
                        font-weight: 500;
                        min-height: 46px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    }
                    .timeWrap{
                        .provide{
                            font-size: 12px;
                            line-height: 24px;
                            position: relative;
                            padding-left: 30px;
                            color: #666;
                            img{
                                vertical-align: bottom;
                                margin-right: 10px;
                                top: 5px;
                                left: 0;
                                position: absolute;
                            }
                            &:last-child{
                                margin-top: 14px;
                            }
                        }
                    }
                    .botOther{
                        padding: 30px 0 0;
                        a.btnDanger,a.btnDisabled{
                            width: 100%;
                        }
                        p.num{
                            padding: 0 5px;
                            text-align:center;
                            margin-top: 12px;
                            span,a{
                                font-size: 16px;
                                color: #999999;
                                // text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
    .tabsContentWrap7{
        .listWrap{
            li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                border:1px solid #eee;
                margin: 28px 26px 0 0;
                width: 220px;
                box-sizing: border-box;
                &:nth-child(3n){
                    margin-right: 0;
                }
                .topImg{
                    width: 220px;
                    height: 128px;
                    position: relative;
                    &>img{
                        width: 99%;
                        height: 128px;
                        vertical-align: middle;
                    }
                }
                .botContent{
                    padding: 0 13px 22px;
                    h4.title{
                        font-size: 16px;
                        color:#333;
                        margin-top: 16px;
                        margin-bottom: 6px;
                        font-weight: 500;
                        min-height: 46px;
                        height: 64px;
                        overflow: hidden;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    }
                    .purchase{
                        line-height: 30px;
                        margin-top: 30px;
                        span{
                            &:first-child{
                                font-size: 20px;
                                color: #f10707;
                            }
                            &:last-child{
                                font-size: 14px;
                                color: #666;
                            }
                        }
                    }
                }
            }
        }
    }
</style>