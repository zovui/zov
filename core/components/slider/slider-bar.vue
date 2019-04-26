<template>
    <div class="zov-slider-bar"><slot/></div>
</template>

<style lang="scss">

</style>

<script>
export default {
    name: 'slider-bar',

    data () {
        return {
            draggable: null,
            sliderBarMeta: null
        }
    },
    methods: {

    }
}
</script>
