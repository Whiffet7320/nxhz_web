import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [
    // {
    //     path: '/home',
    //     name: 'home',
    //     component: () => import('./components/home.vue')
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/login.vue')
    },
    {
        path: '/shop',
        name: 'shop',
        component: () => import('./components/shop/index.vue')
    },
    {
        path: '/goods',
        name: 'goods',
        redirect: 'goods/sell',
        component: () => import('./components/goods/index.vue'),
        children: [
            {
                path: 'sell',
                name: 'sell',
                component: () => import('./components/goods/sell.vue'),
                children: [
                    {
                        path: 'Edit',
                        name: 'Edit',
                        // redirect: 'goods/sell',
                        component: () => import('./components/goods/Edit.vue')
                    },
                ]
            },
            {
                path: 'examine',
                name: 'examine',
                component: () => import('./components/goods/examine.vue')
            }
        ]
    },
    {
        path: '/order',
        name: 'order',
        redirect: 'order/testContent',
        component: () => import('./components/order/index.vue'),
        meta: [
            { title: '订单管理', url: '/order/testContent', flag: true },
            { title: '订单列表', url: '/order/testContent', flag: true },
        ],
        children: [
            {
                path: 'testContent',
                name: 'testContent',
                component: () => import('./components/order/testContent.vue'),
                children: [
                    {
                        path: 'details',
                        name: 'details',
                        component: () => import('./components/order/details.vue'),
                    },
                ]
            },
            // {
            //     path: 'details',
            //     name: 'details',
            //     component: () => import('./components/order/details.vue'),
            // },
            {
                path: 'commentList',
                name: 'commentList',
                component: () => import('./components/order/commentList.vue'),
                children: [
                    {
                        path: 'listDetails',
                        name: 'listDetails',
                        component: () => import('./components/order/listDetails.vue')
                    },
                ]
            },
            // {
            //     path: 'listDetails',
            //     name: 'listDetails',
            //     component: () => import('./components/order/listDetails.vue')
            // }
        ]
    },
    {
        path: '/test',
        name: 'test',
        redirect: 'test/text2',
        component: () => import('./components/shop/test.vue'),
        children: [
            {
                path: 'text2',
                name: 'text2',
                component: () => import('./components/shop/text2.vue')
            },
        ]
    },
    {
        path: '/operate',
        name: 'operate',
        redirect: '/operate/operatetest',
        component: () => import('./components/operate/test.vue'),
        children: [
            {
                path: 'operatetest',
                name: 'operatetest',
                component: () => import('./components/operate/testContent.vue')
            },
            {
                path: 'toGrant', //发放优惠券 详情
                name: 'toGrant',
                component: () => import('./components/operate/toGrant.vue')
            },
            {
                path: 'addGrant', //新增优惠券 详情
                name: 'addGrant',
                component: () => import('./components/operate/addGrant.vue')
            },
            {
                path: 'record',
                name: 'record',
                component: () => import('./components/operate/record.vue')
            },
            {
                path: 'recordDetails',
                name: 'recordDetails',
                component: () => import('./components/operate/record_details.vue')
            },
        ]
    },
    {
        path: '/web',//聊天室(客服)
        name: 'web',
        // redirect: '/operate/operatetest',
        component: () => import('./components/webSocket/index.vue'),
        // component:()=>import('./components/webSocket/player.vue')
        children: [
            {
                path: 'webSocket',
                name: 'webSocket',
                component: () => import('./components/webSocket/webSocket.vue')
            },
        ]
    },
    {
        path: 'EditPassword',//修改个人信息页面
        name: 'EditPassword',
        component: () => import('./components/EditPassword.vue')
    },
]

const router = new VueRouter({
    mode: 'hash',
    routes,
    linkActiveClass: 'active'
})


export default router
