import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './app.scss'
import Zov from '../core'
// import { LongList } from '../core'
// Vue.component('LongList', LongList)
Vue.use(Zov)
Vue.config.productionTip = false // 去除production环境下vue警告
console.log(Vue.version)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
