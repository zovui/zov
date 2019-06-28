<template>
	<ul :class="simpleWrapClasses" :style="styles" v-if="simple">
		<li :title="'上一页'" :class="prevClasses" @click="prev">
			<a
				><Icon
					:class="[stylePrefix + '-icon-size']"
					iconname="arrow-back"
			/></a>
		</li>
		<div :class="simplePagerClasses" :title="currentPage + '/' + allPages">
			<!-- <input
				type="text"
				:value="currentPage"
				@keydown="keyDown"
				@keyup="keyUp"
				@change="keyUp"
			/> -->
			<Input
				:class="[stylePrefix + '-input']"
				type="text"
				:value="currentPage"
				@keydown="keyDown"
				@keyup="keyUp"
				@change="keyUp"
			/>
			<span>/</span>
			{{ allPages }}
		</div>
		<li :title="'下一页'" :class="nextClasses" @click="next">
			<a
				><Icon
					:class="[stylePrefix + '-icon-size']"
					iconname="arrow-forward"
			/></a>
		</li>
	</ul>
	<ul :class="wrapClasses" :style="styles" v-else>
		<span :class="[stylePrefix + '-total']" v-if="showTotal">
			<slot
				>共 {{ total }}
				<template v-if="total <= 1"
					>条</template
				><template v-else
					>条</template
				></slot
			>
		</span>
		<li :title="'上一页'" :class="prevClasses" @click="prev">
			<a
				><template v-if="prevText !== ''">{{ prevText }}</template
				><Icon v-else iconname="arrow-back"
			/></a>
		</li>
		<li title="1" :class="firstPageClasses" @click="changePage(1)">
			<a>1</a>
		</li>
		<li
			:title="'上五页'"
			v-if="currentPage > 5"
			:class="[stylePrefix + '-item-jump-prev']"
			@click="fastPrev"
		>
			<Icon :class="[stylePrefix + '-arrow']" iconname="arrow-back" />
			<Icon :class="[stylePrefix + '-more']" iconname="more" />
		</li>
		<li
			:title="currentPage - 3"
			v-if="currentPage === 5"
			:class="[stylePrefix + '-item']"
			@click="changePage(currentPage - 3)"
		>
			<a>{{ currentPage - 3 }}</a>
		</li>
		<li
			:title="currentPage - 2"
			v-if="currentPage - 2 > 1"
			:class="[stylePrefix + '-item']"
			@click="changePage(currentPage - 2)"
		>
			<a>{{ currentPage - 2 }}</a>
		</li>
		<li
			:title="currentPage - 1"
			v-if="currentPage - 1 > 1"
			:class="[stylePrefix + '-item']"
			@click="changePage(currentPage - 1)"
		>
			<a>{{ currentPage - 1 }}</a>
		</li>
		<li
			:title="currentPage"
			v-if="currentPage != 1 && currentPage != allPages"
			:class="[stylePrefix + '-item', stylePrefix + '-item-active']"
		>
			<a>{{ currentPage }}</a>
		</li>
		<li
			:title="currentPage + 1"
			v-if="currentPage + 1 < allPages"
			:class="[stylePrefix + '-item']"
			@click="changePage(currentPage + 1)"
		>
			<a>{{ currentPage + 1 }}</a>
		</li>
		<li
			:title="currentPage + 2"
			v-if="currentPage + 2 < allPages"
			:class="[stylePrefix + '-item']"
			@click="changePage(currentPage + 2)"
		>
			<a>{{ currentPage + 2 }}</a>
		</li>
		<li
			:title="currentPage + 3"
			v-if="allPages - currentPage === 4"
			:class="[stylePrefix + '-item']"
			@click="changePage(currentPage + 3)"
		>
			<a>{{ currentPage + 3 }}</a>
		</li>
		<li
			:title="'下五页'"
			v-if="allPages - currentPage >= 5"
			:class="[stylePrefix + '-item-jump-next']"
			@click="fastNext"
		>
			<Icon :class="[stylePrefix + '-arrow']" iconname="arrow-forward" />
			<Icon :class="[stylePrefix + '-more']" iconname="more" />
		</li>
		<li
			:title="allPages"
			v-if="allPages > 1"
			:class="lastPageClasses"
			@click="changePage(allPages)"
		>
			<a>{{ allPages }}</a>
		</li>
		<li :title="'下一页'" :class="nextClasses" @click="next">
			<a
				><template v-if="nextText !== ''">{{ nextText }}</template
				><Icon v-else iconname="arrow-forward"
			/></a>
		</li>
		<Options
			:show-sizer="showSizer"
			:page-size="currentPageSize"
			:data="pageSizeOpts"
			:show-elevator="showElevator"
			:current="currentPage"
			:all-pages="allPages"
			:is-small="isSmall"
			@on-size="onSize"
			@on-page="onPage"
		>
		</Options>
	</ul>
</template>
<script>
import { oneOf } from '../../utils'
import Icon from '../icon'
import Input from '../input'
import Select from '../select'
import Options from './options.vue'

