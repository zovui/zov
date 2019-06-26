<template>
	<div class="tips">
		<div
			style="height: 900px;overflow:auto;text-align: left;padding: 180px 100px;border: 3px solid red"
		>
			<div style="border: 3px solid green">
				<h3>参数</h3>
				<p>@v-model 响应</p>
				<p>@title 标题</p>
				<p>@text 文字说明</p>
				<p>
					@placement [default: 'top']，默认弹出位置 ['top',
					'top-start', 'top-end', 'bottom', 'bottom-start',
					'bottom-end', 'left', 'left-start', 'left-end', 'right',
					'right-start', 'right-end']
				</p>
				<p>
					@trigger [default: 'hover']，触发事件 ['hover', 'click',
					'focus']，多事件可以传数组
				</p>
				<p>@enter-delay [default: 0]，呼出延时</p>
				<p>@leave-delay [default: 0]，收起延时</p>
				<p>@closable [default: false]，关闭按钮</p>
				<p>@never [default: false]，持久存在</p>
				<p>
					@high-color [default:
					false]，增强色，如果设置，则组件颜色与主题色取反
				</p>
				<p>@no-arrow [default: false]，是否为无箭头</p>
				<p>@animation-name [default: zov-fade]，动画名</p>
				<p>@auto-popup [default: false]，自动展开</p>
				<h3>DEMO</h3>
				<h4>v-model</h4>
				<div style="border: 1px dashed;margin: 30px 0">
					<ToolTip text="基础" placement="bottom">
						<Button looks="primary">基础</Button>
					</ToolTip>
					<ToolTip
						v-model="show"
						title="提示"
						text="这是通过v-modle控制显示隐藏的tooltip，hover触发"
						placement="bottom"
					>
						<Button looks="primary">v-model hover</Button>
					</ToolTip>
					<Switcher v-model="show" />
					<ToolTip
						v-model="show0"
						title="提示"
						text="这是通过v-modle控制显示隐藏的tooltip，click触发"
						placement="bottom"
						trigger="click"
					>
						<Button looks="primary">v-model click</Button>
					</ToolTip>
					<Switcher v-model="show0" />
					<ToolTip
						v-model="show0"
						title="提示"
						text="这是通过v-modle控制显示隐藏的tooltip，click触发"
						placement="bottom"
						trigger="click"
					>
						<Button looks="primary">v-model click</Button>
					</ToolTip>
					<Switcher v-model="show0" />
				</div>
				<h4>增强色</h4>
				<div style="border: 1px dashed;margin: 30px 0">
					<ToolTip
						title="提示"
						text="这是与主题色取反的tooltip"
						placement="bottom"
						auto-popup
						never
						high-color
					>
						<Button looks="primary">增强色</Button>
					</ToolTip>
				</div>
				<h4>自动展开</h4>
				<div style="border: 1px dashed;margin: 30px 0">
					<ToolTip
						title="提示"
						text="这是自动弹出的tooltip，----这是延长测试文字文字文字文字---"
						placement="right"
						auto-popup
						v-model="show1"
					>
						<Switcher v-model="show1"></Switcher>
						<Button>auto-popup</Button>
					</ToolTip>
				</div>
				<h4>方向</h4>
				方向是默认设置，遇到边界后会自动转换方向，以保证气泡处于视窗内，所以看到的效果不一定是预期的，需要调整元素在屏幕中位置测试
				<div style="border: 1px dashed;margin: 30px 0;overflow: hidden">
					<ToolTip
						style="float: right"
						v-for="item in [
							'top',
							'top-start',
							'top-end',
							'bottom',
							'bottom-start',
							'bottom-end',
							'left',
							'left-start',
							'left-end',
							'right',
							'right-start',
							'right-end'
						]"
						:key="item"
						title="提示"
						text="这是测试方向的tooltip，----这是延长测试文字文字文字文字---"
						:placement="item"
					>
						<Button>在{{ item }}</Button>
					</ToolTip>
				</div>
				<h4>单事件</h4>
				<div style="border: 1px dashed;margin: 30px 0;">
					<ToolTip
						title="提示"
						text="这是通过hover触发弹出的tooltip，也是默认，----这是延长测试文字文字文字文字---"
						placement="top"
					>
						<Button>hover</Button>
					</ToolTip>
					<ToolTip
						title="提示"
						text="这是通过click触发弹出的tooltip，----这是延长测试文字文字文字文字---"
						placement="top"
						trigger="click"
						closable
					>
						<Button>click</Button>
					</ToolTip>
					<ToolTip
						title="提示"
						text="这是通过focus触发弹出的tooltip，----这里放置一些输入提示文字，在输入的时候---"
						placement="top"
						trigger="focus"
					>
						<Input placeholder="focus" />
					</ToolTip>
				</div>
				<h4>多事件</h4>
				<div style="border: 1px dashed;margin: 30px 0;">
					<ToolTip
						title="提示"
						text="常用语输入框提示"
						placement="top"
						:trigger="['hover', 'focus']"
					>
						<Input placeholder="['hover', 'focus']" />
					</ToolTip>
					<ToolTip
						title="提示"
						text="常用语输入框提示"
						placement="top"
						:trigger="['hover']"
					>
						<Input placeholder="['hover']" />
					</ToolTip>
					<ToolTip
						title="提示"
						text="常用语输入框提示"
						placement="top"
						:trigger="['hover', 'click']"
					>
						<Input placeholder="['hover', 'click']" />
					</ToolTip>
				</div>
				<h3>延时</h3>
				<div style="border: 1px dashed;margin: 30px 0;">
					<ToolTip
						title="提示"
						text="这是通过click等待1秒后弹出，等待1s收起的tooltip"
						trigger="click"
						enter-delay="1000"
						leave-delay="1000"
					>
						<Button>click 延时1s后呼出</Button>
					</ToolTip>
					<ToolTip
						title="提示"
						text="这是等待1秒后呼出的tooltip"
						placement="top"
						enter-delay="1000"
					>
						<Button>hover 延时1s后呼出</Button>
					</ToolTip>
					<ToolTip
						title="提示"
						text="这是等待1秒后收起的tooltip"
						leave-delay="1000"
					>
						<Button>hover 延时1s后收起</Button>
					</ToolTip>
				</div>
				<h4>收起方式</h4>
				<div style="border: 1px dashed;margin: 30px 0;">
					<ToolTip
						style="float: right"
						title="提示"
						text="正常呼出，将可以通过组件外部点击收起，外部获取焦点可以收起，是最常见的配合click事件的收起方式"
						trigger="click"
						auto-popup
					>
						<Button>正常</Button>
					</ToolTip>
					<ToolTip
						title="提示"
						text="这是一个不可关闭，不可收起的提示！"
						placement="bottom"
						never
						auto-popup
					>
						<Button>永远不会收起的</Button>
					</ToolTip>
					<ToolTip
						title="提示"
						text="这是一个不可外部收起，但是可以内部按钮收起。也可以结合v-model实现自定义关闭。"
						placement="bottom"
						never
						auto-popup
						closable
					>
						<Button>可内部关闭的</Button>
					</ToolTip>
				</div>
				<h4>自定义指令</h4>
				<div style="border: 1px dashed;margin: 30px 0;">
					<Button v-zov-tooltip="'这是一个自定义指令的 tooltip'">
						自定义指令
					</Button>
					<Button
						v-zov-tooltip="{
							title: '自定义提示',
							text: '自定义指令，tooltip',
							closable: true,
							highColor: true
						}"
					>
						自定义指令
					</Button>
				</div>
				<h4>slot 内容</h4>
				<div style="border: 1px dashed;margin: 30px 0;">
					<ToolTip
						title="提示"
						text="这是一个不可外部收起，但是可以内部按钮收起。也可以结合v-model实现自定义关闭。"
						placement="right"
						trigger="click"
						closable
					>
						<div
							slot="tooltip"
							style="height: 256px;border: 2px dashed"
						>
							这里是自定义solt内容。。。
						</div>
						<Button>可内部关闭的</Button>
					</ToolTip>
				</div>
			</div>
		</div>
		<ToolTip
			v-for="item in [
				'left',
				'right',
				'top',
				'bottom',
				'left-top',
				'right-top',
				'left-bottom',
				'right-bottom'
			]"
			:key="item"
			:class="['tip', 'tip-' + item]"
			title="提示"
			text="这是一段提示长文字，很长很长"
			:placement="
				item.substring(item.length, item.indexOf('-') + 1) || item
			"
		>
			<Button>
				{{ item }}
			</Button>
		</ToolTip>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: true,
			show0: true,
			show1: false
		}
	}
}
</script>
<style lang="scss" scoped>
.tips {
	position: relative;
	width: 97%;
	margin: 0 auto;
}
.tip {
	position: absolute;
	@each $x in left right {
		&-#{$x} {
			#{$x}: 15px;
			top: 50%;
		}
		@each $y in top bottom {
			&-#{$x}-#{$y} {
				#{$x}: 15px;
				#{$y}: 15px;
			}
		}
	}
	@each $y in top bottom {
		&-#{$y} {
			#{$y}: 15px;
			left: 50%;
		}
	}
}
</style>
