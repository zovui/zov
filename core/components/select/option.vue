<template>
	<div>
		<div
			:class="[
				'zov-select-option',
				{
					'zov-select-option-selected':
						selectedValues.indexOf(item[valueName]) !== -1
				}
			]"
			v-for="(item, index) in data"
			:key="index + ''"
			@click.stop.capture="$emit('on-click', item)"
			:disabled="item.disabled"
		>
			<slot :props="{ item, index }"></slot>
			<Icon
				zov-internal-reference
				v-if="selectedValues.indexOf(item[valueName]) !== -1"
				iconname="checkmark"
			/>
		</div>
	</div>
</template>
<script>
import Icon from '../icon'
export default {
	components: {
		Icon
	},
	props: {
		data: {
			type: Array,
			default() {
				return []
			}
		},
		selectedValues: {
			type: Array,
			default() {
				return []
			}
		},
		valueName: ''
	}
}
</script>
