<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader> 
        </div>
        <div class="main layoutWrap clearfix">
           <template>
                <Breadcrumb firstName="首页" secondName="我的商机" firstLink="/" ></Breadcrumb>
            </template>
            <div class="videoMain"> 
                <div class="video-nav">
                    <div class="buildItem">
                        我发布的商机
                    </div>
                    <!-- <a class="video-editor" href="javascript:;">编辑</a> -->
                    <router-link :to="{ name: 'Publish_ji', params: {}}" class="btnDanger uploadVideo">发布商机</router-link>
                </div>               
            </div> 
        </div>
        <div class="leftPageWrap">
            <div class="centerCon clearfix">
                <div class="findbusiness_wrap" v-loading="loading">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有发布过任何商机！！！"></NoData>
                    </template>
                    <ul class="clearfix" v-if="listData.length>0"> 
                        <li v-for="item in listData" v-bind:key="item.key" class="blockHover">
                            <router-link class="linkTo" :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}">
                            <div class="top" :data-id="item.id">
                                <div class="left clearfix">
                                    <router-link class="linkTo" :to="{ name: 'MemberPersonCenter', query: {userId:item.userId}}">
                                    <img class="lt defaultAvatarShow" :src="avatar" alt="头像"/>
                                    </router-link>
                                    <div class="info">
                                        <p>
                                            <span class="name">{{name}}</span>
                                            <!-- <img src="./../../assets/index/video.png" alt=""> -->
                                        </p>
                                        <p>
                                            <!-- <span class="fSpan">老板</span> -->
                                            <!-- <span v-for="(item) in identityData" class="fSpan" v-bind:key="item.key">{{item.identityName}}</span> -->
                                            <span class="label type1">{{identityData.identityName}}</span>
                                            <span>|</span>
                                            <span>{{identityType===1?'技能达人':'商务人士'}}</span>
                                        </p>
                                    </div> 
                                </div>
                                <!-- 编辑删除暂无接口 -->
                                <div class="operation">
                                    <!-- <a href="/">
                                        <img src="./../../assets/index/editorA.png" alt="">
                                    </a> -->
                                    <a href="javascript:;" @click.stop="shangjiItemDel(item.id)">
                                        <img src="./../../assets/index/deleA.png" alt="">
                                    </a>
                                </div>
                            </div>
                            <div class="center">
                                <p>{{item.content}}</p>
                                 <div class="imgWrapConShow clearfix">
                                    <img :src="imgitem" alt="" v-for="imgitem in item.imageIdArr" v-bind:key="imgitem.key" class="lt"> 
                                </div>
                                <div class="time">{{item.createTime|formatDate}}</div>
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
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="pagination paginationIndex" v-if="isPaginationShow">
            <el-pagination
                    @prev-click="handlePrevChange"
                    @next-click="handleNextChange"
                    @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :total="total"
                :current-page=1
                :page-size='pageSize'
                v-if="total>pageSize"
                >
            </el-pagination>
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from './Breadcrumb'
    import {momentListLimByUserId,shangjiItemDel} from '@/api/api'
    import avatar from './../../assets/personCenter/head_Portraits.png'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                isPaginationShow:false,
                isNodata_msg:false,
                listData:[],
                avatar:avatar,
                name:'',
                identityType:'',
                identityData:{
                    identityName:''
                },
                loading: true
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.momentListLimByUserId(val);
            },
            handlePrevChange(val) {
                this.momentListLimByUserId(val);
            },
            handleNextChange(val) {
                this.momentListLimByUserId(val);
            },
            //获取个人信息
            getLoginInfo(){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.avatar = infoDatas.avatar;
                this.name = infoDatas.name;
                this.identityData = infoDatas.userIdentity?infoDatas.userIdentity:[];
                this.identityType = infoDatas.identityType;
            },
            momentListLimByUserId(pageNum) {
                this.listData=[];
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId,
                    pageNum:pageNum,
                    pageSize:5
                }
                momentListLimByUserId(data).then(res => {
                    if (res.code === 200) {
                        // console.log(res)
                        if(res.result.list.length>0){
                            this.listData = res.result.list;
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                            this.totalCount = res.result.pagination.totalCount;
                            this.isNodata_msg = false;
                            this.getLoginInfo();
                        }else{
                            this.isNodata_msg = true;
                        }
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
            //删除
            shangjiItemDel(momentId) {
                let data = {
                    momentId :momentId 
                }
                this.$confirm('你确定要删除该条商机吗?', '删除商机', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    shangjiItemDel(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除成功！');
                            this.momentListLimByUserId(1);
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                });
            }
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
            this.momentListLimByUserId(1);
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style lang="less" scoped>
    .video-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
        .uploadVideo{
            position: absolute;
            right: 0;
            top:-16px;
        }
        &::after{
            content: "";
            position: absolute;
            width:16px;
            height: 8px;
            left:50px;
            bottom:-1px;
            background-image: url('./../../assets/personCenter/targetVideo.png');
        }
    }
    .buildItem{
        display: inline-block;
        &:first-child{
            margin-right: 22px;
        }
        &:first-child+div{
            color: #999999;
        }
    }
    .findbusiness_wrap {
        min-height: 320px;
        margin: 12px -24px 22px 0;
        ul>li {
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 6px;
            background: rgb( 255, 255, 255 );
            box-shadow: 0px 2px 1px 0px #e4e7ed;
            margin-top: 30px;
            padding: 30px 30px 20px;
            box-sizing: border-box;
            margin-bottom: 32px;
            &:first-child,
            &:first-child+li {
                margin-top: 0;
            }
            .top {
                position: relative;
                .left {
                    position: relative;
                    .info {
                        float: left;
                        margin-left: 33px;
                        p:first-child {
                            margin-top: 20px;
                            .name {
                                font-size: 26px;
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
                                // position: absolute;
                                // top: 0;
                                // right: -14px;
                                // width: 1px;
                                // height: 26px;
                                // background: #ddd;
                                // content: '';
                            }
                        }
                    }
                }
            }
            .center {
                margin-top: 32px;
                font-size: 24px;
                color: #666666;
                position: relative;
                p{
                    max-height: 108px;
                    min-height: 64px;
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
</style>