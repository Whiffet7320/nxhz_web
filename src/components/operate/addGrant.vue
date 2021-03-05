<template>
  <div class="addGrant">
    <div class="details">
      <div class="title">
        <p>新增优惠券</p>
        <span @click="backTo">返回上一页</span>
      </div>
      <div class="content">
        <el-dialog title="指定商品" :visible.sync="dialogFormVisible">
          <div class="search">
            <p>搜索：</p>
            <el-input
              @keyup.enter.native="search_getDataGood"
              v-model="search"
              placeholder="请输入商品名称"
            ></el-input>
            <el-button type="primary" @click="search_getDataGood" class="search"
              >搜索</el-button
            >
            <el-button class="reset" @click="resetForm">重置</el-button>
            <!-- <el-button class="reset" @click="selectAll">全选</el-button> -->
          </div>

          <el-table :data="myTableData" style="width: 100%" ref="multipleTable">
            <el-table-column label="" width="100">
              <template slot-scope="scope">
                <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
                <el-checkbox
                  v-model="scope.row.checkedFather"
                  @change="check(scope)"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="goods_id" label="ID"> </el-table-column>
            <el-table-column
              prop="goods_name"
              label="商品名称"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column label="商品主图">
              <template slot-scope="scope">
                <img :src="scope.row.goods_img" style="height: 50px" />
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="flex">
            <div class="page">
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="10"
                  layout="total, prev, pager, next, jumper"
                  :total="this.myTotal"
                  :current-page="addGrant_good_pageNum"
                  ref="page"
                >
                </el-pagination>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="my_submit">确 定</el-button>
            </div>
          </div>
        </el-dialog>
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="my_couponData"
        >
          <el-form-item label="优惠券名称：">
            <el-input v-model="coupon_name"></el-input>
          </el-form-item>
          <el-form-item label="优惠金额：">
            <el-input v-model="coupon_money"></el-input>
          </el-form-item>
          <el-form-item label="满减条件：">
            <el-input v-model="available_money"></el-input>
          </el-form-item>
          <el-form-item label="过期时间：">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              @change="timeChange()"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="指定：">
            <el-radio v-model="coupon_type" :label="1" @change="shops">指定店铺</el-radio>
            <el-radio v-model="coupon_type" :label="3" @change="shop"
              >指定商品</el-radio
            >
          </el-form-item>
          <div
            class="myitem_idArr"
            @click="shop"
            v-if="myitem_idArr.length > 0"
          >
            {{ myitem_idArr }}
          </div>
          <el-form-item label="排序值：">
            <el-input v-model="sort"></el-input>
          </el-form-item>
          <el-form-item label="是否显示：">
            <el-radio v-model="display" :label="1">显示</el-radio>
            <el-radio v-model="display" :label="0">不显示</el-radio>
          </el-form-item>
          <el-form-item label="简要描述：">
            <div id="editor"></div>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button type="primary" @click="addCoupon">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import E from "wangeditor";
