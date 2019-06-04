<template>
	<div>
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>
				参数
			</h3>
			<h4>
				Avatar props
			</h4>
			<p>
				@shape
				指定头像的形状，可选值为circle，square。非必传，类型：String，默认值：circle
			</p>
			<p>
				@size
				设置头像的大小，可选值为large，small，default。非必传，类型：String，默认值：default
			</p>
			<p>
				@src 图片类头像的资源地址。类型：String
			</p>
			<p>
				@iconname 设置头像的图标类型，参考 Icon 组件。类型：String
			</p>
			<h4>
				Avatar events
			</h4>
			<p>
				@on-select，点击锚点时触发，返回链接，返回值：href
			</p>
		</div>
		<div
			class="avatar-demo-box"
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<div class="demo-avatar">
				<Avatar iconname="build" size="large" />
				<Avatar icon="ios-person" custom-icon="build" />
				<Avatar icon="ios-person" size="small" />
			</div>
			<div class="demo-avatar">
				<Avatar shape="square" iconname="ios-person" size="large" />
				<Avatar shape="square" icon="ios-person" />
				<Avatar shape="square" icon="ios-person" size="small" />
			</div>
			<div class="demo-avatar">
				<Avatar icon="ios-person" />
				<Avatar>U</Avatar>
				<Avatar>USER</Avatar>
				<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
				<Avatar style="color: #f56a00;background-color: #fde3cf"
					>U</Avatar
				>
				<Avatar style="background-color: #87d068" icon="ios-person" />
			</div>
			<div class="demo-avatar demo-avatar-badge">
				<Badge :count="1">
					<Avatar shape="square" icon="ios-person" />
				</Badge>
				<Badge dot>
					<Avatar shape="square" icon="ios-person" />
				</Badge>
			</div>
			<div class="demo-avatar">
				<Avatar :style="{ background: color }">{{ user }}</Avatar>
				<Button size="small" @click="handleChange">Change</Button>
			</div>
		</div>
	</div>
</template>

<script>
const UserList = ['U', 'Lucy', 'Tom', 'Edward']
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
export default {
	data() {
		return {
			user: UserList[0],
			color: ColorList[0]
		}
	},
	methods: {
		handleChange() {
			const index = UserList.indexOf(this.user)
			this.user =
				index < UserList.length - 1 ? UserList[index + 1] : UserList[0]
			this.color =
				index < ColorList.length - 1
					? ColorList[index + 1]
					: ColorList[0]
		}
	}
}
</script>

<style lang="scss" scoped>
.avatar-demo-box {
	margin-left: 15px;
	.demo-avatar {
		margin-bottom: 15px;
		div {
			margin-right: 15px;
		}
	}
}
</style>
