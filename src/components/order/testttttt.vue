<template>
  <div class="listBottom">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="ID"> </el-table-column>
      <el-table-column prop="name" label="用户信息">
        <template slot-scope="scope">
          <div v-html="scope.row.name"></div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="订单号"> </el-table-column>
      <el-table-column prop="address2" label="商家名称"> </el-table-column>
      <el-table-column prop="address3" label="评价内容"> </el-table-column>
      <el-table-column prop="address4" label="评论时间"> </el-table-column>
      <el-table-column prop="address5" label="商品评分"> </el-table-column>
      <el-table-column prop="address6" label="服务评分"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameArr: [
        {
          name: {
            name1: "用户ID",
            name2: "用户昵称",
            name3: "17500554456200",
          },
        },
      ],

      tableData: [
        {
          date: "1",
          name: "用户ID<br/>用户昵称<br/>17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
        {
          date: "1",
          name: "用户ID" + "\n用户昵称\n17500554456200",
          address: "上海市普陀区金沙江路 1519 弄",
          address2: "韵丰食品123",
          address3: "评价内容XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          address4: "2020.07.31 13:45:00",
          address5: "3",
          address6: "4",
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.$store.commit("changeDetails", row);
      this.$store.commit("tolistDetailsFlag", true);
      this.$router.push({ name: "listDetails" });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      // 删除后要把数据页删掉  ！！！
    },
    getData(){
      this.$api.commentList().then(res=>{
        console.log(res.data.data)
      })
    },
  },
  created(){
    this.getData()
  }
};
</script>

<style >
.listBottom {
  padding: 0 60px 60px 60px;
}
</style>