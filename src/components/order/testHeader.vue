<template>
  <div class="shop-header">
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
      if (this.$route.path == "/order/testContent") {
        this.$store.commit("todetailsFlag", false);
        this.list[0].meta = [
          { title: "订单管理", url: "/order/testContent" },
          { title: "订单列表", url: "/order/testContent" },
        ];
      } else if (this.$route.path == "/order/commentList") {
        this.$store.commit("tolistDetailsFlag", false);
        this.list[0].meta = [
          { title: "订单管理", url: "/order/commentList" },
          { title: "评论列表", url: "/order/commentList" },
        ];
      } else if (this.$route.path == "/order/testContent/details") {
        this.$store.commit('todetailsFlag',true)
        this.list[0].meta = [
          { title: "订单管理", url: "/order/testContent" },
          { title: "订单列表", url: "/order/testContent" },
          { title: "订单详情页", url: "/order/testContent/details" },
        ];
      } else if (this.$route.path == "/order/commentList/listDetails") {
        this.$store.commit('tolistDetailsFlag',true)
        this.list[0].meta = [
          { title: "订单管理", url: "/order/commentList" },
          { title: "评论列表", url: "/order/commentList" },
          { title: "评论详情页", url: "/order/commentList/listDetails" },
        ];
      }
    },
  },
  created() {
    this.getMatched();
  },
  watch: {
    $route(to, from) {
      console.log(from.path); //从哪来
      console.log(to.path); //到哪去
      if (to.path == "/order/testContent") {
        this.$store.commit("todetailsFlag", false);
        this.list[0].meta = [
          { title: "订单管理", url: "/order/testContent" },
          { title: "订单列表", url: "/order/testContent" },
        ];
      } else if (to.path == "/order/commentList") {
        this.$store.commit("tolistDetailsFlag", false);
        this.list[0].meta = [
          { title: "订单管理", url: "/order/commentList" },
          { title: "评论列表", url: "/order/commentList" },
        ];
      } else if (to.path == "/order/testContent/details") {
        this.list[0].meta = [
          { title: "订单管理", url: "/order/testContent" },
          { title: "订单列表", url: "/order/testContent" },
          { title: "订单详情页", url: "/order/testContent/details" },
        ];
      } else if (to.path == "/order/commentList/listDetails") {
        this.list[0].meta = [
          { title: "订单管理", url: "/order/commentList" },
          { title: "评论列表", url: "/order/commentList" },
          { title: "评论详情页", url: "/order/commentList/listDetails" },
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-header {
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