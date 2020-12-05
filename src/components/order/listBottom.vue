<template>
  <div class="listBottom">
    <el-table :data="commentList" style="width: 100%">
      <!-- <el-table-column prop="date" label="ID"> </el-table-column> -->
      <el-table-column
        prop="user"
        label="用户信息"
        width="250"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <div class="user" v-html="scope.row.user"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="item_id"
        label="订单号"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="是否有图">
        <template slot-scope="scope">
          <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
          <el-checkbox v-model="scope.row.isImg"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="是否匿名">
        <template slot-scope="scope">
          <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
          <el-checkbox v-model="scope.row.isName"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="comment_time"
        label="评论时间"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="address5" label="商品评分">
        <template slot-scope="scope">
          <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
          <el-rate
            v-model="scope.row.score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
          {{ scope.row.rato }}
        </template>
      </el-table-column>
      <el-table-column prop="address6" label="服务评分"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click.native.prevent="
              deleteRow(scope.$index, tableData, scope.row)
            "
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
      value: 3.7,
      nameArr: [
        {
          name: {
            name1: "用户ID",
            name2: "用户昵称",
            name3: "17500554456200",
          },
        },
      ],
      commentList: [],
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
    getData() {
      this.$api.commentList().then((res) => {
        console.log(res.data.data.data);
        this.commentList = res.data.data.data;
        this.commentList.forEach((ele) => {
          ele.comment_time = this.formatDate(new Date(ele.add_time * 1000));
          ele.isImg = ele.is_pictures == 1 ? true : false;
          ele.isName = ele.is_anonymous == 1 ? true : false;
          ele.score = Number(ele.goods_score);
          if (ele.score <= 3) {
            ele.rato = "差评";
          } else if (ele.score <= 4) {
            ele.rato = "中评";
          } else if (ele.score <= 5) {
            ele.rato = "好评";
          }
          ele.user = `    <img class="ava"
      style="width: 50px; height: 50px"
      src="${ele.head_pic}"
      :fit="fit"></img><div style="font-size: 12px;line-height: 17px;">${ele.user_id}<br/>${ele.nick_name}<br/>${ele.mobile}</div>`;
        });
        console.log(this.commentList);
      });
    },
    formatDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      var hour = now.getHours(); //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style >
.listBottom {
  padding: 0 60px 60px 60px;
}
.ava {
  margin-right: 10px;
}
.user {
  display: flex;
}
</style>