<template>
  <div class="sell-content">
    <div v-if="!toEditFlag">
      <Content-top />
      <Content-botton />
      <Page />
    </div>

    <router-view v-else/>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContentTop from "./sellTop";
import ContentBotton from "./sellBottom";
import Page from "./sellpage";
export default {
  components: {
    ContentTop,
    ContentBotton,
    Page,
  },
    computed: {
    ...mapState(["toEditFlag"]),
  },
};
</script>
<style>
.sell-content {
  position: relative;
  height: 100%;
}
</style>