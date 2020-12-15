<template>
  <div class="webSocket-header">
    <div class="s-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in list[0].meta"
          :key="index"
          :to="item.url"
        >
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="activity-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: null,
    };
  },
  methods: {
    getMatched() {
      this.list = this.$route.matched;
      if (this.$route.path == "/web/webSocket") {
        this.list[0].meta = [
          { title: "客服管理", url: "/web/webSocket" },
          { title: "客服列表", url: "/web/webSocket" },
        ];
      }
    },
  },
  created() {
    this.getMatched();
  },
};
</script>

<style lang="scss" scoped>
.webSocket-header {
  .s-header {
    height: 64px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    .el-breadcrumb {
      // height: 64px;
      // display: flex;
      // align-items: center;
      margin-left: 30px;
    }
  }
  .activity-view {
  }
}
</style>