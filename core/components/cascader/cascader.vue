<template>
	<div class="zov-select zov-cascader">
		<Drop
			:no-arrow="noArrow"
			:trigger="trigger"
			placement="bottom-start"
			:never="disabled"
			v-model="dropShow"
		>
			<template #drop-head>
				<SelectHead
					ref="zov-select-head"
					:data="currentItemArr"
					:disabled="disabled"
					:placeholder="placeholder"
					:size="size"
					:filterable="filterable"
					:multiple="multiple"
					:clearable="clearable"
					:label-name="'__' + labelName"
					v-model="query"
					:dropShow="dropShow"
					@on-remove-tag="activeItem"
					@on-clear="clear"
					@click.native.stop="!disabled && dropShowFocus()"
				/>
			</template>
			<div class="zov-cascader-body">
				<div
					class="zov-cascader-body-search-box"
					:style="{
						width: width + 'px'
					}"
					v-if="filterable"
					v-show="query"
				>
					<div v-if="queryResult.length">
						<div
							v-for="(item, index) in queryResult"
							:key="index + ''"
							:class="[
								'zov-select-option',
								{
									'zov-cascader-option-selected':
										currentValueArr.indexOf(
											item['__' + valueName]
										) !== -1
								}
							]"
							v-if="canSelect(item)"
							@click.stop.capture="activeItem(item)"
						>
							<span
								v-html="
									item['__' + labelName].replace(
										item[labelName],
										`
                                <span class='zov-cascader-option-match'>
                                    ${item[labelName]}
                                </span>
                            `
									)
								"
							/>
							<Icon
								class="zov-cascader-option-arrow-forward"
								v-if="
									currentValueArr.indexOf(
										item['__' + valueName]
									) !== -1
								"
								iconname="checkmark"
							/>
						</div>
					</div>
				</div>
				<div v-show="!(filterable && query)">
					<CascaderColumn
						:data="currentData"
						:selected-values="currentValueArr"
						:active-values="activeArr"
						:label-name="labelName"
						:value-name="valueName"
						:child-name="childName"
						:filterable="filterable"
					/>
				</div>
				<div
					class="zov-cascader-no-data"
					v-if="
						!currentData.length ||
							(!queryResult.length && filterable && query)
					"
				>
					<Spin v-if="queryLoading" />
					<span v-else>{{ noDataText }}</span>
				</div>
			</div>
			<Spin cover v-show="loading" />
		</Drop>
	</div>
</template>
<script>
import CascaderColumn from './cascader-column'
import SelectedMixin from '../select/select-mixin'
import CascaderMixin from './cascader-mixin'
const prefix = 'zov-cascader'
export default {
	name: prefix,
	components: {
		CascaderColumn
	},
	mixins: [SelectedMixin, CascaderMixin],
	props: {
		everyoneOptional: {
			// 是否每个可选
			type: Boolean,
			default: false
		},
		whichColumnOptional: {
			// 哪列可选
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			querySelections: [],
			activeArr: []
		}
	},
	computed: {
		trigger() {
			return this.filterable ? 'focus' : 'click'
		}
	},
	watch: {
		query(val) {
			if (!this.filterable) return
			this.queryResult = []
			this.queryLoading = true
			if (val === '') return
			this.throttleFn(() => {
				for (let i = 0; i < this.querySelections.length; i++) {
					let item = this.querySelections[i]
					if (
						new RegExp(val).test(
							item[this.currentQueryName].toString()
						)
					) {
						this.queryResult.push(item)
					}
				}
				this.queryLoading = false
			}, 10)
		}
	},
	created() {
		let _this = this
		function getSelections(num, arr, label, value) {
			value = String(value) !== 'undefined' ? String(value) : undefined
			for (let i = 0; i < arr.length; i++) {
				let item = arr[i]
				if (item.__floor !== undefined) {
					// 通过检查 `this.data[0].__floor` 感知数据是否被组件修正过，这里判断被修正过。
					if (_this.hasChildren(item)) {
						getSelections(num + 1, item[_this.childName])
					}
				} else {
					item.__floor = num
					// value转存，最终输出value的fullpath值
					item['__' + _this.labelName] = label
						? label + '/' + item[_this.labelName]
						: item[_this.labelName]
					item['__' + _this.valueName] = value
						? value + ',' + item[_this.valueName]
						: item[_this.valueName]
					if (_this.hasChildren(item)) {
						getSelections(
							num + 1,
							item[_this.childName],
							item['__' + _this.labelName],
							item['__' + _this.valueName]
						)
					} else {
						item.last = true
					}
				}
				_this.querySelections.push(item)
			}
		}
		getSelections(0, this.currentData)
	},
	methods: {
		canSelect(item) {
			/**
			 * 这里为什么不给每项加optional字段，而是用过条件判断实现此项是否可选？
			 * 1、不想污染源数据；
			 * 2、考虑组件复用，多余的数据都会被视为负载
			 **/
			// 优先级 whichColumnOptional > everyoneOptional > last
			if (this.whichColumnOptional.length) {
				if (this.whichColumnOptional.indexOf(item.__floor) !== -1)
					return true
			} else if (this.everyoneOptional) {
				return true
			} else if (item.last) {
				return true
			}
		},
		defaultSelected(callback) {
			if (
				this.value === null ||
				this.value === undefined ||
				!this.value.toString()
			) {
				this.loading = false
				return
			}
			this.value instanceof Array
				? (this.currentValueArr = this.value)
				: (this.currentValueArr[0] = this.value)
			// 初始化选择
			this.currentValueArr.forEach(item => {
				for (let i = 0; i < this.querySelections.length; i++) {
					let x = this.querySelections[i]
					if (item === x['__' + this.valueName]) {
						this.activeItem(this.querySelections[i], 'default')
						break
					}
				}
			})
			this.loading = false
			callback && callback()
		}
	}
}
</script>
