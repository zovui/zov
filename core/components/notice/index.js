import Notice from './notice'
import Vue from 'vue'
let timer;
export default {
    _initDom (opts) {
        // new 一个新vue实例
        const instance = new Vue({
                render: h => h(Notice)
        })
        // 将vue实例中的dom插入到body中，先调用实例的生命钩子函数确保实例组件已挂载。
        let elBox = document.body
        document.body.appendChild(instance.$mount().$el)
        // 获取vue实例中的第一个子组件，这里指向当前组件本身
        return instance.$children[0]
    },
    _newNotice () {
        this._initDom()
    },
    info () {
        this._newNotice()
    }
}
