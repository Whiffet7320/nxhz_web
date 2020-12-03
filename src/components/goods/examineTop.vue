<template>
  <div class="examine-contentTop">
    <div class="left">
      <span>审核商品</span>
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
        <el-form-item label="审核状态:" prop="region" class="region">
          <el-select v-model="opValue" placeholder="审核状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="关键字:" class="search">
          <el-input v-model="search" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
        <el-form-item class="contentTop-btn">
          <el-button type="primary" @click="onSubmit" class="search"
            >搜索</el-button
          >
          <el-button class="reset" @click="resetForm('ruleForm')"
            >重置</el-button
          >
          <el-button type="success" class="toGrant" @click="toGrant"
            >新建</el-button
          >
        </el-form-item>
        <!-- </div> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      ruleForm: {
        name: "",
        region: "",
        delivery: false,
        type: [],
        search: "",
      },
      value: [],
      myOptions: [],
      options: [
        {
          value: "待审核",
          label: "待审核",
        },
        {
          value: "审核未通过",
          label: "审核未通过",
        },
        {
          value: "审核通过",
          label: "审核通过",
        },
      ],
      opValue: "",
    };
  },
  computed: {
    ...mapState(["examine_Verify","examine_search"]),
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.opValue);
      this.$store.commit("examine_Verify", this.opValue);
      this.$store.commit("examine_search", this.search);
      this.$store.commit("examine_pageNum", 1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search = "";
      this.opValue = "";
      this.$store.commit("examine_pageNum", 1);
      this.onSubmit();
    },
    toGrant() {
      this.$store.commit("goodsId", " ");
      this.$store.commit("edit", { sort: "0" });
      this.$store.commit("examine_pageNum", 1);
      this.$store.commit("toEditFlag", true);
      this.$router.push({ name: "Edit" });
    },
  },
  created() {
    // if(this.examine_Verify)
    this.search = this.examine_search
    this.opValue = this.examine_Verify;
    console.log(this.examine_Verify, ",", this.opValue);
    // if(this.examine_Verify == 0){
    //   this.opValue = '待审核'
    // } else if(this.examine_Verify == 1){
    //   this.opValue = '审核未通过'
    // }else if(this.examine_Verify == 2){
    //   this.opValue = '审核通过'
    // }else{
    //   this.opValue = ''
    // }
    this.$api.goodsList().then((res) => {
      console.log(res.data.data);
    });
  },
};
</script>
<style>
.examine-contentTop {
  display: flex;
  margin-left: 100px;
  margin-bottom: 40px;
}
.examine-contentTop .left {
  margin-top: 26px;
  display: flex;
  /* width: 300px; */
}
.examine-contentTop .left span {
  font-size: 40px;
  display: block;
  width: 200px;
}
.examine-contentTop .right {
  margin-top: 30px;
  margin-left: 30px;
}
.examine-contentTop .right .el-form {
  display: flex;
}
.examine-contentTop .right .el-form .region {
  display: flex;
}
.examine-contentTop .right .el-form .region .el-form-item__content {
  display: flex;
  /* flex-direction: column; */
}
.examine-contentTop .right .el-form .region .el-form-item__content {
  width: 230px;
}
.examine-contentTop .right .el-form .search .el-form-item__label {
  width: 62px !important;
}
.examine-contentTop .right .el-form .contentTop-btn {
  margin-left: 20px;
}
@media screen and (max-width: 1500px) {
  .examine-contentTop .right .el-form {
    display: flex;
    flex-wrap: wrap;
  }
  .examine-contentTop .right .el-form .contentTop-btn {
    margin-left: 28px;
  }
}
.examine-contentTop .right .operate-contentTop .right .phone {
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.examine-contentTop .right .phone span {
  font-size: 14px;
  color: #606266;
  display: block;
  width: 108px;
}
.examine-contentTop .right .phone .el-input__inner {
  width: 190px;
}
.examine-contentTop .toGrant {
  margin-left: 40px;
}
</style>