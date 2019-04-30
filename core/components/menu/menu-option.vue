<template>
	<ToolTip
		v-if="isThumbnailMode"
		placement="right"
		:high-color="menuComponent.highColor"
		:class="classes"
		@click="clickHandle"
		:style="paddingStyle"
		:disabled="disabled"
	>
		<template #tooltip>
			<slot>option</slot>
		</template>
		<Icon
			v-if="!hasThumbnailIcon"
			:iconname="thumbnailIcon"
			thumbnail-icon
		/>
		<span ref="title">
			<slot></slot>
		</span>
	</ToolTip>
	<li
		v-else
		:class="classes"
		@click="clickHandle"
		:style="paddingStyle"
		:disabled="disabled"
	>
		<slot>option</slot>
	</li>
</template>
<script>
import MenuMixin from './menu-mixin'
import Icon from '../icon'
import ToolTip from '../tooltip'
const prefix = 'zov-menu-option'
export default {
	name: prefix,
	mixins: [MenuMixin],
	components: {
		Icon,
		ToolTip
	},
	props: {
		name: {
			type: [String, Number],
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		thumbnailIcon: {
			type: String,
			default: 'more'
		}
	},
	computed: {
		classes() {
			return [
				prefix,
				this.name === this.menuComponent.currentActiveName &&
					prefix + '-active'
			]
		},
		isThumbnailMode() {
			return (
				this.menuComponent.currentThumbnail &&
				!this.parentsMenuSub.length &&
				this.parentsMenuGroup.length < 2
			)
		}
	},
	watch: {
		'menuComponent.currentActiveName'() {
			this.initFn()
		}
	},
	methods: {
		upwardUpdateActive() {
			console.log(123)
			this.menuComponent.activeFullPath = []
			this.parentsMenuSub.forEach(component => {
				component.active = true
				let name = component.name + ''
				this.menuComponent.activeFullPath.push(name)
				this.menuComponent.currentOpenNames.indexOf(name) === -1 &&
					this.menuComponent.currentOpenNames.push(name)
			})
		},
		clickHandle(e) {
			this.$emit('click', e)
			if (this.disabled) return
			this.menuComponent.currentActiveName = this.name
			this.upwardUpdateActive()
		},
		initFn() {
			this.menuComponent.currentActiveName + '' === this.name + '' &&
				this.upwardUpdateActive()
		}
	}
}
</script>
