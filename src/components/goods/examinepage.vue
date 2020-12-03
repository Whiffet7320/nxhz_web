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
        :current-page="examine_pageNum"
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
      this.$store.commit("examine_pageNum", val);
      // console.log(this.myGoodsList.splice(val-1,3))
      // this.myGoodsList = this.goodsList
      // this.newGoodsList = this.myGoodsList.data.splice(val-1,3)
      // this.myGoodsList.data = this.newGoodsList
      // this.$store.commit('goodsList',this.myGoodsList)
      // console.log([1,2,3,4,5,6,7,8,9,10,11,12].splice(val-1,3))
    },
    getTotal() {
      this.myTotal = this.total;
      console.log(this.myTotal);
    },
  },
  computed: {
    ...mapState(["goodsList", "total","examine_pageNum"]),
  },
  created() {
    // console.log(this.goodsList)
    this.myGoodsList = this.goodsList.data;
    this.getTotal();
  },
  watch: {
    "$store.state.total": function () {
      this.getTotal();
    },
    "$store.state.good_pageNum": function () {
      if (this.$store.state.good_pageNum == 1) {
        this.$refs.page.$children[2].$el.children[0].click();
      }
    },
  },
};
</script>
<style>
.sell-content .page {
  padding: 0 60px 60px 60px;
  float: right;
}
</style>