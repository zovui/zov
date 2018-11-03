<template>
    <transition name="zov-fade">
        <div :class="outC" v-show="show">
            <div :class="C" :style="style"></div>
        </div>
    </transition>
</template>
<script>
let $prefix = 'zov-loading-bar'
export default {
    name: 'loading-bar',
    data () {
        return {
            show: false,
            width: 0,
            status: 'primary'
        }
    },
    computed: {
        outC () {
            return `${$prefix}`
        },
        C () {
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
