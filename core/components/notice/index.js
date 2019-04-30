import Notice from './notice'
import Vue from 'vue'
export default {
	_instance: undefined,
	_init() {
		// new 一个新vue实例
		const instance = new Vue({
			render: h =>
				h(Notice, {
					props: {
						type: 'notice'
					}
				})
		})
		// 将vue实例中的dom插入到body中，先调用实例的生命钩子函数确保实例组件已挂载。
		document.body.appendChild(instance.$mount().$el)
		// 获取vue实例中的第一个子组件，这里指向组件本身'notce'
		this._instance = instance.$children[0]
		return this._instance
	},
	_getInstance() {
		// 获取组件notice的实例，如果实例未创建，则创建并返回
		return this._instance ? this._instance : this._init()
	},
	_addNotice(data) {
		this._getInstance().$set(
			this._getInstance().list,
			new Date().getTime(),
			data
		)
	},
	open(data) {
		data = Object.assign(
			{
				title: '这是一条普通消息',
				status: 'open'
			},
			data
		)
		this._addNotice(data)
	},
	info(data) {
		data = Object.assign(
			{
				title: '这是一条带图标的普通消息',
				status: 'info'
			},
			data
		)
		this._addNotice(data)
	},
	success(data) {
		data = Object.assign(
			{
				title: '恭喜，操作成功',
				status: 'success'
			},
			data
		)
		this._addNotice(data)
	},
	error(data) {
		data = Object.assign(
			{
				title: '遗憾，操作失败',
				status: 'error'
			},
			data
		)
		this._addNotice(data)
	},
	warning(data) {
		data = Object.assign(
			{
				title: '注意，请注意',
				status: 'warning'
			},
			data
		)
		this._addNotice(data)
	}
}
