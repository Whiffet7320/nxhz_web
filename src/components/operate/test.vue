<template>
  <div class="operate-header">
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
  created() {
    // console.log(this.$route.matched);
    console.log(this.$route.params);
    // let match = this.$route.matched.filter(item=>item.meta)
    // console.log(match)
    this.list = this.$route.matched;
    // this.list.forEach(ele=>{
    //   // console.log(ele.meta)
    //   ele.meta.forEach((item)=>{
    //     console.log(item)
    //   })
    // })
  },
  watch: {
    $route(to) {
      // console.log(from.path); //从哪来
      // console.log(to.path); //到哪去
      if (to.path == "/operate/operatetest") {
        this.list[0].meta = [
          { title: "运营管理", url: "/operate/operatetest" },
          { title: "优惠券列表", url: "/operate/operatetest" },
        ];
      } else if (to.path == "/operate/record") {
        this.list[0].meta = [
          { title: "运营管理", url: "/operate/record" },
          { title: "领取记录", url: "/operate/record" },
        ];
      } else if (to.path == "/order/details") {
        this.list[0].meta = [
          { title: "订单管理", url: "/order/testContent" },
          { title: "订单列表", url: "/order/testContent" },
          { title: "订单详情页", url: "/order/details" },
        ];
      } else if (to.path == "/order/listDetails") {
        this.list[0].meta = [
          { title: "订单管理", url: "/order/commentList" },
          { title: "评论列表", url: "/order/commentList" },
          { title: "评论详情页", url: "/order/listDetails" },
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.operate-header {
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