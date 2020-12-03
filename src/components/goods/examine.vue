<template>
  <div class="sell-content">
    <Content-top />
    <Content-botton />
    <Page />
  </div>
</template>
<script>
import ContentTop from './examineTop'
import ContentBotton from './examineBottom'
import Page from './examinepage'
export default {
  components:{
    ContentTop,
    ContentBotton,
    Page
  }
}
</script>
<style>
.sell-content{
  position: relative;
  height: 100%;
}
</style>