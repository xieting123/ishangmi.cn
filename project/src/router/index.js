import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
// 导航
import Index from '@/components/Index'
import Business_bao from '@/components/business_bao/Business_bao'
import Business_cheng from '@/components/business_cheng/Business_cheng'
import Business_chou from '@/components/business_chou/Business_chou'
import Business_dao from '@/components/business_dao/Business_dao'
import Business_ju from '@/components/business_ju/Business_ju'
import Business_hui from '@/components/business_hui/Business_hui'
import Business_ji from '@/components/business_ji/Business_ji'
import Business_lian from '@/components/business_lian/Business_lian'
import Business_mai from '@/components/business_mai/Business_mai'
import Business_xun from '@/components/business_xun/Business_xun'
import Business_article from '@/components/business_article/Business_article'
// 导航多级

//商会管理
import EditorTissue from '@/components/business_hui/ManageTissue/EditorTissue'
import MemberManage from '@/components/business_hui/ManageTissue/MemberManage'
import PrivateGroupManage from '@/components/business_hui/ManageTissue/PrivateGroupManage'

//404页面
import Error from '@/components/common/Error'
import AboutUs from '@/components/common/AboutUs'
import ConcatUs from '@/components/common/ConcatUs'

//登陆-注册-重置密码
import Login from '@/components/common/Login'
import Register from '@/components/common/Register'
import BindPhone from '@/components/common/BindPhone'
import ResetPassword from '@/components/common/ResetPassword'

//首页侧边栏
import MyBusiness_mai from '@/components/index/MyBusiness_mai'
import MyBusiness_hui from '@/components/index/MyBusiness_hui'
import MyBusiness_hui_detail from '@/components/index/MyBusiness_hui_detail'
import MyMessage from '@/components/index/MyMessage'
import MyBusiness_xun from '@/components/index/MyBusiness_xun'
import MyBusiness_xun_detail from '@/components/index/MyBusiness_xun_detail'
import Business_xun_detail from '@/components/index/Business_xun_detail'
import MyBusiness_ju from '@/components/index/MyBusiness_ju'
import MyBusiness_ju_detail from '@/components/index/MyBusiness_ju_detail'
import Business_ju_detail from '@/components/index/Business_ju_detail'
import Business_ju_dynamic from '@/components/index/Business_ju_dynamic'
import MyBusiness_chou from '@/components/index/MyBusiness_chou'
import MyBusiness_chou_detail from '@/components/index/MyBusiness_chou_detail'
import Business_chou_detail from '@/components/index/Business_chou_detail'
import Business_chou_dynamic from '@/components/index/Business_chou_dynamic'
import MyInvitation from '@/components/index/MyInvitation'
import MyBusiness_dao from '@/components/index/MyBusiness_dao'
import MyBusiness_dao_detail from '@/components/index/MyBusiness_dao_detail'
import MyBusiness_bao from '@/components/index/MyBusiness_bao'
import MyBusiness_bao_detail from '@/components/index/MyBusiness_bao_detail'
import MyBusiness_ji from '@/components/index/MyBusiness_ji'
import MyBusiness_ji_detail from '@/components/index/MyBusiness_ji_detail'
import MyBusiness_pin from '@/components/index/MyBusiness_pin'
import MyBusiness_pin_detail from '@/components/index/MyBusiness_pin_detail'
import Business_pin_dynamic from '@/components/index/Business_pin_dynamic'
import Business_pin_comment from '@/components/index/Business_pin_comment'
import MyBusiness_pin_purchase from '@/components/index/MyBusiness_pin_purchase'
import MyPartner from '@/components/index/MyPartner'
import MyReport from '@/components/index/MyReport'
import MyBusiness_article from '@/components/index/MyBusiness_article'
import MyBusiness_article_detail from '@/components/index/MyBusiness_article_detail'

//消息相关
import Message_group from '@/components/index/Message_group'
import Message_tissues from '@/components/index/Message_tissues'

//发布相关
import Publish_dao from '@/components/index/publish/Publish_dao' 
import Editor_dao from '@/components/index/editor/Editor_dao'
import Publish_bao from '@/components/index/publish/Publish_bao' 
import Editor_bao from '@/components/index/editor/Editor_bao' 
import Publish_chou from '@/components/index/publish/Publish_chou' 
import Publish_hui from '@/components/index/publish/Publish_hui' 
import Publish_ji from '@/components/index/publish/Publish_ji' 
import Publish_ju from '@/components/index/publish/Publish_ju' 
import Publish_pin from '@/components/index/publish/Publish_pin' 
import Publish_xun from '@/components/index/publish/Publish_xun' 
import Publish_success from '@/components/index/publish/Publish_success' 
//商会发布商机
import Publish_tissue_ji from '@/components/index/publish/Publish_tissue_ji' 
import Publish_article from '@/components/index/publish/Publish_article' 

