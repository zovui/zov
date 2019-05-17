<script>
export default {
	name: 'zov-tabs-content-item',
	functional: true,
	props: {
		show: {
			type: Boolean,
			default: true
		}
	},
	render(createElement, context) {
		const style = {
			display: context.props.show ? 'block' : 'none'
		}
		return (
			<div class="zov-content-item" style={style}>
				{context.children}
			</div>
		)
	}
}
</script>
