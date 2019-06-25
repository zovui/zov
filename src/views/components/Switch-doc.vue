<template>
	<div style="text-align: center">
		<Switcher :value="v">
			<span slot="open">开</span>
			<span slot="close">关</span>
		</Switcher>
		<Switcher v-model="v">
			<span slot="open">这是开的状态</span>
			<span slot="close">这是关的状态</span>
		</Switcher>
		<Switcher v-model="v" @on-change="change">
			<Icon slot="open" iconname="unlock" />
			<Icon slot="close" iconname="lock" />
		</Switcher>
		<p>
			disabled
			<Switcher v-model="v" disabled>
				<span slot="open">on</span>
				<span slot="close">off</span>
			</Switcher>
			<Switcher v-model="v" :disabled="false"></Switcher>
		</p>
		<p>
			size
			<Switcher v-model="v" size="large"></Switcher>
			<Switcher v-model="v"></Switcher>
			<Switcher v-model="v" size="small"></Switcher>
		</p>
	</div>
</template>
<script>
export default {
	data() {
		return {
			v: true
		}
	},
	methods: {
		change(val) {
			console.log(val)
		}
	}
}
</script>
<style lang="scss" scoped>
div {
	& .zov-switch {
		margin: 15px;
	}
}
</style>