//个人中心
import PersonCenter from '@/components/personCenter/PersonCenter'
import Account from '@/components/personCenter/Account'
import Videos from '@/components/personCenter/Videos'
import Identification from '@/components/personCenter/Identification'
import Myphotos from '@/components/personCenter/Myphotos'
import UpgradeMember from '@/components/personCenter/UpgradeMember'
import MemberPersonCenter from '@/components/personCenter/MemberPersonCenter'
import MemberVideos from '@/components/personCenter/MemberVideos'
import AddInvite from '@/components/personCenter/AddInvite'

//个人中心编辑
import PerInfo from '@/components/personCenter/editPerInfo/PerInfo'
import Address from '@/components/personCenter/editPerInfo/Address'
import ModifyPassword from '@/components/personCenter/editPerInfo/ModifyPassword'
import ModifyPhone from '@/components/personCenter/editPerInfo/ModifyPhone'
import Blacklist from '@/components/personCenter/editPerInfo/Blacklist'
import SkillManager from '@/components/personCenter/editPerInfo/SkillManager'
import SkillManagerEditor from '@/components/personCenter/editPerInfo/SkillManagerEditor'
import BusinessMan from '@/components/personCenter/editPerInfo/BusinessMan'
import SkillTalent from '@/components/personCenter/editPerInfo/SkillTalent'

//个人中心完善商恋资料
import BusinessLove_mate from '@/components/personCenter/BusinessLove_mate'
import BusinessLove_hobby from '@/components/personCenter/BusinessLove_hobby'

//融云IM
import RongCloudIM from '@/components/common/RongCloudIM/RongCloudIM'

//律师
import LawyerList from '@/components/lawyer/List'
import ConsultationDetail from '@/components/lawyer/ConsultationDetail'
import BleacheryDetail from '@/components/lawyer/BleacheryDetail'
import MyConsultation from '@/components/lawyer/MyConsultation'
import PerConsultation from '@/components/lawyer/perConsultation'
import PerBleachery from '@/components/lawyer/perBleachery'
import Publish_bleachery from '@/components/lawyer/Publish_bleachery'
import Publish_consultation from '@/components/lawyer/Publish_consultation'

//名医
import DoctorList from '@/components/doctor/List'
import MyDoctorConsultation from '@/components/doctor/MyConsultation'
import DoctorConsultationDetail from '@/components/doctor/ConsultationDetail'
import Publish_doctorBleachery from '@/components/doctor/Publish_bleachery'
import Publish_doctorCconsultation from '@/components/doctor/Publish_consultation'
import DoctorBleacheryDetail from '@/components/doctor/BleacheryDetail'
import DoctorPerConsultation from '@/components/doctor/perConsultation'
import DoctorPerBleachery from '@/components/doctor/perBleachery'

Vue.use(Router)

