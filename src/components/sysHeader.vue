<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/images/ICON20pt@2px.png" alt="农心海祝商城商家后台" />
      <span>农心海祝商城商家后台</span>
    </div>
    <div class="index-user">
      <el-avatar :src="user.shop_logo"></el-avatar>
      <span>{{ user.contacts_name }}</span>
      <el-dropdown @command="editPassword">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">修改个人资料</el-dropdown-item>
          <el-dropdown-item command="signOut">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-button
        icon="el-icon-switch-button"
        @click="signOut"
        circle
      ></el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: null,
      passWord: null,
      user: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // this.passWord = sessionStorage.getItem("passWord");
      // this.mobile = sessionStorage.getItem("mobile");
      // console.log(this.passWord, this.mobile);
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
          this.$store.commit("changeUser", res.data.data);
        })
        // .catch((data) => {
        //   console.log(data);
        // })
        .then(() => {
          this.loading = false;
        });
    },
    editPassword(command) {
      console.log(command);
      if (command == "edit") {
        this.$router.push({ name: "EditPassword" });
      } else if (command == "signOut") {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        this.$router.push({ path: "/" });
        this.$router.go(0);
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  position: relative;
  background-color: #001529;
}
img {
  vertical-align: middle;
}
span {
  margin-left: 10px;
  font-size: 20px;
  vertical-align: middle;
}
.index-user {
  height: 100%;
  position: absolute;
  right: 10%;
  line-height: 70px;
  color: #fff;
}
.index-user span {
  font-size: 16px;
  margin-right: 14px;
}
.index-user .el-icon-arrow-down.el-icon--right {
  color: #fff;
}
</style>
