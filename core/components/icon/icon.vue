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
    }
}
</script>
