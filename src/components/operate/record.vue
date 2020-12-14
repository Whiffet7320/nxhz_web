<template>
  <div class="record-content">
    <Content-top />
    <Content-botton />
    <Page />
  </div>
</template>
<script>
import ContentTop from './recordTop'
import ContentBotton from './recordBottom'
import Page from './recordPage'
export default {
  components:{
    ContentTop,
    ContentBotton,
    Page
  }
}
</script>
<style>
.record-content{
  position: relative;
  height: 100%;
}
</style>