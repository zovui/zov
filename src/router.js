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
            component: () => import('./views/LongList.vue')
        },
        {
            path: '/autocascader',
            component: () => import('./views/AutoCascader.vue')
        }
    ]
})
