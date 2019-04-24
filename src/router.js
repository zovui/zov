import Vue from 'vue'
import Router from 'vue-router'
import Zov from '../core'
import Home from './Home'
import Menu from './Menu'
Vue.use(Router)
let routerObject = {
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/menu',
            component: Menu,
            children: []
        },
        {
            path: '/component',
            component: Menu,
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
    let o = {
        path: '/' + componentName,
        component: requireViews(fileName).default,
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
    routerObject.routes[2].children.push({
        path: '/' + componentName,
        component: requireComponents(fileName).default
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
