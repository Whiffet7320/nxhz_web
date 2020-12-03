<template>
  <div class="order-content">
    <div v-if="!todetailsFlag">
      <Content-top />
      <Content-botton />
      <Page />
    </div>
    <router-view v-else />
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContentTop from "./testTop";
import ContentBotton from "./testBottom";
import Page from "./page";
export default {
  components: {
    ContentTop,
    ContentBotton,
    Page,
  },
  computed: {
    ...mapState(["todetailsFlag"]),
  },
};
</script>
<style>
.order-content {
  position: relative;
  height: 100%;
}
</style>