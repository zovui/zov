<script>
import TabsTab from '../tabs-tab'
export default {
	name: 'zov-tabs-border-card-tab',
	mixins: [TabsTab],
	render() {
		return (
			<div class={this.classList} onClick={this.handleClick}>
				{this.label}
			</div>
		)
	}
}
</script>
