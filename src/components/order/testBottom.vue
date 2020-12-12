<template>
  <div class="testBottom">
    <el-table :data="orderList" style="width: 100%">
      <el-table-column
        prop="order_sn"
        label="订单号"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户信息"
        width="250"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <div class="user" v-html="scope.row.user"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderGoods"
        label="商品信息"
        :show-overflow-tooltip="true"
      >
        <!-- <template slot-scope="scope">
          <div class="user" v-html="scope.row.user"></div>
        </template> -->
      </el-table-column>
      <!-- <el-table-column prop="order_goods.goods_name" label="商品信息">
      </el-table-column> -->
      <el-table-column prop="address2" label="商家名称"> </el-table-column>
      <el-table-column prop="real_pay_amount" label="支付金额">
      </el-table-column>
      <el-table-column prop="myOrder_status" label="订单状态">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deliverGoods(scope, 'obj')"
            v-if="scope.row.order_status == 2"
            >发货</el-button
          >
          <!-- <el-button
            type="text"
            size="small"
            @click="Logistics"
            v-else-if="scope.row.order_status == 3"
            >物流信息</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 发货 -->
    <el-dialog
      title="发货"
      :visible.sync="dialogFormVisible"
      class="testBottomDialog"
    >
      <el-form :model="form">
        <el-form-item label="快递单号" :label-width="formLabelWidth">
          <el-input v-model="shippingNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="快递名称" :label-width="formLabelWidth">
          <el-select v-model="cyy" placeholder="顺丰快递" @change="getValue">
            <el-option
              :label="ele.shipping_name"
              v-for="ele in shipping"
              :key="ele.shipping_id"
              :value="ele.shipping_name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="deliverGoodsKeep">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 物流信息 -->
    <el-dialog
      title="物流信息"
      :visible.sync="dialogFormVisible2"
      class="testBottomDialog"
    >
      <el-form :model="form2">
        <el-form-item label="快递单号" :label-width="formLabelWidth">
          <el-input v-model="form2.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="快递名称" :label-width="formLabelWidth">
          <el-select
            v-model="form2.region"
            placeholder="顺丰快递"
            @change="getValue2"
          >
            <el-option
              :label="ele.shipping_name"
              v-for="ele in shipping"
              :key="ele.shipping_id"
              :value="ele.shipping_name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      myPer_page: 10,
      cyy: "", //发货的快递公司
      myOrderSelect: "",
      mySearch: "",
      arr: "",
      orderId: "",
      orderChangeObj: null,
      shipping: null,
      shippingNum: "", //快递单号
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        type: [],
        list: [],
      },
      dialogFormVisible2: false,
      form2: {
        name: "",
        region: "",
        type: [],
      },
      form3: {},
      formLabelWidth: "120px",
      orderList: [],
      num: 0,
      tableData: [],
    };
  },
  computed: {
    ...mapState([
      "order_testContent_search",
      "pageNum",
      "per_page",
      "orderSelect",
      "endTime",
      "startTime",
    ]),
  },
  methods: {
    getValue(value) {
      console.log(value);
      this.orderList.forEach((ele, index) => {
        if (index == this.index) {
          ele.fahuo = value;
        }
      });
    },
    getValue2(value) {
      console.log(value);
    },
    deliverGoodsKeep() {
      //保存
      console.log(this.orderList);
      this.orderChangeObj.shipping_name = this.cyy;
      switch (this.orderChangeObj.shipping_name) {
        case "顺丰快递":
          this.orderChangeObj.shipping_id = 1;
          break;
        case "中国邮政":
          this.orderChangeObj.shipping_id = 2;
          break;
        case "圆通快递":
          this.orderChangeObj.shipping_id = 3;
          break;
        case "韵达快递":
          this.orderChangeObj.shipping_id = 4;
          break;
        case "中通快递":
          this.orderChangeObj.shipping_id = 7;
          break;
        case "森鸿物流":
          this.orderChangeObj.shipping_id = 8;
          break;
        case "店铺配送":
          this.orderChangeObj.shipping_id = 9;
          break;
        case "店内自取":
          this.orderChangeObj.shipping_id = 10;
          break;
        default:
          break;
      }
      this.orderChangeObj.express_number = this.shippingNum;
      console.log(this.orderChangeObj);
      this.$api
        .orderChange(this.orderChangeObj)
        .then((res) => {
          console.log(res);
          if (res.data.status == 0) {
            this.$message.error(res.data.info);
            return;
          } else {
            this.$message({
              message: "发货成功",
              type: "success",
            });
          }
        })
        .then(() => {
          this.getData();
        });
      this.dialogFormVisible = false;
    },
    deliverGoods(scope, type) {
      //发货
      this.shippingNum = "";
      if (type == "str") {
        console.log(scope);
      } else if (type == "obj") {
        this.index = scope.$index;
        this.orderChangeObj = {
          order_id: scope.row.order_id,
          option: "express",
          shipping_id: "",
          shipping_name: "123",
          express_number: this.shippingNum,
        };
        // this.shippingNum = scope.row.order_sn.toString();
        this.cyy = scope.row.fahuo; //发货的快递公司
        this.dialogFormVisible = true;
      }
    },
    Logistics() {
      this.dialogFormVisible2 = true;
    },
    handleClick(row) {
      console.log(row);
      this.$store.commit("changeDetails", row);
      this.$store.commit("todetailsFlag", true);
      this.$router.push({ name: "details" });
    },
    getData() {
      // console.log(this.orderSelect);
      this.$api.shipping().then((res) => {
        // console.log(res.data.data)
        this.shipping = res.data.data; //快递名称
        // console.log(this.shipping);
      });
      const orderListObj = {
        begin_time: this.startTime,
        end_time: this.endTime,
        keyword: this.mySearch,
        limit: this.myPer_page,
        page: this.myPageNum,
        order_status:this.orderSelect
      };
      console.log(orderListObj);
      this.$api.orderList(orderListObj).then((res) => {
        this.orderList = res.data.data.data;
        this.$store.commit("goodsList", res.data.data.data);
        this.total = res.data.data.total;
        // this.per_page = res.data.per_page;
        console.log(this.total, this.per_page);
        // this.$store.commit("per_page", this.per_page);
        this.$store.commit("order_total", this.total);
        this.orderList.forEach((ele) => {
          ele.user = `    <img class="ava"
      style="width: 50px; height: 50px"
      src="${ele.head_pic}"
      :fit="fit"></img><div style="font-size: 12px;line-height: 17px;">${ele.user_id}<br/>${ele.nick_name}<br/>${ele.mobile}</div>`;

          this.orderList.forEach((ele) => {
            // console.log(ele.order_goods)
            // var orderGoods;

            if (ele.order_status == 0) {
              ele.myOrder_status = "已取消";
            } else if (ele.order_status == 1) {
              ele.myOrder_status = "待付款";
            } else if (ele.order_status == 2) {
              ele.myOrder_status = "待发货";
            } else if (ele.order_status == 3) {
              ele.myOrder_status = "待收货";
            } else if (ele.order_status == 4) {
              ele.myOrder_status = "待评价";
            } else if (ele.order_status == 5) {
              ele.myOrder_status = "已完成";
            }
            ele.order_goods.forEach((item) => {
              // console.log(item)
              var orderGoods = `${item.goods_name}${item.goods_sku_name}  ${item.buy_number}件`;
              // console.log(orderGoods);
              ele.orderGoods = orderGoods; //商品信息
            });
          });
        });
        this.$store.commit("total", this.orderList.length);
        // this.orderList = this.orderList.filter((ele) => {
        //   if (this.myOrderSelect == "") {
        //     return true;
        //   }
        //   return ele.myOrder_status == this.myOrderSelect;
        //   // console.log(ele.myOrder_status==this.myOrderSelect)
        // });
        // console.log(this.orderList);
        // this.arr = this.orderList.filter((ele) => {
        //   return ele.order_status == 2;
        // });
        console.log(this.arr);
      });
    },
  },
  created() {
    this.myPageNum = this.pageNum;
    console.log(this.myPageNum);
    // this.$store.commit("pageNum", this.myPageNum);
    console.log(this.$store.state.pageNum);
    this.$store.commit("per_page", 10);
    this.getData();
  },
  watch: {
    "$store.state.order_testContent_search": function () {
      this.mySearch = this.$store.state.order_testContent_search;
      // console.log('xiugaile')
      this.getData();
    },
    "$store.state.pageNum": function () {
      this.myPageNum = this.$store.state.pageNum;
      this.getData();
      // setTimeout(() => {
      //   this.select();
      // }, 300);
    },
    "$store.state.per_page": function () {
      // console.log(this.$store.state.pageNum)
      this.myPer_page = this.$store.state.per_page;
      this.getData();
      // this.select();
    },
    "$store.state.orderSelect": function () {
      this.myOrderSelect = this.$store.state.orderSelect;
      this.getData();
    },
    "$store.state.endTime": function () {
      // this.myOrderSelect = this.$store.state.orderSelect;
      // console.log('xiugaile')
      this.getData();
    },
    "$store.state.startTime": function () {
      console.log(1234444)
      // this.myOrderSelect = this.$store.state.orderSelect;
      // console.log('xiugaile')
      this.getData();
    },
  },
};
</script>

<style >
.testBottom {
  padding: 0 60px 60px 60px;
}
.ava {
  margin-right: 10px;
}
.user {
  display: flex;
}
.testBottomDialog .el-input {
  width: 190px !important;
}
.testBottomDialog .el-input__inner {
  /* width: 120px !important; */
}
.testBottomDialog .el-dialog {
  width: 450px !important;
}
</style>