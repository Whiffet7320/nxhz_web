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
              v-model="mySelectValue"
              :options="myOptions"
              @change="handleChange"
              :props="{ checkStrictly: true }"
            ></el-cascader>
          </div>
        </el-form-item>

        <el-form-item label="关键字:" class="search">
          <el-input
            v-model="search"
            @keyup.enter.native="onSubmit"
            placeholder="请输入商品名称"
          ></el-input>
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

        <!-- sku一键导入 -->
        <el-button class="skuBtn" @click="SKUupLoaddialogVisible = true" plain
          >SKU一键导入</el-button
        >
        <el-dialog
          class="SKUupLoaddialog"
          title="提示"
          :visible.sync="SKUupLoaddialogVisible"
          width="400px"
        >
          <div class="uploadStyle">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://api.xianfmei.com/shop/goods/sku/upload"
              name="file"
              drag
              :headers="header"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :on-error="uploadFalse"
              :on-success="uploadSuccess"
              :auto-upload="false"
              :on-change="handleChangeUpload"
              :before-upload="beforeAvatarUpload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">只能上传Xlsx文件</div>
            </el-upload>
            <el-button
              size="small"
              type="success"
              @click="submitUpload"
              icon="el-icon-finished"
              >批量导入</el-button
            >
            <el-button icon="el-icon-download" type="danger" size="small">
              <a
                class="sku_a"
                href="https://nxhzapp.oss-cn-hangzhou.aliyuncs.com/file/%E5%86%9C%E5%BF%83%E6%B5%B7%E7%A5%9D%E6%89%B9%E9%87%8F%E4%B8%8A%E4%BC%A0.rar"
                download="文件模板.xlsx"
              >
                <span class="templateMedo">文件模板</span>
              </a>
            </el-button>
          </div>
        </el-dialog>

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
      mySelectValue: null,
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
      // sku一键导入
      SKUupLoaddialogVisible: false,
      header: {
        token: sessionStorage.token,
        "Access-Control-Allow-Origin": "*",
        "access-control-allow-credentials": "true",
      },
      fileList: [],
    };
  },
  computed: {
    ...mapState(["selectValue", "sellSearch"]),
  },
  methods: {
    // sku一键上传
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList, "handleRemove");
    },
    uploadFalse() {
      this.$message.error("文件导入失败！");
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      if (response.status == 1) {
        this.$message.success(response.info);
      } else {
        // console.log(fileList.indexOf(file))
        fileList.splice(fileList.indexOf(file), 1);
        this.$message.error(response.info);
      }
      console.log(fileList);
    },
    handleChangeUpload(file, fileList) {
      console.log(file, fileList, "handleChangeUpload");
      // if (file.response.status !== 1) {
      //   this.$message.error(file.response.info);
      //   fileList.splice(-1, 1);
      // }
    },
    beforeAvatarUpload(file) {
      // const filename = file.name.split(".")[1];
      const fileSize = file.size / 1024 / 1024;
      // if (
      //   filename !== "docx" &&
      //   filename !== "xls" &&
      //   filename !== "xlsx" &&
      //   filename !== "doc"
      // ) {
      //   console.log(filename);
      //   this.$message.error("上传模板只能是xls,xlsx,doc,docx格式");
      // }
      if (fileSize > 10) {
        this.$message.error("上传模板不能超过10MB");
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
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
      this.mySelectValue = "";
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
    this.search = this.sellSearch;
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
.sell-contentTop .sku_a {
  text-decoration: none;
  color: #fff;
}
.sell-contentTop .skuBtn {
  height: 40px;
}
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