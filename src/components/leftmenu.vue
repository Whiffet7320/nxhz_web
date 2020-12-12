<template>
  <div class="leftMenu">
    <el-row>
      <el-col class="elCol">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>店铺管理</span>
            </template>
            <router-link :to="{ name: 'test' }" tag="el-menu-item"
              >商铺信息</router-link
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <!-- <el-menu-item index="2-1">123</el-menu-item> -->
            <router-link :to="{ name: 'sell' }" tag="el-menu-item"
              >出售商品</router-link
            >
            <router-link :to="{ name: 'examine' }" tag="el-menu-item"
              >审核商品</router-link
            > </el-submenu
          ><el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <router-link :to="{ name: 'testContent' ,params:{id:'testContent'}}" tag="el-menu-item"
              >订单列表</router-link
            >
            <router-link :to="{ name: 'commentList',params:{id:'commentList'} }" tag="el-menu-item"
              >评论列表</router-link
            >
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>运营管理</span>
            </template>
            <router-link :to="{ name: 'operatetest' }" tag="el-menu-item"
              >优惠券列表</router-link
            >
            <!-- <router-link :to="{ name: 'record' }" tag="el-menu-item"
              >领取记录</router-link
            > -->
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-chat-dot-round"></i>
              <el-badge :is-dot="overallIsDot" class="item"><span>客服管理</span></el-badge>
            </template>
            <router-link :to="{ name: 'webSocket' }" tag="el-menu-item"
              ><el-badge :is-dot='overallIsDot' class="item">客服列表</el-badge>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["overallIsDot"]),
  },
};
</script>
<style>
.leftMenu {
  height: calc(100% - 70px);
  width: 200px;
  background-color: #001529;
}
.el-row {
  height: 100%;
}
.elCol {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-submenu__title {
  /* margin-left: 20px */
  /* transform: translateX(20px); */
  font-size: 16px;
}
.leftMenu .active {
  background-color: #5677fc !important;
}
.el-submenu .el-menu-item {
  margin-left: -1px;
}
.el-menu {
  height: 100%;
  width: 100%;
  border: 0px;
}
.leftMenu .el-badge.item sup {
  margin-top: 10px;
  transform: translateX(20px);
}
</style>