// icons
import './icons/iconfont'
// 全局注册式组件
import LongList from './components/long-list'
import AutoCascader from './components/auto-cascader'
import Icon from './components/icon'
import Button from './components/button'
// 全局方法式组件
import Dark from './components/dark'
import LoadingBar from './components/loading-bar'
import Notice from './components/notice'
import Message from './components/message'
const components = {
    LongList,
    AutoCascader,
    Icon,
    Button
}

const install = (Vue, option = {}) => {
    if (install.installed) return // 防止多次安装
    for (let key in components) {
        Vue.component(key, components[key])
    }
    // 下面是全局安装的方法
    Vue.prototype.$Dark = Dark
    Vue.prototype.$LoadingBar = LoadingBar
    Vue.prototype.$Notice = Notice
    Vue.prototype.$Message = Message
}
// 自动安装【browser端引用的时候可以省去Vue.use】
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue) // 调用 `MyPlugin.install(Vue)`
}
let zov = {
    install
}
export {
    LongList,
    AutoCascader,
    Icon,
    Button
}
export default zov
