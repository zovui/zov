<template>
	<div style="text-align: center">
		<p>
			全配置项
			<Button @click="test">open</Button>
		</p>
		<p>
			无配置
			<Button @click="$Message.open()">open</Button> |
			<Button looks="info" @click="$Message.info()">info</Button> |
			<Button looks="success" @click="$Message.success()">success</Button>
			| <Button looks="error" @click="$Message.error()">error</Button> |
			<Button looks="warning" @click="$Message.warning()">waring</Button>
		</p>
		<p>
			灵活配置
			<Button
				@click="
					$Message.open({
						title: '提示',
						text: '您打开了一条 普通 的notice消息！'
					})
				"
				>open</Button
			>
			|
			<Button
				looks="info"
				@click="
					$Message.info({
						title: '提示',
						text: '您打开了一条 info 的notice消息！不自动关闭',
						duration: 0
					})
				"
				>info</Button
			>
			|
			<Button
				looks="success"
				@click="
					$Message.success({
						text:
							'您打开了一条 success 的notice消息！10s，没有关闭按钮',
						duration: 10000,
						closable: false
					})
				"
				>success</Button
			>
			|
			<Button
				looks="error"
				@click="
					$Message.error({
						text: '您打开了一条 error 的notice消息！不自动关闭',
						duration: 0
					})
				"
				>error</Button
			>
			|
			<Button
				looks="warning"
				@click="
					$Message.warning({
						text: '您打开了一条 waring 的notice消息！不自动关闭',
						duration: 0
					})
				"
				>waring</Button
			>
		</p>
	</div>
</template>
<script>
export default {
	methods: {
		test() {
			this.$Message.open({
				// 标题
				title: 'test info标题',
				// 说明
				text: 'test info文案info文案info文案info文案info文案',
				// 停留时间，为 0 时则长久停留
				duration: Math.random() * 10000,
				// 关闭的回调
				onClose: function() {
					console.log('close')
				},
				// 自定义描述
				render: h => {
					return h('div', [
						'这是render出来的',
						h('div', ['1', h('br'), '2'])
					])
				},
				// 是否提供关闭按钮 默认true
				closable: true
			})
		}
	}
}
</script>
