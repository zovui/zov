<template>
	<div>
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<h4>Steps props</h4>
			<p>
				@current 非必传，当前步骤，从0开始计数，类型：Number，default: 0
			</p>
			<p>
				@status 非必传，当前状态，类型：String，default：process
			</p>
			<p>
				@size 非必传，步骤条的尺寸，类型：String，传small或不传
			</p>
			<p>
				@direction
				非必传，步骤条的方向，类型：String，步骤条的方向，可选值为horizontal（水平）或vertical（垂直），default：horizontal
			</p>
			<p>
				@space
				非必传，每个step的间距，不填写将以百分比自适应间距。类型:number,string
			</p>
			<p>
				@align-center
				非必传，居中展示(在direction为vertical时无效)，类型：Boolean，default：false
			</p>
			<h4>Step props</h4>
			<p>
				@status
				步骤的状态，类型：String，可选值为wait、process、finish、error，不设置时自动判断，default：process
			</p>
			<p>
				@title 标题，类型：String，default：空
			</p>
			<p>
				@content 非必填，步骤的详细描述，类型：String，default：空
			</p>
			<p>
				@icon 非必填，步骤的图标，类型：String，default：空
			</p>
		</div>
		<div class="box">
			<Steps :current="current">
				<Step title="已完成" content="这里是该步骤的描述信息"></Step>
				<Step title="进行中" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
			</Steps>

			<Steps :current="current" :align-center="true">
				<Step title="已完成" content="这里是该步骤的描述信息"></Step>
				<Step title="进行中" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
			</Steps>

			<Steps size="small" :current="current">
				<Step title="已完成" content="这里是该步骤的描述信息"></Step>
				<Step title="进行中" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
			</Steps>

			<Steps :current="current">
				<Step title="注册" iconname="cloud-done"></Step>
				<Step title="上传头像" iconname="calendar"></Step>
				<Step title="验证邮箱" iconname="hammer"></Step>
				<Step title="验证通过" iconname="flag"></Step>
			</Steps>

			<p>当前正在进行第 {{ current + 1 }} 步</p>
			<Steps :current="current">
				<Step title="步骤1"></Step>
				<Step title="步骤2"></Step>
				<Step title="步骤3"></Step>
				<Step title="步骤4"></Step>
			</Steps>
			<Button type="primary" @click="next">Next step</Button>

			<Steps :current="current" direction="vertical">
				<Step title="已完成" content="这里是该步骤的描述信息"></Step>
				<Step title="已完成" content="这里是该步骤的描述信息"></Step>
				<Step title="进行中" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
			</Steps>

			<Steps :current="1" status="error">
				<Step title="已完成" content="这里是该步骤的描述信息"></Step>
				<Step title="进行中" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
				<Step title="待进行" content="这里是该步骤的描述信息"></Step>
			</Steps>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			current: 1
		}
	},
	methods: {
		next() {
			if (this.current == 3) {
				this.current = 0
			} else {
				this.current += 1
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.box {
	margin-left: 15px;
}
</style>
