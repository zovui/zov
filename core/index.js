import LongList from './components/long-list'
import AutoCascader from './components/auto-cascader'

const components = {
    LongList,
    AutoCascader
}

const install = (Vue, option = {}) => {
    if (install.installed) return // 防止多次安装
    for (let key in components) {
        Vue.component(key, components[key])
    }
    // 下面是全局安装的方法【弹窗】
}
// 自动安装【browser端引用的时候可以省去Vue.use】
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
let zov = {
    install
}
export {
    LongList,
    AutoCascader
}
export default zov
