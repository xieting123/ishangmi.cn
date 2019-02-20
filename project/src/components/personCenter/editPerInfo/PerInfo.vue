<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                    <Breadcrumb firstName="首页" secondName="个人中心" thirdName="个人信息" firstLink="/" secondLink="/personCenter"></Breadcrumb>
            </template> 
            <div class="main">
                <div class="leftWrap">
                    <el-row class="tac">
                        <el-col class="tacInset">
                            <el-menu default-active="/personCenter/perinfo" class="el-menu-vertical-left" :router=true>
                                <el-menu-item index="/personCenter/perinfo">
                                    <span slot="title">个人信息</span>
                                </el-menu-item>
                                <el-menu-item index="/personCenter/address">
                                    <span slot="title">收货地址</span>
                                </el-menu-item>
                                <el-menu-item index="/personCenter/modifyPassword">
                                    <span slot="title">修改密码</span>
                                </el-menu-item>
                                <el-menu-item index="/personCenter/modifyPhone">
                                    <span slot="title">修改手机号</span>
                                </el-menu-item>
                                <el-menu-item index="/personCenter/blacklist">
                                    <span slot="title">黑名单</span>
                                </el-menu-item>
                                <el-menu-item index="/personCenter/skillManager">
                                    <span slot="title">身份管理</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </div>
                <div class="rightWrap">
                    <div class="uploadPortraits clearfix">
                        <div class="uploadArea lt">
                            <!-- <div class="addPic">
                                点击添加图片
                            </div> -->
                            <el-upload
                            :action="importFileUrl"
                            list-type="picture-card"
                            accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove" 
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :auto-upload="false" 
                            ref="upload" 
                            name="avatarFile" 
                            :with-credentials="true">
                                <i class="el-icon-plus" slot="trigger"></i>
                                <a href="javascript:;" class="btnDanger uploadBtn" @click="uploadAvatar">上传头像</a>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="uploadOpera lt">
                            <p>上传的头像会自动生成头像缩略图，您也可 以拖动大图的裁减区域，调整缩图内容。 </p>
                            <p>支持JPG、GIF、PNG等图片格式 推荐尺寸：180*180像素</p>
                        </div>
                    </div>
                    <div class="perInfoWrap">
                        <el-form :label-position="labelPosition" label-width="100px" :inline="true" :model="form" :rules="rules" ref="form">
                            <el-form-item label="昵称" prop="nickname">
                                <el-input v-model="form.nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="真实姓名" prop="name" v-if="form.name">
                                <el-input v-model="form.name" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="真实姓名" prop="name" v-if="!form.name">
                                <router-link :to="{ name: 'Identification', params: {}}" style="font-size:16px;color: #ff3333;">去实名认证吧</router-link>
                            </el-form-item>
                            <el-form-item label="性别">
                                <!-- <el-input v-model="form.sex"></el-input> -->
                                <template>
                                    <el-radio v-model="form.sex" label=1>男</el-radio>
                                    <el-radio v-model="form.sex" label=0>女</el-radio>
                                </template>
                            </el-form-item>
                            <!-- <el-form-item label="身高" prop="height">
                                <el-input v-model="form.height"></el-input>
                            </el-form-item>
                            <el-form-item label="体重" prop="weight">
                                <el-input v-model="form.weight"></el-input>
                            </el-form-item> -->
                            <el-form-item label="身高" prop="height">
                                <template>
                                    <el-select v-model="form.height" placeholder="请选择身高">
                                    <el-option
                                    v-for="item in heightData"
                                    :key="item.index"
                                    :label="item"
                                    :value="item">
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            <el-form-item label="体重" prop="weight">
                                <template>
                                    <el-select v-model="form.weight" placeholder="请选择体重">
                                    <el-option
                                    v-for="item in weightData"
                                    :key="item.index"
                                    :label="item"
                                    :value="item">
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            <el-form-item label="所属行业" prop="tradeId">
                                <template>
                                    <el-select v-model="form.tradeId" placeholder="请选择行业">
                                    <el-option
                                    v-for="item in trades"
                                    :key="item.id"
                                    :label="item.tradeName"
                                    :value="item.id">
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            <el-form-item label="所在地区" prop="provinceId">
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
                            <el-form-item label="所在地区" prop="cityId">
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
                            <!-- <el-form-item label="职位" prop="position">
                                <el-input v-model="form.position"></el-input>
                            </el-form-item> -->
                            <el-form-item label="生日" prop="birthday">
                                <template>
                                <el-date-picker
                                v-model="form.birthday"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                                </template>
                            </el-form-item>
                            
                            <!-- <el-form-item label="公司" prop="company" class="company">
                                <el-input v-model="form.company"></el-input>
                            </el-form-item> -->
                            <!-- <div class="frontLabel">
                                <img v-show="labelFlag1" @click="switchFlag" src="../../../assets/personCenter/print.png" alt="" width="25">
                                <img v-show="labelFlag2" @click="switchFlag" src="../../../assets/personCenter/printAgreed.png" alt="" width="25">
                                <el-form-item label="身份" prop="identityType">
                                    <el-select v-model="form.identityType" placeholder="请选择">
                                        <el-option label="技能" value="shanghai"></el-option>
                                        <el-option label="非技能" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="frontLabel">
                                <img v-show="labelFlag3" @click="switchFlag1" src="../../../assets/personCenter/print.png" alt="" width="25">
                                <img v-show="labelFlag4" @click="switchFlag1" src="../../../assets/personCenter/printAgreed.png" alt="" width="25">
                                <el-form-item label="技能达人" prop="skill" class="skill">
                                    <ul class="clearfix">
                                        <li class="btn1" v-show="skillFlag" data-index="1">律师</li>
                                        <li class="btn2" v-show="skillFlag" data-index="2">商旅</li>
                                        <li class="btn3" v-show="skillFlag" data-index="3">商模</li>
                                        <li class="btn4" v-show="skillFlag" data-index="4">商秘</li>
                                        <li class="btn5" v-show="skillFlag" data-index="5">商恋</li>
                                        <li class="btn6" v-show="skillFlag" data-index="6">商约</li>
                                        <li class="addBtn" @click="skilldialogVisible = true">+</li>
                                    </ul>
                                </el-form-item>
                            </div> -->
                            <el-form-item label="商恋" class="slInfo" prop="isMate">
                                <el-switch v-model="form.isMate"></el-switch>
                                <router-link :to="{ name: 'BusinessLove_mate', params: {}}">完善商恋资料</router-link>
                            </el-form-item>
                            <!-- 新加工作信息 -->
                            <el-form-item label="工作信息" prop="birthday" class="workInfoWrap">
                                <div class="workInfo">
                                    <ul class="workInfoList">
                                        <li v-for="item in workInfoData" v-bind:key="item.key"> 
                                            <a href="javascript:;" class="delWorkInfo" @click="delWorkInfo(item)"></a> 
                                            {{item.company}} &nbsp;&nbsp;{{item.position}}
                                        </li>
                                    </ul>
                                    <p>
                                        <a href="javascript:;" class="addWorkInfo" @click="addWorkInfoDialog=true">
                                            添加<img src="../../../assets/personCenter/add.png" width="16" alt="">
                                        </a>
                                    </p>
                                </div>
                            </el-form-item>
                            <el-form-item label="自我介绍" prop="aboutme" class="aboutme">
                                <el-input type="textarea" v-model="form.aboutme"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="个人相册" prop="myPic" class="myPic">
                                <a href="/">
                                    <img src="../../../assets/personCenter/selfPic.png" alt="" width="90">
                                </a>
                            </el-form-item> -->
                            <el-form-item class="submitInfoBtnWrap">
                                <el-button class="submitInfoBtn" @click="profileSubmit('form')">保存</el-button>
                            </el-form-item>
                        </el-form>

                        <!-- 技能达人弹窗 -->
                        <!-- <el-dialog
                        title=""
                        :visible.sync="skilldialogVisible"
                        width="634px"
                        class="skilldialog">
                            <el-form :model="dialogform" :rules="dialogRules" ref="dialogform">
                            <div class="skillItem">
                                <div class="title">选择身份</div>
                                <ul class="clearfix">
                                    <li class="btn1" data-index="1">律师</li>
                                    <li class="btn2" data-index="2">商旅</li>
                                    <li class="btn3" data-index="3">商模</li>
                                    <li class="btn4" data-index="4">商秘</li>
                                    <li class="btn5" data-index="5">商恋</li>
                                    <li class="btn6" data-index="6">商约</li>
                                </ul>
                            </div>
                            <div class="skillItem" style="margin-top:30px;">
                                <div class="title" style="margin-bottom:22px;">技能介绍</div>
                                <el-form-item prop="skillIntro" class="skillIntro">
                                    <el-input type="textarea" v-model="dialogform.skillIntro" placeholder="请输入举报的详细内容，已便我们进一步核实"></el-input>
                                </el-form-item>
                            </div>
                            <div class="skillItem">
                                <el-form-item class="skillPic">
                                    <a href="">
                                        <img src="../../../assets/personCenter/selfPic.png" alt="" width="90">
                                    </a>
                                     <p>技能相册</p>
                                </el-form-item>
                            </div>
                            <div class="skillItem" style="text-align:center;">
                                 <el-form-item>
                                    <el-button @click="skilldialogVisible = false" class="addbtn add_cancel">取 消</el-button>
                                    <el-button @click="skilldialogVisible = false" class="addbtn add_submit">提 交</el-button>
                                </el-form-item>
                            </div>
                            </el-form>
                        </el-dialog> -->
                    </div>
                </div>    
            </div>                   
        </div>
        <!-- 添加工作信息弹窗 -->
        <el-dialog title="" :visible.sync="addWorkInfoDialog">
            <el-form :model="workInfoform" :rules="workInfoRules" ref="workInfoform">
                <el-form-item label="公司" :label-width="workInfoformLabelWidth" prop="company">
                    <el-input v-model="workInfoform.company" autocomplete="off" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="职位" :label-width="workInfoformLabelWidth" prop="position">
                    <el-input v-model="workInfoform.position" autocomplete="off" placeholder="请输入职位名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addWorkInfoDialog = false">取 消</el-button>
                <el-button type="primary" @click="addWorkInfo('workInfoform')">确 定</el-button>
            </div>
       </el-dialog>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from '../Breadcrumb'
    import {getProfileByUserID,uploadAvatar, getAreaList,getTradeList,profileSubmit,addCompanyAndPosition,delCompanyAndPosition} from '../../../api/api';
    export default {
        data() {
            return {
                labelPosition: 'left',
                dialogImageUrl: '',
                importFileUrl:uploadAvatar(),
                dialogVisible: false,
                labelFlag1: true,
                labelFlag2: false,
                labelFlag3: true,
                labelFlag4: false,
                skillFlag:false,
                skilldialogVisible:false,
                provinces:[],
                cities:[],
                trades:[],
                weightData:[],
                heightData:[],
                form: {
                    nickname:'',
                    name: '',
                    sex:"1",
                    height:'',
                    weight:'',
                    tradeId:'',
                    provinceId:'',
                    cityId:'',
                    // position:'',
                    // company:'',
                    aboutme:'',
                    isMate:false,
                    birthday:'',
                },
                dialogform: {
                    name: '',
                    region: '',
                    type: ''
                },
                rules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    // name: [
                    //     { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    //     { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    // ],
                    provinceId: [
                        { required: true, message: '请选择省份', trigger: 'change' }
                    ],
                    cityId: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    tradeId: [
                        { required: true, message: '请选择行业', trigger: 'change' }
                    ],
                    height: [
                        { required: true, message: '请输入身高', trigger: 'change' },
                        // {min: 2, max: 500, message: '长度在2到500个字符', trigger: 'blur' },
                    ],
                    weight: [
                        { required: true, message: '请输入体重', trigger: 'change' },
                        // {min: 2, max: 500, message: '长度在2到500个字符', trigger: 'blur' },
                    ],
                    // position: [
                    //     { required: true, message: '请输入职位', trigger: 'blur' },
                    //     {min: 1, max: 500, message: '长度在1到50个字符', trigger: 'blur' },
                    // ],
                    birthday: [
                        {required: true, message: '请选择生日', trigger: 'blur,change'}
                    ],
                    // company: [
                    //     { required: true, message: '请输入公司名称', trigger: 'blur' },
                    //     { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
                    // ],
                    aboutme: [
                        { required: true, message: '请输入自我介绍', trigger: 'blur' },
                        { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
                    ],
                },
                dialogRules: {
                    
                },
                addWorkInfoDialog: false,
                workInfoformLabelWidth: '80px',
                workInfoform:{
                    company: '',
                    position: '',
                },
                workInfoRules: {
                    company: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    position: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' },
                    ],
                },
                workInfoData:[]
            }
        },
        methods: {
             //设置体重范围
            getWeightRange() {
                let vm = this;
                for(let i=30; i<=120; i++){
                    vm.weightData.push(i);
                }
            },
            //设置身高范围
            getHeightRange() {
                let vm = this;
                for(let i=100; i<=240; i++){
                    vm.heightData.push(i);
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            switchFlag() {
                if(this.labelFlag1){
                    this.labelFlag1 = false;
                    this.labelFlag2 = true;
                }else{
                    this.labelFlag1 = true;
                    this.labelFlag2 = false;
                }
            },
            switchFlag1() {
                if(this.labelFlag3){
                    this.labelFlag3 = false;
                    this.labelFlag4 = true;
                }else{
                    this.labelFlag3 = true;
                    this.labelFlag4 = false;
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            uploadAvatar(){
                this.$refs.upload.submit();
            },
            uploadSuccess(res){
                console.log('上传成功');
                localStorage.setItem('perInfo',JSON.stringify(res.result));
                location.reload();
            },
            uploadError(){
                console.log('上传失败')
            },
            //获取省地区列表
            getAreaList(){
                var vm = this;
                getAreaList().then(res => {
                    var areaData = res.result;
                    vm.provinces = areaData;
                    this.getProfileByUserID();//省数据加载完毕更新信息
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
            //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    var tradeData = res.result;
                    vm.trades = tradeData;
                }, err => {
                    console.log(err)
                });
            },
            //根据用户ID获取用户信息
            getProfileByUserID() {
                //获取用户ID
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getProfileByUserID(data).then(res => {
                    if (res.code === 200) {
                        // console.log(res.result);
                        if(res.result){
                            this.form = res.result;
                            this.form.sex = this.form.sex.toString();//转换性别
                            this.form.isMate = this.form.isMate?true:false;
                            this.form.height =this.form.height.toString();
                            this.form.weight =this.form.weight.toString();
                            var vm = this;
                            var index = this.form.provinceId;
                            this.provinces.forEach(function(item){//城市转换
                                if(index == item.id){
                                    vm.cities = item.cityList;
                                }
                            });
                            this.workInfoData = res.result.companyPositionList;
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
            //提交个人信息
            profileSubmit(formName) {
                let vm = this;
                let data = {
                    nickname: this.form.nickname,
                    // name: this.form.name,
                    sex: parseInt(this.form.sex),
                    height: this.form.height,
                    weight: this.form.weight,
                    tradeId: this.form.tradeId,
                    provinceId: this.form.provinceId,
                    cityId: this.form.cityId,
                    // position: this.form.position,
                    // company: this.form.company,
                    aboutme: this.form.aboutme,
                    isMate: this.form.isMate?1:0,
                    birthday:this.form.birthday
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        profileSubmit(data).then(res => {
                            console.log(res)
                            if (res.code === 200) {
                                localStorage.setItem('perInfo',JSON.stringify(res.result));
                                this.$message({
                                    message: '修改资料成功',
                                    type: 'success'
                                });
                                setTimeout(function(){
                                    vm.$router.push('/personCenter');
                                },100);
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        }, err => {
                            console.log(err)
                        });
                    }
                });
            },
            showPerinfo() {
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                console.log(infoDatas)
                this.form.nickname = infoDatas.nickname;
                this.form.name = infoDatas.name;
                this.form.sex = infoDatas.sex.toString();
                this.form.height = infoDatas.height;
                this.form.weight = infoDatas.weight;
                this.form.trade = infoDatas.trade;
                this.form.province = infoDatas.provinceId;
                // this.form.city = infoDatas.cityId;
                // this.form.position = infoDatas.position;
                // this.form.company = infoDatas.company;
                this.form.aboutme = infoDatas.aboutme;
                this.form.isMate = infoDatas.isMate;
                this.form.birthday = infoDatas.birthday;
            },
            //添加工作信息
            addWorkInfo(formName) {
                let vm = this;
                let data = {
                    company: this.workInfoform.company,
                    position: this.workInfoform.position,
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addCompanyAndPosition(data).then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    message: '添加工作信息成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                            this.getProfileByUserID();
                            this.addWorkInfoDialog = false;
                        }, err => {
                            console.log(err)
                        });
                    }
                });
            },
            //删除工作信息
            delWorkInfo(item) {
                let data = {
                    id: item.id,
                };
                delCompanyAndPosition(data).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '删除工作信息成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.getProfileByUserID();
                }, err => {
                    console.log(err)
                });
            },
        },
        mounted() {
            this.getAreaList();
            this.getTradeList();
            this.getWeightRange();
            this.getHeightRange();
            // this.showPerinfo();
        },
        components: {
            Breadcrumb
        }
    }
</script>
<style>
.tacInset .el-menu{
    border: none;
}
.tacInset .el-menu-item{
    font-size: 18px;
    color: #666;
    background: none;
}
.tacInset .el-menu-item:hover{
    background: none;
    color: #999;
}
.tacInset .el-menu-item.is-active{
    color: #ff3333;
}
.tacInset .el-menu-item span{
    margin-left: 35px;
    position: relative;
}
.tacInset .el-menu-item.is-active span::after{
    position: absolute;
    display: block;
    width: 122px;
    height: 1px;
    background: #e74c3c;
    left: 0;
    bottom: -15px;
    content: '';
}
/* 上传图片 */
.rightWrap .el-upload--picture-card{
    width: 160px;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    background: #ecf0f1;
    border: 1px solid #cccccc;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -24px -80px;
}
.rightWrap .el-upload--picture-card:focus,.rightWrap .el-upload--picture-card:hover{
    border: 1px solid #cccccc;
}
.rightWrap .el-icon-plus:before{
    content: "点击添加图片";
    font-size: 18px;
    color: #999;
}
.rightWrap .el-form--inline .el-form-item{
    width: 48%;
    margin-bottom: 30px;
}
.rightWrap .el-input__inner{
    width: 215px;
    height: 48px;
    line-height: 48px;
}
.rightWrap .el-form--inline .company,.rightWrap .el-form--inline .myPic,.rightWrap .el-form--inline .aboutme{
    width: 100%;
}
.rightWrap .company .el-input__inner{
    width: 630px;
}
.rightWrap .aboutme .el-textarea__inner{
    width: 630px;
    height: 180px;
}
.rightWrap .aboutme .el-form-item__label{
    line-height: 180px;
}
.rightWrap .myPic .el-form-item__label{
    line-height: 90px;
}
.rightWrap .el-form--inline .el-form-item__label{
    font-size: 18px;
    color: #333;
}
.rightWrap .el-form--inline .submitInfoBtnWrap{
    width: 878px;
    height: 100px;
    border-top: 1px dotted #ddd;
    position: relative;
}
.rightWrap .el-form--inline .submitInfoBtnWrap .el-form-item__content{
    left: 50%;
    top: 50%;
    position: absolute;
    margin: -25px 0 0 -69px;
}
.skilldialog .el-dialog{
    padding: 0 75px;
}
.skillIntro .el-textarea__inner{
    height: 228px;
}
.rightWrap .uploadPortraits {
    position: relative;
}
.rightWrap .uploadPortraits .uploadBtn{
    position: absolute;
    left: 342px;
    top: 111px;
}
.rightWrap .uploadPortraits .el-upload-list__item{
    margin-top: 2px;
    margin-left: 71px;
    width: 170px;
    height: 170px;
    position: relative;
    z-index: 999;
}
.rightWrap .el-form--inline .el-form-item.workInfoWrap{
    width: 99%;
}
</style>

<style lang="less" scoped>
.main{
    margin-top: 22px;
    position: relative;
}
.leftWrap{
    width: 210px;
    position: absolute;
    left: 0;
    top: 0;
}
.rightWrap{
    margin-left: 210px;
    min-height: 780px;
    border-left: 1px solid #e6e6e6;
    padding: 42px 75px;
    // background: #eee;
    .uploadArea{
        border-width: 1px;
        border-color: rgb( 238, 238, 238 );
        border-style: solid;
        border-radius: 2px;
        background-color: rgb( 236, 240, 241 );
        width: 314px;
        height: 176px;
        position: relative;
    }
    .uploadOpera{
        margin-left: 30px;
        width: 489px;
        p{
            line-height: 28px;
        }
        p:first-child{
            font-size: 16px;
            color: #666;
            margin-top: 15px;
        }
        p:first-child+p{
            font-size: 14px;
            color: #999;
        }
        .uploadBtn{
            margin-left: 0px;
            margin-top: 15px;
        }
    }
    .perInfoWrap{
        margin-top: 50px;
        .frontLabel{
            position: relative;
            padding-left:36px;
            &>img{
                position: absolute;
                left: 0;
                top: 9px;
                cursor: pointer;
            }
            .skill{
                width: 100%;
                ul{
                    position: relative;
                    min-width: 420px;
                    &::before{
                        content: "（选择身份标签成为不同身份用户，最多添加三个）";
                        position: absolute;
                        color: #ff3333;
                        font-size: 14px;
                        bottom: -40px;
                        left: 0;
                    }
                    li{
                        font-size: 16px;
                        color: #fff;
                        border-radius: 6px;
                        // background: #49ac7e;
                        background: #4e72a4;
                        width: 96px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        float: left;
                        margin-right: 15px;
                        &.btn2{
                            background: #8cbeb2;
                        }
                        &.btn3{
                            background: #7e72b1;
                        }
                        &.btn4{
                            background: #d7b19e;
                        }
                        &.btn5{
                            background: #ff7f66;
                        }
                        &.btn6{
                            background: #00607f;
                        }
                        &.addBtn{
                            background:none;
                            border: 1px solid #ccc;
                            color: #999;
                            font-size: 40px;
                            cursor: pointer;
                            line-height: 32px;
                            &:hover{
                                color: #666;
                            }
                        }
                    }
                }
            } 
        }
        .slInfo{
            a{
                font-size: 16px;
                color: #ff3333;
                margin-left: 15px;
            }
        }
    }
    .submitInfoBtnWrap{
        .submitInfoBtn{
            background: #fff;
            width: 138px;
            height: 50px;
            font-size: 18px;
            color: #f56c6c;
            border: 1px solid #f56c6c;
            &:hover{
                background: #f56c6c;
                border-color: #f56c6c;
                color: #fff;
            }
        }
    }
    .skilldialog{
        .skillItem{
            .title{
                font-size: 18px;
                color: #333;
            }
            ul{
                margin-top: 6px;
                li{
                    font-size: 16px;
                    color: #fff;
                    border-radius: 6px;
                    // background: #49ac7e;
                    background: #4e72a4;
                    width: 96px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    float: left;
                    margin-right: 15px;
                    margin-top: 13px;
                    cursor: pointer;
                    &:hover{
                        opacity: 0.8;
                    }
                    &.btn2{
                        background: #8cbeb2;
                    }
                    &.btn3{
                        background: #7e72b1;
                    }
                    &.btn4{
                        background: #d7b19e;
                    }
                    &.btn5{
                        background: #ff7f66;
                    }
                    &.btn6{
                        background: #00607f;
                    }
                    &.addBtn{
                        background:none;
                        border: 1px solid #ccc;
                        color: #999;
                        font-size: 40px;
                        cursor: pointer;
                        line-height: 32px;
                        &:hover{
                            color: #666;
                        }
                    }
                }
            }
            .addbtn{
                font-size: 18px;
                color: #999;
                width: 140px;
                height: 50px;
                border-radius: 5px;
                &.add_submit{
                    color: #ff3333;
                    border: 1px solid #f56c6c;
                    margin-left: 18px;
                    &:hover{
                        background: #f56c6c;
                        color: #fff;
                    }
                }
            }
        }
        .skillPic{
            a{
                display: block;
            }
            p{
                line-height:16px; 
                width:90px; 
                text-align:center;
                position: relative;
                top: -5px;
            }
        }
    }
}
.workInfo{
    border: 1px solid #dcdfe6;
    width: 629px;
    .workInfoList{
        padding: 0 8px;
        li{
            a.delWorkInfo{
                width: 16px;
                height: 16px;
                border-radius: 100px;
                background: #e83323;
                display: inline-block;
                position: relative;
                top: 3px;
                margin-right: 4px;
                &::after{
                    position: absolute;
                    content: '';
                    width: 12px;
                    height: 2px;
                    background: #fff;
                    left: 2px;
                    top: 6px;
                }
            }
        }
    }
    p{
        padding-left: 8px;
        a.addWorkInfo{
            font-size: 16px;
            color: #e83323;
            img{
                    vertical-align: text-bottom;
                    position: relative;
                    top: -2px;
                    left: 3px;
            }
        }
    }
}
</style>