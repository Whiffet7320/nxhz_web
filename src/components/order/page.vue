<template>
  <div class="page">
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next, jumper,sizes"
        :total="this.myTotal"
        :page-sizes="[10, 15, 20, 30]"
        :current-page="pageNum"
        ref="page"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
  data() {
    return {
      myGoodsList: null,
      newGoodsList: null,
      myTotal: null,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("per_page", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pageNum", val);
    },
    getTotal() {
      this.myTotal = this.order_total;
      console.log(this.myTotal);
    },
  },
  computed: {
    ...mapState(["goodsList", "order_total", "pageNum"]),
  },
  created() {
    // console.log(this.$refs);
    this.myGoodsList = this.goodsList.data;
    this.getTotal();
  },
  watch: {
    "$store.state.order_total": function () {
      this.getTotal();
    },
    "$store.state.pageNum": {
      handler() {
        if (this.$store.state.pageNum == 1) {
          this.$refs.page.$children[2].$el.children[0].click();
        }
      },
    },
  },
};
</script>
<style>
.order-content .page {
  padding: 0 60px 60px 60px;
  float: right;
}
</style>