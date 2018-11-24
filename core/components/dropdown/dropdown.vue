<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
let prefix = 'zov-drop-down'
export default {
    name: prefix,
    computed: {
        classes () {
            return [
                prefix,
                {}
            ]
        }
    }
}
</script>
