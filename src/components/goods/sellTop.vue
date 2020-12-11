<template>
  <div class="sell-contentTop">
    <div class="left">
      <span>商品列表</span>
    </div>
    <div class="right">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm contentTop-form"
        :inline="true"
      >
        <!-- <div class="inline-box"> -->
        <el-form-item label="分类:" prop="region" class="region">
          <div class="block">
            <el-cascader
              v-model="selectValue"
              :options="myOptions"
              @change="handleChange"
              :props="{ checkStrictly: true }"
            ></el-cascader>
          </div>
        </el-form-item>

        <el-form-item label="关键字:" class="search">
          <el-input v-model="search" @keyup.enter.native="onSubmit" placeholder="请输入商品名称"></el-input>
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
      myValue: [],
      myOptions: [],
      options: [],
    };
  },
  computed: {
    ...mapState(["selectValue","sellSearch"]),
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.$store.commit("sellSearch", this.search);
      this.$store.commit("good_pageNum", 1);
      this.$store.commit("selectValue", this.myValue);
      // this.$router.go(0)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search = "";
      this.myValue = [];
      this.$store.commit("good_pageNum", 1);
      this.onSubmit();
    },
    toGrant() {
      //新建
      // this.$store.commit("edit", { sort: "0" });
      this.$store.commit("goodsId", " ");
      this.$store.commit("good_pageNum", 1);
      this.$store.commit("nameSort", { nameF: "first", nameS: "second" });
      this.$store.commit("toEditFlag", true);
      this.$router.push({ name: "Edit" });
    },
    handleChange(value) {
      console.log(value);
      this.myValue = value;
    },
  },
  created() {
    // this.$api.goodsList().then((res) => {
    //   console.log(res.data.data);
    // });
    this.search = this.sellSearch
    this.$api.allList().then((res) => {
      console.log(res.data.data);
      this.myOptions = res.data.data;
      const arr = JSON.parse(
        JSON.stringify(this.myOptions)
          .replace(/cat_name/g, "label")
          .replace(/cat_id/g, "value")
          .replace(/child/g, "children")
      );
      // arr.child = JSON.parse(JSON.stringify(arr.child).replace(/child/g, 'children'))
      // arr.forEach(ele=>{
      //   // console.log(ele)
      //   const arr2 = JSON.parse(JSON.stringify(ele).replace(/child/g, 'children'))
      //     // console.log(arr2)
      //     ele = arr2
      //   ele.children.forEach(item=>{
      //     // console.log(item)
      //     // item.replace(/cat_name/g, 'value')
      //     const arr3 = JSON.parse(JSON.stringify(item).replace(/child/g, 'children'))
      //     // console.log(arr3)
      //     item = arr3
      //   })
      // })
      // arr.child.replace(/cat_name/g, 'value')

      // this.myOptions.forEach((ele,index)=>{
      //   // console.log(ele)
      //   console.log(this.options[index])
      //   if(this.options[index].label){
      //     this.options
      //   }
      //   this.options[index].label = ele.cat_name
      // })
      this.myOptions = arr;
      console.log(this.myOptions);
      console.log(this.myValue);
    });
  },
};
</script>
<style>
.sell-contentTop {
  display: flex;
  margin-left: 100px;
  margin-bottom: 40px;
}
.sell-contentTop .left {
  margin-top: 26px;
  display: flex;
  /* width: 300px; */
}
.sell-contentTop .left span {
  font-size: 40px;
  display: block;
  width: 200px;
}
.sell-contentTop .right {
  margin-top: 30px;
  margin-left: 30px;
}
.sell-contentTop .right .el-form {
  display: flex;
}
.sell-contentTop .right .el-form .region {
  display: flex;
}
.sell-contentTop .right .el-form .region .el-form-item__content {
  display: flex;
  /* flex-direction: column; */
}
.sell-contentTop .right .el-form .region .el-form-item__content {
  width: 230px;
}
.sell-contentTop .right .el-form .search .el-form-item__label {
  width: 62px !important;
}
.sell-contentTop .right .el-form .contentTop-btn {
  margin-left: 20px;
}
@media screen and (max-width: 1500px) {
  .sell-contentTop .right .el-form {
    display: flex;
    flex-wrap: wrap;
  }
  .sell-contentTop .right .el-form .contentTop-btn {
    margin-left: 54px;
  }
}
.sell-contentTop .right .operate-contentTop .right .phone {
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.sell-contentTop .right .phone span {
  font-size: 14px;
  color: #606266;
  display: block;
  width: 108px;
}
.sell-contentTop .right .phone .el-input__inner {
  width: 190px;
}
.sell-contentTop .toGrant {
  margin-left: 40px;
}
</style>