<template>
    <div>
        <Popper>
            <slot></slot>
        </Popper>
    </div>
</template>
<script>
let prefix = 'zov-select'
export default {
    name: prefix,
    props: {
        search: {
            type: Boolean,
            default: false
        }
    }
}
</script>
