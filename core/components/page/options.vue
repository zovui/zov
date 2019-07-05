<template>
	<div v-if="showSizer || showElevator" :class="optsClasses">
		<div v-if="showSizer" :class="sizerClasses">
			<Select
				:class="pageSelectClasses"
				:clearable="false"
				:data="data"
				v-model="currentPageSize"
				:size="size"
				@on-change="changeSize"
			>
			</Select>
			条/页
		</div>
		<div v-if="showElevator" :class="ElevatorClasses">
			跳至
			<Input
				:class="[stylePrefix + '-input']"
				type="text"
				:value="current"
				:size="size"
				@blur="changePage"
				@keyup.enter="changePage"
			/>
			页
		</div>
	</div>
</template>
<script>
import Select from '../../components/select/select.vue'
import Input from '../../components/input/input.vue'
import { testNumber } from '../../utils'

const prefix = 'zov-page'
export default {
	components: { Select, Input },
	props: {
		data: Array,
		showSizer: Boolean,
		showElevator: Boolean,
		current: Number,
		pageSize: Number,
		allPages: Number,
		isSmall: Boolean
	},
	data() {
		return {
			currentPageSize: this.pageSize,
			stylePrefix: prefix
		}
	},
	created() {
		if (this.data[0].value == this.currentPageSize) {
			return
		} else {
			this.currentPageSize = this.data[0].value
		}
	},
	watch: {
		pageSize(val) {
			this.currentPageSize = val
		}
	},
	computed: {
		size() {
			return this.isSmall ? 'small' : 'default'
		},
		optsClasses() {
			return [`${prefix}-options`]
		},
		pageSelectClasses() {
			return `${prefix}-select`
		},
		sizerClasses() {
			return [`${prefix}-options-sizer`]
		},
		ElevatorClasses() {
			return [`${prefix}-options-elevator`]
		}
	},
	methods: {
		changeSize() {
			this.$emit('on-size', this.currentPageSize)
		},
		changePage(e) {
			let val = e.target.value.trim()
			let page = 0

			if (testNumber(val)) {
				val = Number(val)
				if (val != this.current) {
					const allPages = this.allPages

					if (val > allPages) {
						page = allPages
					} else {
						page = val
					}
				}
			} else {
				page = 1
			}
			if (page) {
				this.$emit('on-page', page)
				e.target.value = page
			}
		}
	}
}
</script>
