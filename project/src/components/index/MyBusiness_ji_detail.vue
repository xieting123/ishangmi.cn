<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader> 
        </div>
        <div class="main layoutWrap clearfix">
           <template>
                 <BreadcrumbMult firstName="首页" secondName="商机列表" firstLink="/" secondLink="/business_ji" thirdName="商机详情"></BreadcrumbMult>
            </template>
            <div class="momentInfoWrap clearfix">
                <div class="left lt">
                    <div class="top">
                        <div class="clearfix">
                            <div class="head-info lt">
                                <router-link class="linkTo" :to="{ name: 'MemberPersonCenter', query: {userId:listData.userId}}">
                                    <img :src="listData.user.avatar" class="head-info-img defaultHead_Portrait_pic"/>
                                </router-link>
                                <div class="head-info-name singleEllipsis">
                                    {{listData.user.nickname}}
                                    <img src="./../../assets/businessRoad/videoIcon.png" v-if="listData.user.verifyStatus===4">
                                </div>
                                <p class="head-info-intro">
                                    <span v-for="item in listData.user.userIdentitys" class="fSpan" v-bind:key="item.key">{{item.identityName}}</span>
                                    <span>|</span>
                                    <span>{{listData.user.identityType===1?'技能达人':'商务人士'}}</span>
                                </p>
                            </div>
                            <ul class="road-active rt clearfix">
                                <li class="lt">
                                    点赞
                                    <div class="give-like">{{listData.likeCount}}</div>
                                </li>
                                <li class="lt">
                                    评论
                                    <div class="comments">{{listData.commentCount}}</div>
                                </li>
                                <li class="lt">
                                    打赏
                                    <div class="exceptional">{{listData.rewardCount}}</div>
                                </li>
                            </ul> 
                       </div>
                       <div class="center">
                            <p class="multiEllipsis">{{listData.content}}</p>
                            <div class="imgWrapConShow clearfix">
                                <img :src="imgitem" alt="" v-for="imgitem in listData.imageIdArr" v-bind:key="imgitem.key" class="lt"> 
                            </div>
                            <div class="time">
                                <span>{{listData.createTime | formatDate}}</span>
                                <!-- <span style="margin-left:15px;">阅读量：{{listData.content}}</span> -->
                            </div>
                        </div>
                        <div class="botWrap">
                            <div class="provide multiEllipsis" v-if="listData.supplyInfo">
                                <img src="./../../assets/index/provide.png" alt="">{{listData.supplyInfo}}
                            </div>
                            <div class="provide multiEllipsis" v-if="listData.demandInfo">
                                <img src="./../../assets/index/require.png" alt="">{{listData.demandInfo}} 
                            </div>
                        </div>
                    </div>
                    <div class="like clearfix">
                        <a href="javascript:;" @click="momentLike" v-if="listData.liked===false">
                            <img :src="like" alt="">
                        </a>
                        <a href="javascript:;" @click="momentLike" v-if="listData.liked===true">
                            <img :src="cancelLike" alt="">
                        </a>
                        <a href="javascript:;" class="giveReward" @click="giveRewardDialog"><img src="../../assets/businessJi/borderRdius.png" alt="">支持Ta</a>
                    </div>
                    
                    <div class="commentWrap">
                        <div class="title">
                            <img :src="comment" alt="">&nbsp;&nbsp;用户评论
                        </div>
                        <div class="commentFormWrap">
                            <el-form ref="commentForm" :model="commentForm" class="clearfix">
                                <el-form-item>
                                    <el-input type="textarea" v-model="commentForm.content" placeholder="写下你的评论"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <a href="javascript:;" class="btnDanger_small rt" @click="commentSubmit">提交</a>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="commentListWrap">
                            <div v-if="commentInfoList.length===0" style="color:#999;line-height:60px;text-align:center;">暂无评论！</div>
                            <ul>
                                <li v-for="item in commentInfoList" v-bind:key="item.key">
                                    <div class="defaultHead_Portraits">
                                        <img :src="item.fromUser.avatar" alt="头像">
                                    </div>
                                    <div class="commentInfo">
                                        <div class="comment_top">
                                            <span class="name">{{item.fromUser.nickname}}</span>
                                            <span class="time">{{item.createTime|formatDate}}</span>
                                            <a href="javascript:;" class="rt" @click="commentDialog(item.fromUid)" v-if="item.fromUser.id!==curUserId">
                                                <img :src="comment1" alt="">
                                            </a>
                                        </div>
                                        <p class="comment_con">
                                            <span v-if="item.toUser">回复<span class="replyStyle">{{item.toUser.nickname}}</span>：</span>
                                            {{item.content}}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <div class="pagination paginationIndex" v-if="total1>pageSize1">
                                <el-pagination
                                    @current-change="handleCurrentChange1"
                                    background
                                    layout="prev, pager, next"
                                    :total="total1"
                                    :current-page=1
                                    :page-size='pageSize1'
                                    >
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right rt">
                    <div class="title">Ta发布的商机</div>
                    <div class="botWrap" v-for="item in momentData" v-bind:key="item.key">
                        <router-link @click.native="flushCom" :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}">{{item.content}}</router-link>
                        <div class="provide multiEllipsis" v-if="item.supplyInfo">
                            <img src="./../../assets/index/provide.png" alt="">{{item.supplyInfo}}
                        </div>
                        <div class="provide multiEllipsis" v-if="item.demandInfo">
                            <img src="./../../assets/index/require.png" alt="">{{item.demandInfo}} 
                        </div>
                    </div>
                    <el-pagination
                    small
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="total"
                    :page-size='pageSize'
                    class="slidebarPage" v-if="total>pageSize">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 回复评论弹出 -->
        <el-dialog title="回复评论" :visible.sync="dialogFormVisible" class="reCommonDialog">
            <el-form :model="commentForm1">
                <el-form-item>
                <el-input type="textarea" v-model="commentForm1.content" placeholder="写下你的评论"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="reCommentSubmit">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 打赏弹出 -->
        <el-dialog
        title="打赏"
        :visible.sync="rewardDialog"
        :close-on-click-modal=false
        :width=rewardDialogWidth
        :before-close="rewardHandleClose" class="rewardDialog">
        <div v-if="isHaspayQrcode===false">
            <el-form ref="rewardForm" :model="rewardForm" :rules="rewardRules">
            <div class="top">
                <el-form-item label="" prop="amount">
                <el-input type="input" v-model.number="rewardForm.amount" class="demand" placeholder="请输入打赏金额"></el-input>
                </el-form-item>
            </div>
            <div class="payWay">
                <p class="payWayTitke">选择支付方式</p>
                <div class="businessJuSignUp_method">
                    <el-form-item label="" prop="payType">
                        <el-radio-group v-model="rewardForm.payType">
                            <el-radio :label="1">
                                <img src="../../assets/businessJu/payTreasure.png" alt="">
                            </el-radio>
                            <el-radio :label="2" >
                                <img src="../../assets/businessJu/wxLogo.png" alt="">
                            </el-radio>
                            <!-- <el-radio :label="3" class="yePay">余额支付（余额¥100）</el-radio> -->
                            <el-radio :label="3" class="yePay">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </div>
            </el-form>
        </div>
        <div v-if="isHaspayQrcode===true">
            <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{rewardForm.payType==1?'支付宝':'微信'}}扫码完成支付</p>
            <p style="text-align:center;"><img :src="payQrcode" alt="" width='300'></p>
        </div>
        <span slot="footer" class="dialog-footer" v-if="isHaspayQrcode===false">
            <el-button @click="rewardDialog = false">取 消</el-button>
            <el-button type="primary" @click="rewardSubmit('rewardForm')">确 定</el-button>
        </span>
        </el-dialog>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import BreadcrumbMult from './BreadcrumbMult'
    import {momentsInfoDetail,momentListLimByUserId,momentLike,commentSubmit,getCommentInfoListLim,alipay, wxpay, myselfPayway} from '@/api/api'
    import like from '@/assets/businessJi/like.png'
    import cancelLike from '@/assets/businessJi/cancelLike.png'
    import comment from '@/assets/businessJi/comment.png'
    import comment1 from '@/assets/businessJi/comment1.png'
    export default {
        data() {
            return {
                listData:{
                    user:{
                        avatar:''
                    }
                },
                like:like,
                cancelLike:cancelLike,
                comment:comment,
                comment1:comment1,
                commentForm:{
                    content:'',
                },
                commentForm1:{
                    content:'',
                },
                momentData:[],
                commentInfoList:[],
                loading: true,
                momentId:'',
                userId:'',
                total:0,
                pageSize:0,
                dialogFormVisible: false,
                pageSize1:0,
                total1:0,
                curUserId:'',
                rewardDialog:false,
                rewardDialogWidth:'608px',
                payQrcode:'data:image/png;base64,',
                isHaspayQrcode:false,
                rewardForm: {
                    amount:'',
                    payType:''
                },
                rewardRules: {
                    amount:[
                        { required: true, message: '金额不能为空'},
                        { type: 'number', message: '金额必须为数字值'}
                    ],
                    payType:[
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ]
                },
            }
        },
        methods: { 
            //查询详情
            momentsInfoDetail() {
                let data = {
                    momentId:this.momentId
                }
                momentsInfoDetail(data).then(res => {
                    if (res.code === 200) {
                        this.listData = res.result;
                        this.userId = res.result.userId;
                        this.momentListLimByUserId(1);
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
            //查询发布的商机列表
            momentListLimByUserId(pageNum) {
                let data = {
                    userId:this.userId,
                    pageNum:pageNum,
                    pageSize:3
                }
                momentListLimByUserId(data).then(res => {
                    if (res.code === 200) {
                        this.momentData = res.result.list;
                        this.pageSize = res.result.pagination.pageSize;
                        this.total = res.result.pagination.totalCount;
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
            //商机列表分页
            handleCurrentChange(val) {
                this.momentListLimByUserId(val);
            },
            //商机点赞|取消点赞
            momentLike(){
                let data = {
                    momentId:this.momentId
                }
                momentLike(data).then(res => {
                    if (res.code === 200) {
                        if(!this.listData.liked){
                            this.$message.success('点赞成功！');
                        }else{
                            this.$message.success('取消点赞成功！');
                        }
                        this.momentsInfoDetail();
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/index/myshangjiDetail?momentId='+this.momentId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                        });
                    } 
                    else {
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
            //评论
            commentSubmit() {
                if(this.commentForm.content){
                    let data = {
                        momentId:this.momentId,
                        content:this.commentForm.content
                    }
                    commentSubmit(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('提交成功！');
                            this.commentForm.content='';
                            this.momentsInfoDetail();
                            this.getCommentInfoListLim(1);
                        }else if(res.code === 10003){
                            this.$router.push({
                                path: '/Login',
                                query: {redirect: '/index/myshangjiDetail?momentId='+this.momentId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else{
                    this.$message.warning('评论内容不能为空！');
                }
            },
            
            //评论列表
            getCommentInfoListLim(pageNum){
                let data = {
                    momentId:this.momentId,
                    pageNum:pageNum,
                    pageSize:5
                }
                getCommentInfoListLim(data).then(res => {
                    if (res.code === 200) {
                        this.commentInfoList = res.result.list;
                        this.total1 = res.result.pagination.totalCount;
                        this.pageSize1 = res.result.pagination.pageSize;
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
            handleCurrentChange1(val){
                this.getCommentInfoListLim(val);
            },
            //回复评论dialog
            commentDialog(fromUid){
                this.dialogFormVisible = true;
                this.toUid = fromUid;
            },
            //回复别人的评论
            reCommentSubmit() {
                let data = {
                    toUid:this.toUid,
                    momentId:this.momentId,
                    content:this.commentForm1.content
                }
                if(this.commentForm1.content){
                    commentSubmit(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('回复评论成功！');
                            this.commentForm1.content='';
                            this.momentsInfoDetail();
                            this.dialogFormVisible = false;
                            this.getCommentInfoListLim(1);
                        }else if(res.code === 10003){
                            this.$router.push({
                                path: '/Login',
                                query: {redirect: '/index/myshangjiDetail?momentId='+this.momentId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else{
                    this.$message.warning('评论内容不能为空！');
                }
            },
            //打赏弹出
            giveRewardDialog(){
                this.rewardDialog = true;
                this.payQrcode='data:image/png;base64,';
            },
            rewardHandleClose(done) {
                this.isHaspayQrcode = false;
                this.rewardDialogWidth = '608px';
                done();
                // this.$refs['rewardForm'].clearValidate(); //清除校验
            },
            rewardSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.payQrcode='data:image/png;base64,';
                        let data = {
                            amountSource:1,
                            amount:this.rewardForm.amount,
                            othId:this.momentId
                        }
                        if(this.rewardForm.payType==1){//支付宝
                            alipay(data).then(res => {
                                if (res.code === 200) {
                                    this.payQrcode+=res.result;
                                    this.isHaspayQrcode = true;
                                    this.rewardDialogWidth = '408px';
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/myshangjiDetail?momentId='+this.momentId} 
                                    });
                                }else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }else if(this.rewardForm.payType==2){//微信
                            wxpay(data).then(res => {
                                if (res.code === 200) {
                                    this.payQrcode+=res.result;
                                    this.isHaspayQrcode = true;
                                    this.rewardDialogWidth = '408px';
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/myshangjiDetail?momentId='+this.momentId} 
                                    });
                                }else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }else if(this.rewardForm.payType==3){//余额
                            myselfPayway(data).then(res => {
                                if (res.code === 200) {
                                    this.$message.success('打赏成功！');
                                    this.rewardDialog = false;
                                    this.momentsInfoDetail();
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/myshangjiDetail?momentId='+this.momentId} 
                                    });
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }
                    }
                });
            },
            flushCom:function(){
                //router是路由实例,例如:var router = new Router({})
                //router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)
                this.$router.go(0);  
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
        //从路由获取ID
        created: function() {
            this.momentId = this.$route.query.momentId;
        },
        mounted() {
            this.momentsInfoDetail();
            this.getCommentInfoListLim();
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.curUserId = infoDatas.id;
            }
        },
        components: {
            BreadcrumbMult
        },
    }
</script>
<style>
.commentFormWrap .el-textarea__inner{
    height: 80px;
    background: #eeeeee;
}
.reCommonDialog .el-textarea__inner{
    height: 80px;
}
.rewardDialog .el-radio__input{
    position: relative;
    top: -22px;
}
.rewardDialog .yePay .el-radio__input{
    top: 0;
}
.rewardDialog .el-radio.yePay{
    position: relative;
    top: -23px;
}
.rewardDialog .top .el-radio-button__inner{
    padding: 12px 24px;
}
.rewardDialog .el-dialog__body {
    padding: 30px 20px 0;
    color: #606266;
    font-size: 14px;
}
</style>

<style lang="less" scoped>
.momentInfoWrap{
    margin-top: 45px;
    .left{
        width: 768px;
        min-height: 300px;
        position: relative;
        .top{
            width:100%;
            padding: 30px;
            background:#fff;
            .head-info{
                position: relative;
                border-radius: 6px;
                height: 116px;
                width:320px;
                margin-right: 20px;
                background:url('./../../assets/businessRoad/headInfoBg.png') no-repeat center right;
                .head-info-img{
                    width:100px;
                    height: 100px;
                    border-radius: 50%;
                    border:4px solid #ff9933;
                    margin-right: 20px;
                }
                .head-info-name{
                    max-width: 170px;
                    display: inline-block;
                    font-size:26px;
                    height: 100%;
                    box-sizing: border-box;
                    padding-top:20px;
                    vertical-align: top;
                }
                p.head-info-intro{
                    position: absolute;
                    left: 130px;
                    top: 65px;
                    color: #333;
                    font-size: 16px;
                    margin-top: 10px;
                    span.fSpan {
                        color: #339966;
                        margin-right: 5px;
                    }

                }              
            }
            .road-active{ 
                font-size:20px;
                color:#677b90;    
                padding-top:30px;        
                li{
                    width:110px;
                    text-align: center;
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
                    height: 64px;
                    line-height: 32px;
                    position: relative;
                    padding-left: 54px;
                    img {
                        vertical-align: bottom;
                        margin-right: 10px;
                        top: 6px;
                        left: 0;
                        position: absolute;
                    }
                    .require img {
                        margin-top: 2px;
                    }
                }
            }
        }
        .like{
            text-align: center;
            padding-left: 240px;
            a{
                float: left;
                display:block
            }
            .giveReward{
                position: relative;
                text-align: center;
                line-height: 42px;
                font-size: 16px;
                color: #ff3333;
                width: 104px;
                margin-left: 10px;
                img{
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
        .commentWrap{
            padding-left: 48px;
            margin-top: 20px;
        }
        .commentWrap{
           margin-top: 16px;
            .title{
                font-size: 16px;
                color: #666666;
                margin-bottom: 10px;
                img{
                    position: relative;
                    top: 2px;
                }
            }
        }
        .commentListWrap{
            li{
                padding: 25px 0 25px 68px;
                border-bottom: 1px solid #eee;
                position: relative;
                min-height: 72px;
                .defaultHead_Portraits{
                    position: absolute;
                    left: 0;
                    top: 24px;
                }
                .commentInfo{
                    font-size: 16px;
                    color: #999;
                    .comment_top{
                        color: #333333;
                        position: relative;
                        .time{
                            color: #677b90;
                            font-size: 14px;
                            margin-left: 15px;
                        }
                        img{
                            position: relative;
                            top: 2px;
                            right: 43px;
                        }
                    }
                    .comment_con{
                        line-height: 30px;
                    }
                }
            }
        }
    }
    .right{
        width:403px;
        border-radius: 6px;
        padding: 30px;
        background: #f9f9f9;
        min-height: 300px;
        position: relative;
        .title{
            font-size: 18px;
            color: #333;
        }
        .botWrap {
            font-size: 16px;
            color: #666;
            margin-top: 15px;
            &>div {
                height: 64px;
                line-height: 32px;
                position: relative;
                padding-left: 54px;
                &:last-child{
                    // margin-top: 22px;
                }
                img {
                    vertical-align: bottom;
                    margin-right: 10px;
                    top: 6px;
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