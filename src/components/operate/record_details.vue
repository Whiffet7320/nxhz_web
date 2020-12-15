<template>
  <div class="listDetails">
    <div class="details">
      <div class="title">
        <p>评价管理</p>
        <span @click="backTo">返回上一页</span>
      </div>
      <div class="from">
        <el-form ref="form" :model="my_couponUserList_row" label-width="80px">
          <el-form-item label="用户id：">
            <el-input :disabled="true" v-model="my_couponUserList_row.user_id"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：">
            <el-input :disabled="true" v-model="my_couponUserList_row.nick_name"></el-input>
          </el-form-item>
          <el-form-item label="用户手机号：">
            <el-input :disabled="true" v-model="my_couponUserList_row.mobile"></el-input>
          </el-form-item>
          <el-form-item label="用户头像：">
            <img
              :src="my_couponUserList_row.head_pic"
              alt=""
              style="width: 100px; hieght: 100px"
            />
          </el-form-item>
          <el-form-item label="使用的订单号：">
            <el-input :disabled="true" v-model="my_couponUserList_row.order_sn"></el-input>
          </el-form-item>
          <el-form-item label="优惠卷名称：">
            <el-input :disabled="true" v-model="my_couponUserList_row.coupon_name"></el-input>
          </el-form-item>
          <el-form-item label="优惠卷金额：">
            <el-input :disabled="true" v-model="my_couponUserList_row.coupon_money"></el-input>
          </el-form-item>
          <el-form-item label="满减条件：">
            <el-input :disabled="true"
              v-model="my_couponUserList_row.available_money"
            ></el-input>
          </el-form-item>
          <el-form-item label="优惠券类型：">
            <el-input :disabled="true" v-model="my_couponUserList_row.my_coupon_type"></el-input>
          </el-form-item>
          <el-form-item label="记录id：">
            <el-input :disabled="true" v-model="my_couponUserList_row.id"></el-input>
          </el-form-item>
          <el-form-item label="领取时间：">
            <el-input :disabled="true" v-model="my_couponUserList_row.my_get_time"></el-input>
          </el-form-item>
          <el-form-item label="过期时间：">
            <el-input :disabled="true"
              v-model="my_couponUserList_row.my_expiration_time"
            ></el-input>
          </el-form-item>
          <el-form-item label="使用状态：">
            <el-input :disabled="true" v-model="my_couponUserList_row.my_state"></el-input>
          </el-form-item>
          <el-form-item label="使用时间：" v-if="my_couponUserList_row.my_state!=='未使用'">
            <el-input :disabled="true" v-model="my_couponUserList_row.my_use_time"></el-input>
          </el-form-item>
          <el-form-item label="相关id：">
            <el-input :disabled="true" v-model="my_couponUserList_row.item_id"></el-input>
          </el-form-item>
          <el-form-item label="优惠券描述：">
            <div id="editor"></div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import E from "wangeditor";
export default {
  data() {
    return {
      my_commentInfo: null,
    };
  },
  computed: {
    ...mapState(["couponUserList_row"]),
  },
  created() {
    this.getData();
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.create();
    this.editor.txt.html(this.my_couponUserList_row.description);
  },
  methods: {
    getData() {
      this.my_couponUserList_row = this.couponUserList_row;
      console.log(this.couponUserList_row);
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
    backTo() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.listDetails {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.listDetails #editor {
  width: 840px;
}
.listDetails #editor .w-e-text-container {
  max-height: 740px !important;
}
.listDetails #editor img {
  max-width: 100%;
}
.listDetails .from .el-form-item {
  display: flex;
}
.listDetails .from .el-form-item__content {
  width: 300px;
  margin-left: 20px !important;
}
.listDetails .from .el-form-item__label {
  width: 120px !important;
  margin-right: 0px !important;
}
.details {
  width: 900px;
  margin: 26px 0 100px 60px;
}
.details .title {
  width: 100%;
  height: 80px;
  /* border: 1px solid; */
  display: flex;
  margin-left: 20px;
}
.details .title p {
  font-size: 40px;
  margin-right: 54px;
  margin-left: 20px;
}
.details .title span {
  font-size: 14px;
  color: #74c853;
  margin-top: 18px;
  cursor: pointer;
  height: 23px;
}
</style>