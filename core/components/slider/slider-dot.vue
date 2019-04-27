<template>
    <div class="zov-slider-dot" :class="classList" :style="position">
        <div class="zov-slider-dot-label" v-html="label"></div>
    </div>
</template>

<script>
export default {
    name: 'slider-dot',
    props: {
        value: Number,
        label: String,
        position: Object,
        isActive: Boolean
    },
    computed: {
        classList () {
            const list = []
            if (this.isActive) {
                list.push('zov-slider-dot--active')
            }
            return list
        }
    }
}
</script>