const prefix = 'zov-page'
export default {
	name: prefix,
	components: {
		Icon,
		Select,
		Options
	},
	props: {
		current: {
			type: Number,
			default: 1
		},
		total: {
			type: Number,
			default: 0
		},
		pageSize: {
			type: Number,
			default: 10
		},
		pageSizeOpts: {
			type: Array,
			default() {
				return [
					{ value: 10 },
					{ value: 20 },
					{ value: 30 },
					{ value: 40 }
				]
			}
		},
		size: {
			validator(value) {
				return oneOf(value, ['small'])
			}
		},
		simple: {
			type: Boolean,
			default: false
		},
		showTotal: {
			type: Boolean,
			default: false
		},
		showElevator: {
			type: Boolean,
			default: false
		},
		showSizer: {
			type: Boolean,
			default: false
		},
		className: {
			type: String
		},
		styles: {
			type: Object
		},
		prevText: {
			type: String,
			default: ''
		},
		nextText: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			stylePrefix: prefix,
			currentPage: this.current,
			currentPageSize: this.pageSize
		}
	},
	watch: {
		total(val) {
			let maxPage = Math.ceil(val / this.currentPageSize)
			if (maxPage < this.currentPage) {
				this.currentPage = maxPage === 0 ? 1 : maxPage
			}
		},
		current(val) {
			this.currentPage = val
		},
		pageSize(val) {
			this.currentPageSize = val
		}
	},
	beforeCreated() {
		if (this.pageSize == this.pageSizeOpts[0].value) {
			return
		} else {
			this.pageSize = this.pageSizeOpts[0].value
		}
	},
	computed: {
		isSmall() {
			return !!this.size
		},
		allPages() {
			const allPage = Math.ceil(this.total / this.currentPageSize)
			return allPage === 0 ? 1 : allPage
		},
		simpleWrapClasses() {
			return [
				`${prefix}`,
				`${prefix}-simple`,
				{
					[`${this.className}`]: !!this.className
				}
			]
		},
		simplePagerClasses() {
			return `${prefix}-simple-pager`
		},
		wrapClasses() {
			return [
				`${prefix}`,
				{
					[`${this.className}`]: !!this.className,
					mini: !!this.size
				}
			]
		},
		prevClasses() {
			return [
				`${prefix}-prev`,
				{
					[`${prefix}-disabled`]: this.currentPage === 1,
					[`${prefix}-custom-text`]: this.prevText !== ''
				}
			]
		},
		nextClasses() {
			return [
				`${prefix}-next`,
				{
					[`${prefix}-disabled`]: this.currentPage === this.allPages,
					[`${prefix}-custom-text`]: this.nextText !== ''
				}
			]
		},
		firstPageClasses() {
			return [
				`${prefix}-item`,
				{
					[`${prefix}-item-active`]: this.currentPage === 1
				}
			]
		},
		lastPageClasses() {
			return [
				`${prefix}-item`,
				{
					[`${prefix}-item-active`]:
						this.currentPage === this.allPages
				}
			]
		}
	},
	methods: {
		changePage(page) {
			if (this.currentPage != page) {
				this.currentPage = page
				this.$emit('update:current', page)
				this.$emit('on-change', page)
			}
		},
		prev() {
			const current = this.currentPage
			if (current <= 1) {
				return false
			}
			this.changePage(current - 1)
		},
		next() {
			const current = this.currentPage
			if (current >= this.allPages) {
				return false
			}
			this.changePage(current + 1)
		},
		fastPrev() {
			const page = this.currentPage - 5
			if (page > 0) {
				this.changePage(page)
			} else {
				this.changePage(1)
			}
		},
		fastNext() {
			const page = this.currentPage + 5
			if (page > this.allPages) {
				this.changePage(this.allPages)
			} else {
				this.changePage(page)
			}
		},
		onSize(pageSize) {
			this.currentPageSize = pageSize
			this.$emit('on-page-size-change', pageSize)
			this.changePage(1)
		},
		onPage(page) {
			this.changePage(page)
		},
		keyDown(e) {
			const key = e.keyCode
			//keycode 48-57:0-9   keycode 96-105 数字键盘 0-9   keycode=8： backspace  keycode==37 leftarrow 可以从的code===39 rightqrrow
			const condition =
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105) ||
				key === 8 ||
				key === 37 ||
				key === 39

			if (!condition) {
				e.preventDefault()
			}
		},
		keyUp(e) {
			const key = e.keyCode
			const val = parseInt(e.target.value)
			//38：uparrow 40：downarrow 13：enter
			if (key === 38) {
				this.prev()
			} else if (key === 40) {
				this.next()
			} else if (key === 13) {
				let page = 1

				if (val > this.allPages) {
					page = this.allPages
				} else if (val <= 0 || !val) {
					page = 1
				} else {
					page = val
				}

				e.target.value = page
				this.changePage(page)
			}
		}
	}
}
</script>
