<template>
    <Row>
        <Col span="2" v-for="item in 12" :key="item"/>
    </Row>
</template>
<style lang="scss" scoped>
    .zov-col{
        height: 100px;
        background: #2aa198;
        &:nth-of-type(2n){
            background: #1cd779;
        }
    }
</style>
