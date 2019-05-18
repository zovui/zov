<script>
import TabsCardTab from '../tabs-tab'
import Icon from '../../icon'
export default {
	name: 'zov-tabs-card-tab',
	mixins: [TabsCardTab],
	components: {
		Icon
	},
	render() {
		const closeBtn = this.closable ? (
			<Icon
				class="zov-tabs-closer"
				iconname="close"
				onClick={this.handleClose}
			/>
		) : (
			''
		)
		return (
			<div class={this.classList} onClick={this.handleClick}>
				{this.label}
				{closeBtn}
			</div>
		)
	}
}
</script>
