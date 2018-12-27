<template>
    <transition name="zov-fade">
        <div :class="outClasses" v-show="show">
            <div :class="Classes" :style="style"></div>
        </div>
    </transition>
</template>
<script>
let $prefix = 'zov-loading-bar'
export default {
    name: $prefix,
    data () {
        return {
            show: false,
            width: 0,
            status: 'primary'
        }
    },
    computed: {
        outClasses () {
            return `${$prefix}`
        },
        Classes () {
            return [
                `${$prefix}-inner`,
                `${$prefix}-inner-color-${this.status}`
            ]
        },
        style () {
            return {
                width: this.width
            }
        }
    }
}
</script>
