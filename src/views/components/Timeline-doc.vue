<template>
	<main class="container">
		<h1>Timeline</h1>
		<article class="article">
			<section
				class="component-introduction"
				v-for="introduction of componentIntroduction"
				:key="introduction.header"
			>
				<h2 class="component-introduction-header">
					{{ introduction.header }}
				</h2>
				<table class="component-introduction-content">
					<thead>
						<tr>
							<th
								v-for="header of introduction.content.headers"
								:key="header"
							>
								{{ header }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="props of introduction.content.data"
							:key="props.props"
						>
							<td>{{ props.props }}</td>
							<td>{{ props.introduction }}</td>
							<td>{{ props.type }}</td>
							<td>{{ props.default }}</td>
						</tr>
					</tbody>
				</table>
			</section>
		</article>
		<article class="article">
			<section class="demo">
				<h2 class="demo-header">默认</h2>
				<div class="demo-content">
					<Timeline>
						<TimelineItem
							>Create a services site 2015-09-01</TimelineItem
						>
						<TimelineItem
							>Solve initial network problems
							2015-09-01</TimelineItem
						>
						<TimelineItem
							>Technical testing 2015-09-01</TimelineItem
						>
						<TimelineItem
							>Network problems being solved
							2015-09-01</TimelineItem
						>
					</Timeline>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">pending</h2>
				<div class="demo-content">
					<Timeline pending>
						<TimelineItem
							>Create a services site 2015-09-01</TimelineItem
						>
						<TimelineItem
							>Solve initial network problems
							2015-09-01</TimelineItem
						>
						<TimelineItem
							>Technical testing 2015-09-01</TimelineItem
						>
						<TimelineItem
							>Network problems being solved
							2015-09-01</TimelineItem
						>
						<template #ghost-content>
							Recoding...
						</template>
					</Timeline>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">可指定Mode</h2>
				<div class="demo-content">
					<RadioGroup v-model="mode" connected>
						<Radio
							v-for="mode of [
								'left',
								'right',
								'alternate-left',
								'alternate-right'
							]"
							:label="mode"
							:key="mode"
						/>
					</RadioGroup>
				</div>
				<div class="demo-content">
					<Timeline pending :mode="mode">
						<TimelineItem
							>Create a services site 2015-09-01</TimelineItem
						>
						<TimelineItem
							>Solve initial network problems
							2015-09-01</TimelineItem
						>
						<TimelineItem
							>Technical testing 2015-09-01</TimelineItem
						>
						<TimelineItem
							>Network problems being solved
							2015-09-01</TimelineItem
						>
						<template #ghost-content>
							Recoding...
						</template>
					</Timeline>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">倒序</h2>
				<div class="demo-content">
					<RadioGroup v-model="reverseMode" connected>
						<Radio
							v-for="mode of [
								'left',
								'right',
								'alternate-left',
								'alternate-right'
							]"
							:label="mode"
							:key="mode"
						/>
					</RadioGroup>
				</div>
				<div class="demo-content">
					是否倒序
					<Switcher v-model="reverse" />
				</div>
				<div class="demo-content">
					<Timeline pending :mode="reverseMode" :reverse="reverse">
						<TimelineItem
							>Create a services site 2015-09-01</TimelineItem
						>
						<TimelineItem
							>Solve initial network problems
							2015-09-01</TimelineItem
						>
						<TimelineItem
							>Technical testing 2015-09-01</TimelineItem
						>
						<TimelineItem
							>Sed ut perspiciatis unde omnis iste natus error sit
							voluptatem accusantium doloremque laudantium, totam
							rem aperiam, eaque ipsa quae ab illo inventore
							veritatis et quasi architecto beatae vitae dicta
							sunt explicabo.</TimelineItem
						>
						<template #ghost-content>
							Recoding...
						</template>
					</Timeline>
				</div>
			</section>
		</article>
	</main>
</template>

<style lang="scss" scoped>
@import '../../../core/styles/colors';
@import '../../../core/styles/mixins/get-color';
.container {
	min-width: 600px;
	margin: 0 auto;
}

.article {
	margin: 20px 0;
}

.component-introduction {
	margin: 20px 0;
	.component-introduction-header {
		margin: 20px 0;
	}
	.component-introduction-content {
		border-collapse: collapse;
		border-spacing: 0;
		margin: 20px 0;
		width: 100%;
		border: 1px solid #dddddd;
		thead {
			@include get-color-border(background-color);
		}
		th,
		td {
			border: 1px solid #dddddd;
			vertical-align: middle;
			height: 36px;
			text-align: center;
		}
	}
}

.demo {
	box-sizing: border-box;
	margin: 20px 0;
	border: 1px solid #f5f5f5;
	padding: 20px 30px;
	box-shadow: 0 0 5px 0 #7f7f7f;
	.demo-header {
		margin: 10px 0;
	}
	.demo-props {
		margin: 10px 0;
	}
	.demo-content {
		margin: 10px 0;
	}
}
</style>

<script>
export default {
	name: 'TimelineDemo',
	data() {
		return {
			componentIntroduction: [
				{
					header: 'Timeline Props',
					content: {
						headers: ['props', '说明', '类型', '默认值'],
						data: [
							{
								props: 'mode',
								introduction:
									'展示模式，可选模式有：left, right, alternate-left, alternate-right',
								type: 'string',
								default: 'left'
							},
							{
								props: 'pending',
								introduction: '是否处于pending状态',
								type: 'boolean',
								default: 'false'
							}
						]
					}
				},
				{
					header: 'Timeline slots',
					content: {
						headers: ['slot名', '说明'],
						data: [
							{
								props: 'default',
								introduction: 'TimelineItem存放处'
							},
							{
								props: 'ghost-dot',
								introduction:
									'自定义pending状态时幽灵节点的图标'
							},
							{
								props: 'ghost-content',
								introduction:
									'自定义pending状态时幽灵节点的内容'
							}
						]
					}
				},
				{
					header: 'TimelineItem slots',
					content: {
						headers: ['slot名', '说明'],
						data: [
							{
								props: 'default',
								introduction: 'TimelineItem内容'
							},
							{
								props: 'dot',
								introduction: '自定义节点的图标'
							}
						]
					}
				}
			],
			mode: 'left',
			reverse: false,
			reverseMode: 'left'
		}
	}
}
</script>
