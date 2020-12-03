<template>
  <div class="commentList">
    <div v-if="!tolistDetailsFlag">
      <Content-top />
      <Content-botton />
    </div>
        <router-view v-else />
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContentTop from "./listTop";
import ContentBotton from "./listBottom";
export default {
  components: {
    ContentTop,
    ContentBotton,
  },
    computed: {
    ...mapState(["tolistDetailsFlag"]),
  },
};
</script>
<style>
.commentList {
  position: relative;
  height: 100%;
}
</style>