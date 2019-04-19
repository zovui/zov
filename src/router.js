import Vue from 'vue'
import Router from 'vue-router'
import Zov from '../core'
Vue.use(Router)
let router = new Router({
    routes: [
        {
            path: '/longlist',
            // 路由级代码分裂
            // 这会为此路由生成一个单独的块（[name].[hash].js）
            // 访问路径时延迟加载。
            meta: {
                sort: 'form'
            },
            component: () => import('./views/LongListDemo.vue')
        },
        {
            path: '/icon',
            meta: {
                sort: 'base'
            },
            component: () => import('./views/IconDemo.vue')
        },
        {
            path: '/loadingbar',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/LoadingBarDemo.vue')
        },
        {
            path: '/notice',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/NoticeDemo.vue')
        },
        {
            path: '/message',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/MessageDemo.vue')
        },
        {
            path: '/button',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/ButtonDemo.vue')
        },
        {
            path: '/tag',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/TagDemo.vue')
        },
        {
            path: '/spin',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/SpinDemo.vue')
        },
        {
            path: '/switch',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/SwitchDemo.vue')
        },
        {
            path: '/input',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/InputDemo.vue')
        },
        {
            path: '/popper',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/PopperDemo.vue')
        },
        {
            path: '/drop',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/DropDemo.vue')
        },
        {
            path: '/tooltip',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/ToolTipDemo.vue')
        },
        {
            path: '/select',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/SelectDemo.vue')
        },
        {
            path: '/bigdatalist',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/BigDataListDemo.vue')
        },
        {
            path: '/cascader',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/CascaderDemo.vue')
        },
        {
            path: '/datepicker',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/DatePickerDemo.vue')
        },
        {
            path: '/timepicker',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/TimePickerDemo.vue')
        },
        {
            path: '/modal',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/ModalDemo.vue')
        },
        {
            path: '/colorpicker',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/ColorPickerDemo.vue')
        },
        {
            path: '/menu',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/MenuDemo.vue')
        },
        {
            path: '/layout',
            meta: {
                sort: 'form'
            },
            component: () => import('./views/LayoutDemo.vue')
        },
        {
            path: '/badge',
            meta: {
                sort: 'feedback'
            },
            component: () => import('./views/BadgeDemo.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    Zov.LoadingBar.start()
    document.title = to.name || to.path.substr(1)
    next()
})
router.afterEach((to, from, next) => {
    Zov.LoadingBar.finish()
    window.scrollTo(0, 0)
})
export default router
