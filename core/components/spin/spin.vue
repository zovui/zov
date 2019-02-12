<template>
    <transition :name="cover ? 'zov-fade' : ''">
        <div :class="classes" v-if="show">
            <ChromeLoading v-if="spinname === 'loading'"/>
            <DbCircle v-if="spinname === 'dbcircle'"/>
            <slot></slot>
        </div>
    </transition>
</template>
<script>
import SpinBars from '../spin-bars'
let prefix = 'zov-spin'
export default {
    name: prefix,
    components: SpinBars,
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
    data () {
        return {
            show: true
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
            if (val && this.$el.parentNode && window.getComputedStyle(this.$el.parentNode, null).position === 'static') {
                this.$el.parentNode.style.position = 'relative'
            }
        }
    },
    mounted () {
        this._isCover(this.cover)
    }
}
</script>
