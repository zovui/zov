<template>
    <div :class="classes">
        <ChromeLoading v-if="spinname === 'loading'"></ChromeLoading>
        <DbCircle v-if="spinname === 'dbcircle'"></DbCircle>
        <slot></slot>
    </div>
</template>
<script>
import SpinBars from '../spin-bars'
let prefix = 'zov-spin'
export default {
    name: prefix,
    props: {
        spinname: {
            type: String,
            default: 'loading'
        },
        cover: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes () {
            return [
                prefix,
                {
                    [prefix + '-cover']: this.cover
                }
            ]
        }
    },
    watch: {
        cover (newval) {
            this._isCover(this.newval)
        }
    },
    methods: {
        _isCover (val) {
            if (val && console.log(window.getComputedStyle(this.$el.parentNode, null).position) !== 'static') {
                this.$el.parentNode.style.position = 'relative'
            }
        }
    },
    components: SpinBars,
    mounted () {
        this._isCover(this.cover)
    }
}
</script>
