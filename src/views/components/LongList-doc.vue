<template>
	<div class="home">
		<div style="border: 1px dashed;text-align: left">
			<h3>作用</h3>
			<p>
				long-list组件的作用是优化超长一维列表渲染性能问题，渲染窗口内的item，超出的不渲染
			</p>
			<h3>参数</h3>
			<p>@data 列表数据，必传</p>
			<p>
				@threshold
				阈值，指多渲染超出窗口的子项数，当具有滚动加速度时此项可以适当设置大一些
			</p>
			<h3>说明</h3>
			<p>
				利用了 slot-scope
				将子组件数据回传到上层组件，所以子项上可以取到`props`字段。{item[当前项数据],index[当前项下标]}
			</p>
		</div>
		修改窗口高度 <Input v-model="v" /> 修改子项高度 <Input v-model="v1" />
		<div class="box">
			<div
				:style="{
					border: '1px dashed',
					'margin-top': 5,
					height: v + 'px'
				}"
			>
				<LongList style="height: 100%" :data="list" :threshold="2">
					<div
						:style="{ height: v1 + 'px' }"
						slot-scope="{ props }"
						:index="props.item.id"
						class="item"
					>
						<img :src="props.item.img" alt="" />
						<div>
							下标：{{ props.index }}内容：{{ props.item.text }}
						</div>
					</div>
				</LongList>
			</div>
			<LongList style="height:300px" :data="list" :threshold="2">
				<div slot-scope="{ props }" :index="props.item.id" class="item">
					<img :src="props.item.img" alt="" />
					<div>
						下标：{{ props.index }}内容：{{ props.item.text }}
					</div>
				</div>
			</LongList>
			<LongList style="max-height: 220px" :data="list">
				<div slot-scope="{ props }" :index="props.item.id">
					下标：{{ props.index }}内容：{{ props.item.text }}
				</div>
			</LongList>
		</div>
	</div>
</template>

<script>
export default {
	name: 'long-list-demo',
	data() {
		return {
			v: 360,
			v1: 66,
			list: (() => {
				let d = []
				for (var i = 0; i < 10000; i++) {
					d.push({
						id: i,
						text: 'item #' + (i + 1),
						img:
							'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=dc7e87bdfb03738dc14a0a22831ab073/08f790529822720e698c1ae776cb0a46f21fab69.jpg'
					})
				}
				return d
			})()
		}
	}
}
</script>
<style lang="scss" scoped>
.box {
	display: flex;
	& > * {
		flex: 1;
	}
}
.item {
	overflow: hidden;
	padding: 15px;
	& > * {
		float: left;
	}
	& > img {
		width: 35px;
		height: 35px;
	}
	border-bottom: 1px solid #ccc;
	&::after {
		content: '';
		display: block;
		clear: both;
	}
}
</style>
