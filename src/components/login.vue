<template>
  <div id="login">
    <div class="loginConbox">
      <!-- <div class="header">
        <div class="logo">
        <img src="../../assets/logo.png">
        </div>
      </div> -->
      <div class="loginBox">
        <div class="loginCon">
          <!-- <p class="title">vue-xuadmin权限管理后台模板</p>
          <p class="title">前台: vue + element-ui</p> -->
          <el-card shadow="always" class="login-module" v-if="smdl">
            <div slot="header" class="clearfix formTitlt">
              <span class="titIconbox">
                <!-- <i class="iconfont xu-saomadenglu2 fa-lg iconcolor"></i>
                <i
                  class="iconfont xu-saomadenglu01 el-icon--right fa-lg pointer my-logo"
                  @click="smdl = !smdl"
                ></i> -->
                <img src="../assets/images/ICON20pt@2px.png" alt="" />
              </span>
              <span>农心海祝商城商家后台</span>
            </div>
            <el-form
              :model="loginForm"
              status-icon
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item>
                <i class="el-icon-user"></i>
                <el-input
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="请输入登录账号"
                  class="el-inp"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <i class="el-icon-unlock"></i>
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入登录密码"
                  class="el-inp"
                  @keyup.enter.native="submitForm"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <!-- <el-button class="subBtn" type="primary" @click="submitForm"
                  >登录</el-button
                > -->
                <el-button type="success" class="subBtn" @click="submitForm"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>

          <el-card shadow="always" class="login-module" v-else>
            <div slot="header" class="clearfix formTitlt">
              <span>扫码登录</span>
              <span class="titIconbox">
                <i class="iconfont xu-mimadenglu1 fa-lg iconcolor"></i>
                <i
                  class="iconfont xu-imagevector el-icon--right fa-lg pointer"
                  @click="smdl = !smdl"
                ></i>
              </span>
            </div>
            <div class="ewmbox">
              <div class="ewm">
                <img
                  src="https://img.alicdn.com/tfscom/TB1ivYYyHvpK1RjSZFqwu3XUVXa.png"
                />
              </div>
              <div class="ewmicon">
                <i class="iconfont xu-saomadenglu fa-2x iconcolor"></i>
                <p>打开 微信 扫一扫登录</p>
              </div>
              <p class="smalltxt">
                <router-link class="a" to="#">免费注册</router-link>
              </p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      smdl: true,
      loginForm: {
        username: "yunfeng",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      sessionStorage.setItem("passWord", this.loginForm.password);
      sessionStorage.setItem("mobile", this.loginForm.username);
      this.$api
        .login({
          mobile: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data.status == 1) {
            // 在 sessionStorage中设置token，值为后台数据中的token
            console.log(res.data.data);
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("isLogin", true);
            this.$router.push({ name: "test" });
            setTimeout(() => {
              this.$router.go(0);
            }, 100);
          }
        });
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
#login {
  width: 100%;
  height: 100vh;
  background-color: #ddd;
  .loginConbox {
    background: #ddd;
  }
  .header {
    height: 60px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
    .logo {
      margin-left: 30px;
      width: 500px;
      float: left;
      height: 40px;
      padding-top: 10px;
      img {
        height: 100%;
      }
    }
  }

  .loginBox {
    .iconcolor {
      color: #409eff;
    }

    padding: 74px 0 118px;

    .loginCon {
      width: 990px;
      margin: auto;
      position: relative;
      height: 388px;

      .el-card__header {
        border-bottom: 0px;
        background-color: #2d3a4b;
        color: #fff;
      }
      .title {
        font-size: 36px;
        font-weight: 600;
        color: #ffffff;
        width: 500px;
        float: left;
        margin-top: 0px;
        &:first-child {
          font-size: 34px;
          margin-top: 50px;
          margin-bottom: 30px;
        }
      }
      .login-module {
        width: 600px;
        height: 406px;
        margin-top: 60px;
        border: none;
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);

        .formTitlt {
          font-size: 18px;
          font-weight: 400;

          .titIconbox {
            float: left;
            height: 38px;
            width: 38px;
            margin-top: -8px;
            margin-right: 16px;
            border: 2px solid #fff;
            img {
              width: 100%;
              height: 100%;
            }
            .pointer {
              cursor: pointer;
            }
            .my-logo {
              margin-right: 30px;
            }
          }
        }

        .smalltxt {
          text-align: right;

          .a {
            text-decoration: none;
            color: #999999;
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }
      .demo-ruleForm {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .el-form-item__content {
        margin-left: 0px !important;
        display: flex;
        .el-icon-user,
        .el-icon-unlock {
          font-size: 30px;
          line-height: 40px;
          margin-right: 20px;
        }
        .el-inp {
          width: 260px;
        }

        .subBtn {
          position: absolute;
          width: 80%;
          left: 50%;
          top: 10%;
          transform: translate(-50%, 50%);
        }
      }
    }

    .el-input__inner,
    .el-button,
    .el-card,
    .el-message {
      border-radius: 0px !important;
    }

    .el-form-item__content .ico {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 999;
      width: 40px;
      height: 39px;
      text-align: center;
      border-right: 1px solid #ccc;
    }

    .ewmbox {
      width: 100%;
      height: 240px;
      margin-top: -25px;

      .ewm {
        width: 140px;
        height: 140px;
        margin: 20px auto;

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }

      .ewmicon {
        width: 140px;
        margin: 20px auto 0;

        .iconfont {
          float: left;
        }

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }
    }
  }
}
</style>
