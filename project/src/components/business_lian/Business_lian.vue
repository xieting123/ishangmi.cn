<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix shanglian">
           <div  class="business-love_left lt">
               <div class="clearfix serchCont">
                    <el-form ref="form" :model="form" class="lt">
                        <el-input v-model="form.keywords" placeholder="请输入关键词搜索商恋"></el-input>
                    </el-form>
                    <div class="searchRight lt" @click="btnSearch()">搜&nbsp;索</div>
                </div>
                <ul class="screeningLove">
                    <li class="loveRegion clearfix">
                        <div class="region-key lt">地区</div>
                        <ul :class="isHover===false?'regin-valve lt clearfix provincesWrap':'regin-valve lt clearfix provincesWrap on'">
                            <li class="lt"  v-for="(item,index) in provinces" v-bind:key="item.index" v-on:click="searchLove1(index,item.id)" :class="{selectColor:line1===index}">
                                <a href="javascript:;" :data-id="item.id">{{item.provinceName}}</a>
                            </li>
                            <li class="showProvincesMore"><a href="javascript:;" @click="showProvincesMore">{{isHover===false?'更多>>':'收起'}}</a></li>
                        </ul>
                    </li>
                    <li class="loveRegion clearfix" v-if="isCityList">
                        <div class="region-key lt">城市</div>
                        <ul class="regin-valve lt clearfix cityListWrap">
                            <li class="lt"  v-for="(items,index) in cityList" v-bind:key="items.index" v-on:click="searchLove2(index,items.id)" :class="{selectColor:line2===index}">
                            <a href="javascript:;" :data-id="items.id">{{items.cityName}}</a>
                            </li>
                        </ul>
                    </li>
                    <li class="loveRegion clearfix" style="display:none;">
                        <div class="region-key lt">行业</div>
                        <ul class="regin-valve lt clearfix">
                            <li class="lt"  v-for="(items,index) in tradeList" v-bind:key="items.index" v-on:click="searchLove3(index,items.id)" :class="{selectColor:line3===index}">
                            <a href="javascript:;" :data-id="items.id">{{items.tradeName}}</a>
                            </li>
                        </ul>
                    </li>
                    <li class="loveRegion clearfix">
                        <div class="region-key lt">性别</div>
                        <ul class="regin-valve lt clearfix">
                            <li class="lt"  v-for="(items,index) in sex" v-bind:key="items.index" v-on:click="searchLove5(index,items.type)" :class="{selectColor:line5===index}">
                                <a href="javascript:;" :data-id="items.type">{{items.name}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                 <ul class="searchList clearfix" v-loading="loading">
                    <li class="lt" v-for="item in listData" v-bind:key="item.key">
                        <div class="serchItem">
                            <div class="isAdWrap"><img src="./../../assets/common/ad.png" alt="" width="70" v-if="item.isAd"></div>
                            <router-link class="linkTo" :to="{ name: 'MemberPersonCenter', query: {userId:item.id}}">
                                <img :src="item.avatar" width="252" height="252"/>
                            </router-link>
                            <!-- <div class="defaultHead_Portraits">
                                <router-link class="linkTo" :to="{ name: 'MemberPersonCenter', query: {userId:item.id}}">
                                <img :src="item.avatar"/>
                                </router-link>
                            </div> -->
                            <div class="serch-name">
                                {{item.nickname}}
                                <img src="./../../assets/personCenter/pesonNameAuthentication.png" v-if="item.verifyStatus===4"/>
                            </div>
                            <div class="serch-orgin">{{item.cityName?item.cityName:'无'}}</div>
                            <div class="serch-info">
                                <i v-if="item.height">{{item.height===-1?0:item.height}}cm</i>
                                <i v-if="item.age">{{item.age}}岁</i>
                                <i v-if="item.sex">{{item.sex===1?'男':'女'}}</i>
                            </div>
                            <div class="serch-btn">
                                <a href="javascript:;" class="btnDanger"  @click="accountsLike(item.id,item.likeType)" v-if="item.likeType===0||item.likeType===-1">关注</a>
                                <a href="javascript:;" class="btnDanger"  @click="accountsCancelLike(item.id)" v-if="item.likeType===2" style="color: #999;text-decoration: none;background:none;border: 1px solid #eee;">已关注</a>
                                <a href="javascript:;" class="btnDanger"  @click="accountsCancelLike(item.id)" v-if="item.likeType===4" style="color: #999;text-decoration: none;background:none;border: 1px solid #eee;">互相关注</a>
                            </div>
                        </div>
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
           <div class="business-love_right rt">
                <div class="loveList-title">推荐商恋</div>
                <div style="color:#999; text-indent:40px;" v-if="this.recommend.length===0">暂无推荐</div>
                <ul class="loveList-rt">
                    <li v-for="item in recommend" v-bind:key="item.key">
                        <router-link class="linkTo" :to="{ name: 'MemberPersonCenter', query: {userId:item.id}}">
                        <dl class="clearfix">
                            <dt class="lt">
                                <!-- <img src="./../../assets/personCenter/backListHead.png"> -->
                                <div class="defaultHead_Portraits">
                                <img :src="item.avatar"/>
                                </div>
                            </dt>
                            <dd class="lt">
                                <div class="loveList-rt-name">{{item.nickname}}<i></i></div>
                                <div class="loveList-rt-id">
                                    ID： {{item.id}}
                                </div>
                                <div class="loveList-rt-info">
                                    {{item.cityName}}<i v-if="item.height || item.age">|</i>{{item.height===-1?0:item.height}}cm 
                                    <span v-if="item.age">{{item.age}}岁</span>
                                </div>
                            </dd>
                        </dl>
                        </router-link>
                    </li>
                </ul>
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
    import {getSLianListLim,getSLianRecommend,getSLianSelection,accountsLike,accountsCancelLike} from '@/api/api';
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[],
                recommend:[],
                line1:null,
                line2:null,
                line3:null,
                line5:null,
                isHover:false,
                isCityList:false,
                provinces:[],
                cityList:[],
                tradeList:[],
                identityList:[],
                sex:[],
                form: {
                    keywords: '',
                    provinceId:'',
                    tradeId:'',
                    sex:''
                },
                loading:true
            }
        },
        methods: {
            showProvincesMore() {
                if(this.isHover){
                    this.isHover = false;
                }else{
                    this.isHover = true;
                }
            },
            searchLove1(index,id) {
                if(index !== this.line1){
                    this.line1 = index;
                    this.line2 = null;
                    this.isCityList = true;
                    this.form.provinceId = id;
                    this.form.cityId = '';
                    this.form.keywords = '';
                }else{
                    this.line1 = null;
                    this.form.provinceId='';
                }
                var vm = this;
                var index = parseInt(this.form.provinceId);
                this.provinces.forEach(function(item){
                    if(index == item.id){
                        vm.cityList = item.cityList;
                    }
                });
                this.getSLianListLim(1);
            },
            searchLove2(index,id) {
                if(index !== this.line2){
                    this.line2 = index;
                    this.form.cityId = id;
                    this.form.keywords = '';
                }else{
                    this.line2 = null;
                    this.form.cityId = '';
                }
                this.getSLianListLim(1);
            },
            searchLove3(index,id) {
                if(index !== this.line3){
                    this.line3 = index;
                    this.form.tradeId = id;
                    this.form.keywords = '';
                }else{
                    this.line3 = null;
                    this.form.tradeId = '';
                }
                this.getSLianListLim(1);
            },
            searchLove5(index,id) {
                if(index !== this.line5){
                    this.line5 = index;
                    this.form.sex = id;
                    this.form.keywords = '';
                }else{
                    this.line5 = null;
                    this.form.sex = '';
                }
                this.getSLianListLim(1);
            },
             //获取查询条件
            getSLianSelection() {
                this.loading = true;
                getSLianSelection().then(res => {
                    if (res.code === 200) {
                        // console.log(res)
                        this.provinces = res.result.regionList;
                        this.tradeList = res.result.tradeList;
                        this.identityList = res.result.identityList;
                        this.sex = res.result.sex;
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
            handleCurrentChange(val) {
                this.loading = true;
                this.getSLianListLim(val);
            },
            //按钮搜索
            btnSearch() {
                this.line1 = null;
                this.line2 = null;
                this.line3 = null;
                this.line5 = null;
                this.form.provinceId = '';
                this.form.cityId = '';
                this.form.tradeId = '';
                this.form.sex = '';
                this.getSLianListLim(1);
            },
            //商恋（分页，搜索）
            getSLianListLim(pageNum){
                let keywords = this.form.keywords;
                let data = {
                    keyword:keywords,
                    provinceId:this.form.provinceId,
                    cityId:this.form.cityId,
                    tradeId:this.form.tradeId,
                    sex:this.form.sex,
                    pageNum:pageNum,
                    pageSize:6
                }
                getSLianListLim(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        if(res.result.list.length){
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                        }else{
                            this.$message({
                                message: '未检索到相关数据',
                                type: 'warning'
                            });
                        }
                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //商恋推荐
            getSLianRecommend(){
                // let data = {
                //     keyword:'商务型',
                //     provinceId:'1',
                //     cityId:'1',
                //     tradeId:'1',
                //     sex:0,
                //     pageNum:1,
                //     pageSize:10
                // }
                getSLianRecommend().then(res => {
                    if (res.code === 200) {
                        if(res.result.length){
                            this.recommend = res.result;
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
            //关注
            accountsLike(userId,likeType) {
                let data = {
                    userId:userId
                }
                if(likeType=== -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/business_lian'}
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.getSLianListLim(1);
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
            },
            //取消关注
            accountsCancelLike(userId) {
                let data = {
                    userId:userId
                }
                accountsCancelLike(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('成功取消关注！');
                        this.getSLianListLim(1);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
        },
        mounted() {
            this.getSLianSelection();
            this.getSLianListLim();
            this.getSLianRecommend(1);
        }
    }
</script>
<style>
.shangdao .el-form{
    width:70%;
    position: relative;
    margin: 0 auto;    
}
    .shanglian .el-input__inner{
        width:685px;
        height:60px;
        font-size: 18px;
        padding-left:52px;
    }
    .shanglian .el-input__inner:focus{
         border-color:#ff3333;
     }
    .shanglian .el-input::after{
        position: absolute;
        top:15px;
        left:15px;
        content: "";
        width:24px;
        height: 26px;
        background: url('./../../assets/businessLove/searchIcon.png')
    }
</style>

<style lang="less" scoped>
.main{
    padding-top:60px;
}
.business-love_left{
    width:70%;
    border-right:1px solid #eeeeee;
    padding-right:30px;
    margin-top:8px;
    .searchList{
        margin-top:30px;
        margin-right:-26px;
        min-height: 320px;
        li{
             margin-right: 26px;
            margin-bottom:30px;
            .serchItem{
            color:#333;
            width:252px;
            // height: 300px;
            border-radius: 7px;
            background-color:#f9f9f9;
            text-align: center;
            box-sizing: border-box;
            padding:20px;  
            position: relative;
                .serch-photo{
                    width:92px;
                    height: 92px;
                    border:4px solid #ff6633;
                    border-radius: 50%;
                } 
                .serch-orgin{
                    width:100%;
                    min-height: 21px;
                    background:url('./../../assets/businessLove/serchNameBg.png') no-repeat center center;
                }
                .serch-name{
                    width:100%;
                    box-sizing: border-box;
                    padding-left:10px;
                    line-height: 46px;
                    font-size:18px;
                    img{
                        width:18px;
                        height: 18px;
                        padding-left:6px;
                    }
                }   
                .serch-info{
                    padding:10px 0;
                    i{
                        font-style:normal;
                    }
                }    
                .serch-btn{
                    .btnDanger{
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        font-size: 14px;
                    }
                } 
            }
        }
       
    }
    .screeningLove{
        width:100%;
        margin-top:40px;
        font-size:16px;           
        &>li{
            margin-bottom:20px;
            // &:last-child{
            //     .region-key{
            //         letter-spacing:0;
            //         min-width: 96px;
            //     }
            // }
        }
        .region-key{
            letter-spacing:2em;
            color:#999999;
        }
        .regin-valve{
            li{
                margin-right:30px; 
                a{
                    color:#666;
                    &:hover{
                        color:#ff3333;
                        text-decoration:none;
                    }
                }
                &.selectColor{
                    a{
                        color:#ff3333;
                    }
                }
            }
        }
    }
    .serchCont{
        position: relative;      
    }
    .searchRight {
        position: absolute;
        right:0;
        top: 0;
        width: 128px;
        height: 60px;
        font-weight: 100;
        text-align: center;
        line-height: 60px;
        font-size: 24px;
        color: #ffffff;
        background: #fa5552;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        &:hover {
            background: #f5625f;
        }
    }
}
    .business-love_right{
        width:328px;
       .loveList-title{
            color:#ea141c; 
            font-size:24px;  
            margin-bottom:20px;         
        }
        .loveList-rt{
           width:322px;
            li{
                width:100%;
                height: 147px;
                border-radius: 10px;
                box-sizing: border-box;
                padding:24px;
                background:#f9f9f9;
                margin-bottom:16px;
            }
            dt{
                padding-right:20px;
                padding-left:10px;
            }
            dd{
                .loveList-rt-name{
                   font-size:18px;
                   color:#333;
                    padding-top:10px;
                    max-width: 136px;
                    overflow: hidden;
                }
                .loveList-rt-id{
                    width:100%;
                    color:#999999;
                    font-size: 14px;
                    padding-bottom:10px;
                    border-bottom: 1px solid #999;
                    margin-bottom:10px;
                }
                .loveList-rt-info{
                    color:#339966;
                    i{
                        font-style: normal;
                        padding:0 5px;
                        color:#999;
                    }
                }
            }
        }
    }
    .defaultHead_Portraits{
        width: 96px;
        height: 96px;
        margin: 0 auto;
    }
</style>