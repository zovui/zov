<template>
	<div class="box">
		<p style="margin-bottom: 30px">
			size
			<Button size="large" @click="size = 'large'">large</Button>
			<Button @click="size = 'default'">default</Button>
			<Button size="small" @click="size = 'small'">small</Button>
			<Button @click="disabled = !disabled"> disabled </Button>
		</p>
		<ColorPicker
			autofocus
			:no-arrow="false"
			:size="size"
			:disabled="disabled"
			v-model="c"
			recommend
			@on-open-change="open"
			@on-change="change"
			@on-active-change="active"
		/>
		<ColorPicker
			:size="size"
			:disabled="disabled"
			v-model="c1"
			format="hsv"
			recommend
			:colors="['red', 'green', '#ccc', 'rgba(12,211,12,0.2)']"
		/>
		<ColorPicker
			:size="size"
			:disabled="disabled"
			v-model="c2"
			format="hsl"
		/>
		<ColorPicker
			:size="size"
			:disabled="disabled"
			v-model="c3"
			format="hex"
		/>
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<p>@v-model 必传，String && ColorString，组件输出的值</p>
			<p>@no-arrow 非必传，Boolean，drop容器的尖角，默认:true</p>
			<p>@autofocus 非必传，Boolean，自动获取焦点，默认:false</p>
			<p>@disabled 非必传，Boolean，disabled，默认:false</p>
			<p>@format 非必传，String，组件输出值得格式，默认: rgb</p>
			<p>@recommend 非必传，Boolean，是否显示推荐色，默认: false</p>
			<p>@colors 非必传，Array，推荐的颜色，默认[...]</p>
			<p>@size 非必传，String，form元素的size，默认:'default</p>
			<h3>回调事件</h3>
			<p>@on-open-change 组件drop呼出、收起的回调，形参：Boolean</p>
			<p>
				@on-change 组件值发生变化后的回调，形参为<a
					href="https://www.npmjs.com/package/tinycolor2"
					>tinycolor</a
				>对象
			</p>
			<p>
				@on-active-change
				面板中当前显示的颜色发生改变时触发的回调，形参：形参为<a
					href="https://www.npmjs.com/package/tinycolor2"
					>tinycolor</a
				>对象
			</p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			size: 'default',
			disabled: false,
			c: 'rgba(23, 11, 123, 1)',
			c1: 'red',
			c2: 'green',
			c3: '#fff'
		}
	},
	methods: {
		open(b) {
			console.log(b)
		},
		change(c) {
			console.log(c)
		},
		active(c) {
			console.log(c)
		}
	}
}
</script>
<style lang="scss" scoped>
.box > div {
	margin: 5px;
}
</style>
