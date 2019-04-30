export default {
	functional: true,
	props: {
		tag: {
			type: String,
			default: 'span'
		}
	},
	render(h, ctx) {
		return h(
			ctx.props.tag, // 标签名称
			ctx.data, // 将attrs、props、class、innerHtml等属性传到此组件上
			ctx.children // 子元素数组
		)
	}
}
