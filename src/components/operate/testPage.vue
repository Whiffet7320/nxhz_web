<template>
  <div class="page">
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style>
.record-content .page,
.operate-content .page {
  padding: 0 60px 60px 60px;
  float: right;
}
</style>