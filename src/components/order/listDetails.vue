<template>
  <div class="listDetails">
    <div class="details">
      <div class="title">
        <p>评价管理</p>
        <span @click="backTo">返回上一页</span>
      </div>
      <div class="middle">
        <!-- <p class="tit1">收货信息</p> -->
        <div class="twoBox">
          <div class="middle-left">
            <p class="tit">商品评价：</p>
            <p class="tit">服务评价：</p>
            <p class="tit">订单号：</p>
            <p class="tit">用户名：</p>
            <p class="tit">商家名称：</p>
            <p class="tit">评价内容：</p>
            <p class="tit">评论时间：</p>
            <p class="tit">评论图片：</p>
          </div>
          <div class="middle-right">
            <p class="tit">{{ twoarr[0].a }}</p>
            <p class="tit">{{ twoarr[0].b }}</p>
            <p class="tit">{{ twoarr[0].c }}</p>
            <p class="tit">{{ twoarr[0].d }}</p>
            <p class="tit">{{ twoarr[0].e }}</p>
            <p class="tit">{{ twoarr[0].f }}</p>
            <p class="tit">{{ twoarr[0].g }}</p>
            <p>
              <el-image
                :src="twoarr[0].url"
                style="width: 100px; height: 100px"
              ></el-image>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      twoarr: [
        {
          a: "4",
          b: "4",
          c: "330300000330XXXXXX",
          d: "330300000330XXXXXX",
          e: "330300000330XXXXXX",
          f: "330300000330XXXXXX",
          g: "2020/10/20 09:00:00",
          h:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        },
      ],
    };
  },
  computed: {
    ...mapState(["details"]),
  },
  created() {
    console.log(this.details);
  },
  methods: {
    backTo() {
      this.$router.push({ name: "commentList" });
    },
  },
};
</script>
<style scoped>
.listDetails {
  min-height: 100%;
  /* height: 100%; */
  width: 100%;
  box-sizing: border-box;
}
.listDetails .el-tabs--border-card {
  min-height: 100%;
}
.el-tabs {
  height: 100%;
  width: 100%;
}
.el-tabs__content {
  padding: 0px !important;
  /* height: calc(100% - 41px); */
  height: auto;
  overflow: hidden;
  position: relative;
  clear: both;
}
.el-tabs--border-card > .el-tabs__header {
  height: 40px;
}
.el-tabs--border-card {
  border: 0px;
  width: 100%;
}

.listDetails .el-tab-pane {
  /* height: 1000px; */
  /* display: flex; */
  margin-left: 100px;
  justify-content: center;
}
.details {
  /* height: 500px; */
  width: 900px;
  /* position: absolute; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
  /* padding-top: 70px; */
  /* border: 1px solid red; */
  /* overflow: scroll; */
  /* margin-left: 60px; */
  margin: 26px 0 100px 60px;
}
.details .title {
  width: 100%;
  height: 80px;
  /* border: 1px solid; */
  display: flex;
  margin-left: 20px;
}
.details .title p {
  font-size: 40px;
  margin-right: 54px;
  margin-left: 20px;
}
.details .title span {
  font-size: 14px;
  color: #74c853;
  margin-top: 18px;
  cursor: pointer;
  height: 23px;
}

.details .middle {
  width: 100%;
  height: 236px;
  /* border: 1px solid blue; */
}
.details .middle .twoBox {
  display: flex;
}
.details .middle p.tit1 {
  font-size: 26px;
  margin-right: 54px;
}
.details .middle .twoBox .middle-left {
  width: 150px;
  height: 400px;
  padding: 26px 0;
  /* border-bottom: 1px solid #bbbbbb; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.details .middle .twoBox .middle-right {
  width: calc(900px - 150px);
  height: 485px;
  padding: 26px 0;
  /* border-bottom: 1px solid #bbbbbb; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.details .bottom {
  width: 100%;
  /* height: 500px; */
  /* border: 1px solid palevioletred; */
  /* padding-top: 38px; */
}
.details .bottom p.tit1 {
  font-size: 26px;
  margin-right: 54px;
  padding: 38px 0;
  width: 100%;
  /* border: 1px solid greenyellow; */
}

.details table {
  width: 100%;
  text-align: center;
  border-spacing: 0;
  border-collapse: collapse;
}
.details table .top {
  background-color: #e8e8e8;
  color: #000;
}
.details table .bottom {
  background-color: #fff;
}
.details table .bottom td {
  border: 1px solid;
  /* background-color: rgba(245, 247, 250, 0.8); */
}
.details table {
  font-size: 14px;
  /* height: 36px; */
  line-height: 20px;
}
.details table .bottom tr {
  height: 40px;
}
.details table .bottom tr td {
  padding: 5px;
}
.details table .top tr {
  height: 40px;
}
.details table .top th {
  border: 1px solid #000;
}
.details table .top .no1 {
  width: 25%;
}
.details table .top .no2 {
  width: 25%;
}
.details table .top .no3 {
  width: 25%;
}
.details table .top .no4 {
  width: 25%;
}

.details .footer {
  margin-top: 50px;
  width: 100%;
  /* height: 236px; */
  border-bottom: 1px solid #bbbbbb;
}
.details .footer .twoBox {
  display: flex;
}

.details .footer .twoBox .footer-one,
.details .footer .twoBox .footer-two,
.details .footer .twoBox .footer-three,
.details .footer .twoBox .footer-four {
  height: 350px;
  padding: 26px 0;
  /* border-bottom: 1px solid #bbbbbb; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.details .footer .twoBox .footer-one {
  width: 150px;
}

.details .footer .twoBox .footer-three {
  padding-left: 120px;
  height: 150px;
  width: 150px;
}
.details .footer .twoBox .footer-four {
  height: 150px;
}
.details .footer .twoBox .active {
  color: #5394ff;
}

.details .below {
  display: flex;
  margin-top: 32px;
}
.details .below .below-one,
.details .below .below-two {
  height: 100px;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>