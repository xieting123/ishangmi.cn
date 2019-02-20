<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader> 
        </div>
        <div class="main layoutWrap clearfix" style="min-height: 76px;">
        <template>
            <Breadcrumb firstName="首页" secondName="个人中心" firstLink="/" secondLink='/personCenter/perInfo' thirdName="完善商恋资料"></Breadcrumb>
        </template>
        </div>
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <h2 class="title">完善商恋资料</h2>
                    <div class="lovaTitle clearfix">
                        <div class="item on">
                            <a href="javascript:;">择偶条件</a>
                        </div>
                        <div class="item">
                            <router-link :to="{ name: 'BusinessLove_hobby', params: {}}">兴趣爱好</router-link>
                        </div>
                    </div>
                    <el-form ref="form" :model="form" :rules="rules" label-width="160px" class="bussessloveWrap">
                        <div class="loveWrapLimit">
                        <el-form-item label="性别" class="sexSel">
                            <template>
                                <el-radio v-model="form.sex" label=1>男</el-radio>
                                <el-radio v-model="form.sex" label=0>女</el-radio>
                            </template>
                        </el-form-item>
                        <!--年龄  -->
                        <el-form-item label="年龄" prop="ageStart" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.ageStart" placeholder="请选择年龄">
                                <el-option
                                v-for="item in agesData"
                                :key="item.index"
                                :label="item"
                                :value="item">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="--" label-width="50px" prop="ageEnd" class="inlineForm_love inlineForm_second">
                            <template>
                                <el-select v-model="form.ageEnd" placeholder="请选择年龄">
                                <el-option
                                v-for="item in agesData"
                                :key="item.index"
                                :label="item"
                                :value="item">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <!-- 身高 -->
                        <el-form-item label="身高" prop="heightStart" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.heightStart" placeholder="请选择身高">
                                <el-option
                                v-for="item in heightData"
                                :key="item.index"
                                :label="item"
                                :value="item">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="--" label-width="50px" prop="heightEnd" class="inlineForm_love inlineForm_second">
                            <template>
                                <el-select v-model="form.heightEnd" placeholder="请选择身高">
                                <el-option
                                v-for="item in heightData"
                                :key="item.index"
                                :label="item"
                                :value="item">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <!-- 所在地区 -->
                        <el-form-item label="所在地区" prop="provinceId" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.provinceId" placeholder="请选择省"  @change="changeProvinces">
                                <el-option
                                v-for="item in provinces"
                                :key="item.id"
                                :label="item.provinceName"
                                :value="item.id"  :change="changeProvinces">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="--" label-width="50px" prop="cityId" class="inlineForm_love inlineForm_second">
                            <template>
                                <el-select v-model="form.cityId" placeholder="请选择市">
                                <el-option
                                v-for="item in cities"
                                :key="item.id"
                                :label="item.cityName"
                                :value="item.id">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="描述" prop="description" class="description">
                            <el-input type="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                        </div>
                        <el-form-item class="borderFormDivision">
                            <div class="btnGroups">
                                <a href="javascript:;" class="btnPlain lt">取消</a>
                                <a href="javascript:;" class="btnDanger lt" @click="onSubmit('form')">保存</a>
                            </div>
                        </el-form-item>
                    </el-form>
                 </div>
             </div>
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <!-- <mySideBar></mySideBar> -->
    </div>
