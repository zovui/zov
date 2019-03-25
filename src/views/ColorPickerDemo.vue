<template>
    <div>
        <ColorPicker
            v-model="c"
        />
    </div>
</template>
<script>
export default {
    date () {
        return {
            c: 'rgba(23, 11, 123, 1)'
        }
    }
}
</script>
