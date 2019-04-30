<template>
	<div>
		<h2>基础</h2>
		24时制
		<TimePicker
			v-model="t1"
			placeholder="HH时mm分ss秒"
			format="HH时mm分ss秒"
			autofocus
		/>
		<TimePicker
			v-model="t2"
			placeholder="H时m分s秒"
			format="H时m分s秒"
			:steps="[2, 10, 15]"
		/>
		<TimePicker
			v-model="t3"
			placeholder="HH:mm:ss"
			format="HH:mm:ss"
			@on-change="change"
			@on-open-change="open"
		/>
		12时制
		<TimePicker use12HourSystem v-model="t4" />
		<TimePicker
			use12HourSystem
			placeholder="HH:mm:ss a"
			format="a h:mm:ss"
			v-model="t4"
		/>
		<h2>非全时 依赖format h:m:s的项目数，自动实现列数隐藏</h2>
		<TimePicker v-model="t5" format="H时m分" :steps="[2, 10, 15]" />
		<TimePicker v-model="t6" format="H时s秒" :steps="[2, 10, 15]" />
		<h2>限制</h2>
		<TimePicker
			format="HH时mm分ss秒"
			:disabled-times="{
				h: [1, 2],
				m: (() => {
					return [2, 4, 6, 8]
				})(),
				s: []
			}"
		/>
		<TimePicker
			:value="'12:12:12'"
			format="HH时mm分ss秒"
			:disabled-times="{
				h: [1, 2],
				m: (() => {
					return [2, 4, 6, 8]
				})(),
				s: []
			}"
			hide-disabled-options
		/>
		<!-- 参数-->
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<p>@v-model 必传，String，组件输出的值</p>
			<p>
				@multiple 非必传，Boolean，多选，默认:false，仅在
				date、week、month、year 下可用
			</p>
			<p>@no-arrow 非必传，Boolean，drop容器的尖角，默认:true</p>
			<p>@placeholder 非必传，String，placeholder，默认:''</p>
			<p>@autofocus 非必传，Boolean，自动获取焦点，默认:false</p>
			<p>@format 非必传，Time类型，默认 HH:mm:ss</p>
			<span style="color: green">
				用法： HH:mm:ss HH时mm分ss秒 H:m:s
			</span>
			<p>@disabled 非必传，Boolean，disabled，默认:false</p>
			<p>
				@disabled-times 非必传，Object，限制禁用时间，默认: {h: [], m:
				[], s: []}
			</p>
			<span style="color: green">
				用法： { h: [1, 2], m: [...], s: [...] }
			</span>
			<p>
				@hide-disabled-options 非必传，Boolean，隐藏限制项，默认: false
			</p>
			<p>@use12HourSystem 非必传，Boolean，采用12时制，默认：false</p>
			<span style="color: green">
				说明：采用12时制度后 format 默认设置为 hh:mm:ss a
				，调用者应当遵循12时制format规则
				<br />
				如：h:m:s a 或者 h:m:s A等。 <br />
				注意：此参数优先级低于format。
			</span>
			<h3>回调事件</h3>
			<p>@on-open-change 组件drop呼出、收起的回调，形参：Boolean</p>
			<p>
				@on-change
				组件值发生变化后的回调，形参：单选【当前所选项的item】，多选【已选所有项的items】
			</p>
			<h3>补充说明</h3>
			<p style="color: red">
				注意： format
				是矫正时间格式的依赖，开发者需要保证给组件传入默认的value格式是遵循format规定的。
				默认： HH:mm:ss H:m:s HH:mm
			</p>
		</div>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			t1: '10:12:30',
			t2: '10:12:31',
			t3: '10:12:32',
			t4: '15:12:34',
			t5: '10:12:35',
			t6: '10:12:36'
		}
	},
	methods: {
		change(val) {
			console.log(val)
		},
		open(type) {
			console.log(type)
		}
	},
	mounted() {
		console.log(dayjs('2019-11-23' + '10:12').format('H:s'))
	}
}
</script>
