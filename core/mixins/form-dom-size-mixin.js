export default {
	props: {
		// 尺寸有3中，small、default(middle)、large。说明：尺寸标识着按钮在项目中的不同语义，如：适用于长流程、多嵌套的form编辑中涉及到的多级别操作按钮
		size: {
			type: String,
			validator(value) {
				return ['small', 'default', 'large'].indexOf(value) !== -1
			},
			default() {
				return 'default'
			}
		}
	},
	computed: {
		sizeClasses() {
			if (this.size && this.size !== 'default')
				return this.stylePrefix + '-size-' + this.size
		}
	}
}
