<template>
  <div class="operate-content">
    <Content-top />
    <Content-botton />
    <Page />
  </div>
</template>
<script>
import ContentTop from './testTop'
import ContentBotton from './testBottom'
import Page from './testPage'
export default {
  components:{
    ContentTop,
    ContentBotton,
    Page
  }
}
</script>
<style>
.operate-content{
  position: relative;
  height: 100%;
}
</style>