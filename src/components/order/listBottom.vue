<template>
  <div class="listBottom">
    <el-table :data="commentList" style="width: 100%">
      <!-- <el-table-column prop="date" label="ID"> </el-table-column> -->
      <el-table-column
        prop="user"
        label="用户信息"
        min-width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <div class="user" v-html="scope.row.user"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="item_id"
        label="订单号"
        min-width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="comment_time"
        label="评论时间"
        min-width="90"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="address5"
        label="商品评分"
        min-width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
          <div class="my_ratoMain">
            <el-rate
              v-model="scope.row.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
            <div class="my_rato">
              {{ scope.row.rato }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address6"
        label="服务评分"
        min-width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
          <div class="my_ratoMain">
            <el-rate
              v-model="scope.row.myService_score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
            <div class="my_rato">
              {{ scope.row.Service_rato }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否有图" min-width="76" prop="isImg">
        <!-- <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isImg"></el-checkbox>
        </template> -->
      </el-table-column>
      <el-table-column label="是否匿名" min-width="76" prop="isName">
        <!-- <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isName"></el-checkbox>
        </template> -->
      </el-table-column>
      <el-table-column fixed="right" min-width="90" label="操作">
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: 3.7,
      nameArr: [],
      commentList: [],
      mySearch: "",
      myPer_page: 10,
    };
  },
  computed: {
    ...mapState([
      "order_commentList_search",
      "pageNum",
      "per_page",
      "orderSelect",
      "endTime_commentList",
      "startTime_commentList",
    ]),
  },
  watch: {
    "$store.state.order_commentList_search": function () {
      this.mySearch = this.$store.state.order_commentList_search;
      // console.log('xiugaile')
      this.getData();
    },
    "$store.state.pageNum": function () {
      this.myPageNum = this.$store.state.pageNum;
      this.getData();
      // setTimeout(() => {
      //   this.select();
      // }, 300);
    },
    "$store.state.per_page": function () {
      // console.log(this.$store.state.pageNum)
      this.myPer_page = this.$store.state.per_page;
      this.getData();
      // this.select();
    },
    "$store.state.orderSelect": function () {
      this.myOrderSelect = this.$store.state.orderSelect;
      this.getData();
    },
    "$store.state.endTime_commentList": function () {
      this.getData();
    },
    "$store.state.startTime_commentList": function () {
      console.log(1234444);
      this.getData();
    },
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.$store.commit("changeDetailsInfo", row);
      this.$store.commit("tolistDetailsFlag", true);
      this.$router.push({ name: "listDetails" });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      // 删除后要把数据页删掉  ！！！
    },
    getData() {
      console.log(this.myPer_page)
      const orderListObj = {
        begin_time: this.startTime_commentList,
        end_time: this.endTime_commentList,
        keyword: this.mySearch,
        limit: this.myPer_page,
        page: this.myPageNum,
      };
      console.log(orderListObj);
      this.$api.commentList(orderListObj).then((res) => {
        console.log(res.data.data.total);
        this.$store.commit("comment_total", res.data.data.total);
        this.commentList = res.data.data.data;
        this.commentList.forEach((ele) => {
          ele.comment_time = this.formatDate(new Date(ele.add_time * 1000));
          ele.isImg = ele.is_pictures == 1 ? "√" : "×";
          ele.isName = ele.is_anonymous == 1 ? "√" : "×";
          ele.score = Number(ele.goods_score);
          ele.myService_score = Number(ele.service_score);
          if (ele.score <= 3) {
            ele.rato = "差评";
          } else if (ele.score <= 4) {
            ele.rato = "中评";
          } else if (ele.score <= 5) {
            ele.rato = "好评";
          }
          if (ele.myService_score <= 3) {
            ele.Service_rato = "差评";
          } else if (ele.myService_score <= 4) {
            ele.Service_rato = "中评";
          } else if (ele.myService_score <= 5) {
            ele.Service_rato = "好评";
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
    this.myPageNum = this.pageNum;
    console.log(this.myPageNum);
    // this.$store.commit("pageNum", this.myPageNum);
    console.log(this.$store.state.pageNum);
    this.$store.commit("per_page", 10);
    console.log(this.myPer_page)
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
.my_ratoMain {
  display: flex;
  align-items: center;
}

.my_rato {
  color: #ff9900;
  transform: translate(10px, -1px);
}
</style>