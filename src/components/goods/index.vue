<template>
  <div class="goods">
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
      if (this.$route.path == "/goods/sell") {
        this.list[0].meta = [
          { title: "商品管理", url: "/goods/sell" },
          { title: "商品列表", url: "/goods/sell" },
        ];
      } else if (this.$route.path == "/goods/sell/Edit") {
        this.$store.commit('toEditFlag',true)
        this.list[0].meta = [
          { title: "商品管理", url: "/goods/sell" },
          { title: "商品列表", url: "/goods/sell" },
          { title: "商品详情页", url: "/goods/sell/Edit" },
        ];
      } else if (this.$route.path == "/goods/examine") {
        this.list[0].meta = [
          { title: "商品管理", url: "/goods/examine" },
          { title: "审核商品", url: "/goods/examine" },
        ];
      }
    },
  },
  created() {
    this.getMatched()
  },
  watch: {
    $route(to, from) {
      console.log(from.path); //从哪来
      console.log(to.path); //到哪去
      if (to.path == "/goods/sell") {
        this.$store.commit('toEditFlag',false)
        this.list[0].meta = [
          { title: "商品管理", url: "/goods/sell" },
          { title: "商品列表", url: "/goods/sell" },
        ];
      } else if (to.path == "/goods/sell/Edit") {
        this.list[0].meta = [
          { title: "商品管理", url: "/goods/sell" },
          { title: "商品列表", url: "/goods/sell" },
          { title: "商品详情页", url: "/goods/sell/Edit" },
        ];
      } else if (to.path == "/goods/examine") {
        this.list[0].meta = [
          { title: "商品管理", url: "/goods/examine" },
          { title: "审核商品", url: "/goods/examine" },
        ];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.goods {
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