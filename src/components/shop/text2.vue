<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
    class="shop-form"
    v-loading="loading"
  >
    <div class="shop-formtwo">
      <div class="btn-title">
        <span class="shop-title">商铺信息</span>
        <!-- 弹窗按钮 -->
        <el-button type="primary" class="myBtn" @click="changePassword"
          >修改密码</el-button
        >
      </div>
      <div class="from">
        <el-form-item label="店铺id :">
          <el-input :disabled="true" :placeholder="data.shop_id"></el-input>
        </el-form-item>
        <el-form-item label="店铺logo :">
          <el-image :src="data.shop_logo"> </el-image>
        </el-form-item>
        <el-form-item label="店铺实景图 :">
          <el-image :src="data.shop_real_pic"> </el-image>
        </el-form-item>
        <el-form-item label="APP店铺背景图 :">
          <el-image :src="data.shop_head_picture"> </el-image>
        </el-form-item>
        <el-form-item label="店铺名称 :">
          <el-input :disabled="true" :placeholder="data.shop_name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="店铺图片 :">
        <el-image :src="data.shop_logo"> </el-image>
      </el-form-item> -->
        <el-form-item label="店铺类型 :">
          <el-input
            :disabled="true"
            :placeholder="data.category_id == 0 ? '入驻商家' : '自营商家'"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺状态 :">
          <el-input
            :disabled="true"
            :placeholder="data.category_id == 0 ? '禁用' : '正常'"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家简介描述 :">
          <el-input
            type="textarea"
            :disabled="true"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :placeholder="data.description"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="月销量 :">
          <el-input
            :disabled="true"
            :placeholder="data.month_sale_number"
          ></el-input>
        </el-form-item>
        <el-form-item label="总销量 :">
          <el-input :disabled="true" :placeholder="data.sale_number"></el-input>
        </el-form-item>
        <el-form-item label="评分 :">
          <el-input :disabled="true" :placeholder="data.evaluate"></el-input>
        </el-form-item>

        <el-form-item label="联系人 :">
          <el-input
            :disabled="true"
            :placeholder="data.contacts_name"
          ></el-input>
        </el-form-item>

        <el-form-item label="联系电话 :">
          <el-input
            :disabled="true"
            :placeholder="data.contact_number"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号码 :">
          <el-input :disabled="true" :placeholder="data.idcard"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面 :">
          <el-image :src="data.idcard_up"> </el-image>
        </el-form-item>
        <el-form-item label="身份证反面 :">
          <el-image :src="data.idcard_down"> </el-image>
        </el-form-item>
        <el-form-item label="身份证地址 :">
          <el-input :disabled="true" :placeholder="data.address"></el-input>
        </el-form-item>

        <el-form-item label="店铺地址 :">
          <el-input
            :disabled="true"
            :placeholder="data.shop_address"
          ></el-input>
        </el-form-item>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="26%"
      center
    >
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <!-- <span>旧密码：</span>
      <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
      <span>新密码：</span>
      <el-input placeholder="请输入内容" v-model="input" clearable> </el-input> -->

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model.number="ruleForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="buts">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-form>
</template>
<script>
export default {
  data() {
    var oldPass = (rule, value, callback) => {
      if (value != this.passWord) {
        // console.log(value,this.passWord)
        callback(new Error("请输入正确的旧密码"));
      } else {
        // if (this.ruleForm.oldPassword !== "") {
        //   this.$refs.ruleForm.validateField("oldPassword");
        // }
        this.myUser.oldPassword = value;
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        this.myUser.newPassword = value;
        callback();
      }
    };
    return {
      // user:{
      //   oldPassword:null,
      //   newPassword:null
      // },
      myUser: {},
      loading: true,
      data: {},
      form: {
        name: "",
        region: "",
      },
      url:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      myPlaceholder: "温州xx产品有限公司",
      centerDialogVisible: false,
      input: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        oldPassword: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPassword: [{ validator: oldPass, trigger: "blur" }],
      },
    };
  },
  components: {},
  computed: {},
  created() {
    this.passWord = sessionStorage.getItem("passWord");
    console.log(this.passWord, this.myUser);
    // this.$initWebSocket();
    this.$api
      .info()
      .then((res) => {
        console.log(res.data.data);
        this.data = res.data.data;
        this.$store.commit("changeUser", res.data.data);
      })
      // .catch((data) => {
      //   console.log(data);
      // })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    changePassword(obj) {
      //修改密码
      this.centerDialogVisible = true;
      console.log(obj.confirm_password)
      if (obj.confirm_password) {
        this.$api.infoChange(obj).then((res) => {
          console.log(res);
        });
      }
      // .then(() => {
      //   sessionStorage.setItem("isLogin", false);
      //   this.$router.push({ path: "/" });
      //   this.$router.go(0);
      // });
    },
    onSubmit() {
      console.log("submit!");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("修改成功!");
          this.changePassword({
            new_password: this.myUser.newPassword,
            old_password: this.myUser.oldPassword,
            confirm_password: this.myUser.newPassword,
          });
          setTimeout(() => {
            sessionStorage.setItem("isLogin", false);
            this.$router.push({ path: "/" });
            this.$router.go(0);
          }, 500);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.centerDialogVisible = false;
    },
  },
};
</script>
<style>
.shop-form .el-dialog {
  min-width: 666px;
}
.shop-form .el-tabs__content {
  /* width: 100%;
  height: 100%; */
}
.shop-form .shop-formtwo {
  /* height: 100%; */
  /* width: 600px; */
  /* position: absolute;
  top: 100px;
  left: 50%; */
  /* transform: translateY(10%); */
  /* margin-top: 140px; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  margin-left: 100px;
  margin-bottom: 100px;
}
.shop-formtwo .el-form-item__label {
  width: 120px !important;
}
.shop-form .btn-title {
  display: flex;
  position: relative;
  /* margin-left: -50px; */
  margin-bottom: 46px;
  margin-top: 26px;
  width: 560px;
  align-items: center;
}
.shop-form .shop-title {
  /* position: absolute;
  top: 50%; */
  /* transform: translateY(-50%); */
  font-size: 40px;
}
.shop-form .myBtn {
  /* height: 30px;
  line-height: 6px; */
  position: absolute;
  top: 50%;
  left: 33%;
  margin-left: 20px;
  transform: translateY(-50%);
}
.shop-form .el-form-item {
  display: flex;
}
.shop-form .el-form-item__content {
  width: 320px;
  margin-left: 30px !important;
}
.shop-form {
  /* padding-bottom: 100px; */
}
.shop-form .el-image {
  width: 140px;
  height: 140px;
}
.shop-form .el-dialog .el-form.demo-ruleForm {
  /* display: flex; */
}
.shop-form .el-input {
}
.shop-form .el-input__inner {
  /* width: 60%; */
}
.shop-form .demo-ruleForm {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.shop-form .demo-ruleForm .el-form-item.is-required {
  /* transform: translateX(6%); */
}
.shop-form .el-form-item.modal-footerBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.shop-form .el-form-item.modal-footerBtn .el-form-item__content {
  /* display: flex !important;
  justify-content: space-between;
  margin-left: 0px !important; */
}
/* .el-form-item.modal-footerBtn
  .el-form-item__content
  .el-button.el-button--primary {
  position: absolute;
  right: 10%;
} */
.shop-form .el-dialog.el-dialog--center .el-form-item__content {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 0 !important;
}
.shop-form .el-dialog {
  height: 340px !important;
}
</style>