<template>
  <div class="listDetails">
    <div class="details">
      <div class="title">
        <p>评价管理</p>
        <span @click="backTo">返回上一页</span>
      </div>
      <div class="content">
        <div class="flex_content">
          <span>商品评价：</span>
          <p class="tit">
            <el-rate
              v-model="my_commentInfo.my_goods_score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
            <span class="my_rato">{{ my_commentInfo.rato }}</span>
          </p>
        </div>
        <div class="flex_content">
          <span>服务评价：</span>
          <p class="tit">
            <el-rate
              v-model="my_commentInfo.my_service_score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
            <span class="my_rato">{{ my_commentInfo.Service_rato }}</span>
          </p>
        </div>
        <div class="flex_content three">
          <span>订单号：</span>
          <p class="tit">{{ my_commentInfo.item_id }}</p>
        </div>
        <div class="flex_content three">
          <span>用户名：</span>
          <p class="tit">{{ my_commentInfo.user.nick_name }}</p>
        </div>
        <div class="flex_content">
          <span>评价内容：</span>
          <p class="tit">{{ my_commentInfo.content }}</p>
        </div>
        <div class="flex_content">
          <span>评论时间：</span>
          <p class="tit">{{ my_commentInfo.comment_time }}</p>
        </div>
        <div class="flex_content">
          <span>评论图片：</span>
          <p class="tit" v-if="my_commentInfo.comment_images.length > 0">
            <viewer>
              <img
                v-for="(ele, index) in my_commentInfo.comment_images"
                :key="index"
                :src="ele.img_url"
                style="width: 100px; height: 100px; cursor: pointer"
              />
            </viewer>
          </p>
          <p class="tit" v-else-if="my_commentInfo.comment_images.length == 0">
            <el-image style="width: 100px; height: 100px; cursor: pointer">
              <!-- <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div> -->
            </el-image>
          </p>
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
      my_commentInfo: null,
    };
  },
  computed: {
    ...mapState(["detailsInfo"]),
  },
  created() {
    this.getData();
  },
  mounted() {
    // let imgError = document.getElementsByClassName('el-image__error')[0]
    // console.log(imgError)
  },
  methods: {
    getData() {
      if (this.detailsInfo.comment_id) {
        this.$api
          .commentInfo(this.detailsInfo.comment_id)
          .then((res) => {
            console.log(res.data.data);
            this.my_commentInfo = res.data.data;
            this.my_commentInfo.comment_time = this.formatDate(
              new Date(this.my_commentInfo.add_time * 1000)
            );
            this.my_commentInfo.my_goods_score = Number(
              this.my_commentInfo.goods_score
            );
            this.my_commentInfo.my_service_score = Number(
              this.my_commentInfo.service_score
            );
            if (this.my_commentInfo.my_goods_score <= 3) {
              this.my_commentInfo.rato = "差评";
            } else if (this.my_commentInfo.my_goods_score <= 4) {
              this.my_commentInfo.rato = "中评";
            } else if (this.my_commentInfo.my_goods_score <= 5) {
              this.my_commentInfo.rato = "好评";
            }
            if (this.my_commentInfo.my_service_score <= 3) {
              this.my_commentInfo.Service_rato = "差评";
            } else if (this.my_commentInfo.my_service_score <= 4) {
              this.my_commentInfo.Service_rato = "中评";
            } else if (this.my_commentInfo.my_service_score <= 5) {
              this.my_commentInfo.Service_rato = "好评";
            }
          })
          .then(() => {
            setTimeout(() => {
              let imgError = document.getElementsByClassName(
                "el-image__error"
              )[0];
              imgError.innerText = "暂无图片";
            }, 100);
          });
      }else{
        this.$router.push({name:'commentList'})
      }
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
      this.$router.push({ name: "commentList" });
    },
  },
};
</script>
<style scoped>
.listDetails {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.flex_content {
  display: flex;
}
.tit {
  display: flex;
  align-items: center;
}
.my_rato {
  color: #ff9900;
  transform: translate(10px, -1px);
}
.details {
  width: 900px;
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
.content .flex_content {
  margin-top: 26px;
}
.content .flex_content.three {
  margin-top: 26px;
  margin-left: 16px;
}
.content .flex_content .tit {
  margin-left: 10px;
  transform: translateY(1px);
}
.content .flex_content .tit img {
  margin-right: 8px;
}
</style>