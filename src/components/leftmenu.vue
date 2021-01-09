<template>
  <div class="leftMenu">
    <el-col class="elCol">
      <el-menu
        :default-active="default_active"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
        :router="true"
      >
        <el-button class="myisCollBtn" @click="myisColl"
          ><i class="el-icon-menu"></i
        ></el-button>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>店铺管理</span>
          </template>
          <el-menu-item index="1-1" :route="{ name: 'test' }"
            >商铺信息</el-menu-item
          >
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="2-1" :route="{ name: 'sell' }"
            >出售商品</el-menu-item
          >
          <el-menu-item index="2-2" :route="{ name: 'examine' }"
            >审核商品</el-menu-item
          > </el-submenu
        ><el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="3-1" :route="{ name: 'testContent' }"
            >订单列表</el-menu-item
          >
          <el-menu-item index="3-2" :route="{ name: 'commentList' }"
            >评论列表</el-menu-item
          >
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-promotion"></i>
            <span>运营管理</span>
          </template>
          <el-menu-item index="4-1" :route="{ name: 'operatetest' }"
            >优惠券列表</el-menu-item
          >
          <el-menu-item index="4-2" :route="{ name: 'record' }"
            >领取记录</el-menu-item
          >
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-chat-dot-round"></i>
            <el-badge :is-dot="overallIsDot" class="item"
              ><span>客服管理</span></el-badge
            >
          </template>
          <el-menu-item index="5-1" :route="{ name: 'webSocket' }"
            ><el-badge :is-dot="overallIsDot" class="item"
              >客服列表</el-badge
            ></el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      isLabel: true,
      default_active: "",
    };
  },
  computed: {
    ...mapState(["overallIsDot"]),
  },
  created() {
    this.getMatched();
  },
  watch: {
    $route(to, from) {
      console.log(from.path); //从哪来
      console.log(to.path); //到哪去
      if (to.path == "/test/text2") {
        this.default_active = "1-1";
      } else if (to.path == "/goods/sell") {
        this.default_active = "2-1";
      } else if (to.path == "/goods/examine") {
        this.default_active = "2-2";
      } else if (to.path == "/order/testContent") {
        this.default_active = "3-1";
      } else if (to.path == "/order/commentList") {
        this.default_active = "3-2";
      } else if (
        to.path == "/operate/operatetest" ||
        to.path == "/operate/toGrant"
      ) {
        this.default_active = "4-1";
      } else if (to.path == "/operate/record") {
        this.default_active = "4-2";
      } else if (to.path == "/web/webSocket") {
        this.default_active = "5-1";
      }
    },
  },
  methods: {
    myisColl() {
      this.isCollapse = !this.isCollapse;
    },
    getMatched() {
      console.log(this.$route.path);
      if (this.$route.path == "/operate/webSocket") {
        this.default_active = "5-1";
      }
    },
  },
};
</script>
<style>
.leftMenu .myisCollBtn {
  margin-left: 6px;
}
.leftMenu .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.leftMenu .el-menu-vertical-demo {
  height: calc(100vh - 70px);
  width: 70px;
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