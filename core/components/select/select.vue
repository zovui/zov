<template>
    <div>
        <DropDown>
            <slot></slot>
        </DropDown>
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
