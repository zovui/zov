<template>
    <Button
        class="zov-tag"
        v-bind="$attrs"
        v-on="$listeners"
        tag="span"
    >
        <slot></slot>
        <Icon @click="$emit('on-close')" class="zov-tag-close" iconname="close"/>
    </Button>
</template>
<script>
import Icon from '../icon'
import Button from '../button'
let prefix = 'zov-tag'
export default {
    name: prefix,
    components: { Icon, Button }
}
</script>
