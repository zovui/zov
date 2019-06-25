<template>
	<div>
		<div style="border: 1px dashed">
			常用于下拉面板，开发者用于开发一些下拉选择组件，如级联、select
			<p>@dropUpdate drop组件上的一个方法，供组件更新popper的位置</p>
		</div>
		<Drop placement="right">
			<Input placeholder="在右面展开" slot="drop-head" />
			<div style="height: 200px;border: 2px solid">
				内容
			</div>
		</Drop>
		<span>
			<Switcher v-model="open" />
			<Drop v-model="open" trigger="hover" no-arrow>
				<Input placeholder="hover" slot="drop-head" />
				<div style="height: 200px;border: 2px solid">
					内容
				</div>
			</Drop>
		</span>
		<span>
			<Switcher v-model="open1" />
			<Drop v-model="open1">
				<Input placeholder="有箭头" slot="drop-head" />
				<div style="height: 200px;border: 2px solid">
					内容
				</div>
			</Drop>
		</span>
	</div>
</template>
<script>
export default {
	data() {
		return {
			open: true,
			open1: true
		}
	}
}
</script>
