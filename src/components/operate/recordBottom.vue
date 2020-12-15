<template>
  <div class="testBottom">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="50"> </el-table-column>
      <el-table-column prop="coupon_name" label="优惠券名称" min-width="90">
      </el-table-column>
      <el-table-column prop="coupon_money" label="优惠券金额" min-width="70">
      </el-table-column>
      <el-table-column prop="user" label="用户信息" min-width="130">
        <template slot-scope="scope">
          <div class="user" v-html="scope.row.user"></div>
        </template>
      </el-table-column>
      <el-table-column prop="my_coupon_type" label="类型" min-width="70">
      </el-table-column>
      <el-table-column prop="my_get_time" label="领取时间" min-width="100">
      </el-table-column>
      <el-table-column
        prop="my_expiration_time"
        label="过期时间"
        min-width="100"
      >
      </el-table-column>
      <el-table-column prop="my_state" label="状态" min-width="60">
      </el-table-column>
      <el-table-column prop="my_use_time" label="使用时间" min-width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="60">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      myCoupon_type: null,
      myState: null,
      mySearch: null,
      myPageNum: null,
      myPer_page: null,
      flag: true,
      couponUserListObj: null,
    };
  },
  created() {
    this.myPageNum = this.$store.state.couponUserList_pageNum;
    this.getData();
  },
  watch: {
    "$store.state.couponUserList_Search": function () {
      this.mySearch = this.$store.state.couponUserList_Search;
      this.getData();
    },
    "$store.state.couponUserList_pageNum": function () {
      this.myPageNum = this.$store.state.couponUserList_pageNum;
      this.getData();
    },
    "$store.state.per_page": function () {
      this.myPer_page = this.$store.state.per_page;
      this.getData();
    },
    "$store.state.couponUserList_state": function () {
      this.myState = this.$store.state.couponUserList_state;
      this.getData();
    },
    "$store.state.couponUserList_coupon_type": function () {
      this.myCoupon_type = this.$store.state.couponUserList_coupon_type;
      this.getData();
    },
    "$store.state.couponUserList_total": function () {
      this.getData();
    },
  },
  methods: {
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
    handleClick(row) {
      // console.log(row);
      this.$store.commit("couponUserList_row", row);
      this.$router.push({ name: "recordDetails" });
    },
    getData() {
      const couponUserListObj = {
        state: this.myState,
        coupon_type: this.myCoupon_type,
        keyword: this.mySearch,
        limit: this.myPer_page,
        page: this.myPageNum,
      };
      this.$api.couponUserList(couponUserListObj).then((res) => {
        // console.log(res.data.data.data);
        this.tableData = res.data.data.data;
        this.$store.commit("couponUserList_total", res.data.data.total);
        this.tableData.forEach((ele) => {
          if (ele.coupon_type == 0) {
            ele.my_coupon_type = "全场通用";
          } else if (ele.coupon_type == 1) {
            ele.my_coupon_type = "店铺";
          } else if (ele.coupon_type == 2) {
            ele.my_coupon_type = "类目";
          } else if (ele.coupon_type == 3) {
            ele.my_coupon_type = "指定商品";
          }

          if (ele.state == 0) {
            ele.my_state = "未使用";
          } else if (ele.state == 1) {
            ele.my_state = "已使用";
          } else if (ele.state == 2) {
            ele.my_state = "已作废";
          } else if (ele.state == 3) {
            ele.my_state = "已过期";
          }

          ele.my_get_time = this.formatDate(new Date(ele.get_time * 1000));
          if(ele.use_time == 0){
            ele.my_use_time = ''
          }else {
            ele.my_use_time = this.formatDate(new Date(ele.use_time * 1000));
          }
          ele.my_expiration_time = this.formatDate(
            new Date(ele.expiration_time * 1000)
          );
          ele.user = `    <img class="ava"
      style="width: 50px; height: 50px"
      src="${ele.head_pic}"
      :fit="fit"></img><div style="font-size: 12px;line-height: 17px;">${ele.user_id}<br/>${ele.nick_name}<br/>${ele.mobile}</div>`;
        });
      });
    },
  },
};
</script>

<style >
.testBottom {
  padding: 0 60px 60px 60px;
}
.ava {
  margin-right: 10px;
}
.user {
  display: flex;
}
</style>