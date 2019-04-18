<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>
import FormDomSizeMixin from '../../mixins/form-dom-size-mixin'
let prefix = 'zov-button-group'
export default {
    name: prefix,
    mixins: [FormDomSizeMixin],
    props: {
        // 形状有2种，default、circle
        shape: {
            type: String,
            validator (value) {
                return ['default', 'circle'].indexOf(value) !== -1
            },
            default: 'default'
        },
        vertical: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            stylePrefix: prefix
        }
    },
    computed: {
        classes () {
            return [
                this.stylePrefix,
                this.sizeClasses,
                {
                    [this.stylePrefix + '-' + this.shape]: !!this.shape,
                    [this.stylePrefix + '-vertical']: this.vertical
                }
            ]
        }
    }
}
</script>
