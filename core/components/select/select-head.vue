<template>
    <div class="zov-select-head">
        <span></span>
        <Input
            :placeholder="placeholder"
            :autofocus="autofocus"
            :disabled="disabled"/>
    </div>
</template>
<script>
let prefix = 'zov-select-head'
export default {
    name: prefix,
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
