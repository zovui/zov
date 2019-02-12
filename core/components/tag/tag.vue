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
import Icon from '../icon'
let prefix = 'zov-tag'
export default {
    name: prefix,
    components: { Icon }
}
</script>
