<template>
  <div class="listDetails">
    <div class="details">
      <div class="title">
        <p>评价管理</p>
        <span @click="backTo">返回上一页</span>
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
    ...mapState(["couponUserList_row"]),
  },
  created() {
    
    this.getData();
  },
  mounted() {
    // let imgError = document.getElementsByClassName('el-image__error')[0]
    // console.log(imgError)
  },
  methods: {
    getData(){
      console.log(this.couponUserList_row)
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
      this.$router.go(-1);
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