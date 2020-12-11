<template>
  <div class="testBottom">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="coupon_name" label="优惠券名称"> </el-table-column>
      <el-table-column prop="coupon_money" label="优惠券金额">
      </el-table-column>
      <el-table-column prop="my_create_time" label="添加时间">
      </el-table-column>
      <el-table-column prop="my_expiration_time" label="过期时间">
      </el-table-column>
      <el-table-column prop="my_coupon_type" label="优惠券类型">
      </el-table-column>
      <el-table-column prop="my_display" label="是否显示">
        <template scope="scope">
          <el-select
            @change="my_displayCli(scope,$event)"
            v-model="scope.row.my_display"
            placeholder="请选择"
            ref="display"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="my_is_on_system" label="是否系统下架">
      </el-table-column>
      <el-table-column prop="sort" label="排序">
        <template scope="scope">
          <div class="input-box">
            <el-input
              size="small"
              v-model="scope.row.sort"
              @keyup.enter.native="skuEditEnter(scope)"
              @focus="skuEditFocus(scope)"
            ></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="deleteRow(scope.row)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      mycoupon_display: null,
      index: "",
      mySearch: null,
      skuFlag: true,
      tableData: [],
      myPer_page: null,
      myPageNum: null,
      options: [
        {
          value: 1,
          label: "显示",
        },
        {
          value: 0,
          label: "不显示",
        },
      ],
    };
  },
  watch: {
    "$store.state.operate_test_Search": function () {
      this.mySearch = this.$store.state.operate_test_Search;
      // console.log('xiugaile')
      this.getData();
    },
    "$store.state.testPage_pageNum": function () {
      this.myPageNum = this.$store.state.testPage_pageNum;
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
    "$store.state.coupon_display": function () {
      this.mycoupon_display = this.$store.state.coupon_display;
      this.getData();
    },
    // "$store.state.endTime_commentList": function () {
    //   this.getData();
    // },
    // "$store.state.startTime_commentList": function () {
    //   console.log(1234444);
    //   this.getData();
    // },
  },
  computed: {
    ...mapState(["operate_test_Search", "testPage_pageNum", "coupon_display"]),
  },
  methods: {
    deleteRow(row){
      // 删除优惠券
      this.$api.couponChange({
        coupon_id:row.id,
        status:0
      }).then((res)=>{
        console.log(res)
        this.getData();
      })
    },
    // my_displayCli2(scope) {
    //   // console.log(scope.$index);
    //   this.index = scope.$index;
    //   // this.skuEditEnter(scope)
    // },
    my_displayCli(scope,selVal) {
      console.log(scope,selVal);
      scope.row.display = selVal
      this.skuEditEnter(scope)
      // if (selVal == 1) {
      //   this.tableData.forEach((ele, index) => {
      //     if (index == this.index) {
      //       console.log(ele);
      //       ele.display = selVal
      //     }
      //   });
      // } else if (selVal == 0) {
      //   this.tableData.forEach((ele, index) => {
      //     if (index == this.index) {
      //       console.log(ele);
      //       ele.display = selVal
      //     }
      //   });
      // }
      // scope.row.display
    },
    skuEditEnter(scope) {
      // 优惠券编辑
      console.log(scope.row);
      const storageObj = {
        coupon_id: scope.row.id,
        sort: scope.row.sort,
        display:scope.row.display,
      };
      console.log(storageObj);
      this.$api
        .couponChange(storageObj)
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          this.skuFlag = true;
          this.getData();
        });
    },
    skuEditFocus(scope) {
      console.log(scope.row);
      if (this.skuFlag) {
        this.skuFlag = false;
        this.sku_sort = scope.row.sort;
      }
    },
    handleClick(row) {
      console.log(row);
      this.$store.commit("couponData", row);
      // this.$store.commit("couponId", row.id);
      // this.$store.commit("toEditFlag", true);
      this.$router.push({ name: "addGrant" });
    },
    getData() {
      const couponObj = {
        keyword: this.mySearch,
        // limit:'',
        display: this.mycoupon_display,
        // is_page:'',
        limit: this.myPer_page,
        page: this.myPageNum,
      };
      this.$api.couponList(couponObj).then((res) => {
        console.log(res.data.data);
        this.$store.commit("total", res.data.data.total);
        this.tableData = res.data.data.data;
        this.tableData.forEach((ele) => {
          ele.my_create_time = this.formatDate(
            new Date(ele.create_time * 1000)
          );
          ele.my_expiration_time = this.formatDate(
            new Date(ele.expiration_time * 1000)
          );
          if (ele.coupon_type == 0) {
            ele.my_coupon_type = "全场通用";
          } else if (ele.coupon_type == 1) {
            ele.my_coupon_type = "店铺券";
          } else if (ele.coupon_type == 2) {
            ele.my_coupon_type = "分类券";
          } else if (ele.coupon_type == 3) {
            ele.my_coupon_type = "商品券";
          }
          if (ele.display == 1) {
            this.$set(ele,'my_display','显示')
            // ele.my_display = "显示";
          } else if (ele.display == 0) {
            this.$set(ele,'my_display','不显示')
            // ele.my_display = "不显示";
          }
          if (ele.is_on_system == 1) {
            ele.my_is_on_system = "系统下架";
          } else if (ele.is_on_system == 0) {
            ele.my_is_on_system = "正常";
          }
        });
      });
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
  },
  created() {
    this.myPageNum = this.$store.state.testPage_pageNum;
    this.getData();
  },
};
</script>

<style >
.operate-content .testBottom {
  padding: 0 60px 60px 60px;
}
</style>