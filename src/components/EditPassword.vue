<template>
  <div class="editPassword">
    <div class="s-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>修改资料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="title">
        <p>修改资料</p>
        <span @click="backTo">返回上一页</span>
      </div>
      <div class="formPassword">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码：" prop="oldPassword">
            <el-input v-model.number="ruleForm.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="店铺logo :">
            <el-image
              :src="user.shop_head_picture"
              style="width: 100px; height: 100px; cursor: pointer"
              @click="skuCompany"
            >
            </el-image>
            <input
              type="file"
              name="companyLogo"
              id="file0"
              class="fileName displayN"
              multiple="multiple"
              @change="companyLogo($event)"
              ref="skufileInput"
            />
          </el-form-item>
          <el-form-item class="buts">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getData();
  },
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
      user: null,
      passWord: null,
      myUser: {},
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
  methods: {
    getData() {
      this.passWord = sessionStorage.getItem("passWord");
      this.mobile = sessionStorage.getItem("mobile");
      console.log(this.passWord, this.mobile);
      // this.$api
      //   .login({
      //     mobile: this.mobile,
      //     password: this.passWord,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     this.user = res.data.data;
      //   });
      this.$api
        .info()
        .then((res) => {
          console.log(res.data.data);
          this.user = res.data.data;
        })
        .catch((data) => {
          console.log(data);
        })
    },
    backTo() {
      this.$router.go(-1);
    },
    changePassword(obj) {
      //修改密码
      this.$api.infoChange(obj).then((res) => {
        console.log(res);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("修改成功!");
          let obj = {
            new_password: this.myUser.newPassword,
            old_password: this.myUser.oldPassword,
            confirm_password: this.myUser.newPassword,
            shop_head_picture: this.user.shop_head_picture,
          };
          this.changePassword(obj);
          console.log(obj);
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
    skuCompany() {
      console.log(document.getElementsByClassName("fileName")[0]);
      var skufileInput = document.getElementsByClassName("fileName")[0];
      skufileInput.click();
    },
    companyLogo(event) {
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = file;
          this.uploading(true);
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onload = function () {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        console.log(this.imgFile);
        this.$api.ossststoken().then((res) => {
          console.log(res.data.data.date);
          let myData = res.data.data.date;
          let client = new window.OSS.Wrapper({
            region: "oss-cn-hangzhou", //oss地址
            accessKeyId: myData.Credentials.AccessKeyId, //ak
            accessKeySecret: myData.Credentials.AccessKeySecret, //secret
            stsToken: myData.Credentials.SecurityToken,
            bucket: "nxhzapp", //oss名字
          });
          // console.log(client);
          var imgtype = this.imgFile.type.substr(6, 4);
          var store = `images/${new Date().getTime()}.${imgtype}`;
          console.log(store);
          client.put(store, file_re).then((res) => {
            //这个结果就是url
            console.log(res);
            var a = `http://nxhzapp.oss-cn-hangzhou.aliyuncs.com/${store}`;
            this.user.shop_head_picture = a;
            console.log(a);
          });
        });
      }
    },
  },
};
</script>
<style lang="scss">
.editPassword {
  .displayN {
    display: none;
  }
  .s-header {
    height: 64px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    .el-breadcrumb {
      // height: 64px;
      // display: flex;
      // align-items: center;
      margin-left: 30px;
    }
  }
  .content {
    width: 100%;
    .title {
      width: calc(100% - 20px);
      height: 80px;
      /* border: 1px solid; */
      display: flex;
      transform: translateX(20px);
    }
    .title p {
      font-size: 40px;
      margin-left: 94px;
      margin-top: 34px;
      margin-right: 54px;
    }
    .title span {
      font-size: 14px;
      color: #74c853;
      margin-top: 64px;
      cursor: pointer;
      height: 23px;
    }
    .formPassword {
      width: 70%;
      max-width: 1000px;
      // border: 1px solid red;
      margin-top: 20px;
      .el-form-item.el-form-item--feedback {
        display: flex;
        // justify-content: center;
        align-items: center;
        margin-left: 100px;
        .el-form-item__content {
          line-height: 40px;
          position: relative;
          font-size: 14px;
          margin-left: 14px !important;
        }
      }
      .buts {
        margin-left: 100px !important;
        margin-top: 20px;
      }
    }
  }
}
</style>