export default {
  data() {
    return {
      search: null,
      myItem: "",
      coupon_id: null,
      myitem_idArr: [],
      my_couponData: null,
      editor: null,
      item_idArr: [],
      item_id: null,
      myTableData: null,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      coupon_name: "",
      coupon_money: "",
      available_money: "",
      expiration_time: null,
      coupon_type: 1,
      sort: "",
      display: 1,
      description: "",
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      value1: "",
      myTime: null,
      myTotal: null,
      myPageNum: 1,
      flag: true,
    };
  },
  computed: {
    ...mapState(["addGrant_good_pageNum", "couponData", "testPage_pageNum"]),
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "list",
      "justify",
      "emoticon",
      "table",
      "undo",
      "redo",
    ];
    this.editor.create();
    this.editor.txt.html(this.description);
  },
  created() {
    this.getDate();
    this.myTotal = this.total;
    console.log(this.total);
    this.$store.commit("addGrant_good_pageNum", 1);
  },
  watch: {
    "$store.state.total": function () {
      this.getTotal();
    },
    "$store.state.addGrant_good_pageNum": function () {
      this.myPageNum = this.$store.state.addGrant_good_pageNum;
      if (this.$store.state.addGrant_good_pageNum == 1) {
        this.$refs.page.$children[2].$el.children[0].click();
      }
      this.getDataGood();
    },
    "$store.state.per_page": function () {
      // console.log(this.$store.state.pageNum)
      // this.myPageNum = this.$store.state.per_page;
      this.getDataGood();
      // this.select();
    },
  },
  methods: {
    search_getDataGood() {
      this.$store.commit("addGrant_good_pageNum", 1);
      setTimeout(() => {
        this.getDataGood();
      }, 100);
    },
    resetForm() {
      this.search = "";
      this.item_id = "";
      this.myitem_idArr = "";
      this.item_idArr = "";
      this.$store.commit("addGrant_good_pageNum", 1);
      this.getDataGood("reset");
    },
    selectAll() {
      this.getDataGood("all");
    },
    my_submit() {
      this.dialogFormVisible = false;
      this.myItem = this.myitem_idArr;
      // this.myitem_idArr.forEach((ele) => {
      //   this.myItem += ` ${ele}`;
      // });
      console.log(this.myItem);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("per_page", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("addGrant_good_pageNum", val);
      // console.log(this.myGoodsList.splice(val-1,3))
      // this.myGoodsList = this.goodsList
      // this.newGoodsList = this.myGoodsList.data.splice(val-1,3)
      // this.myGoodsList.data = this.newGoodsList
      // this.$store.commit('goodsList',this.myGoodsList)
      // console.log([1,2,3,4,5,6,7,8,9,10,11,12].splice(val-1,3))
    },
    getTotal() {
      this.myTotal = this.total;
      console.log(this.myTotal);
    },
    backTo() {
      this.$store.commit("testPage_pageNum", this.testPage_pageNum);
      this.$router.go(-1);
    },
    getDate() {
      console.log(this.couponData);
      this.get_item_arrData();
      if (this.couponData) {
        this.my_couponData = this.couponData;
        this.coupon_id = this.couponData.id;
        this.coupon_name = this.couponData.coupon_name;
        this.coupon_money = this.couponData.coupon_money;
        this.available_money = this.couponData.available_money;
        this.value1 = this.couponData.expiration_time * 1000;
        this.coupon_type = this.couponData.coupon_type;
        this.item_id = this.couponData.item_id;
        this.sort = this.couponData.sort;
        this.display = this.couponData.display;
        this.description = this.couponData.description;
        this.item_id.split(",").forEach((ele) => {
          this.item_idArr.push(Number(ele));
        });
        // this.myitem_idArr =
        console.log(this.item_idArr);
      } else {
        this.$router.push({ name: "operatetest" });
      }
    },
    get_item_arrData() {
      this.$api
        .goodsList({
          limit: 100,
          page: this.myPageNum,
          keyword: this.search,
        })
        .then((res) => {
          console.log(res.data.data);
          this.myTableData = res.data.data.data;
          this.total = res.data.data.total;
          this.$store.commit("total", this.total);
          console.log(res.data.data.data);
          this.myTableData.forEach((ele) => {
            console.log(ele.checkedFather);
            // ele.checkedFather = false
            console.log(this.item_idArr.indexOf(ele.goods_id));
            // var index = this.item_idArr.indexOf(ele.goods_id);
            if (this.item_idArr.indexOf(ele.goods_id) > -1) {
              this.$set(ele, "checkedFather", true);
              if (this.flag) {
                this.myitem_idArr.push(ele.goods_name);
              }
            } else {
              this.$set(ele, "checkedFather", false);
              // this.myitem_idArr.splice(index, 1);
            }
          });
        });
    },
    getDataGood(str) {
      if (str == "all") {
        this.$api
          .goodsList({
            limit: 10000,
            page: this.myPageNum,
            keyword: this.search,
          })
          .then((res) => {
            console.log(res.data.data);
            this.myTableData = res.data.data.data;
            this.total = res.data.data.total;
            this.$store.commit("total", this.total);
            console.log(res.data.data.data);

            this.myTableData.forEach((ele, index) => {
              if (this.item_idArr.indexOf(ele.goods_id) == -1) {
                setTimeout(() => {
                  document.getElementsByClassName("el-checkbox")[index].click();
                }, 1000);
              }
              this.$set(ele, "checkedFather", true);
            });
          });
        return;
      } else if (str == "reset") {
        this.$api
          .goodsList({
            limit: this.per_page,
            page: this.myPageNum,
            keyword: this.search,
          })
          .then((res) => {
            console.log(res.data.data);
            this.myTableData = res.data.data.data;
            this.total = res.data.data.total;
            this.$store.commit("total", this.total);
            console.log(res.data.data.data);

            this.myTableData.forEach((ele) => {
              this.$set(ele, "checkedFather", false);
            });
          });
        return;
      } else {
        this.$api
          .goodsList({
            limit: this.per_page,
            page: this.myPageNum,
            keyword: this.search,
          })
          .then((res) => {
            console.log(res.data.data);
            this.myTableData = res.data.data.data;
            this.total = res.data.data.total;
            this.$store.commit("total", this.total);
            console.log(res.data.data.data);

            this.myTableData.forEach((ele) => {
              console.log(ele.checkedFather);
              if (this.item_idArr.indexOf(ele.goods_id) > -1) {
                this.$set(ele, "checkedFather", true);
                if (this.flag) {
                  this.myitem_idArr.push(ele.goods_name);
                }
              } else {
                this.$set(ele, "checkedFather", false);
              }
            });
          });
      }
    },
    shops(){
      console.log(this.item_idArr)
      this.myitem_idArr = [];
      this.item_idArr = []
    },
    shop() {
      this.dialogFormVisible = true;
      this.flag = false;
      this.getDataGood();
    },
    check(scope) {
      console.log(scope.row, 123);
      if (scope.row.checkedFather) {
        var pushindex = this.item_idArr.indexOf(scope.row.goods_id);
        if (pushindex == -1) {
          this.item_idArr.push(scope.row.goods_id);
          this.myitem_idArr.push(scope.row.goods_name);
        }
        // this.item_idArr.push(scope.row.goods_id);
        // this.myitem_idArr.push(scope.row.goods_name);
      } else {
        var index = this.item_idArr.indexOf(scope.row.goods_id);
        if (index > -1) {
          this.item_idArr.splice(index, 1);
          this.myitem_idArr.splice(index, 1);
        }
      }
      console.log(this.item_idArr.toString());
      this.item_id = this.item_idArr.toString();
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
    timeChange() {
      console.log(this.value1);
      if (Date.parse(this.value1)) {
        console.log(Date.parse(this.value1), "__");
        // this.myTime = this.formatDate(new Date(Date.parse(this.value1)));
        this.expiration_time = Date.parse(this.value1) / 1000;
        console.log(this.expiration_time);
      } else {
        this.expiration_time = this.value1 / 1000;
      }
    },
    addCoupon() {
      // 新增
      if (this.coupon_type == 1) {
        this.item_id = "";
      }
      this.description = document.getElementsByClassName(
        "w-e-text"
      )[0].innerHTML;
      this.timeChange();
      const addCouponObj = {
        coupon_id: this.coupon_id,
        coupon_name: this.coupon_name,
        coupon_money: this.coupon_money,
        available_money: this.available_money,
        expiration_time: this.expiration_time,
        coupon_type: this.coupon_type,
        item_id: this.item_id,
        sort: this.sort,
        display: this.display,
        description: this.description,
      };
      console.log(addCouponObj);
      this.$api.couponEdit(addCouponObj).then((res) => {
        console.log(res);
        if (res.data.status === 1) {
          this.$router.push({ name: "operatetest" });
        }
      });
    },
  },
};
</script>
<style >
.addGrant .search .el-input {
  width: 260px;
  margin-right: 20px;
}
.addGrant .search .el-input__inner {
  width: 260px;
}
.addGrant .el-dialog__body {
  padding: 6px 20px 24px 20px;
}
.addGrant .search {
  display: flex;
  align-items: center;
}
.addGrant .search p {
  width: 70px;
  transform: translateX(10px);
}
.addGrant #editor div {
  margin: 0;
}
.addGrant #editor {
  width: 840px;
}
.addGrant #editor .w-e-toolbar {
  z-index: 1 !important;
}
.addGrant #editor .w-e-text-container {
  z-index: 0 !important;
}
.addGrant .flex {
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
}
.addGrant .content .el-form-item__content {
  margin-left: 10px !important;
}
.addGrant .content .el-form-item {
  display: flex;
  align-items: center;
}
.addGrant .details {
  width: 900px;
  margin: 26px 0 100px 60px;
}
.addGrant .details .title {
  width: 100%;
  height: 116px;
  display: flex;
  margin-left: 20px;
}
.addGrant .details .title p {
  font-size: 40px;
  margin-right: 54px;
  margin-left: 20px;
}
.addGrant .details .title span {
  font-size: 14px;
  color: #74c853;
  margin-top: 18px;
  cursor: pointer;
  height: 23px;
}
.addGrant .details .content {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.addGrant .details .content p {
  margin-right: 16px;
}
.addGrant .details .bottom p {
  margin-bottom: 20px;
}
.addGrant .btn {
  margin-top: 40px;
}
.addGrant .myitem_idArr {
  transform: translateX(130px);
  cursor: pointer;
}
</style>