</template> 
<script>
    import Breadcrumb from './Breadcrumb'
    import {updateMateSelection,updateMateInteresting,getSLianSelection,getMateSelectionByUserId} from '@/api/api';
    export default {
        data() {
            return {
                agesData:[],
                heightData:[],
                provinces:[],
                cities:[],
                form: {
                    sex:"1",
                    ageStart:'',
                    ageEnd:'',
                    heightStart:'',
                    heightEnd:'',
                    provinceId:'',
                    cityId:'',
                    description:''
                },
                rules: {
                    activity: [
                        { required: true, message: '请输您喜欢的活动', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    food: [
                        { required: true, message: '请输您喜欢的食物', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    sports: [
                        { required: true, message: '请输您喜欢的体育运动', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    place: [
                        { required: true, message: '请输您喜欢的地方', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    music: [
                        { required: true, message: '请输您喜欢的音乐', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    pet: [
                        { required: true, message: '请输您喜欢的宠物', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    video: [
                        { required: true, message: '请输您喜欢的影视节目', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                },
                labelPosition: 'left',
            }
        },
        methods: {
            //设置年龄范围
            getAgeRange() {
                let vm = this;
                for(let i=1; i<=100; i++){
                    vm.agesData.push(i);
                }
            },
            //设置身高范围
            getHeightRange() {
                let vm = this;
                for(let i=100; i<=240; i++){
                    vm.heightData.push(i);
                }
            },
            //获取省-市-行业-性别
            getSLianSelection(){
                var vm = this;
                getSLianSelection().then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        vm.provinces = res.result.regionList;
                        this.getMateSelectionByUserId();//省数据加载完毕更新信息
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
            //获取市地区列表
            changeProvinces() {
                var vm = this;
                var index = parseInt(this.form.provinceId);
                this.provinces.forEach(function(item){
                    if(index == item.id){
                        vm.cities = item.cityList;
                    }
                });
            },
            onSubmit(formName) {
                let data = this.form;
                updateMateSelection(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        this.$message({
                            message: "修改商恋择偶条件成功",
                            type: 'success'
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
            },
            //更新商恋信息
            getMateSelectionByUserId() {
                //获取用户ID
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getMateSelectionByUserId(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        if(res.result){
                            this.form = res.result;
                            this.form.sex = this.form.sex.toString();//转换性别
                            var vm = this;
                            var index = this.form.provinceId;
                            this.provinces.forEach(function(item){//城市转换
                                if(index == item.id){
                                    vm.cities = item.cityList;
                                }
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
        },
        components: {
            Breadcrumb
        },
        mounted () {
            this.getAgeRange();
            this.getHeightRange();
            this.getSLianSelection();
        }
    }
</script>

<style>
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
    line-height: 50px;
}
.pageWrap .el-form .el-input__inner{
    height: 50px;
    line-height: 50px;
}
.pageWrap .el-form .el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .bussessloveWrap .el-form-item.sexSel{
    margin-bottom: 20px;
}
.pageWrap .bussessloveWrap .borderFormDivision{
    padding-top: 30px;
    margin-top: 42px;
    border-top: 1px dotted #b5c8db;
}
.pageWrap .bussessloveWrap .el-form-item{
    margin-bottom: 30px;
}
.el-form .loveWrapLimit .el-form-item__content>label{
    position: relative;
    top: 4px;
}
.el-form .loveWrapLimit .inlineForm_love{
    display: inline-block;
}
.el-form .loveWrapLimit .inlineForm_second{
    width: 250px;
}
.el-form .loveWrapLimit .inlineForm_love .el-form-item__label{
    width: 49px;
    padding: 0 16px;
}
.el-form .loveWrapLimit .description .el-textarea__inner{
    height: 150px;
}
</style>

<style lang="less" scoped>
.page-contain{
    background:#f2f2f2; 
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width: 1100px;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        border-style: solid;
        border-radius: 6px;
        background: #ffffff;
        -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
        box-shadow: 0px 2px 1px 0px #e4e7ed;
        margin-top: 30px;
        padding:30px 60px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        h2.title{
            font-size: 24px;
            color: #666;
            font-weight: 500;
            position: relative;
            &::after{
                content: "";
                position: absolute;
                width:21px;
                height: 21px;
                left:-29px;
                bottom:7px;
                background-image: url('./../../assets/index/publish.png');
            }
        }
        .lovaTitle{
            width: 380px;
            margin: 30px auto 80px;
            .item{
                width: 50%;
                float: left;
                text-align: center;
                position: relative;
                a{
                    font-size: 24px;
                    color: #999;
                    &:hover{
                        text-decoration: none;
                        color: #666;
                    }
                }
            }
            .item.on{
                position: relative;
                &::after{
                    position: absolute;
                    width: 152px;
                    height: 1px;
                    left: 22px;
                    bottom: -19px;
                    background: #ff3333;
                    content: '';
                }
                a{
                    color: #ff3333;
                    &:hover{
                        text-decoration: none;
                        color: #ff3333;
                    }
                }
            }
        }
        .loveWrapLimit{
            width: 615px;
            margin: 0 auto;
        }
        .btnGroups{
            width: 300px;
            left: 50%;
            position: relative;
            margin-left: -150px;
            a:last-child {
                margin-left: 16px;
            }
        }
    }
} 
</style>