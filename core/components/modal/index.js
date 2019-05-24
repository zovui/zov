import Modal from './modal'
import Vue from 'vue'

const prefix = 'zov-modal'

/**
 * type与iconName映射表
 * @type {{info: string, success: string, warning: string, error: string, confirm: string}}
 */
const ICON = {
	info: 'information-circle',
	success: 'checkmark-circle',
	warning: 'alert',
	error: 'close-circle',
	confirm: 'help-circle'
}

let modalInstance

/**
 * 过滤出可用参数
 * @param props
 * @returns {{type: (string), title: (*|string), content: (*|string), render: *, width: (*|number), confirmText: *, cancelText: (*|string), closable: (string|boolean|closable|{type, default}), maskClosable: (maskClosable|{type, default}|boolean), confirmLoading: (boolean|confirmLoading|{type, default}|default.watch.confirmLoading), bottomAlign: (bottomAlign|{type, validator, default}|string), onConfirm: (*|onConfirm|Function), onCancel: (*|Function), headerHide: (headerHide|{type, default}|boolean), showCancel: boolean}}
 */
const filterProps = props => {
	let _props = {
		type: props.type || '',
		title: props.title || '',
		content: props.content || '',
		render: props.render,
		width: props.width || 400,
		confirmText: props.confirmText,
		cancelText: props.cancelText,
		closable: props.closable || false,
		maskClosable: props.maskClosable || false,
		confirmLoading: props.confirmLoading || false,
		bottomAlign: props.bottomAlign || 'right',
		onConfirm: props.onConfirm || (() => {}),
		onCancel: props.onCancel || (() => {}),
		headerHide: props.headerHide || true,
		showCancel: props.showCancel
	}
	_props.iconName = ICON[props.type] || props.iconName

	if (!_props.type) {
		_props.iconColor = props.iconColor
	}

	return _props
}

/**
 * 生成Modal实例，并使modalInstance指向该实例
 * @param props
 * @returns {{buttonLoading, onConfirm, onCancel}|{show, remove}}
 */
function getInstance(props) {
	return (modalInstance = Modal.newInstance(props))
}

/**
 * 用于生成Modal实例
 * @param props
 * @returns {*}
 */
Modal.newInstance = props => {
	const _props = props || {}

	const Instance = new Vue({
		data() {
			return {
				buttonLoading: false,
				onConfirm: _props.onConfirm,
				onCancel: _props.onCancel
			}
		},
		render(h) {
			return h('Modal', {
				props: _props,
				ref: 'modal',
				scopedSlots: {
					default: () => {
						// 如果有render则优先展示render
						if (typeof _props.render === 'function') {
							return _props.render(h)
						} else {
							return h(
								'div',
								{
									class: [
										prefix + '-body-instance',
										{
											[prefix +
											'-body-' +
											_props.type]: !!_props.type
										}
									]
								},
								[
									h('Icon', {
										props: {
											iconname: _props.iconName || ''
										},
										class: prefix + '-body-instance-icon',
										style: {
											color: _props.iconColor || ''
										}
									}),
									h(
										'div',
										{
											class:
												prefix + '-body-instance-main'
										},
										[
											h('h2', {
												class:
													prefix +
													'-body-instance-title',
												domProps: {
													innerHTML:
														_props.title || ''
												}
											}),
											h('p', {
												class:
													prefix +
													'-body-instance-text',
												domProps: {
													innerHTML:
														_props.content || ''
												}
											})
										]
									)
								]
							)
						}
					},
					footer: () => {
						let buttoms = []
						if (_props.showCancel) {
							buttoms.push(
								h(
									'Button',
									{
										on: {
											click: this.handleCancel
										}
									},
									_props.cancelText
								)
							)
						}
						buttoms.push(
							h(
								'Button',
								{
									props: {
										looks: 'primary',
										loading: this.buttonLoading
									},
									on: {
										click: this.handleConfirm
									}
								},
								_props.confirmText
							)
						)
						return h('div', {}, buttoms)
					}
				}
			})
		},
		methods: {
			handleConfirm() {
				if (_props.confirmLoading) {
					this.buttonLoading = true
				} else {
					this.$refs.modal.confirm()
					this.remove()
				}
				this.onConfirm()
			},
			handleCancel() {
				this.$refs.modal.cancel()
				this.onCancel()
				this.remove()
			},
			remove() {
				setTimeout(() => {
					this.destroy()
				}, 3000)
			},
			destroy() {
				this.$destroy()
			}
		}
	})

	const component = Instance.$mount()
	document.body.appendChild(component.$el)
	const modal = Instance.$children[0]

	return {
		show() {
			modal.visible = true
		},
		remove() {
			modal.visible = false
			modal.$parent.remove()
		}
	}
}

Modal.confirm = (props = {}) => {
	props.showCancel = true
	props.confirmText = props.confirmText || '确定'
	props.cancelText = props.cancelText || '取消'
	props.type = 'confirm'
	let instance = getInstance(filterProps(props))
	instance.show()
}

Modal.alert = (props = {}) => {
	props.showCancel = false
	props.confirmText = props.confirmText || '知道了'
	let instance = getInstance(filterProps(props))
	instance.show()
}

Modal.info = (props = {}) => {
	props.type = 'info'
	Modal.alert(props)
}

Modal.success = (props = {}) => {
	props.type = 'success'
	Modal.alert(props)
}

Modal.error = (props = {}) => {
	props.type = 'error'
	Modal.alert(props)
}

Modal.warning = (props = {}) => {
	props.type = 'warning'
	Modal.alert(props)
}

Modal.remove = () => {
	modalInstance.remove()
}

export default Modal
