<template>
  <div class="testBottom">
    <el-table :data="myTableData" style="width: 100%" ref="multipleTable">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- <el-form-item label="商品名称">
              <span>{{ props.row.cat_id }}</span>
            </el-form-item> -->
            <el-table
              ref="skuMultipleTable"
              :data="props.row.sku"
              style="width: 100%"
              :show-header="false"
            >
              <el-table-column prop="sku_id" label="ID"> </el-table-column>
              <el-table-column
                prop="sale_attr_name"
                label="商品名称"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column label="商品主图">
                <template slot-scope="scope">
                  <img :src="scope.row.goods_img" style="height: 50px" />
                </template>
              </el-table-column>
              <el-table-column label="分类"> </el-table-column>
              <el-table-column
                prop="prime_cost"
                label="成本价"
              ></el-table-column>
              <el-table-column
                prop="shop_price"
                label="销售价"
              ></el-table-column>
              <!-- 库存!!!!!! -->

              <el-table-column
                label='<@spring.message "flowemptransfer.description"/>'
                class-name="column-bg-color-editable"
                show-overflow-tooltip
              >
                <template scope="scope">
                  <div class="input-box">
                    <!-- @blur="handleInputBlur" -->
                    <el-input
                      size="small"
                      v-model="scope.row.storage"
                      @keyup.enter.native="skuEditEnter(scope)"
                      @focus="skuEditFocus(scope)"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="myVerify" label="审核状态">
              </el-table-column>
              <el-table-column label="是否上架">
                <template slot-scope="scope">
                  <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
                  <el-checkbox v-model="scope.row.checkedFather"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="sort" label="排序">
                <template scope="scope">
                  <div class="input-box">
                    <!-- @blur="handleInputBlur" -->
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
                  <el-button
                    @click="handleClickEdit(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click="deleteRowEdit(scope)"
                    type="text"
                    size="small"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
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
      <el-table-column prop="catName" label="分类"> </el-table-column>
      <el-table-column prop="address3" label="成本价"> </el-table-column>
      <el-table-column prop="address3" label="销售价"> </el-table-column>
      <el-table-column prop="address3" label="库存"> </el-table-column>
      <el-table-column prop="myVerify" label="审核状态"> </el-table-column>
      <el-table-column label="是否上架">
        <template slot-scope="scope">
          <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
          <el-checkbox v-model="scope.row.checkedFather"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序">
        <template scope="scope">
          <div class="input-box">
            <!-- @blur="handleInputBlur" -->
            <el-input
              size="small"
              v-model="scope.row.sort"
              @keyup.enter.native="EditEnter(scope)"
              @focus="EditFocus(scope)"
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
      checkedFather: null, //外部的复选框
      loading: true,
      myTableData: null,
      myPageNum: 1,
      mySearch: "",
      tableData: [],
      tableData2: [],
      sku: [],
      cat1_id: "",
      cat2_id: "",
      cat3_id: "",
      mySelectValue: "",
      limit: null,
      myVerify: null,
      mySys_on_sale: null,
      sku_storage: null,
      sku_sort: null,
      my_storage: null,
      my_sort: null,
      skuFlag: true,
    };
  },
  computed: {
    ...mapState(["sellSearch", "good_pageNum", "selectValue", "per_page"]),
  },
  methods: {
    // 库存相关函数
    // //单元格点击后，显示input，并让input 获取焦点
    // handleCellClick: function (row, column, cell) {
    //   emptransfer.addClass(cell, "current-cell");
    //   if (emptransfer.getChildElement(cell, 3) !== 0) {
    //     var _inputParentNode = emptransfer.getChildElement(cell, 3);
    //     if (
    //       _inputParentNode.hasChildNodes() &&
    //       _inputParentNode.childNodes.length > 2
    //     ) {
    //       var _inputNode = _inputParentNode.childNodes[2];
    //       if (_inputNode.tagName === "INPUT") {
    //         _inputNode.focus();
    //       }
    //     }
    //   }
    // },
    // // input框失去焦点事件
    // handleInputBlur: function (event) {
    //   //当 input 失去焦点 时,input 切换为 span，并且让下方 表格消失（注意，与点击表格事件的执行顺序）
    //   var _event = event;
    //   setTimeout(function () {
    //     var _inputNode = _event.target;
    //     if (emptransfer.getParentElement(_inputNode, 4) !== 0) {
    //       var _cellNode = emptransfer.getParentElement(_inputNode, 4);
    //       emptransfer.removeClass(_cellNode, "current-cell");
    //       emptransfer.removeClass(_cellNode, "current-cell2");
    //     }
    //   }, 200);
    // },
    deleteRowEdit(scope) {
      // 下拉sku的删除按钮
      console.log(scope.row);
      const skuObj = {
        sku_id: scope.row.sku_id,
        status: 0, //0删除
      };
      this.$api
        .skuChange(skuObj)
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          // this.$message({
          //   message: "删除成功",
          //   type: "success",
          // });
        })
        .then(() => {
          this.getData();
        });
    },
    skuEditEnter(scope) {
      console.log(scope.row);
      console.log((Number(scope.row.storage) - this.sku_storage).toString());
      let newStorage = (
        Number(scope.row.storage) - this.sku_storage
      ).toString();
      let myNewStorage = null;
      if (newStorage > 0) {
        myNewStorage = `+${newStorage}`;
      } else {
        myNewStorage = newStorage;
      }
      console.log(myNewStorage);
      const storageObj = {
        sku_id: scope.row.sku_id,
        storage: myNewStorage,
        sort: scope.row.sort,
      };
      console.log(storageObj);
      this.$api
        .skuChange(storageObj)
        .then((res) => {
          console.log(res);
        })
        // .then(() => {
        //   this.$message({
        //     message: "修改成功",
        //     type: "success",
        //   });
        // })
        .then(() => {
          this.skuFlag = true;
          this.getData();
        });
    },
    skuEditFocus(scope) {
      console.log(scope.row.storage, scope.row.sort);
      if (this.skuFlag) {
        this.skuFlag = false;
        this.sku_storage = scope.row.storage;
        this.sku_sort = scope.row.sort;
      }
    },
    EditEnter(scope) {
      console.log(scope.row);
      const storageObj = {
        goods_name: scope.row.goods_name,
        goods_id: scope.row.goods_id,
        sort: scope.row.sort,
        cat1_id: scope.row.cat1_id,
        cat2_id: scope.row.cat2_id,
        cat3_id: scope.row.cat3_id,
        goods_img: scope.row.goods_img,
      };
      console.log(storageObj);
      this.$api
        .goodsEdit(storageObj)
        .then((res) => {
          if (res.data.status == 1) {
            console.log(res.data);
            // this.$message({
            //   message: "保存成功",
            //   type: "success",
            // });
          } else {
            // this.$message.error(res.data.info);
          }
        })
        .then(() => {
          this.getData();
        });
    },
    EditFocus(scope) {
      console.log(scope.row, scope.row.sort);
      this.my_sort = scope.row.sort;
    },
    deleteRow(row) {
      //删除
      console.log(row.goods_id);
      const deleteObj = {
        goods_id: row.goods_id,
        status: 0, //删除
        is_on_sale: 1,
      };
      this.$api.goodsChange(deleteObj).then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          // this.$message({
          //   message: "删除成功",
          //   type: "success",
          // });
        }
        this.getData();
      });
    },
    handleClick(row) {
      console.log(row);
      this.$store.commit("edit", row);
      this.$store.commit("goodsId", row.goods_id);
      this.$store.commit("nameSort", { nameF: "first", nameS: "second" });
      this.$store.commit("toEditFlag", true);
      this.$router.push({ name: "Edit" });
    },
    handleClickEdit(row) {
      //下拉里面的编辑
      this.$store.commit("edit", row);
      this.$store.commit("goodsId", row.goods_id);
      this.$store.commit("nameSort", { nameF: "second", nameS: "first" });
      this.$store.commit("toEditFlag", true);
      this.$router.push({ name: "Edit" });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    toEdit() {
      this.$router.push({ name: "Edit" });
    },
    getData() {
      this.loading = true;
      this.$api
        .goodsList({
          limit: this.per_page,
          keyword: this.mySearch,
          cat1_id: this.selectValue[0],
          cat2_id: this.selectValue[1],
          cat3_id: this.selectValue[2],
          page: this.myPageNum,
          // verify_state:,
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("goodsList", res.data.data);
          // console.log(res.data.data.data);
          console.log(this.cat1_id, this.cat2_id, this.cat3_id);
          this.total = res.data.data.total;
          console.log(this.total);
          // this.per_page = res.data.data.per_page;
          // this.limit = res.data.data.data.length;
          // console.log(res.data.data.data.length, this.per_page);
          // this.$store.commit("per_page", this.per_page);
          this.$store.commit("total", this.total);
          this.tableData = res.data.data.data;
          this.tableData = res.data.data.data.filter((ele) => {
            // if(ele.cat1_id == this.selectValue[0] && ele.cat2_id == this.selectValue[1] &&ele.cat3_id == this.selectValue[2]){
            //   let flag =
            // }
            if (this.mySelectValue != "") {
              if (this.mySelectValue[2]) {
                return (
                  ele.cat1_id == this.mySelectValue[0] &&
                  ele.cat2_id == this.mySelectValue[1] &&
                  ele.cat3_id == this.mySelectValue[2]
                );
              } else if (this.mySelectValue[1]) {
                return (
                  ele.cat1_id == this.mySelectValue[0] &&
                  ele.cat2_id == this.mySelectValue[1]
                );
              } else {
                return ele.cat1_id == this.mySelectValue[0];
              }
            } else {
              return true;
            }
          });
          console.log(this.tableData);
          this.myTableData = this.tableData;
          console.log(this.myTableData);
          this.myTableData.forEach((ele) => {
            if (ele.verify_state == 0) {
              ele.myVerify = "待审核";
            } else if (ele.verify_state == 1) {
              ele.myVerify = "审核未通过";
            } else if (ele.verify_state == 2) {
              ele.myVerify = "审核通过";
            }
            if (ele.sys_on_sale == 0) {
              ele.mySys_on_sale = "下架";
            } else if (ele.sys_on_sale == 1) {
              ele.mySys_on_sale = "正常";
            }
            // console.log(ele)
            if (!ele.cat1) {
              ele.catName = "";
            } else if (!ele.cat2) {
              console.log(`${ele.cat1.cat_name}`);
              ele.catName = `${ele.cat1.cat_name}`;
            } else if (!ele.cat3) {
              ele.catName = `${ele.cat1.cat_name}/${ele.cat2.cat_name}`;
            } else {
              ele.catName = `${ele.cat1.cat_name}/${ele.cat2.cat_name}/${ele.cat3.cat_name}`;
            }
          });
          this.tableData.forEach((ele) => {
            if (ele.is_on_sale == 1) {
              // console.log(ele);
              ele.checkedFather = true;
            } else {
              ele.checkedFather = false;
            }
            console.log(ele.sku);
            ele.sku.forEach((item) => {
              if (item.is_on_sale == 1) {
                // console.log(item);
                item.checkedFather = true;
              } else {
                item.checkedFather = false;
              }
            });
            this.sku.push(ele.sku);
            // console.log(this.sku[index].index);
            // this.tableData2 = ele.sku;
            this.loading = false;
          });
        });
    },
    // select() {
    //   this.myTableData.forEach((ele) => {
    //     console.log(ele.sku);
    //   });
    // },
  },
  created() {
    this.myPageNum = this.good_pageNum;
    console.log(this.myPageNum);
    this.$store.commit("per_page", 10);
    this.checkedFather = true;
    console.log(this.sellSearch);
    this.mySearch = this.$store.state.sellSearch;
    this.getData();
  },
  watch: {
    // "this.myTableData": function () {
    //   this.getData();
    //   // this.select();
    // },
    "$store.state.sellSearch": {
      handler: function () {
        this.mySearch = this.$store.state.sellSearch;
        this.getData();
        // this.select();
      },
    },
    "$store.state.good_pageNum": function () {
      // console.log(this.$store.state.pageNum)
      this.myPageNum = this.$store.state.good_pageNum;
      console.log(this.myPageNum);
      this.getData();
      // this.select();
    },
    "$store.state.per_page": function () {
      // console.log(this.$store.state.pageNum)
      // this.myPageNum = this.$store.state.per_page;
      this.getData();
      // this.select();
    },
    "$store.state.selectValue": function () {
      this.mySelectValue = this.$store.state.selectValue;
      this.getData();
      // setTimeout(() => {
      //   this.select();
      // }, 300);
    },
  },
  mounted() {
    // this.select();
    // console.log(that.tableData[2].sku[1],that.tableData[2])
    // console.log(that.$refs.multipleTable.toggleRowSelection(that.tableData[2].sku[1]))
    // that.sku.forEach((ele) => {
    //   // console.log(that.sku[index]);
    //   // console.log(that.$refs.multipleTable.toggleRowSelection(that.tableData[index]),index)
    //   // console.log(that.$refs.multipleTable.toggleRowSelection(that.sku[index]))
    //   // that.$refs.multipleTable.toggleRowSelection(that.tableData[1]);
    //   ele.forEach((item)=>{
    //     // console.log(item.is_on_sale,index)
    //     if(item.is_on_sale === 1){
    //       // console.log(ele[index])
    //       // console.log(that.sku[0][0])
    //       // that.$refs.multipleTable.toggleRowSelection(ele[index]);
    //       // that.$refs.multipleTable.toggleRowSelection(that.sku[0][0]);
    //       // that.$refs.multipleTable.toggleRowSelection(that.tableData[1]);
    //     }
    //   })
    // });
    // setTimeout(() => {
    //   console.log(
    //     that2.$refs.multipleTable.toggleRowSelection(that2.tableData[2])
    //   ); //外面的
    //   console.log(that2.tableData[2].sku[0]);
    //   console.log(
    //     that2.$refs.multipleTable.toggleRowSelection(that2.tableData[2].sku[0])
    //   ); //里面的
    //   // console.log(that2.$refs.multipleTable.toggleRowSelection(that2.tableData[2].sku[1]))
    // }, 1000);
    // setTimeout(() => {
    //   console.log(that2.tableData[2].sku[0]);
    //   // console.log(that2.$refs.multipleTable.toggleRowSelection())
    //   console.log(
    //     that2.$refs.multipleTable.toggleRowSelection(that2.tableData[2].sku[0])
    //   );
    //   // console.log(that2.$refs.multipleTable.toggleRowSelection(that2.tableData[2].sku[1]))
    // }, 2000);
  },
};
</script>

<style >
.sell-content .testBottom {
  padding: 0 60px 60px 60px;
}
.right-content form label {
  /* width: 50px !important; */
  text-align: right !important;
  margin-right: 10px;
  font-size: 14px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table__header .el-table-column--selection .cell .el-checkbox {
  display: none;
}
.el-table__header .el-table-column--selection .cell:before {
  content: "是否上架";
}
.el-table__expanded-cell .el-table::before {
  content: "";
  position: absolute;
  background-color: #fff;
  z-index: 1;
}
.el-table__expanded-cell[class*="cell"] {
  padding: 0;
  padding-left: 50px;
}
.el-tooltip__popper {
  max-width: 20%;
}
.el-tooltip__popper,
.el-tooltip__popper.is-dark {
  background: #f5f5f5 !important;
  color: #303133 !important;
}
.right-content form label {
  text-align: left;
}
</style>