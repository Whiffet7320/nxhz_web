<template>
  <div class="player">
    <div id="dplayer"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    new this.$DPlayer({
      container: document.getElementById("dplayer"),
      screenshot: true,
      video: {
        url: "https://v-cdn.zjol.com.cn/280443.mp4",
        // pic: "demo.jpg",
        // thumbnails: "thumbnails.jpg",
      },
      // danmaku: {
      //   id: "demo",
      //   api: "https://api.prprpr.me/dplayer/",
      // },
    });
  },
  methods:{
    
  }
};
</script>
