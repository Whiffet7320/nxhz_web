<template>
  <el-form ref="form" :model="form" label-width="80px" class="shop-form">
    <div class="edit-formtwo">
      <div class="title">
        <p>订单详情页</p>
        <span @click="backTo">返回上一页</span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品详情" :name="nameSort.nameF">
          <div class="from">
            <el-form-item label="商品名称 :">
              <el-input
                :placeholder="edit.goods_name"
                v-model="goods_name"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品主图 :" class="myImg">
              <el-image :src="goods_img" v-model="goods_img"> </el-image>
              <div class="button companyButton">
                <el-button type="primary" @click="company" icon="el-icon-share"
                  >更换主图</el-button
                >
              </div>

              <input
                type="file"
                name="companyLogo"
                id="file0"
                class="displayN"
                multiple="multiple"
                @change="companyLogo($event, 'str')"
                ref="fileInput"
              />
              <el-button
                type="primary"
                class="displayN"
                @click="uploading(true)"
                >保存</el-button
              >
            </el-form-item>
            <el-form-item label="分类:" prop="region" class="region">
              <div class="block">
                <el-cascader
                  v-model="optionProps"
                  :options="myOptions2"
                  :props="{ checkStrictly: true }"
                  @change="handleChange"
                ></el-cascader>
              </div>
            </el-form-item>
            <!-- <el-form-item label="分类 :">
              <el-input :placeholder="edit.value" v-model="value"></el-input>
            </el-form-item> -->
            <el-form-item label="排序 :">
              <el-input :placeholder="edit.sort" v-model="sort"></el-input>
            </el-form-item>
            <el-form-item label="是否上架 :" v-if="radio_Flag">
              <el-radio v-model="is_on_sale" :label="1">上架</el-radio>
              <el-radio v-model="is_on_sale" :label="0">下架</el-radio>
            </el-form-item>
            <el-form-item label="是否上架 :" v-else>
              <el-radio disabled v-model="radio" :label="0">上架</el-radio>
              <el-radio disabled v-model="radio" :label="1">下架</el-radio>
            </el-form-item>
            <el-form-item label="商品详情 :" class="inputDetails">
              <div id="editor"></div>
            </el-form-item>
            <el-button type="primary" @click="preservation">保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="SKU设置"
          :name="nameSort.nameS"
          v-if="sku_image_Flag"
        >
          <el-table :data="skuList" style="width: 100%">
            <!-- <el-table-column prop="sale_attr_name" label="SKU Id">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku_id" placeholder=""></el-input>
              </template>
            </el-table-column> -->
            <el-table-column prop="sale_attr_name" label="SKU名称">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.sale_attr_name"
                  placeholder=""
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="库存">
              <template slot-scope="scope">
                <el-input v-model="scope.row.storage" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="成本价">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.shop_price"
                  placeholder=""
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="销售价">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.shop_price"
                  placeholder=""
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="SKU图">
              <template slot-scope="scope">
                <!-- <el-image
                  style="width: 60px; height: 60px"
                  :src="scope.row.goods_img"
                ></el-image> -->
                <el-image
                  v-if="scope.row.goods_img"
                  style="width: 60px; height: 60px; cursor: pointer"
                  :src="scope.row.goods_img"
                  v-model="skuGoods_img"
                  @click="skuCompany(scope)"
                >
                </el-image>
                <div class="button skucompanyButton" v-else>
                  <el-button
                    type="primary"
                    @click="skuCompany(scope)"
                    icon="el-icon-picture"
                  ></el-button>
                </div>

                <input
                  type="file"
                  name="companyLogo"
                  id="file0"
                  class="fileName displayN"
                  multiple="multiple"
                  @change="companyLogo($event, 'sku', scope.$index)"
                  ref="skufileInput"
                />
              </template>
            </el-table-column>
            <el-table-column prop="address" label="销售单位" min-width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.unit" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="是否上架"
              class-name="column-bg-color-editable"
              show-overflow-tooltip
              min-width="150"
            >
              <template slot-scope="scope">
                <el-radio v-model="scope.row.is_on_sale" :label="1"
                  >上架</el-radio
                >
                <el-radio v-model="scope.row.is_on_sale" :label="0"
                  >下架</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序">
              <template scope="scope">
                <div class="input-box">
                  <!-- @blur="handleInputBlur" -->
                  <el-input size="small" v-model="scope.row.sort"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="SKUhandleClick(scope)"
                  type="text"
                  size="small"
                  >保存</el-button
                >
                <el-button type="text" size="small" @click="deleteSku(scope)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            class="addBtn"
            @click="addRow(skuList)"
            circle
          ></el-button>
          <!-- <el-button type="primary" class="addBtn" @click="addRow(skuList)">新增</el-button> -->
        </el-tab-pane>
        <el-tab-pane label="商品相册" name="third" v-if="sku_image_Flag">
          <div class="blockImage">
            <div class="block" v-for="(item, index) in imgList" :key="index">
              <el-image :src="item.image_path"></el-image>
              <i class="el-icon-circle-close" @click="deleImage(item)"></i>
            </div>
            <el-button
              v-if="imgList.length < 5"
              type="primary"
              @click="companyList"
              class="imageCBtn"
              icon="el-icon-circle-plus-outline"
              circle
            ></el-button>

            <input
              type="file"
              name="companyLogo"
              id="file0"
              class="displayN"
              multiple="multiple"
              @change="companyLogo($event, 'arr')"
              ref="fileInputList"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-form>
