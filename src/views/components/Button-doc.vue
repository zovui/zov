<template>
	<div style="text-align: center">
		<p>
			size
			<Button size="large" @click="size = 'large'">large</Button>
			<Button @click="size = 'default'">middle</Button>
			<Button size="small" @click="size = 'small'">small</Button>
		</p>
		<p>
			type
			<Button :size="size">default</Button>
			<Button :size="size" looks="primary">primary</Button>
			<Button :size="size" looks="dashed">dashed</Button>
			<Button :size="size" looks="text">text</Button>
			<Button :size="size" looks="info">info</Button>
			<Button :size="size" looks="success">success</Button>
			<Button :size="size" looks="warning">warning</Button>
			<Button :size="size" looks="error">error</Button>
		</p>
		<p>
			shape
			<Button :size="size" shape="circle">default</Button>
			<Button :size="size" shape="circle" looks="primary">primary</Button>
			<Button :size="size" shape="circle" looks="dashed">dashed</Button>
			<Button :size="size" shape="circle" looks="text">text</Button>
			<Button :size="size" shape="circle" looks="info">info</Button>
			<Button :size="size" shape="circle" looks="success">success</Button>
			<Button :size="size" shape="circle" looks="warning">warning</Button>
			<Button :size="size" shape="circle" looks="error">error</Button>
		</p>
		<p>
			disabled
			<Button :size="size" shape="circle" disabled>default</Button>
			<Button :size="size" shape="circle" looks="primary" disabled
				>primary</Button
			>
			<Button :size="size" shape="circle" looks="dashed" disabled
				>dashed</Button
			>
			<Button :size="size" shape="circle" looks="text" disabled
				>text</Button
			>
			<Button :size="size" shape="circle" looks="info" disabled
				>info</Button
			>
			<Button :size="size" shape="circle" looks="success" disabled
				>success</Button
			>
			<Button :size="size" shape="circle" looks="warning" disabled
				>warning</Button
			>
			<Button :size="size" shape="circle" looks="error" disabled
				>error</Button
			>
		</p>
		<p>
			Icon
			<Button looks="info" iconname="wifi">自定义icon</Button>
			<Button loading iconname="download">自定义icon</Button>
		</p>
		<p>
			loading 异步
			<Button :loading="loading" @click="loading = !loading"
				>点击我 等待</Button
			>
			<Button :loading="loading">loading</Button>
			<Button :loading="loading" spinname="dbcircle"
				>自定义loading</Button
			>

			<Button :loading="loading" :size="size" shape="circle"
				>default</Button
			>
			<Button
				:loading="loading"
				:size="size"
				shape="circle"
				looks="primary"
				>primary</Button
			>
			<Button
				:loading="loading"
				:size="size"
				shape="circle"
				looks="dashed"
				>dashed</Button
			>
			<Button :loading="loading" :size="size" shape="circle" looks="text"
				>text</Button
			>
			<Button :loading="loading" :size="size" shape="circle" looks="info"
				>info</Button
			>
			<Button
				:loading="loading"
				:size="size"
				shape="circle"
				looks="success"
				>success</Button
			>
			<Button
				:loading="loading"
				:size="size"
				shape="circle"
				looks="warning"
				>warning</Button
			>
			<Button :loading="loading" :size="size" shape="circle" looks="error"
				>error</Button
			>
		</p>
		<p>
			无文本 button
			<Button loading :size="size" />
			<Button looks="info" iconname="wifi" :size="size" />
			<Button
				looks="success"
				shape="circle"
				iconname="wifi"
				:size="size"
			/>
			圆形 button
			<Button circle iconname="close" :size="size" />
		</p>
		<p>
			组合按钮
			<ButtonGroup :size="size">
				<Button>default</Button>
				<Button looks="primary" disabled>primary</Button>
				<Button looks="dashed">dashed</Button>
				<Button looks="info">info</Button>
				<Button>default</Button>
			</ButtonGroup>
			<ButtonGroup :size="size" shape="circle">
				<Button shape="circle">default</Button>
				<Button looks="primary">primary</Button>
				<Button looks="dashed">dashed</Button>
				<Button looks="info">info</Button>
			</ButtonGroup>
			<ButtonGroup :size="size" shape="circle" :vertical="true">
				<Button shape="circle">default</Button>
				<Button looks="primary">primary</Button>
				<Button looks="dashed">dashed</Button>
				<Button looks="info">info</Button>
			</ButtonGroup>
		</p>
	</div>
</template>
<script>
export default {
	data() {
		return {
			size: 'default',
			loading: false
		}
	}
}
</script>
