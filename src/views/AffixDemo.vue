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
    <div style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px">
      <h3>参数</h3>
      <h4>Affix props</h4>
      <p>@offset-top 非必传，Number，距离窗口顶部达到指定偏移量后触发，default：0</p>
      <p>@offset-bottom 非必传，Number，距离窗口顶部达到指定偏移量后触发，default：-</p>
      <h4>Affix events</h4>
      <p>@on-change，在固定状态发生改变时触发，返回值：true | false</p>
    </div>
    <Affix>
      <div class="demo-affix">固定在最顶部</div>
    </Affix>
    <div v-for="(item,index) in arr"
         :key="`arr${index}`">{{item}}</div>
    <Affix :offset-bottom="20">
      <div class="demo-affix">固定在最顶部</div>
    </Affix>
    <div v-for="(item,index) in arr1"
         :key="`arr1${index}`">{{item}}</div>
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
        for (let i = 0; i < 40; i++) {
            this.arr.push(i)
            this.arr1.push(i)
        }
    }
}
</script>
