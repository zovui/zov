<template>
	<div style="text-align: center">
		<Switcher v-model="cover">切换</Switcher>
		<div class="box">
			<div class="div">
				组件引用
				<Spin cover v-if="!cover"></Spin>
				<ul class="ul">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
				</ul>
			</div>
			<div class="div">
				组件引用
				<Spin v-if="cover" cover spinname="dbcircle"></Spin>
				<ul class="ul">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
				</ul>
			</div>
			<div v-zov-spin="!cover">
				自定义指令
				<ul class="ul">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
				</ul>
			</div>
			<div v-zov-spin="cover">
				自定义指令
				<ul class="ul">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
				</ul>
			</div>
		</div>
		<div class="spins">
			spins 枚举
			<Spin>&nbsp;loading...</Spin>
			<Spin spinname="dbcircle"></Spin>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			cover: true
		}
	},
	mounted() {
		setTimeout(() => {
			this.cover = false
		}, 3000)
	}
}
</script>
<style lang="scss" scoped>
.box {
	display: flex;
	& > * {
		flex: 1;
		margin: 15px;
		box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
	}
}
.div {
	position: relative;
	.zov-spin {
		font-size: 3em;
	}
}
.ul {
	border: 1px solid #ccc;
	li {
		padding: 15px 0;
		&:not(:nth-of-type(1)) {
			border-top: 1px solid #ccc;
		}
	}
}
.spins {
	& > * {
		margin: 15px;
	}
}
</style>
