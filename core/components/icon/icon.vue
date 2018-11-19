<template>
    <i @click="clickHandle" :class="prefix">
        <svg :class="prefix + '-svg'" aria-hidden="true">
            <use :xlink:href="'#' + iconname"></use>
        </svg>
    </i>
</template>
<script>
let prefix = 'zov-icon'
export default {
    name: prefix,
    data () {
        return {
            prefix: prefix
        }
    },
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
