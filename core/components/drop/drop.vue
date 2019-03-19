<template>
    <ToolTip
        v-model="visible"
        v-bind="tooltipAttrs"
        >
        <slot slot="tooltip"></slot>
        <slot name="drop-head"></slot>
    </ToolTip>
</template>
<script>
import ToolTip from '../tooltip'
import { DropUpdateMixin } from '../../mixins'
let prefix = 'zov-drop'
export default {
    name: prefix,
    mixins: [DropUpdateMixin],
    components: {
        ToolTip
    },
    data () {
        return {
            visible: this.value
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value (val) {
            this.visible = val
        },
        visible (val) {
            this.$emit('input', val)
        }
    },
    computed: {
        tooltipAttrs () {
            let _this = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({}, _this.$attrs,
                {
                    placement: _this.$attrs.placement || 'bottom',
                    animationName: _this.$attrs.animationName || 'zov-drop',
                    trigger: _this.$attrs.trigger || 'click'
                }
            )
        }
    }
}
</script>
