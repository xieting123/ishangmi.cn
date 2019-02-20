<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    blockquote,
    body,
    code,
    dd,
    div,
    dl,
    dt,
    fieldset,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    input,
    legend,
    li,
    ol,
    p,
    pre,
    td,
    textarea,
    th,
    ul {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    table {
        border-collapse: collapse;
        border-spacing: 0
    }
    
    fieldset,
    img {
        border: 0
    }
    
    address,
    caption,
    cite,
    code,
    dfn,
    em,
    var {
        font-style: normal;
        font-weight: 400
    }
    
    li {
        list-style: none
    }
    
    caption,
    th {
        text-align: left
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%
    }
    
    abbr,
    acronym {
        border: 0;
        font-variant: normal
    }
    
    sup {
        vertical-align: text-top
    }
    
    input,
    select,
    textarea {
        font-family: inherit;
        font-size: inherit;
        *font-size: 100%;
        font-weight: inherit
    }
    
    legend {
        color: #333
    }
    
    body {
        font: 400 14px/1.5 "Microsoft YaHei", sans-serif;
        color: #666;
        background-color: #fff;
        min-width: 1200px;
    }
    
    a {
        color: #999;
        text-decoration: none;
        transition: .3s all ease;
    }
    
    a:hover {
        text-decoration: underline
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: "Hiragino Sans GB", " Microsoft YaHei", "WenQuanYi Micro Hei", arial, sans-serif;
        color: #333;
        -webkit-font-smoothing: antialiased
    }
    
    input[type=password] {
        font-family: arial, sans-serif
    }
    
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden
    }
    
    .clearfix {
        zoom: 1;
    }
    
    .lt {
        float: left;
    }
    
    .rt {
        float: right;
    }
    .layoutWrap{
        /* max-width: 1200px; */
        width: 1200px;
        /* min-width: 960px; */
        margin: 0 auto;
    }
    .centerCon{
        margin: 0 auto;
        width: 1100px;
    }
    .minH320{
        min-height: 320px;
    }
    .leftPageWrap{
        background: #f2f2f2;
        margin-top: 30px;
        padding-top: 32px;
    }
    #header{
        border-bottom: 1px solid #ea141c;
    }
    .btnDanger{
        background: #fff;
        width: 138px;
        height: 50px;
        font-size: 18px;
        color: #f56c6c;
        border:1px solid #fbc4c4;
        border-radius: 4px;
        text-align: center;
        line-height: 50px;
        display: inline-block;
        text-decoration: none;
    }
    .btnDanger:hover{
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
        text-decoration: none;
    }
    .btnDanger_small{
        background: #fff;
        width: 90px;
        height: 32px;
        font-size: 14px;
        color: #f56c6c;
        border:1px solid #fbc4c4;
        border-radius: 6px;
        text-align: center;
        line-height: 32px;
        display: inline-block;
        text-decoration: none;
    }
    .btnDanger_small:hover{
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
        text-decoration: none;
    }
    .btnPlain{
        background: #fff;
        width: 138px;
        height: 50px;
        font-size: 18px;
        color: #999;
        border: 1px solid #999999;
        border-radius: 4px;
        text-align: center;
        line-height: 50px;
        display: inline-block;
        text-decoration: none;
    }
    .btnPlain:hover{
        color: #666;
        border-color: #666;
        background: none;
        text-decoration: none;
    }
    .btnDisabled{
        width: 138px;
        height: 50px;
        text-align: center;
        display: inline-block;
        border: 1px solid #e9e9eb;
        text-decoration: none;
        line-height: 50px;
        border-radius: 4px;
        font-size: 18px;
        color: #bcbec2;
        cursor: not-allowed;
        background-color: #f4f4f5;
    }
    .btnDisabled:hover{
        text-decoration: none;
    }
    /* 导航分页 */
    .paginationWrap_nav.el-pagination {
        margin-top: 20px;
        text-align: center;
    }
    .paginationWrap_nav.el-pagination.is-background .btn-next,
    .paginationWrap_nav.el-pagination.is-background .btn-prev,
    .paginationWrap_nav.el-pagination.is-background .el-pager li {
        background-color: #f84d3b;
        color: #fff;
    }
    .paginationWrap_nav.el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #f8a89f;
    }
    .paginationWrap_nav.el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #fff;
    }
    /* ele组件重置样式 */
    .el-input.is-active .el-input__inner, .el-input__inner:focus{
        border:1px solid #f33;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border:1px solid #f33;
    }
    /* 单行省略 */
    .singleEllipsis{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    /* 多行省略 */
    .multiEllipsis{
        max-height: 64px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        position: relative;
    }
    /* 咱无数据 */
    .noData{
        line-height: 60px;
        text-align: center;
        color: #999;
        font-size: 20px;
    }
    .defaultAvatarShow{
        border: 4px solid #f63;
        border-radius: 100px;
        overflow: hidden;
        width: 102px;
        height: 102px;
    }
    .defaultAvatarShow_little{
        border: 2px solid #f63;
        border-radius: 100px;
        overflow: hidden;
        width: 58px;
        height: 58px;
    }
    .separator{
        position: relative;
    }
    .separator::before{
        position: absolute;
        content: '';
        height: 22px;
        width: 1px;
        background: #e5e5e5;
    }
    .el-loading-mask{
        background: transparent!important;
    }
    /* 默认头像 */
    .defaultHead_Portraits{
        width:58px;
        height: 58px;
        border-radius: 50%;
        border: 1px solid #fff;
        overflow: hidden;
    }
    .defaultHead_Portraits img{
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;    
    }
    img.defaultHead_Portrait_pic{
        width:110px;
        height: 110px;
        border-radius: 50%;
        border: 1px solid #fff;
        overflow: hidden;
        display: inline-block;
        position: relative;
    }
    .defaultHead_Portraits img::after,img.defaultHead_Portrait_pic::after{
        content: '';
        background: url('./assets/index/IdCard1.png') no-repeat;
        display: block;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-color: #f9f9f9;
    }
    .screeningLove ul.regin-valve{
        width: 712px;
    }
    .screeningLove ul.provincesWrap{
        max-height: 24px;
        overflow: hidden;
    }
    .screeningLove ul.provincesWrap.on{
        max-height: 145px;
        transition: all ease .3s;
    }
    .screeningLove ul.provincesWrap>li,.screeningLove ul.cityListWrap>li,.screeningLove ul>li{
        margin-bottom: 5px;
    }
    .business-love_left ul.screeningLove > li,.main-content ul.screeningLove > li{
        margin-bottom: 15px!important;
    }
    .screeningLove ul.provincesWrap>li.showProvincesMore a{
        color: #ff3333!important;
    }
    .business-love_left .screeningLove ul.provincesWrap>li.showProvincesMore a:hover{
        text-decoration: underline;
    }
    .videoBgwrap .linkTo{
        display: block;
    }
    .videoBgwrap .linkTo:hover{
        text-decoration: none;
    }
    /* 侧边栏分页 */
    .slidebarPage{
        position: absolute;
        right: 0;
        bottom: -30px;
    }
    .blockHover:hover{
        box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.3);
    }
    .blockHover a.linkTo{
        text-decoration: none;
    }
    .el-form .wid220 .el-input__inner{
        width: 222px;
    }
    .el-form .wid610 .el-input__inner{
        width: 610px;
    }
    .el-form-item__content .w-e-text-container,.el-form-item__content .w-e-toolbar .w-e-menu{
        /* z-index: 999!important; */
    }
    .replyStyle{
        color: #71aff5;
        margin:0 5px;
    }
    .imgWrapConShow{
        position:relative;
        margin-top:15px;
    }
    .imgWrapConShow img{
        width:200px;
        height:200px;
        margin-right:20px;
    }
    .isAdWrap{
        position: absolute;
        left: -6px;
        top: -5px;
        color: #fff;
    }
    .hasSendAuthCode{
        color: #49ac7e;
    }
    .rewardDialog .payWay .el-radio+.el-radio {
        margin-left: 15px;
    }
</style>
