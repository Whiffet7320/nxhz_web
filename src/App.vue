<template>
  <div class="wrapper" v-if="isLogin == 'true'">
    <sys-header></sys-header>
    <div class="two">
      <div class="wrapper-two">
        <audio
          controls="controls"
          hidden
          src="./assets/2653.mp3"
          ref="audio"
        ></audio>
        <sys-menu></sys-menu>
      </div>
      <!-- <sys-content></sys-content> -->
      <div class="right-content">
        <router-view></router-view>
      </div>
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
    ...mapState(["flag", "mp3_say"]),
  },
  components: {
    sysHeader,
    sysMenu,
    login,
  },
  watch: {
    "$store.state.mp3_say": function () {
      this.mp3_play();
    },
  },
  methods: {
    getData() {
      this.isLogin = sessionStorage.getItem("isLogin");
      console.log(this.isLogin);
      // this.$router.go(0);
    },
    mp3_play() {
      if (this.mp3_say) {
        console.log("play");
        this.$refs.audio.currentTime = 0; //从头开始播放提示音
        this.$refs.audio.play(); //播放
        this.$store.commit("mp3_say", false);
      }
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

<style lang="scss">
@import "./assets/index.css";
.two {
  display: flex;
}
body {
  min-width: 1200px;
  overflow: auto;
}
.wrapper-two {
  height: 100%;
}
.right-content {
  width: calc(100%);
  height: calc(100vh - 70px);
  background-color: #fff;
  overflow-y: scroll;
}
.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
</style>