</template>
<script>
import { mapState } from "vuex";
import E from "wangeditor";
// const editor = new E('#div1')
// editor.create()
export default {
  data() {
    return {
      sku_image_Flag: true,
      radio_Flag: true,
      editor: null, //富文本
      optionProps: [], //必须为数组
      imgList: [], //商品相册
      img_id: null,
      skuGoods_img: "",
      imgFile: "",
      oss_imgurl: "",
      loading: true,
      radio: 1,
      skuList: [],
      cyy: "123",
      tableData: [],
      //
      dialogImageUrl: "",
      dialogVisible: false, //商品主图
      myOptions2: [],
      edit: "",
      value: "",
      myOptions: [],
      goods_name: "",
      goods_id: "",
      is_on_sale: 1,
      goods_img: "",
      goods_img2: "",
      content: "",
      cat1_id: "",
      cat2_id: "",
      cat3_id: "",
      goods_images: [],
      sort: "",
      //
      data: {},
      activeName: "first",
      form: {
        name: "",
        region: "",
      },
      url:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      myPlaceholder: "温州xx产品有限公司",
      centerDialogVisible: false,
      input: "",
      ruleForm: {
        old: "",
        new: "",
      },
      rules: {
        old: [
          { required: true, message: "请输入正确的旧密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        new: [
          { required: true, message: "请输入正确的新密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  computed: {
    ...mapState(["goodsId", "nameSort", "good_pageNum"]),
  },
  created() {
    this.getData();
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.create();
    this.editor.txt.html(this.content);
  },
  methods: {
    // 删除图片
    deleImage(item) {
      console.log(item);
      this.$api
        .imageChange({
          goods_id: this.goods_id,
          img_id: item.img_id,
        })
        .then((res) => {
          console.log(res, "删除图片");
        })
        .then(() => {
          this.$api.imageList(this.goodsId).then((res) => {
            console.log(res.data.data, "imgList");
            this.imgList = res.data.data;
            this.img_id = this.imgList.img_id;
          });
        });
    },
    // 图片上传
    company() {
      this.$refs.fileInput.click();
    },
    // 轮播图上传
    companyList() {
      this.$refs.fileInputList.click();
    },
    // sku图片上传
    skuCompany(scope) {
      // console.log(scope.$index);
      // this.$refs.skufileInput.click();
      // console.log(`skufileInput${scope.$index}`);
      // console.log(this.$refs)
      console.log(document.getElementsByClassName("fileName")[scope.$index]);
      var skufileInput = document.getElementsByClassName("fileName")[
        scope.$index
      ];
      skufileInput.click();
      // console.log(eval('this.$refs.`skufileInput${scope.$index}`'))
      // var st = `skufileInput${scope.$index}`
      // console.log(this.$refs.`skufileInput${scope.$index}`)
      // console.log(this.$refs.skufileInput`${scope.$index}`)
      // this.$refs.skufileInput`${scope.$index}`.click()
    },
    companyLogo(event, type, scope) {
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      // console.log(event)
      //创建文件读取对象
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = file;
          this.uploading(true, type, scope);
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onload = function () {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    async uploading(flag, type, scope) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        console.log(this.imgFile);
        this.$api.ossststoken().then((res) => {
          console.log(res.data.data.date);
          let myData = res.data.data.date;
          let client = new window.OSS.Wrapper({
            region: "oss-cn-hangzhou", //oss地址
            accessKeyId: myData.Credentials.AccessKeyId, //ak
            accessKeySecret: myData.Credentials.AccessKeySecret, //secret
            stsToken: myData.Credentials.SecurityToken,
            bucket: "nxhzapp", //oss名字
          });
          // console.log(client);
          var imgtype = this.imgFile.type.substr(6, 4);
          var store = `images/${new Date().getTime()}.${imgtype}`;
          console.log(store);
          client.put(store, file_re).then((res) => {
            //这个结果就是url
            console.log(res);
            var a = `http://nxhzapp.oss-cn-hangzhou.aliyuncs.com/${store}`;
            if (type == "str") {
              this.goods_img = a;
              console.log(a);
            } else if (type == "arr") {
              const imageChangeObj = {
                goods_id: this.goods_id,
                img_id: this.img_id,
                image_path: a,
              };
              this.$api
                .imageChange(imageChangeObj)
                .then((res) => {
                  console.log(res, "image添加");
                })
                .then(() => {
                  this.$api.imageList(this.goodsId).then((res) => {
                    console.log(res.data.data, "imgList");
                    this.imgList = res.data.data;
                    this.img_id = this.imgList.img_id;
                  });
                });
            } else if (type == "sku") {
              console.log(scope);
              // this.skuGoods_img = a;
              // this.skuList[scope].goods_img = a
              this.$set(this.skuList[scope], "goods_img", a);
              console.log(a);
            }
          });
        });
      }
    },

    // 操作
    addRow(tableData) {
      tableData.push({});
    },
    deleteSku(scope) {
      // 删除按钮
      const skuObj = {
        sku_id: scope.row.sku_id,
        status: 0, //0删除
      };
      this.$api.skuChange(skuObj).then((res) => {
        console.log(res);
      });
      console.log(scope.$index);
      this.skuList.splice(scope.$index, 1);
      console.log(this.skuList);
    },
    SKUhandleClick(scope) {
      //保存按钮
      if (this.skuStorageArr[scope.$index]) {
        console.log(scope.row, scope.$index, this.skuStorageArr);
        let num = this.skuStorageArr[scope.$index].toString();
        let newStorage = (scope.row.storage - num).toString();
        console.log(num, newStorage);
        let myNewStorage = null;
        if (newStorage > 0) {
          myNewStorage = `+${newStorage}`;
          console.log(myNewStorage);
        } else {
          myNewStorage = newStorage;
        }
        // const skuObj = {
        //   sku_id: scope.row.sku_id,
        //   is_on_sale: "",
        //   storage: myNewStorage, //库存，传修改值。例如增加了就传 +20  。减少就传-20
        // };
        // this.$api.skuChange(skuObj).then((res) => {
        //   console.log(res);
        // });
        //
        // 编辑规格
        console.log(scope.row);
        const skuNewObj2 = {
          sku_id: scope.row.sku_id,
          // goods_id: this.goods_id, //添加必须传
          sale_attr_name: scope.row.sale_attr_name,
          // prime_cost:,
          // market_price:,
          shop_price: scope.row.shop_price,
          goods_img: scope.row.goods_img,
          // weight:,
          storage: myNewStorage,
          unit: scope.row.unit,
          is_on_sale: scope.row.is_on_sale,
          sort: scope.row.sort,
        };
        console.log(skuNewObj2);
        this.$api.skuEdit(skuNewObj2).then((res) => {
          console.log(res);
        })
      } else {
        // 添加
        console.log(scope.row);
        const skuNewObj = {
          // sku_id:scope.row.sku_id,
          goods_id: this.goods_id, //添加必须传
          sale_attr_name: scope.row.sale_attr_name,
          // prime_cost:,
          // market_price:,
          shop_price: scope.row.shop_price,
          goods_img: scope.row.goods_img,
          // weight:,
          storage: scope.row.storage,
          unit: scope.row.unit,
          is_on_sale: scope.row.is_on_sale,
        };
        this.$api.skuEdit(skuNewObj).then((res) => {
          console.log(res);
        });
      }
    },
    getData() {
      this.loading = true;
      this.$api.allList().then((res) => {
        console.log(res.data.data);
        this.myOptions2 = res.data.data;
        const arr = JSON.parse(
          JSON.stringify(this.myOptions2)
            .replace(/cat_name/g, "label")
            .replace(/cat_id/g, "value")
            .replace(/child/g, "children")
        );
        this.myOptions2 = arr;
        console.log(this.myOptions2);
      });
      if (this.goodsId == " ") {
        this.sku_image_Flag = false;
        this.radio_Flag = false;
      }
      if (this.goodsId) {
        this.$api.imageList(this.goodsId).then((res) => {
          console.log(res.data.data, "imgList");
          this.imgList = res.data.data;
          this.img_id = this.imgList.img_id;
        });
        this.$api.skuList(this.goodsId).then((res) => {
          //获取商品规格列表sku
          console.log(res.data.data, "sku");
          if (res.data.data.length == 0) {
            this.radio_Flag = false;
          }
          this.skuList = res.data.data;
          console.log(this.skuList);
          this.skuStorageArr = [];
          this.skuList.forEach((ele) => {
            // ele.goods_img =
            // console.log(ele.storage)
            this.skuStorageArr.push(ele.storage);
          });
        });
        this.$api
          .goodsInfo(this.goodsId)
          .then((res) => {
            console.log(res.data.data);
            this.edit = res.data.data;
            // this.value = this.edit.cat1
            console.log(this.edit);
            this.cat1_id = this.edit.cat1_id;
            this.cat2_id = this.edit.cat2_id;
            this.cat3_id = this.edit.cat3_id;
            const arr = [],
              arr2 = [];
            const obj = {};
            obj.label = this.edit.cat1.cat_name;
            obj.value = this.edit.cat1.cat_id;
            arr.push(obj);
            const obj2 = JSON.parse(
              JSON.stringify(this.edit.cat2)
                .replace(/cat_name/g, "label")
                .replace(/cat_id/g, "value")
            );
            arr2.push(obj2);
            obj.children = arr2;
            this.myOptions = arr;

            // this.optionProps = [this.edit.cat1_id,this.edit.cat2_id,this.edit.cat3_id]
            if (this.edit.cat3) {
              this.optionProps = [
                this.edit.cat1_id,
                this.edit.cat2_id,
                this.edit.cat3_id,
              ];
            } else if (this.edit.cat2) {
              this.optionProps = [this.edit.cat1_id, this.edit.cat2_id];
            } else {
              this.optionProps = [this.edit.cat1_id];
            }
            console.log(this.myOptions);
            console.log(this.value);
            // this.value = '111122'

            this.goods_name = this.edit.goods_name;
            this.goods_id = this.edit.goods_id;
            this.is_on_sale = this.edit.is_on_sale;
            this.goods_img = this.edit.goods_img;
            this.content = this.edit.content;
            this.sort = this.edit.sort;

            // this.skuGoods_img = this.edit
            // this.cat1_id = this.edit.cat1_id;
            // this.cat2_id = this.edit.cat2_id;
            // this.cat3_id = this.edit.cat3_id;

            this.goods_images = this.edit.goods_images;
            this.loading = false;
          })
          .then(() => {
            console.log(this.content);
            this.editor.txt.html(this.content);
            // this
          });
      } else {
        console.log("cuowu");
        this.$router.push({ name: "sell" });
      }
    },
    // 保存按钮
    preservation() {
      // console.log(document.getElementsByClassName('w-e-text')[0].innerHTML);
      this.content = document.getElementsByClassName("w-e-text")[0].innerHTML; //获取富文本里面的内容
      if (!this.cat2_id) {
        this.cat2_id = 0;
        this.cat3_id = 0;
      } else if (!this.cat3_id) {
        this.cat3_id = 0;
      }
      let myObj = {
        goods_name: this.goods_name,
        goods_id: this.goods_id,
        is_on_sale: this.is_on_sale,
        goods_img: this.goods_img,
        content: this.content,
        cat1_id: this.cat1_id,
        cat2_id: this.cat2_id,
        cat3_id: this.cat3_id,
        goods_images: this.goods_images,
        sort: this.sort,
      };
      console.log(myObj);
      this.$api
        .goodsEdit(myObj)
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
          setTimeout(() => {
            this.$router.push({ name: "sell" });
          }, 1000);
        });
      // this.getData()
    },
    handleChange(value) {
      console.log(value);
      this.optionProps = value;
      this.cat1_id = value[0];
      this.cat2_id = value[1];
      this.cat3_id = value[2];
      this.edit.cat1_id = this.cat1_id;
      this.edit.cat2_id = this.cat2_id;
      this.edit.cat3_id = this.cat3_id;
    },
    backTo() {
      // this.$store.commit("toEditFlag", false);
      this.$store.commit("good_pageNum", this.good_pageNum);
      this.$router.go(-1);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.centerDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false;
    },
  },
};
</script>
<style>
.shop-form #editor {
  width: 840px;
}
.shop-form #editor .w-e-text-container {
  height: 740px !important;
}
.shop-form #editor img {
  max-width: 100%;
}
.shop-form #editor .w-e-toolbar {
  z-index: 1 !important;
}
.shop-form #editor .w-e-text-container {
  z-index: 0 !important;
}
.shop-form .displayN {
  display: none;
}
.shop-form .imageCBtn {
  position: relative;
  height: 40px;
  width: 40px;
  margin-left: 20px;
  /* transform: translateY(-20px); */
}
.shop-form .blockImage {
  display: flex;
}
.blockImage .block {
  position: relative;
}
.blockImage .el-icon-circle-close {
  position: absolute;
  z-index: 99;
  top: 5px;
  right: 5px;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  /* background-color: rgb(245, 245, 245); */
}
.blockImage .el-icon-circle-close:hover {
  color: rgb(250, 81, 81);
}
.imageCBtn .el-icon-circle-plus-outline {
  font-size: 48px;
  position: absolute;
  top: -5px;
  left: -5px;
}
.shop-form .companyButton {
  height: 100px !important;
  margin-left: 20px;
}
.shop-form .skucompanyButton {
  height: 100px !important;
  transform: translate(0, 30px);
}
.inputDetails .el-form-item__content {
  width: 1000px;
}
.el-textarea p {
  width: 100%;
}
.el-textarea p img {
  width: 100%;
}
.cell.el-tooltip .el-radio {
  width: 60px !important;
}
.shop-form .addBtn {
  margin-top: 20px;
  /* float: right; */
  margin-left: 20px;
  height: 32px;
  width: 32px;
  position: relative;
}
.addBtn .el-icon-circle-plus-outline {
  font-size: 40px;
  position: absolute;
  top: -4px;
  left: -4px;
}
.shop-form .cell {
  width: 70%;
}
.myImg .el-form-item__content {
  display: flex;
}
.shop-form .el-tabs__content {
  /* width: 100%;
  height: 100%; */
  margin-right: 60px;
}
.shop-form .el-form-item__content {
  width: 428px !important;
}
.edit-formtwo {
  /* height: 100%; */
  /* width: 600px; */
  /* position: absolute;
  top: 100px;
  left: 50%; */
  /* transform: translateY(10%); */
  /* margin-top: 140px; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  /* margin-left: 100px;
  margin-bottom: 100px; */
  margin: 26px 0 100px 60px;
}
.edit-formtwo .el-form-item__label {
  width: 120px !important;
}
.edit-formtwo .title {
  width: calc(100% - 20px);
  height: 116px;
  /* border: 1px solid; */
  display: flex;
  margin-left: 20px;
}
.edit-formtwo .title p {
  font-size: 40px;
  margin-right: 54px;
  margin-left: 20px;
}
.edit-formtwo .title span {
  font-size: 14px;
  color: #74c853;
  margin-top: 18px;
  cursor: pointer;
  height: 23px;
}
.btn-title {
  display: flex;
  position: relative;
  /* margin-left: -50px; */
  margin-bottom: 46px;
  margin-top: 26px;
  width: 560px;
  align-items: center;
}
.btn-title .backto {
  font-size: 14px;
  color: #74c853;
  margin-top: 18px;
  cursor: pointer;
  height: 23px;
}
.shop-title {
  /* position: absolute;
  top: 50%; */
  /* transform: translateY(-50%); */
  font-size: 40px;
}

