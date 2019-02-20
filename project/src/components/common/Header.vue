<template>
    <div class="headerWrap">
        <div class="wid1200">
            <template v-if="isLogined === true">
                <div class="headerTop clearfix">
                    <div class="loginAndRegister rt">
                        <router-link :to="{ name: 'Login', params: {}}" class="login lt">你好，请登录</router-link>
                        <router-link :to="{ name: 'Register', params: {}}" class="register lt">免费注册</router-link>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="personWrap clearfix">
                    <a href="javascript:;" class="logout rt" @click="logout">退出</a>
                    <router-link :to="{ name: 'PersonCenter', params: {}}" class="personCenter rt">
                        <div class="defaultHead_Portraits">
                            <img :src="avatar">
                        </div>
                    </router-link>
                </div>
            </template>
        </div>
        <div class="headerNav">
            <div class="headerNavCon clearfix">
                <div class="logoWrap lt">
                    <a href="/"><img :src="logo"></a>
                </div>
                <div class="navWrap lt">
                    <ul class="clearfix">
                        <li>
                            <router-link :to="{ name: '/', params: {}}">首页</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Business_cheng', params: {}}">商城</router-link>
                        </li>
                        <li>
                            <a href="http://android.myapp.com/myapp/detail.htm?apkName=com.glhr.smdroid" target="_blank">app下载</a>
                        </li>
                    </ul>
                </div>
                <div class="searchWrap rt">
                    <el-input placeholder="" v-model="form.keywords" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import logo from '@/assets/index/newlogo1.png'
    import idCard from './../../assets/index/IdCard.png'
    import { requestLogout} from '../../api/api';
    export default {
        data() {
            return {
                isLogined: true,
                logo:logo,
                form: {
                    keywords: ''
                },
                avatar:idCard,
            }
        },
        methods: {
            isLogin() {
                if(this.$cookies.get("token")){
                    this.isLogined = false;
                }
            },
            logout() {
                let vm = this;
                // location.reload();
                requestLogout().then(res => {
                    if (res.code === 200) {
                        //  console.log("退出成功");
                        this.isLogined = true;
                        vm.$cookies.remove("token");//清除token
                        localStorage.removeItem('perInfo');//清除个人信息
                        location.reload();
                    }
                }, err => {
                    console.log(err)
                });
            },
            onSubmit() {
                if(!this.form.keywords.trim()){
                    this.$message('请输入关键词');
                }
            },
        },
        mounted() {
            this.isLogin();
            if(localStorage.getItem('perInfo')){
                let avatar = JSON.parse(localStorage.getItem('perInfo')).avatar;
                this.avatar = avatar;
            }else{
                this.avatar = idCard;
            }
        }
    }
</script>
<style>
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
</style>

<style lang="less" scoped>
.headerWrap{
    .wid1200{
        position: relative;
        background: #f10215;
        min-width: 1200px;
        .personWrap {
            width: 1200px;
            margin: 0 auto;
            a.personCenter {
                display: block;
                width: 44px;
                position: relative;
                top: 2px;
                img {
                    width: 100%;
                }
                margin-right: 20px;
                    height: 49px;
            }
            a.logout{
                position: relative;
                top: 10px;
                font-size: 16px;
                color: #fff;
            }
            .defaultHead_Portraits{
                width: 44px;
                height: 44px;
                border: none;
            }
        }
    }
    .headerTop{
        width: 1200px;
        margin: 0 auto;
        line-height: 49px;
        .loginAndRegister{
            font-size: 16px;
            color: #fff;
            a.login{
                color:#ffc002;
                margin-right: 15px;
            }
            a.register{
                color:#fff;
            }
        }
    }
    
    .headerNav{
        position: relative;
        background: #626262;
        min-width: 1200px;
        .headerNavCon{
            width: 1200px;
            margin: 0 auto;
            height: 88px;
            .logoWrap{
                margin-top: 8px;
            }
            .navWrap{
                margin-left: 28px;
                position: relative;
                &::after{
                    position: absolute;
                    content: '';
                    background-color: #fff;
                    width: 2px;
                    height: 46px;
                    left: 0px;
                    top: 20px;
                    display: block;
                }
                li{
                    float: left;
                    line-height: 84px;
                    padding: 0 22px;
                    font-weight: 100;
                    a{
                        font-size: 22px;
                        color: #fff;
                    }
                }
            }
        }
    }
    .searchWrap{
        width: 278px;
        position: relative;
        top: 22px;
    }
}
</style>

