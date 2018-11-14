<template>
    <i @click="clickHandle" class="zov-icon">
        <svg class="zov-icon-svg" aria-hidden="true">
            <use :xlink:href="'#' + iconname"></use>
        </svg>
    </i>
</template>
<script>
export default {
    name: 'zov-icon',
    props: {
        iconname: {
            type: String,
            default: ''
        }
    },
    methods: {
        // 将click事件暴露到组件根上
        clickHandle (event) {
            this.$emit('click', event)
        }
    }
}
</script>
