<template>
    <div
        class="zov-slider-handle"
        tabindex="0"
        @focus="handleFocus"
        @blur="handleBlur"
    ></div>
</template>

<script>
export default {
    name: 'zov-slider-handle',
    props: {
        id: String
    },
    methods: {
        handleFocus () {
            this.$emit('focus', this.id)
        },
        handleBlur () {
            this.$emit('blur', this.id)
        },
        focus () {
            this.$el.focus()
        },
        blur () {
            this.$el.blur()
        }
    }
}
</script>
