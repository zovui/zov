<template>
	<div style="text-align: center">
		<ul>
			<b>属性</b>
			<li>
				大：<Input
					size="large"
					autofocus
					placeholder="这是一个自动获取焦点的input"
				/>
			</li>
			<li>
				默认：<Input disabled placeholder="这是一个disabled的input" />
			</li>
			<li>
				小：<Input
					size="small"
					clearable
					placeholder="这是一个可清除的input"
				/>
			</li>
		</ul>
		<ul>
			<b>功能</b>
			一切vue对原生input支持的功能都将支持在ZovInput组件上
			<li>
				<Input
					v-model="inputV"
					@focus="$event.target.style.background = 'red'"
					@blur="$event.target.style.background = 'unset'"
					placeholder="这是测试focus、blur事件的input"
				/>
			</li>
			<li>
				<Input
					v-model="inputV"
					@input="zov_input"
					placeholder="这是测试input事件的input"
				/>
			</li>
			<li>
				<Input
					v-model="inputV"
					@change="
						$event.target.style.color =
							['red', 'green', 'blue'][
								((Math.random() * 10) / 2).toFixed()
							] || 'green'
					"
					placeholder="这是测试change事件的input"
				/>
			</li>
		</ul>
		<ul>
			自定义图标
			<li>
				<Input
					v-model="inputV"
					prefix="contact"
					suffix="search"
					placeholder="输入用户名"
				/>
			</li>
		</ul>
		<ul>
			自定义功能
			<li>
				<Input
					block
					v-model="inputV"
					clearable
					suffix="search"
					placeholder="这是一个可清除,并加搜索的input"
				/>
			</li>
			<li>
				<Input
					v-model="inputV"
					type="number"
					placeholder="这是一个加搜索按钮的input"
				/>
			</li>
			<li>
				<Input
					v-model="inputV"
					clearable
					eye
					type="password"
					placeholder="这是一个可看的密码input"
				/>
			</li>
			slot
			<li>
				<Input
					v-model="inputV"
					clearable
					eye
					placeholder="这是一个可看的密码input"
				>
					<template #prefix
						><span>有</span></template
					>
					<template #suffix
						><span>个</span></template
					>
				</Input>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			inputV: ''
		}
	},
	methods: {
		zov_input(v) {
			console.log(v)
		}
	}
}
</script>
<style lang="scss" scoped>
ul {
	li {
		margin: 5px 0;
	}
}
</style>
