<template>
    <div
        class="zov-slider-handle"
        tabindex="0"
        :style="styles"
    ></div>
</template>

<script>
export default {
    name: 'zov-slider-handle',
    props: {
        left: String,
        top: String
    },
    computed: {
        styles () {
            return {
                left: this.left,
                top: this.top
            }
        }
    },
    methods: {
        focus () {
            this.$el.focus()
        },
        blur () {
            this.$el.blur()
        }
    }
}
</script>
