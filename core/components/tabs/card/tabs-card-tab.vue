<script>
import TabsCardTab from '../tabs-tab'
export default {
	name: 'tabs-card-tab',
	mixins: [TabsCardTab],
	render() {
		return (
			<div class={this.classList} onClick={this.handleClick}>
				{this.label}
			</div>
		)
	}
}
</script>
