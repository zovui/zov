<style>
body {
  /*height: 2000px;*/
}
.demo-affix {
  width: 100px;
  height: 30px;
  background: #f60;
  color: #fff;
}
</style>
<template>
  <div>
    <Affix>
      <div class="demo-affix">固定在最顶部</div>
    </Affix>
    <div v-for="(item,index) in arr"
         :key="index">{{item}}</div>
    <Affix :offset-bottom="20">
      <div class="demo-affix">固定在最顶部</div>
    </Affix>
    <div v-for="(item,index) in arr1"
         :key="index + 10000">{{item}}</div>
  </div>

</template>
<script>
export default {
    data () {
        return {
            arr: [],
            arr1: []
        }
    },
    created () {
        for (let i = 0; i < 100; i++) {
            this.arr.push(i)
            this.arr1.push(i)
        }
    }
}
</script>