//路由配置
var router = new Router({
    // mode: 'history',
    routes: [
        {//导航
            path: '/',
            name: '/',
            component: Index
        },
        {
            path: '/error',
            name: 'Error',
            component: Error
        },
        {
            path: '/aboutUs',
            name: 'AboutUs',
            component: AboutUs
        },
        {
            path: '/concatUs',
            name: 'ConcatUs',
            component: ConcatUs
        },
        {
            path:'*',
            redirect: '/Error'
        },
        //律师
        {
            path: '/lawyerList',
            name: 'LawyerList',
            component: LawyerList
        },
        {
            path: '/consultationDetail',
            name: 'ConsultationDetail',
            component: ConsultationDetail
        },
        {
            path: '/bleacheryDetail',
            name: 'BleacheryDetail',
            component: BleacheryDetail
        },
        {
            path: '/lawyer/perConsultation',
            name: 'PerConsultation',
            component: PerConsultation
        },
        {
            path: '/lawyer/perBleachery',
            name: 'PerBleachery',
            component: PerBleachery
        },
        {
            path: '/myConsultation',
            name: 'MyConsultation',
            meta: {
                requireAuth: true, 
            },
            component: MyConsultation
        },
        {
            path: '/publish_bleachery',
            name: 'Publish_bleachery',
            meta: {
                requireAuth: true, 
            },
            component: Publish_bleachery
        },
        {
            path: '/publish_consultation',
            name: 'Publish_consultation',
            meta: {
                requireAuth: true, 
            },
            component: Publish_consultation
        },
        //医生
        {
            path: '/doctorList',
            name: 'DoctorList',
            component: DoctorList
        },
        {
            path: '/myDoctorConsultation',
            name: 'MyDoctorConsultation',
            meta: {
                requireAuth: true, 
            },
            component: MyDoctorConsultation
        },
        {
            path: '/doctorConsultationDetail',
            name: 'DoctorConsultationDetail',
            component: DoctorConsultationDetail
        },
        {
            path: '/publish_doctorBleachery',
            name: 'Publish_doctorBleachery',
            meta: {
                requireAuth: true, 
            },
            component: Publish_doctorBleachery
        },
        {
            path: '/publish_doctorCconsultation',
            name: 'Publish_doctorCconsultation',
            meta: {
                requireAuth: true, 
            },
            component: Publish_doctorCconsultation
        },
        {
            path: '/doctorBleacheryDetail',
            name: 'DoctorBleacheryDetail',
            component: DoctorBleacheryDetail
        },

        {
            path: '/doctor/perConsultation',
            name: 'DoctorPerConsultation',
            component: DoctorPerConsultation
        },
        {
            path: '/doctor/perBleachery',
            name: 'DoctorPerBleachery',
            component: DoctorPerBleachery
        },

        {
            path: '/business_mai',
            name: 'Business_mai',
            component: Business_mai
        },
        {
            path: '/business_ji',
            name: 'Business_ji',
            component: Business_ji
        },
        {
            path: '/business_hui',
            name: 'Business_hui',
            component: Business_hui
        },
        //融云IM
        {
            path: '/rongCloudIM',
            name: 'RongCloudIM',
            meta: {
                requireAuth: true, 
            },
            component: RongCloudIM
        },
        //商会管理
        {
            path: '/myTissues/editorTissue',
            name: 'EditorTissue',
            meta: {
                requireAuth: true, 
            },
            component: EditorTissue
        },
        {
            path: '/myTissues/memberManage',
            name: 'MemberManage',
            meta: {
                requireAuth: true, 
            },
            component: MemberManage
        },
        {
            path: '/myTissues/privateGroupManage',
            name: 'PrivateGroupManage',
            meta: {
                requireAuth: true, 
            },
            component: PrivateGroupManage
        },
        {
            path: '/business_dao',
            name: 'Business_dao',
            component: Business_dao
        },
        {
            path: '/business_article',
            name: 'Business_article',
            component: Business_article
        },
        {
            path: '/business_chou',
            name: 'Business_chou',
            component: Business_chou
        },
        {
            path: '/business_ju',
            name: 'Business_ju',
            component: Business_ju
        },
        {
            path: '/business_xun',
            name: 'Business_xun',
            component: Business_xun
        },
        {
            path: '/business_cheng',
            name: 'Business_cheng',
            component: Business_cheng
        },
        {
            path: '/business_lian',
            name: 'Business_lian',
            component: Business_lian
        },
        {
            path: '/business_bao',
            name: 'Business_bao',
            component: Business_bao
        },
        {//登录注册
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/bindPhone',
            name: 'BindPhone',
            component: BindPhone
        },
        {
            path: '/resetPassword',
            name: 'ResetPassword',
            component: ResetPassword
        },
        //首页侧边栏
        {
            path: '/index/myshangmai',
            name: 'MyBusiness_mai',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_mai
        },
        {
            path: '/index/myTissues',
            name: 'MyBusiness_hui',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_hui
        },
        {
            path: '/index/tissuesDetail',
            name: 'MyBusiness_hui_detail',
            component: MyBusiness_hui_detail
        },
        {
            path: '/index/myMessage',
            name: 'MyMessage',
            meta: {
                requireAuth: true, 
            },
            component: MyMessage
        },
        {
            path: '/index/myshangxun',
            name: 'MyBusiness_xun',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_xun
        },
        {
            path: '/index/myConsultationDetail',
            name: 'MyBusiness_xun_detail',
            component: MyBusiness_xun_detail
        },
        {
            path: '/index/consultationDetail',
            name: 'Business_xun_detail',
            component: Business_xun_detail
        },
        {
            path: '/index/myshangju',
            name: 'MyBusiness_ju',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_ju
        },
        {
            path: '/index/myActivityDetail',
            name: 'MyBusiness_ju_detail',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_ju_detail
        },
        {
            path: '/index/activityDetail',
            name: 'Business_ju_detail',
            component: Business_ju_detail
        },
        {
            path: '/index/activityDynamic',
            name: 'Business_ju_dynamic',
            meta: {
                requireAuth: true, 
            },
            component: Business_ju_dynamic
        },
        {
            path: '/index/myFundDetail',
            name: 'MyBusiness_chou_detail',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_chou_detail
        },
        {
            path: '/index/fundDetail',
            name: 'Business_chou_detail',
            component: Business_chou_detail
        },
        {
            path: '/index/fundDynamic',
            name: 'Business_chou_dynamic',
            meta: {
                requireAuth: true, 
            },
            component: Business_chou_dynamic
        },
        {
            path: '/index/myshangchou',
            name: 'MyBusiness_chou',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_chou
        },
        {
            path: '/index/myInvitation',
            name: 'MyInvitation',
            meta: {
                requireAuth: true, 
            },
            component: MyInvitation
        },
        {
            path: '/index/myshangdao',
            name: 'MyBusiness_dao',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_dao
        },
        {
            path: '/index/avenuesDetail',
            name: 'MyBusiness_dao_detail',
            component: MyBusiness_dao_detail
        },
        {
            path: '/index/myArticle',
            name: 'MyBusiness_article',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_article
        },
        {
            path: '/index/articleDetail',
            name: 'MyBusiness_article_detail',
            component: MyBusiness_article_detail
        },
        {
            path: '/index/myshangji',
            name: 'MyBusiness_ji',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_ji
        },
        {
            path: '/index/myshangjiDetail',
            name: 'MyBusiness_ji_detail',
            component: MyBusiness_ji_detail
        },
        {
            path: '/index/myshangpin',
            name: 'MyBusiness_pin',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_pin
        },
        {
            path: '/index/goodsDetail',
            name: 'MyBusiness_pin_detail',
            component: MyBusiness_pin_detail
        },
        {
            path: '/index/goodsDynamic',
            name: 'Business_pin_dynamic',
            meta: {
                requireAuth: true, 
            },
            component: Business_pin_dynamic
        },
        {
            path: '/index/goodsComment',
            name: 'Business_pin_comment',
            meta: {
                requireAuth: true, 
            },
            component: Business_pin_comment
        },
        {
            path: '/index/goodsOrder',
            name: 'MyBusiness_pin_purchase',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_pin_purchase
        },
        {
            path: '/index/myshangbao',
            name: 'MyBusiness_bao',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_bao
        },
        {
            path: '/index/newsDetail',
            name: 'MyBusiness_bao_detail',
            component: MyBusiness_bao_detail
        },
        {
            path: '/index/myPartner',
            name: 'MyPartner',
            meta: {
                requireAuth: true, 
            },
            component: MyPartner
        },
        {
            path: '/index/myReport',
            name: 'MyReport',
            meta: {
                requireAuth: true, 
            },
            component: MyReport
        },
        //验证消息
        {
            path: '/index/message_group',
            name: 'Message_group',
            meta: {
                requireAuth: true, 
            },
            component: Message_group
        },
        {
            path: '/index/message_tissues',
            name: 'Message_tissues',
            meta: {
                requireAuth: true, 
            },
            component: Message_tissues
        },
        {//发布相关
            path: '/index/publishDao',
            name: 'Publish_dao',
            meta: {
                requireAuth: true, 
            },
            component: Publish_dao
        },
        {
            path: '/index/editorDao',
            name: 'Editor_dao',
            meta: {
                requireAuth: true,
            },
            component: Editor_dao
        },
        {
            path: '/index/publishArticle',
            name: 'Publish_article',
            meta: {
                requireAuth: true,
            },
            component: Publish_article
        },
        {
            path: '/index/publishBao',
            name: 'Publish_bao',
            meta: {
                requireAuth: true, 
            },
            component: Publish_bao
        },
        {
            path: '/index/editorBao',
            name: 'Editor_bao',
            meta: {
                requireAuth: true,
            },
            component: Editor_bao
        },
        {
            path: '/index/publishChou',
            name: 'Publish_chou',
            meta: {
                requireAuth: true, 
            },
            component: Publish_chou
        },
        {
            path: '/index/publishHui',
            name: 'Publish_hui',
            meta: {
                requireAuth: true, 
            },
            component: Publish_hui
        },
        {
            path: '/index/publish_success',
            name: 'Publish_success',
            meta: {
                requireAuth: true, 
            },
            component: Publish_success
        },
        {
            path: '/index/publishJi',
            name: 'Publish_ji',
            meta: {
                requireAuth: true, 
            },
            component: Publish_ji
        },
        //商会/私密组发布商机
        {
            path: '/index/PublishTissue',
            name: 'Publish_tissue_ji',
            meta: {
                requireAuth: true, 
            },
            component: Publish_tissue_ji
        },
        {
            path: '/index/publishJu',
            name: 'Publish_ju',
            meta: {
                requireAuth: true, 
            },
            component: Publish_ju
        },
        {
            path: '/index/publishPin',
            name: 'Publish_pin',
            meta: {
                requireAuth: true, 
            },
            component: Publish_pin
        },
        {
            path: '/index/publishXun',
            name: 'Publish_xun',
            meta: {
                requireAuth: true, 
            },
            component: Publish_xun
        },
        {//我的个人中心
            path: '/personCenter',
            name: 'PersonCenter',
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: PersonCenter
        },
        {//商友个人中心
            path: '/memberPersonCenter',
            name: 'MemberPersonCenter',
            component: MemberPersonCenter
        },
        {
            path: '/memberVideos',
            name: 'MemberVideos',
            meta: {
                requireAuth: true, 
            },
            component: MemberVideos
        },
        {
            path: '/personCenter/account',
            name: 'Account',
            meta: {
                requireAuth: true, 
            },
            component: Account
        },
        {
            path: '/personCenter/videos',
            name: 'Videos',
            meta: {
                requireAuth: true, 
            },
            component: Videos
        },
        {
            path: '/personCenter/identification',
            name: 'Identification',
            meta: {
                requireAuth: true, 
            },
            component: Identification
        },
        {
            path: '/personCenter/myphotos',
            name: 'Myphotos',
            meta: {
                requireAuth: true, 
            },
            component: Myphotos
        },
        {
            path: '/personCenter/upgradeMember',
            name: 'UpgradeMember',
            meta: {
                requireAuth: true, 
            },
            component: UpgradeMember
        },
        {
            path: '/personCenter/addInvite',
            name: 'AddInvite',
            meta: {
                requireAuth: true, 
            },
            component: AddInvite
        },
        //商恋资料完善
        {
            path: '/personCenter/businessLove_mate',
            name: 'BusinessLove_mate',
            meta: {
                requireAuth: true, 
            },
            component: BusinessLove_mate
        },
        {
            path: '/personCenter/businessLove_hobby',
            name: 'BusinessLove_hobby',
            meta: {
                requireAuth: true, 
            },
            component: BusinessLove_hobby
        },
        //个人中心编辑
        {
            path: '/personCenter/perInfo',
            name: 'PerInfo',
            meta: {
                requireAuth: true, 
            },
            component: PerInfo
        },
        {
            path: '/personCenter/address',
            name: 'Address',
            meta: {
                requireAuth: true, 
            },
            component: Address
        },
        {
            path: '/personCenter/modifyPassword',
            name: 'ModifyPassword',
            meta: {
                requireAuth: true, 
            },
            component: ModifyPassword
        },
        {
            path: '/personCenter/modifyPhone',
            name: 'ModifyPhone',
            meta: {
                requireAuth: true, 
            },
            component: ModifyPhone
        },
        {
            path: '/personCenter/blacklist',
            name: 'Blacklist',
            meta: {
                requireAuth: true, 
            },
            component: Blacklist
        },
        {
            path: '/personCenter/skillManager',
            name: 'SkillManager',
            meta: {
                requireAuth: true, 
            },
            component: SkillManager
        },
        {
            path: '/personCenter/skillManagerEditor',
            name: 'SkillManagerEditor',
            meta: {
                requireAuth: true, 
            },
            component: SkillManagerEditor
        },
        {
            path: '/personCenter/businessMan',
            name: 'BusinessMan',
            meta: {
                requireAuth: true, 
            },
            component: BusinessMan
        },
        {
            path: '/personCenter/skillTalent',
            name: 'SkillTalent',
            meta: {
                requireAuth: true, 
            },
            component: SkillTalent
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        // if (store.state.token) {  // 通过vuex state获取当前的token是否存在
        if(VueCookies.get("token")){
            next();
        }
        else {
            next({
                path: '/Login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});

export default router






// WEBPACK FOOTER //
// ./src/router/index.js