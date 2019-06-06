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
			<p>
				@custom 自定义图标，类型：String
			</p>
			<p>
				@title 当存在src属性时，鼠标hover时的提示信息，类型：String
			</p>
			<h4>
				Avatar events
			</h4>
			<p>
				@on-error，加载图片不成功时触发，返回值：event || e
			</p>
		</div>
		<div
			class="avatar-demo-box"
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<div class="demo-avatar">
				<Avatar iconname="person" size="large" />
				<Avatar iconname="person" custom-icon="build" />
				<Avatar iconname="person" size="small" />
			</div>
			<div class="demo-avatar">
				<Avatar shape="square" iconname="person" size="large" />
				<Avatar shape="square" iconname="person" />
				<Avatar shape="square" iconname="person" size="small" />
			</div>
			<div class="demo-avatar">
				<Avatar iconname="person" />
				<Avatar>Z</Avatar>
				<Avatar>ZOV</Avatar>
				<Avatar :src="src" title="提示信息" />
				<Avatar style="color: #f56a00; background-color: #fde3cf"
					>Z</Avatar
				>
				<Avatar style="background-color: #87d068" iconname="person" />
			</div>
			<div class="demo-avatar demo-avatar-badge">
				<Badge :count="1">
					<Avatar shape="square" iconname="person" />
				</Badge>
				<Badge dot>
					<Avatar shape="square" iconname="person" />
				</Badge>
			</div>
			<div class="demo-avatar">
				<Avatar :style="{ background: color }" size="large">{{
					user
				}}</Avatar>
				<Button size="small" @click="handleChange">Change</Button>
			</div>
		</div>
	</div>
</template>

<script>
const Users = ['Z', 'ZOV', 'ZOVAvatar']
const Colors = ['#f56a00', '#7265e6', '#ffbf00']
export default {
	data() {
		return {
			user: Users[0],
			color: Colors[0],
			src:
				'data:image/png;base64,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'
		}
	},
	methods: {
		handleChange() {
			const index = Users.indexOf(this.user)
			this.user = index < Users.length - 1 ? Users[index + 1] : Users[0]
			this.color =
				index < Colors.length - 1 ? Colors[index + 1] : Colors[0]
		}
	}
}
</script>

<style lang="scss" scoped>
.avatar-demo-box {
	margin-left: 15px;
	.demo-avatar {
		margin-bottom: 15px;
		> span {
			margin-right: 15px;
		}
	}
}
</style>
