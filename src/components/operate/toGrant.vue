<template>
  <div class="toGrant">
    <div class="details">
      <div class="title">
        <p>发放优惠券</p>
        <span @click="backTo">返回上一页</span>
      </div>
      <div class="content">
        <p>优惠券名称：</p>
        <el-select v-model="value" placeholder="优惠券1">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="bottom">
        <p>发放用户：</p>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="用户 A"></el-checkbox>
          <el-checkbox label="用户 B"></el-checkbox>
          <el-checkbox label="用户 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="btn">
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkList: ["用户 A", "选中且禁用"], //选中的复选框
      options: [
        {
          value: "选项1",
          label: "优惠券1",
        },
        {
          value: "选项2",
          label: "优惠券2",
        },
        {
          value: "选项3",
          label: "优惠券3",
        },
        {
          value: "选项4",
          label: "优惠券4",
        },
        {
          value: "选项5",
          label: "优惠券5",
        },
      ],
      value: "",
    };
  },
  methods:{
    backTo(){
      this.$router.push({name:"testContent2"})
    }
  }
};
</script>
<style scoped>
.toGrant .details {
  width: 900px;
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
.toGrant .details .content{
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.toGrant .details .content p{
  margin-right: 16px;
}
.toGrant .details .bottom p{
  margin-bottom: 20px;
}
.toGrant .btn{
margin-top: 40px;
}
</style>