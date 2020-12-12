<template>
  <div class="operate-contentTop">
    <div class="left">
      <span>优惠券列表</span>
    </div>
    <div class="right">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm demo-form-inline contentTop-form"
        :inline="true"
      >
        <!-- <div class="inline-box"> -->
        <el-form-item label="有无显示:" prop="region" class="region">
          <el-select
            v-model="value"
            placeholder=""
            @change="optionGrant"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索:" class="search">
          <el-input v-model="search" @keyup.enter.native="onSubmit" placeholder="请输入优惠名称"></el-input>
        </el-form-item>
        <el-form-item class="contentTop-btn">
          <el-button type="primary" @click="onSubmit" class="search"
            >搜索</el-button
          >
          <el-button class="reset" @click="resetForm('ruleForm')"
            >重置</el-button
          >
          <el-button type="success" class="toGrant" @click="toGrant"
            >发放优惠券</el-button
          >
          <el-button type="success" class="toGrant" @click="addGrant"
            >新增优惠券</el-button
          >
        </el-form-item>
        <!-- </div> -->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coupon_display: null,
      search: "",
      value: "",
      // options: [
      //   {
      //     value:0,
      //     name:'全场通用'
      //   },
      //           {
      //     value:1,
      //     name:'店铺券'
      //   },
      //           {
      //     value:2,
      //     name:'分类券'
      //   },
      //           {
      //     value:3,
      //     name:'商品券'
      //   },
      // ],
      options: [
        {
          value: 0,
          name: "不显示",
        },
        {
          value: 1,
          name: "显示",
        },
      ],
      ruleForm: {
        name: "",
        region: "",
        delivery: false,
        type: [],
      },
    };
  },
  methods: {
    optionGrant(val) {
      console.log(val);
      this.coupon_display = val;
    },
    onSubmit() {
      console.log("submit!");
      this.$store.commit("operate_test_Search", this.search);
      this.$store.commit("testPage_pageNum", 1);
      this.$store.commit("coupon_display", this.coupon_display);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search = "";
      this.coupon_display = "";
      this.value = ''
      this.$store.commit("testPage_pageNum", 1);
      this.onSubmit();
    },
    toGrant() {
      this.$router.push({ name: "toGrant" });
    },
    addGrant() {
      this.$store.commit("couponData", {});
      this.$router.push({ name: "addGrant" });
    },
  },
};
</script>
<style>
.operate-contentTop {
  display: flex;
  margin-left: 100px;
  margin-bottom: 40px;
}
.operate-contentTop .left {
  margin-top: 26px;
  display: flex;
  /* width: 300px; */
}
.operate-contentTop .left span {
  font-size: 40px;
  display: block;
  width: 200px;
}
.operate-contentTop .right {
  margin-top: 30px;
  margin-left: 30px;
}
.operate-contentTop .right .el-form .region .el-form-item__content {
  width: 178px;
}
.operate-contentTop .right .el-form .search .el-form-item__label {
  width: 62px !important;
}
.operate-contentTop .right .el-form .contentTop-btn {
  margin-left: 20px;
}
.operate-contentTop .right .operate-contentTop .right .phone {
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.operate-contentTop .right .phone span {
  font-size: 14px;
  color: #606266;
  display: block;
  width: 108px;
}
.operate-contentTop .right .phone .el-input__inner {
  width: 190px;
}
.operate-contentTop .toGrant {
  margin-left: 40px;
}
</style>