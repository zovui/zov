import Vue from 'vue'
import Router from 'vue-router'
import Zov from '../core'
Vue.use(Router)
let routerObject = { routes: [] }
const requireComponent = require.context('./views', false, /\.vue/)
requireComponent.keys().forEach(fileName => {
    let componentName = fileName.substr(2, fileName.length - 6)
    fileName = fileName.substr(0, 1) + '/views' + fileName.substr(1)
    routerObject.routes.push({
        path: '/' + componentName,
        component: () => import(fileName + '')
    })
})
let router = new Router(routerObject)
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
