import SelectHead from './select-head'
import Drop from '../drop'
import Icon from '../icon'
import Spin from '../spin'
import { UseSelectHeaderMixin } from '../../mixins'
export default {
	mixins: [UseSelectHeaderMixin],
	components: {
		SelectHead,
		Drop,
		Icon,
		Spin
	},
	props: {
		// 组件组装
		value: {
			type: [Number, String, Array],
			default: ''
		},
		data: {
			type: Array,
			required: true,
			default() {
				return []
			}
		},
		// value 字段的映射字段
		valueName: {
			type: String,
			default: 'value'
		},
		// label 字段的映射字段
		labelName: {
			type: String,
			default: 'label'
		},
		// 按哪个字段搜索
		queryName: {
			type: String,
			default: ''
		},
		// 多选
		multiple: {
			type: Boolean,
			default: false
		},
		// drop 属性
		noArrow: {
			type: Boolean,
			default: true
		},
		// select-head 属性
		placeholder: {
			type: String,
			default: ''
		},
		autofocus: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		noDataText: {
			type: String,
			default: '无数据...'
		},
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
	data() {
		return {
			currentData: this.data,
			dropShow: this.autofocus && !this.filterable && !this.disabled,
			width: 220,
			currentItemArr: [],
			currentValueArr: [],
			query: '',
			queryResult: [],
			currentQueryName: this.queryName || this.labelName,
			timer: null,
			loading: true,
			queryLoading: false,
			actionExecution: false // 标识组件为内部操作
		}
	},
	watch: {
		data() {
			this.currentData = this.data
		},
		dropShow(val) {
			this.$emit('on-open-change', val)
			if (!val && !this.multiple) {
				let isCascaderC = this.isThisComponent('zov-cascader')
				let queryName =
					(isCascaderC && !this.filterable ? '__' : '') +
					this.currentQueryName
				let valueName =
					(isCascaderC && !this.filterable ? '__' : '') +
					this.valueName
				this.query = this.currentItemArr[0]
					? this.currentItemArr[0][queryName] ||
					  this.currentItemArr[0][valueName]
					: ''
			}
		},
		value() {
			if (this.actionExecution) {
				return
			}
			this.defaultSelected(() => {
				if (this.autofocus) {
					this.dropShowFocus()
				} else {
					this.dropHideBlur()
				}
				this.$emit(
					'on-change',
					this.multiple ? this.currentItemArr : this.currentItemArr[0]
				)
			})
		}
	},
	methods: {
		isThisComponent(component) {
			return this.$options.name === component
		},
		throttleFn(callback, timeInterval) {
			clearTimeout(this.timer)
			this.timer = null
			this.timer = setTimeout(callback, timeInterval || 300)
		},
		select(item, isDefault) {
			this.actionExecution = true
			if (item.disabled) return
			this.multiple
				? this.check(item, isDefault)
				: this.single(item, isDefault)
			this.$nextTick(() => {
				this.actionExecution = false
			})
		},
		single(item, isDefault) {
			let isCascaderC = this.isThisComponent('zov-cascader')
			let value = item[(isCascaderC ? '__' : '') + this.valueName]
			// 清洗已选
			this.currentItemArr = []
			this.currentValueArr = []
			// 记录已选
			this.currentItemArr.push(item)
			this.currentValueArr.push(value)
			// 暴露数据
			this.$emit('input', value)
			!isDefault && this.$emit('on-change', item)
			// 单选query值设置
			let queryName =
				(isCascaderC && !this.filterable ? '__' : '') +
				this.currentQueryName
			let valueName =
				(isCascaderC && !this.filterable ? '__' : '') + this.valueName
			this.query = item[queryName] || item[valueName]
			// 收起下拉
			!isDefault &&
				(isCascaderC
					? !this.everyoneOptional &&
					  !this.whichColumnOptional.toString() &&
					  this.dropHideBlur()
					: this.dropHideBlur())
		},
		check(item, isDefault) {
			let isCascaderC = this.isThisComponent('zov-cascader')
			let value = item[(isCascaderC ? '__' : '') + this.valueName]
			if (isDefault) {
				this.currentItemArr.push(item)
			} else {
				if (this.currentValueArr.indexOf(value) !== -1) {
					// 清洗已选
					this.$delete(
						this.currentItemArr,
						this.currentItemArr.indexOf(item)
					)
					this.$delete(
						this.currentValueArr,
						this.currentValueArr.indexOf(value)
					)
				} else {
					// 记录已选
					this.currentItemArr.push(item)
					this.currentValueArr.push(value)
				}
			}
			// 暴露数据
			this.$emit('input', this.currentValueArr)
			!isDefault && this.$emit('on-change', this.currentItemArr)
			// 获取焦点
			!isDefault && this.dropShowFocus()
		}
	},
	mounted() {
		this.width = this.$el.offsetWidth
		this.defaultSelected &&
			this.defaultSelected(() => {
				if (this.autofocus) {
					this.dropShowFocus()
				} else {
					this.dropHideBlur()
				}
			})
	},
	updated() {
		if (this.width !== this.$el.offsetWidth) {
			this.width = this.$el.offsetWidth
			return
		}
	}
}
