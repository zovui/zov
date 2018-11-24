import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/longlist',
            // 路由级代码分裂
            // 这会为此路由生成一个单独的块（[name].[hash].js）
            // 访问路径时延迟加载。
            meta: {
                sort: 'form'
            },
            component: () => import('./views/LongList.vue')
        },
        {
            path: '/autocascader',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/AutoCascader.vue')
        },
        {
            path: '/icon',
            meta: {
                sort: 'base'
            },
            component: () => import('./views/Icon.vue')
        },
        {
            path: '/loadingbar',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/LoadingBar.vue')
        },
        {
            path: '/notice',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/Notice.vue')
        },
        {
            path: '/message',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/Message.vue')
        },
        {
            path: '/button',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/Button.vue')
        },
        {
            path: '/spin',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/Spin.vue')
        },
        {
            path: '/switch',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/Switch.vue')
        },
        {
            path: '/input',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/Input.vue')
        },
        {
            path: '/select',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/Select.vue')
        },
        {
            path: '/dropdown',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/DropDown.vue')
        }
    ]
})
