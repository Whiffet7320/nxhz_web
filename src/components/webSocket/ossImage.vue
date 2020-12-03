<template>
  <div class="oss">
    <img :src="oss_imgurl" alt="" />
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="file_companyLogo"
      multiple="multiple"
      @change="companyLogo($event)"
    />
    <el-button type="primary" @click="uploading(true)">保存</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgFile: "",
      oss_imgurl: "",
    };
  },
  created() {
    console.log(window.OSS);
  },
  methods: {
     companyLogo(event) {
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      if (fileSize <= 10240 * 1024) {
        if (filetType == "image/png") {
          this.imgFile = file;
          this.uploading(true)
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
    async uploading(flag) {
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
          var store = `${new Date().getTime()}.${imgtype}`;
          console.log(store);
          client.put(store, file_re).then((res) => {
            //这个结果就是url
            console.log(res);
            var a = client.signatureUrl(store);
            this.oss_imgurl = a;
            console.log(a);
          });
        });
      }
    },
  },
};
</script>