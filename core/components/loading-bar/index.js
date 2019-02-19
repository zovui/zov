import LoadingBar from './loading-bar'
import Vue from 'vue'
let timer, t
export default {
    _instance: undefined,
    _init () {
        // new 一个新vue实例
        const instance = new Vue({
            render: h => h(LoadingBar)
        })
        // 将vue实例中的dom插入到body中
        document.body.appendChild(instance.$mount().$el) // 先调用实例的生命钩子函数确保实例组件已挂载。
        // 获取vue实例中的第一个子组件，这里指向'loading-bar'
        this._instance = instance.$children[0]
        return this._instance
    },
    _getInstance () {
        // 获取loading-bar的实例，如果实例未创建，则创建并返回
        return this._instance ? this._instance : this._init()
    },
    _clearTimer () {
        clearInterval(timer)
        timer = null
        clearTimeout(t)
        t = null
    },
    _keep ({ show = false, width = 0, status = 'primary' }) {
        // 任何需要重新更新的操作都需要清除计时器
        this._clearTimer()
        // 直接操作组件上的data
        this._getInstance().show = show
        this._getInstance().width = width
        this._getInstance().status = status
    },
    _hide () {
        t = setTimeout(() => {
            this._clearTimer()
            this._getInstance().show = false
        }, 1000)
    },
    start () {
        let percent = 0
        this._keep({
            show: true,
            width: percent,
            status: 'primary'
        })
        // 模拟分段加载效果
        timer = setInterval(() => {
            // 随机分段百分比
            percent += Math.floor(Math.random() * 3 + 1)
            if (percent > 90) {
                this._clearTimer()
            }
            this._getInstance().width = percent + '%'
        }, 200)
    },
    finish () {
        this._keep({
            show: true,
            width: '100%',
            status: 'finish'
        })
        this._hide()
    },
    warning () {
        this._keep({
            show: true,
            width: '100%',
            status: 'warning'
        })
        this._hide()
    },
    error () {
        this._keep({
            show: true,
            width: '100%',
            status: 'error'
        })
        this._hide()
    }
}
