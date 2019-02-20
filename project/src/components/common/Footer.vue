<template>
    <div class="footerWrap">
        <div class="footer clearfix">
            <div class="right lt">
                <!-- <p>北京泰达华宇科技有限公司</p> -->
                <!-- <p style="font-size:18px; color:#e2e1e0;margin-top:20px;text-align:left;">联系电话：010-57106057</p> -->
                <p>
                    <router-link target="_blank" :to="{path:'/aboutUs',query:{}}">关于我们</router-link>
                </p>
                <p style=" margin-top: 18px;">
                    <router-link target="_blank" :to="{path:'/concatUs',query:{}}">联系我们</router-link>
                </p>
            </div>
            <div class="left lt">
                <img :src="qrcode" alt="" width="100">
                <img :src="qrcode" alt="" width="100" style="margin-left: 5px;">
            </div>
        </div>
        <div class="info">
            Copyright 2018 , Beijing Taidahuayu Co., Ltd. All Rights Reserved.京ICP备18016846号
        </div>
    </div>
</template>
<script>
    import qrcode from '@/assets/index/qrcode.png'
    export default {
        data() {
            return {
                qrcode: qrcode,
            }
        }
    }
</script>
<style lang="less" scoped>
    .footerWrap{
        background: #707070;
        margin-top: 50px;
    }
    .footer {
        width: 350px;
        height: 160px;
        margin: 0 auto;
        background: #707070;
        padding-top: 40px;
        text-align: center;
        font-size: 22px;
        color: #fff;
        font-weight: 100;
        .right{
            width: 120px;
            text-align: left;
            margin-left: 16px;
        }
        a{
            color: #fff;
        }
    }
    .info{
        min-width: 1200px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        color: #b1b1b0;
        background: #626262;
    }
</style>

