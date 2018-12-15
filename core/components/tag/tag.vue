<template>
    <Button
        class="zov-tag"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot></slot>
        <Icon @click.stop="$emit('on-close')" class="zov-tag-close" iconname="close"/>
    </Button>
</template>
<script>
let prefix = 'zov-tag'
export default {
    name: prefix
}
</script>
