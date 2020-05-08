<template>
	<div class="zov-rate" v-if="length > 0">
		<svg
			style="position: absolute; width: 0; height: 0;"
			width="0"
			height="0"
			version="1.1"
		>
			<defs>
				<symbol id="icon-star-full" viewBox="0 0 32 32">
					<title>star-full</title>
					<path :d="svgPath"></path>
				</symbol>
			</defs>
		</svg>
		<input type="hidden" :name="name" v-model="rate" :required="required" />
		<template v-for="n in length">
			<button
				type="button"
				:key="n"
				class="Rate__star"
				:style="{
					color: n <= over || (n <= rate || isFilled(n)) ? color : '',
					paddingRight: right,
					paddingLeft: left
				}"
				@mouseover="onOver(n)"
				@mouseout="onOut(n)"
				@click="setRate(n)"
				@keyup="onOver(n)"
				@keyup.enter="setRate(n)"
				:disabled="disabled"
			>
				<svg class="icon" :style="{ width: width, height: height }">
					<use xlink:href="#icon-star-full"></use>
				</svg>
			</button>
		</template>
		<span class="Rate__view" :class="{ disabled: disabled }">
			<span class="count" v-if="showcount">{{ over }}</span>
			<span class="desc" v-if="ratedesc.length > 0">{{
				ratedesc[over - 1]
			}}</span>
		</span>
	</div>
</template>

<script>
const prefix = 'zov-rate'
export default {
	name: prefix,
	props: {
		value: {
			type: [Number, String]
		},
		name: {
			type: String,
			default: 'rate'
		},
		length: {
			type: Number,
			default: 5
		},
		showcount: {
			type: Boolean
		},
		required: {
			type: Boolean
		},
		ratedesc: {
			type: Array,
			default() {
				return []
			}
		},
		disabled: { type: Boolean, default: false },
		readonly: { type: Boolean, default: false },
		color: {
			type: String,
			default: '#efc20f'
		},
		right: {
			type: [String],
			default: '5px'
		},
		left: {
			type: [String],
			default: '5px'
		},
		svgPath: {
			type: [String],
			default:
				'M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z'
		},
		width: {
			type: [String],
			default: '16px'
		},
		height: {
			type: [String],
			default: '16px'
		}
	},
	data() {
		return {
			over: 0,
			rate: 0
		}
	},
	methods: {
		convertValue(value) {
			if (value >= this.length) {
				value = this.length
			} else if (value < 0) {
				value = 0
			}
			return value
		},
		onOver(index) {
			if (!this.readonly) this.over = index
		},
		onOut() {
			if (!this.readonly) this.over = this.rate
		},
		setRate(index) {
			if (this.readonly) return false
			this.$emit('before-rate', this.rate)
			this.rate = index
			this.$emit('input', this.rate)
			this.$emit('after-rate', this.rate)
		},
		isFilled(index) {
			return index <= this.over
		}
	},
	watch: {
		value(val) {
			this.rate = this.convertValue(this.value)
			this.over = this.convertValue(this.value)
		}
	},
	created() {
		if (this.value >= this.length) {
			this.value = this.length
		} else if (this.value < 0) {
			this.value = 0
		}
		this.rate = this.convertValue(this.value)
		this.over = this.convertValue(this.value)
	}
}
</script>
