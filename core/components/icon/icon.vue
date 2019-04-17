<template>
    <span v-bind="$attrs"
          v-on="$listeners"
          :class="[
            prefix,
            'zov-iconfont',
            'zi-' + iconname
        ]"></span>
</template>
<script>
const prefix = 'zov-icon'
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
    }
}
</script>
