<template>
  <div class="testBottom">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="ID"> </el-table-column>
      <el-table-column prop="name" label="优惠价名称"> </el-table-column>
      <el-table-column prop="address" label="用户信息"> </el-table-column>
      <el-table-column prop="address2" label="类型"> </el-table-column>
      <el-table-column prop="address3" label="状态"> </el-table-column>
      <el-table-column prop="address4" label="领取时间"> </el-table-column>
      <el-table-column prop="address5" label="使用时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "优惠券A",
          name: "A店铺专用",
          address: "2020-07-23",
          address2: "2020-11-25",
          address3: "显示",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "XXXXXXXXXX",
          name: "13736795777",
          address: "8888.88",
          address2: "韵丰食品123",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          address2: "韵丰食品",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "陈奕迅",
          name: "13736795777",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "XXXXXXXXXX",
          name: "13736795777",
          address: "8888.88",
          address2: "韵丰食品123",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          address2: "韵丰食品",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          address2: "韵丰食品",
          address3: "8888.88",
          address4: "2020.10.22 10:30",
          address5: "2020.10.23 5:56",
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.$store.commit("changeDetails", row);
      this.$router.push({ name: "details" });
    },
  },
};
</script>

<style >
.testBottom {
  padding: 0 60px 60px 60px;
}
</style>