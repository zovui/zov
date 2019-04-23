<template>
    <article class="container">
        <h1>Slider</h1>
        <section class="section">
            <h2>默认状态</h2>
            <p class="props">当前值: {{ value1 }}</p>
            <Slider v-model="value1" />
        </section>
        <section class="section">
            <h2>指定最大最小值</h2>
            <p class="props">min = 1; max = 10;  当前值: {{ value2 }}</p>
            <Slider v-model="value2" :min="1" :max="10"/>
        </section>
        <section class="section">
            <h2>tooltipVisible：是否展示tooltip</h2>
            <p class="props">当tooltipVisible = 'default'时，拖拽或者hover handle时会显示tooltip</p>
            <Slider tooltipVisible="default" />
            <p class="props">当tooltipVisible = 'hidden'时，总是隐藏tooltip</p>
            <Slider tooltipVisible="hidden" />
            <p class="props">当tooltipVisible = 'always'时，总是显示tooltip</p>
            <Slider tooltipVisible="always" />
        </section>
        <section class="section">
            <h2>tipFormatter: tooltip文案格式化</h2>
            <p class="props">tipFormatter = (value) => '当前值为: ' + value</p>
            <Slider
                tooltipVisible="always"
                :tipFormatter="value => '当前值为: ' + value"
            />
        </section>
    </article>
</template>

<style lang="scss" scoped>
    .container {
        width: 1000px;
        margin: 0 auto;
    }
    .section {
        box-sizing: border-box;
        margin: 20px 0;
        border: 1px solid #f5f5f5;
        padding: 20px 30px;
        box-shadow: 0 0 5px 0 #7f7f7f;
    }
    .props {
        margin: 20px 0;
    }
</style>

<script>
export default {
    data () {
        return {
            value1: 0,
            value2: 2
        }
    }
}
</script>
