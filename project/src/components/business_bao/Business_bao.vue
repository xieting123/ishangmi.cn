<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix shangdao">
            <div class="serchRoad">
                    <el-form ref="form" :model="form"  :inline="true">
                        <el-input v-model="form.newsTitle" placeholder="请输入关键词搜索商报"></el-input>
                        <el-button type="danger" @click="btnSearch">搜&nbsp;索</el-button>
                    </el-form>
            </div>
            <div class="main-content">
                <ul style="min-height: 300px;" class="clearfix" v-loading="loading">
                    <li class="business-road blockHover" v-for="item in listData" v-bind:key="item.key">
                        <router-link class="linkTo" :to="{ name: 'MyBusiness_bao_detail', query: {newsId:item.id}}">
                       <div class="clearfix">
                            <div class="head-info lt">
                                <router-link class="linkTo" :to="{ name: 'MemberPersonCenter', query: {userId:item.userId}}">
                                    <img :src="item.trUser.avatar" class="head-info-img defaultHead_Portrait_pic"/>
                                </router-link>
                                <div class="head-info-name">
                                    {{item.trUser.name}}
                                    <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.trUser.verifyStatus===4">
                                </div>
                            </div>
                            <ul class="road-active rt clearfix">
                                <li class="lt">
                                    点赞
                                    <div class="give-like" v-if="item.likeCount<=0">0</div>
                                    <div class="give-like" v-if="item.likeCount>0">{{item.likeCount}}</div>
                                </li>
                                <li class="lt">
                                    评论
                                    <div class="comments">{{item.commentCount}}</div>
                                </li>
                                <li class="lt">
                                    打赏
                                    <div class="exceptional">{{item.rewardCount}}</div>
                                </li>
                                <!-- <li class="lt">
                                    阅读量
                                    <div class="exceptional">{{item.readCount}}</div>
                                </li> -->
                            </ul>
                       </div>
                        <h3 class="info-title">{{item.newsTitle}}</h3>
                        <p class="info-conent" v-html="item.newsContent"></p>
                        <p class="info-time">{{item.createTime|formatDate}} <span style="margin-left:20px;">阅读量：{{item.readCount}}</span></p>
                        </router-link>
                  </li>
                  
                </ul>
                <!-- 分页  -->
                <el-pagination class="paginationWrap_nav"
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
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template> 
<script>
    import {newsList} from '@/api/api'
    export default {
        data() {
            return {
                form: {
                    newsTitle: ''
                },
                total:0,
                pageSize:0,
                listData:[],
                loading:true
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.loading = true;
                this.newsList(val);
            },
            //按钮搜索
            btnSearch() {
                this.newsList(1);
            },
            newsList(pageNum) {
                let keywords = this.form.newsTitle;
                let data = {
                    newsTitle:keywords,
                    pageNum:pageNum,
                    pageSize:4
                }
                newsList(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        console.log(res);
                        
                        this.listData = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(res.result.list.length==0 || res.result.list==null){
                            this.$message({
                                message: '未检索到相关数据',
                                type: 'warning'
                            });
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
            }
        },
        mounted() {
            this.newsList(1);
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
        }
    }
</script>
<style>
.shangdao .el-form{
    width:70%;
    position: relative;
    margin: 0 auto;    
}
 .serchRoad .el-input__inner{
    width:100%;
    height:60px;
    font-size: 18px;
    padding-left:52px;
    padding-right: 90px;
    color:#999;
}
.el-input__inner:focus{
    border-color:#ff3333;
}
.shangdao .el-input::after{
    position: absolute;
    top:18px;
    left:15px;
    content: "";
    width:24px;
    height: 26px;
    background: url('./../../assets/businessLove/searchIcon.png') no-repeat;
}
.serchRoad .el-button{
    height: 60px;
    color: #fff;
    width: 110px;
    position: absolute;
    right: 0px;
    font-weight: 100;
    top: 0;
    border-bottom-left-radius: 0px;
    font-size: 24px;
    background: #fa5552;
    border-top-left-radius: 0px;
}
.serchRoad .el-button:hover{
    background: #f56c6a;
}
.main-content li.blockHover .info-conent p{
    line-height: 24px;
}
.main-content li.blockHover .info-conent img{
    width: 300px;
    height: 300px;
    margin: 15px 0;
    display: inline-block;
    margin-right: 15px;
}
</style>

<style lang="less" scoped>
    .serchRoad{
        text-align:center;
        margin-top:64px;
    }
    .main-content{
        width:100%;
        margin-top:40px;
        .business-road{
            width:100%;
            padding: 30px 50px;
            background:#f9f9f9;
            margin-bottom:30px;
            // box-shadow: 0px 1px 3px #d2d2d2;
            .head-info{
                border-radius: 6px;
                height: 116px;
                width:55%;
                margin-right: 20px;
                background:url('./../../assets/businessRoad/headInfoBg.png') no-repeat center right;
                .head-info-img{
                    width:100px;
                    height: 100px;
                    border-radius: 50%;
                    // border:4px solid #ff9933;
                    margin-right: 20px;
                }
                .head-info-name{
                    display: inline-block;
                    font-size:26px;
                    height: 100%;
                    box-sizing: border-box;
                    padding-top:20px;
                    vertical-align: top;
                }              
            }
            .road-active{ 
                font-size:20px;
                color:#677b90;    
                padding-top:30px;        
                li{
                    width:150px;
                    text-align: center;
                }
            }
            .info-title{
                    font-size:24px;
                    font-weight: normal;
                    line-height: 60px;
                }
                .info-conent{
                    padding-right: 50px;
                    line-height: 34px;
                    color:#666666;
                    font-size:18px;
                }
                .info-time{
                    color:#677b90;
                    padding-top:10px;
                }
        }
    }
</style>