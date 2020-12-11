<template>
  <div class="toGrant">
    <div class="details">
      <div class="title">
        <p>发放优惠券</p>
        <span @click="backTo">返回上一页</span>
      </div>
      <div class="content">
        <p>优惠券名称：</p>
        <el-select
          v-model="value"
          placeholder="请选择优惠券"
          @change="optionGrant"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.coupon_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <!-- <div class="bottom">
        <p>发放用户：</p>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="用户 A"></el-checkbox>
          <el-checkbox label="用户 B"></el-checkbox>
          <el-checkbox label="用户 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
      </div> -->

      <el-dialog title="选择用户" :visible.sync="dialogFormVisible">
        <div class="search">
          <p>搜索：</p>
          <el-input
            @keyup.enter.native="getdata"
            v-model="search"
            placeholder="请输入用户名称或电话"
          ></el-input>
        </div>
        <el-table :data="myTableData" style="width: 100%">
          <!-- <el-table-column prop="date" label="ID"> </el-table-column> -->
          <el-table-column label="选择用户">
            <template slot-scope="scope">
              <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
              <el-checkbox
                v-model="scope.row.checkedFather"
                @change="check(scope)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="用户ID"
            min-width="100"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="head_pic"
            label="用户头像"
            min-width="90"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <img
                :src="scope.row.head_pic"
                alt=""
                style="width: 50px; height: 50px"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="nick_name"
            label="用户名称"
            min-width="90"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="用户电话"
            min-width="90"
            :show-overflow-tooltip="true"
          >
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
                :current-page="toGrant_good_pageNum"
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
      <!--  -->
      <el-button @click="selectUser">选择用户</el-button>
      <div v-if="myuser_idArr.length > 0">{{ myuser_idArr }}</div>
      <div class="btn">
        <el-button type="primary" @click="couponSend_btn">发放</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      myTableData: [],
      checkList: ["用户 A", "选中且禁用"], //选中的复选框
      options: [],
      value: "",
      dialogFormVisible: false,
      myTotal: null,
      user_idArr: [],
      myuser_idArr: [],
      coupon_id: null,
      search:null,
    };
  },
  computed: {
    ...mapState(["toGrant_good_pageNum"]),
  },
  watch: {
    "$store.state.total": function () {
      this.getTotal();
    },
    "$store.state.toGrant_good_pageNum": function () {
      this.myPageNum = this.$store.state.toGrant_good_pageNum;
      if (this.$store.state.toGrant_good_pageNum == 1) {
        this.$refs.page.$children[2].$el.children[0].click();
      }
      this.getdata();
    },
    "$store.state.per_page": function () {
      // console.log(this.$store.state.pageNum)
      // this.myPageNum = this.$store.state.per_page;
      this.getdata();
      // this.select();
    },
  },
  methods: {
    optionGrant(val) {
      console.log(val);
      this.coupon_id = val;
    },
    couponSend_btn() {
      const couponSendObj = {
        coupon_id: this.coupon_id,
        user_id: this.user_idArr,
      };
      this.$api.couponSend(couponSendObj).then((res) => {
        console.log(res);
        if (res.data.status === 1) {
          this.$router.push({ name: "operatetest" });
        }
      });
    },
    check(scope) {
      console.log(scope.row);
      if (scope.row.checkedFather) {
        this.user_idArr.push(scope.row.user_id);
        this.myuser_idArr.push(scope.row.nick_name);
      } else {
        var index = this.user_idArr.indexOf(scope.row.user_id);
        if (index > -1) {
          this.user_idArr.splice(index, 1);
          this.myuser_idArr.splice(index, 1);
        }
      }
      console.log(this.user_idArr, this.myuser_idArr);
      // this.item_id = this.item_idArr.toString();
    },
    backTo() {
      this.$router.go(-1);
    },
    my_submit() {
      this.dialogFormVisible = false;
    },
    selectUser() {
      this.dialogFormVisible = true;
      this.getdata();
    },
    getdata() {
      const couponObj = {
        // keyword:this.search,
        // limit:'',
        // display:'',
        // is_page:'',
        limit: 100,
      };
      this.$api.couponList(couponObj).then((res) => {
        console.log(res.data.data.data);
        this.options = res.data.data.data;
      });
      this.$api
        .shopUserList({
          page: this.myPageNum,
          keyword:this.search,
        })
        .then((res) => {
          console.log(res.data.data.data);
          this.total = res.data.data.total;
          this.$store.commit("total", this.total);
          this.myTableData = res.data.data.data;
          this.myTableData.forEach((ele) => {
            console.log(ele);
            console.log(this.user_idArr.indexOf(ele.user_id));
            if (this.user_idArr.indexOf(ele.user_id) > -1) {
              this.$set(ele, "checkedFather", true);
            } else {
              this.$set(ele, "checkedFather", false);
            }
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("per_page", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("toGrant_good_pageNum", val);
    },
    getTotal() {
      this.myTotal = this.total;
      console.log(this.myTotal);
    },
  },
  created() {
    console.log(this.toGrant_good_pageNum);
    this.getdata();
    this.$store.commit("toGrant_good_pageNum", 1);
  },
};
</script>
<style>
.toGrant .el-dialog__body{
  padding:6px 20px 24px 20px
}
.toGrant .search{
  display: flex;
  align-items: center;
}
.toGrant .search p{
  width: 56px;
  transform: translateX(10px);
}
.toGrant .details {
  /* width: 900px; */
  margin: 26px 0 100px 60px;
}
.toGrant .details .title {
  width: 100%;
  height: 116px;
  display: flex;
  margin-left: 20px;
}
.toGrant .details .title p {
  font-size: 40px;
  margin-right: 54px;
  margin-left: 20px;
}
.toGrant .details .title span {
  font-size: 14px;
  color: #74c853;
  margin-top: 18px;
  cursor: pointer;
  height: 23px;
}
.toGrant .details .content {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.toGrant .details .content p {
  margin-right: 16px;
}
.toGrant .details .bottom p {
  margin-bottom: 20px;
}
.toGrant .btn {
  margin-top: 40px;
}
.toGrant .flex{
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
}
</style>