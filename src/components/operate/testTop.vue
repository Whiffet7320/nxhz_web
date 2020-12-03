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
        <el-form-item label="优惠券类型:" prop="region" class="region">
          <el-select v-model="ruleForm.region" placeholder="全国通用">
            <el-option label="全国通用" value="fu"></el-option>
            <el-option label="店铺" value="fa"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索:" class="search">
          <el-input
            v-model="ruleForm.search"
            placeholder="请输入优惠名称"
          ></el-input>
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
      ruleForm: {
        name: "",
        region: "",
        delivery: false,
        type: [],
        search: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.search = "";
    },
    toGrant(){
      this.$router.push({name:'toGrant'})
    }
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
.operate-contentTop .toGrant{
  margin-left: 40px;
}
</style>