.myBtn {
  /* height: 30px;
  line-height: 6px; */
  position: absolute;
  top: 50%;
  left: 33%;
  margin-left: 20px;
  transform: translateY(-50%);
}
.shop-form .el-form-item {
  display: flex;
}
.shop-form .el-form-item__content {
  width: 320px;
  margin-left: 30px !important;
}
.shop-form {
  /* padding-bottom: 100px; */
}
.el-image {
  width: 140px;
  height: 140px;
}
.el-input__inner {
  /* width: 60%; */
}
.demo-ruleForm {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.demo-ruleForm .el-form-item.is-required {
  /* transform: translateX(6%); */
}
.el-form-item.modal-footerBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.el-form-item.modal-footerBtn .el-form-item__content {
  /* display: flex !important;
  justify-content: space-between;
  margin-left: 0px !important; */
}
.el-form-item.modal-footerBtn
  .el-form-item__content
  .el-button.el-button--primary {
  position: absolute;
  right: 10%;
}
.el-dialog.el-dialog--center {
  height: 300px;
}
/* .el-form.shop-form{
  display: flex;
  height: 1000px;
}
.shop-header .el-tabs__content{
  height: 1000px;
  display: flex;
}
.shop-header .el-tab-pane{
  height: 100%;
} */
.el-tabs__nav-wrap.is-top {
  width: 248px;
}
</style>