import Vue from 'vue'
import Router from 'vue-router'
import Zov from '../core'
Vue.use(Router)
let routerObject = {
    routes: [
        {
            path: '/',
            component: () => import('./Home')
        },
        {
            path: '/menu',
            component: () => import('./Menu'),
            children: []
        },
        {
            path: '/component',
            component: () => import('./Menu'),
            children: []
        }
    ]
}

const requireViews = require.context('./views', false, /\.vue/)
let viewsRoutes = []
requireViews.keys().forEach(fileName => {
    let options = requireViews(fileName).default.routerOptions
    console.log(options)
    let componentName = fileName.substr(2, fileName.length - 10)
    fileName = fileName.substr(0, 1) + '/views' + fileName.substr(1)
    let o = {
        path: '/' + componentName,
        component: () => import(fileName + ''),
        routerOptions: options
    }
    viewsRoutes.push(o)
})
viewsRoutes = viewsRoutes.sort((a, b) => {
    console.log(a.routerOptions.order, b.routerOptions.order)
    return a.routerOptions.order - b.routerOptions.order
})
routerObject.routes[1].children = routerObject.routes[1].children.concat(viewsRoutes)

const requireComponents = require.context('./views/components', false, /\.vue/)
requireComponents.keys().forEach(fileName => {
    let componentName = fileName.substr(2, fileName.length - 10)
    fileName = fileName.substr(0, 1) + '/views/components' + fileName.substr(1)
    routerObject.routes[2].children.push({
        path: '/' + componentName,
        component: () => import(fileName + '')
    })
})
console.log(routerObject)
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
