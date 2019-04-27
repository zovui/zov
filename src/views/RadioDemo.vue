<template>
    <div>
        <Radio name="aaa" v-model="radio1" label="1" disabled>item#1</Radio>
        <Radio name="aaa" v-model="radio1" label="2">item#2</Radio>

        <RadioGroup v-model="radio2">
            <Radio label="3">item#1</Radio>
            <Radio label="4">item#2</Radio>
        </RadioGroup>
    </div>
</template>

<script>
    export default {
        name: "RadioDemo",
        data () {
            return {
                radio1: '1',
                radio2: '3'
            }
        }
    }
</script>

<style scoped>

</style>
