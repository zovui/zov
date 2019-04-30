<template>
	<div style="text-align: center">
		Tag组件是复用的Button组件，稍微做了调试改动。
		<p>
			size
			<Tag size="large" @click="size = 'large'">large</Tag>
			<Tag @click="size = 'default'">middle</Tag>
			<Tag size="small" @click="size = 'small'">small</Tag>
		</p>
		<p>
			type
			<Tag :size="size">default</Tag>
			<Tag :size="size" looks="primary">primary</Tag>
			<Tag :size="size" looks="dashed">dashed</Tag>
			<Tag :size="size" looks="text">text</Tag>
			<Tag :size="size" looks="info">info</Tag>
			<Tag :size="size" looks="success">success</Tag>
			<Tag :size="size" looks="warning">warning</Tag>
			<Tag :size="size" looks="error">error</Tag>
		</p>
		<p>
			shape
			<Tag :size="size" shape="circle">default</Tag>
			<Tag :size="size" shape="circle" looks="primary">primary</Tag>
			<Tag :size="size" shape="circle" looks="dashed">dashed</Tag>
			<Tag :size="size" shape="circle" looks="text">text</Tag>
			<Tag :size="size" shape="circle" looks="info">info</Tag>
			<Tag :size="size" shape="circle" looks="success">success</Tag>
			<Tag :size="size" shape="circle" looks="warning">warning</Tag>
			<Tag :size="size" shape="circle" looks="error">error</Tag>
		</p>
		<p>
			disabled
			<Tag :size="size" shape="circle" disabled>default</Tag>
			<Tag :size="size" shape="circle" looks="primary" disabled
				>primary</Tag
			>
			<Tag :size="size" shape="circle" looks="dashed" disabled
				>dashed</Tag
			>
			<Tag :size="size" shape="circle" looks="text" disabled>text</Tag>
			<Tag :size="size" shape="circle" looks="info" disabled>info</Tag>
			<Tag :size="size" shape="circle" looks="success" disabled
				>success</Tag
			>
			<Tag :size="size" shape="circle" looks="warning" disabled
				>warning</Tag
			>
			<Tag :size="size" shape="circle" looks="error" disabled>error</Tag>
		</p>
		<p>
			Icon
			<Tag looks="info" iconname="wifi">自定义icon</Tag>
			<Tag loading iconname="download">自定义icon</Tag>
		</p>
		<p>
			loading 异步
			<Tag :loading="loading" @click="loading = !loading"
				>点击我 等待</Tag
			>
			<Tag :loading="loading">loading</Tag>
			<Tag :loading="loading" spinname="dbcircle">自定义loading</Tag>

			<Tag :loading="loading" :size="size" shape="circle">default</Tag>
			<Tag :loading="loading" :size="size" shape="circle" looks="primary"
				>primary</Tag
			>
			<Tag :loading="loading" :size="size" shape="circle" looks="dashed"
				>dashed</Tag
			>
			<Tag :loading="loading" :size="size" shape="circle" looks="text"
				>text</Tag
			>
			<Tag :loading="loading" :size="size" shape="circle" looks="info"
				>info</Tag
			>
			<Tag :loading="loading" :size="size" shape="circle" looks="success"
				>success</Tag
			>
			<Tag :loading="loading" :size="size" shape="circle" looks="warning"
				>warning</Tag
			>
			<Tag :loading="loading" :size="size" shape="circle" looks="error"
				>error</Tag
			>
		</p>
		<p>
			无文本 tag
			<Tag loading />
			<Tag looks="info" iconname="wifi" />
			<Tag looks="success" shape="circle" iconname="wifi" />
		</p>
		------------------------------------------------------------------------------------------------------------
		<p>
			一组tag
			<Tag
				v-for="(item, index) in tags"
				:key="index"
				@on-close="removeTage(index)"
			>
				{{ item.text }}
			</Tag>
		</p>
	</div>
</template>
<script>
export default {
	data() {
		return {
			size: 'default',
			loading: false,
			tags: (() => {
				let d = []
				for (let i = 0; i < 5; i++) {
					d.push({
						id: i,
						text: 'item#' + (i + 1)
					})
				}
				return d
			})()
		}
	},
	methods: {
		removeTage(index) {
			this.$delete(this.tags, index)
		}
	}
}
</script>
