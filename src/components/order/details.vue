<template>
  <div class="details-header">
    <div class="details">
      <div class="title">
        <p>订单详情页</p>
        <span class="backTo" @click="backTo">返回上一页</span>
        <el-button @click="print" class="print">打印订单</el-button>
        <!-- <br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font> -->
      </div>
      <div class="middle">
        <p class="tit1">收货信息</p>
        <div class="twoBox">
          <div class="middle-left">
            <p class="tit">收货人姓名：</p>
            <p class="tit">联系电话：</p>
            <p class="tit">详细地址：</p>
          </div>
          <div class="middle-right">
            <p class="tit">{{ myOrder.consignee }}</p>
            <p class="tit">{{ myOrder.mobile }}</p>
            <p class="tit">{{ myOrder.address }}</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p class="tit1">订单信息</p>
        <table>
          <thead class="top">
            <tr>
              <th class="no1">SKU名称</th>
              <th class="no2">销售价</th>
              <th class="no3">库存</th>
              <th class="no4">销售单位</th>
            </tr>
          </thead>
          <tbody class="bottom">
            <tr v-for="(ele, index) in myOrder.order_goods" :key="index">
              <td>{{ ele.goods_name }}</td>
              <td>{{ ele.shop_price }}</td>
              <td>{{ ele.buy_number }}</td>
              <td>{{ ele.goods_sku_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footer">
        <div class="twoBox">
          <div class="footer-one">
            <p class="tit active">订单状态：</p>
            <p class="tit">订单编号：</p>
            <p class="tit">第三方流水号：</p>
            <p class="tit">支付方式：</p>
            <p class="tit">商家名称：</p>
            <p class="tit">下单时间：</p>
            <!-- <p class="tit">收货人姓名：</p> -->
          </div>
          <div class="footer-two">
            <p class="tit active">{{ details.myOrder_status }}</p>
            <p class="tit">{{ myOrder.order_sn }}</p>
            <p class="tit">{{ myOrder.trade_no }}</p>
            <p class="tit">{{ myOrder.myUserPayType }}</p>
            <p class="tit">{{ myOrder.shop_name }}</p>
            <p class="tit">{{ myOrder.add_time }}</p>
            <!-- <p class="tit">{{ twoarr[0].g }}</p> -->
          </div>
          <div class="footer-three">
            <p class="tit">商品总额：</p>
            <p class="tit">优惠券/抵扣卷：</p>
            <p class="tit">支付金额：</p>
          </div>
          <div class="footer-four">
            <p class="tit">{{ myOrder.total_amount }}</p>
            <p class="tit">{{ myOrder.preference_amount }}</p>
            <p class="tit">{{ myOrder.real_pay_amount }}</p>
          </div>
        </div>
      </div>
      <div class="below" v-if="myOrder.order_express">
        <div class="below-one">
          <p class="tit">快递名称：</p>
          <p class="tit">快递单号：</p>
        </div>
        <div class="below-two">
          <p class="tit">{{ myOrder.order_express.shipping_name }}</p>
          <!-- myOrder.order_express 可能会null -->
          <p class="tit">{{ myOrder.order_express.express_number }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  // beforeRouteLeave(to, from) {
  //   console.log(to, from,"beforeRouteLeave_details");
  // },
  data() {
    return {
      myOrder: {},
      twoarr: [],
      arr: [],
    };
  },
  computed: {
    ...mapState(["details", "pageNum"]),
  },
  created() {
    // console.log(this.details.);
    if (this.details.order_id) {
      this.$api.orderInfo(this.details.order_id).then((res) => {
        console.log(res.data.data);
        this.myOrder = res.data.data;
        this.myOrder.add_time = this.formatDate(
          new Date(res.data.data.add_time * 1000)
        );

        if (this.myOrder.user_pay_type == 0) {
          this.myOrder.myUserPayType = "未知";
        } else if (this.myOrder.user_pay_type == 1) {
          this.myOrder.myUserPayType = "支付宝";
        } else if (this.myOrder.user_pay_type == 2) {
          this.myOrder.myUserPayType = "微信";
        } else if (this.myOrder.user_pay_type == 3) {
          this.myOrder.myUserPayType = "余额";
        }
      });
    } else {
      this.$router.push({ name: "testContent" });
    }
  },
  methods: {
    print() {
      console.log(this.$getlodop);
      let LODOP = this.$getlodop();
      console.log(LODOP);
      LODOP.SET_PRINT_STYLE("FontSize", 18);
      LODOP.SET_PRINT_STYLE("Bold", 1);
      // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
      const body = this.myOrder.order_goods
        .map((i) => {
          return (
            ' <div style="display: flex"><span style="flex: 0 0 50%"><span>' +
            i.goods_name +
            '</span> <span style="font-size: 10px">[产品规格:' +
            i.goods_sku_name +
            ']</span></span> <span style="flex: 1 1 auto">*' +
            i.buy_number +
            '</span><span style="flex: 0 0 20%">' +
            i.shop_price * i.buy_number +
            "</span><br/> </div> " +
            ""
          );
        })
        .join("");
      const html =
        "  <div>\n" +
        '        <div class="title">' +
        this.myOrder.shop.shop_name +
        "</div>\n" +
        "        <span>--------------------------------------------------</span>\n" +
        "        <!--  商铺地址 -->\n" +
        "        <div>商铺地址：" +
        this.myOrder.shop.address +
        "</div>\n" +
        "        <div>商铺联系电话：" +
        this.myOrder.shop.contact_number +
        "</div>\n" +
        "        <div> <span>--------------------------------------------------</span></div>\n" +
        '        <div class="orderTime">下单时间:' +
        this.formatDate(new Date(this.myOrder.pay_time * 1000)) +
        "</div>\n" +
        '        <div class="orderTime">订单编号:' +
        this.myOrder.order_sn +
        "</div>\n" +
        "        <div> <span>--------------------------------------------------</span></div>\n" +
        body +
        '        <div style="margin-top: 35px; position: relative; margin-bottom: 20px"><span style="font-size: 10px">合计:</span><span style="position: absolute;right:10px">' +
        this.myOrder.total_amount +
        "</span></div>\n" +
        "        <span>----------------------<span>其他</span>----------------------</span>\n" +
        "        <!-- 优惠费 -->\n" +
        '        <div style="font-size: 10px">优惠' +
        "0.00没有接口" +
        "元</div>\n" +
        "        <!--  实际配送费  -->\n" +
        '        <div style="font-size: 10px">[配送费:' +
        "无接口" +
        "元]</div>\n" +
        "        <!--配送时间-->\n" +
        "        <!--实际支付-->\n" +
        '        <div style="font-size: 20px">实付: ￥' +
        this.myOrder.real_pay_amount +
        "元</div>\n" +
        "        <span>--------------------------------------------------</span>\n" +
        "        <!--收货地址-->\n" +
        '        <div style="font-size: 15px">收货地址:' +
        this.myOrder.address +
        "</div>\n" +
        "        <!--收货人-->\n" +
        "        <div>收货人:" +
        this.myOrder.consignee.substring(0, 1) +
        "**" +
        "</div>\n" +
        "        <!-- 联系电话 -->\n" +
        "        <div>联系电话:" +
        this.myOrder.mobile.substring(0, 3) +
        "****" +
        this.myOrder.mobile.substring(7, 12) +
        "</div>\n" +
        "        <span>--------------------------------------------------</span>\n" +
        "        <!--订单备注-->\n" +
        '        <div style="font-size: 15px">订单备注:' +
        this.myOrder.remark +
        "</div>\n" +
        "        <span>--------------------------------------------------</span>\n" +
        "      </div>";
      LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", html);
      LODOP.PRINT();
    },
    formatDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      var hour = now.getHours(); //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    backTo() {
      // console.log(this.$store.state.order_testContent_backTo);
      this.$store.commit("pageNum", this.pageNum);
      // console.log(this.$store.state.order_testContent_backTo);
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.details .title .print {
  margin-left: 30px;
  margin-top: 10px;
  height: 40px !important;
}
.details-header {
  min-height: 100%;
  /* height: 100%; */
  width: 100%;
  box-sizing: border-box;
}
.details-header .el-tabs--border-card {
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

.details-header .el-tab-pane {
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
  height: 116px;
  /* border: 1px solid; */
  display: flex;
  margin-left: 20px;
}
.details .title p {
  font-size: 40px;
  margin-right: 54px;
  margin-left: 20px;
}
.details .title .backTo {
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
  height: 150px;
  padding: 26px 0;
  border-bottom: 1px solid #bbbbbb;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.details .middle .twoBox .middle-right {
  width: calc(900px - 150px);
  height: 150px;
  padding: 26px 0;
  border-bottom: 1px solid #bbbbbb;
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