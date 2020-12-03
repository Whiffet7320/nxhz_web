<template>
  <div class="wrapper" v-if="isLogin">
    <div class="wrapper-two" >
      <sys-header></sys-header>
      <sys-menu></sys-menu>
    </div>
    <!-- <sys-content></sys-content> -->
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import './index'
import { mapState } from "vuex";
import sysHeader from "./sysHeader";
import sysMenu from "./leftmenu";
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    ...mapState(["flag"]),
  },
  components: {
    sysHeader,
    sysMenu,
  },
  methods: {
    getData() {
      this.isLogin = sessionStorage.getItem("isLogin");
      console.log(this.isLogin);
    },

  },
  created() {
    this.getData();
  },
  watch: {
    "this.isLogin": function () {
      this.getData();
    },
    immediate: true,
  },
};
</script>

<style>
@import "../assets/index.css";
body {
  min-width: 1200px;
  overflow: auto;
}
.wrapper-two {
  height: 100%;
}
.right-content {
  height: calc(100% - 70px);
  width: calc(100% - 200px);
  overflow-y: scroll;
}
.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
</style>