<template>
  <div class="wrapper" v-if="isLogin == 'true'">
    <div class="wrapper-two">
      <sys-header></sys-header>
      <sys-menu></sys-menu>
    </div>
    <!-- <sys-content></sys-content> -->
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
  <div v-else>
    <login />
  </div>
</template>

<script>
// import './index'
import { mapState } from "vuex";
import sysHeader from "./components/sysHeader";
import sysMenu from "./components/leftmenu";
import login from "./components/login";
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
    login,
  },
  methods: {
    getData() {
      this.isLogin = sessionStorage.getItem("isLogin");
      console.log(this.isLogin);
      // this.$router.go(0);
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    const oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "https://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js";
    document.body.appendChild(oScript);
  },
  // watch: {
  //   "this.isLogin": function () {
  //     this.getData();
  //   },
  //   immediate: true,
  // },
};
</script>

<style>
@import "./assets/index.css";
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