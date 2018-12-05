import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Zov, { LongList, AutoCascader } from '../core'
import './app.scss'
// Vue.component('LongList', LongList)
// Vue.component('AutoCascader', AutoCascader)
Vue.use(Zov)
Vue.config.productionTip = false // 去除production环境下vue警告
console.log(Vue.version)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
