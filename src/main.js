import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import api from './api/index'
import store from './store'
import axios from 'axios'
import { getLodop } from "@/assets/js/LodopFuncs";
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// import 'video.js/dist/video-js.css'
// import videojs from 'video.js'
import DPlayer from 'dplayer';

Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$api = api

Vue.prototype.$myAxios = axios;
// axios.defaults.baseURL = '/api';
Vue.prototype.$bus = new Vue()
Vue.prototype.$getlodop = getLodop
// Vue.prototype.$videojs = videojs
Vue.prototype.$DPlayer = DPlayer

function formatDate(now) {
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
}
//进入页面创建websocket连接
function initWebSocket() {
  if (sessionStorage.getItem("isLogin") == 'false') {
    return false;
  } else {
    console.log(sessionStorage.getItem("isLogin"))
    console.log(this)
    var _this;
    if (!this) {
      _this = Vue.prototype
    } else {
      _this = this;
    }
    // console.log(_this)

    //判断页面有没有存在websocket连接123
    if (window.WebSocket) {
      // let ws = new WebSocket("ws://192.168.2.200:8282");//测试服
      let ws = new WebSocket("ws://119.3.155.113:8282");
      console.log(ws)
      _this.ws = ws;
      ws.onopen = function () {
        console.log("服务器连接成功");
        _this.ws.send({ test: "12345" });
      };
      ws.onclose = function () {
        console.log("服务器连接关闭");
      };
      ws.onerror = function () {
        console.log("服务器连接出错");
      };
      ws.onmessage = function (e) {
        //接收服务器返回的数据
        let resData = JSON.parse(e.data);
        console.log(resData);
        let isDotNumList = [];
        if (resData.type == "newOrder") {
          console.log("有新订单了")
          let LODOP = getLodop();
          LODOP.SET_PRINT_STYLE("FontSize", 18);
          LODOP.SET_PRINT_STYLE("Bold", 1);
          // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
          console.log(resData.data.content.order_goods)
          const body = resData.data.content.order_goods.map(i => {
            return ' <div style="display: flex"><span style="flex: 0 0 50%"><span>' + i.goods_name + '</span> <span style="font-size: 10px">[产品规格:' + i.goods_sku_name + ']</span></span> <span style="flex: 1 1 auto">*' + i.buy_number + '</span><span style="flex: 0 0 20%">' + i.shop_price * i.buy_number + '</span><br/> </div> ' +
              ''
          }).join('')
          const html = '  <div>\n' +
            '        <div class="title">' + resData.data.content.shop.shop_name + '</div>\n' +
            '        <span>--------------------------------------------------</span>\n' +
            '        <!--  商铺地址 -->\n' +
            '        <div>商铺地址：' + resData.data.content.shop.shop_address + '</div>\n' +
            '        <div>商铺联系电话：' + resData.data.content.shop.contact_number + '</div>\n' +
            '        <div> <span>--------------------------------------------------</span></div>\n' +
            '        <div class="orderTime">下单时间:' + formatDate(
              new Date(resData.data.content.order.add_time * 1000)
            ) + '</div>\n' +
            '        <div class="orderTime">订单编号:' + resData.data.content.order.order_sn + '</div>\n' +
            '        <div> <span>--------------------------------------------------</span></div>\n' +
            body +
            '        <div style="margin-top: 35px; position: relative; margin-bottom: 20px"><span style="font-size: 10px">合计:</span><span style="position: absolute;right:10px">' + resData.data.content.order.total_amount + '</span></div>\n' +
            '        <span>----------------------<span>其他</span>----------------------</span>\n' +
            '        <!-- 优惠费 -->\n' +
            '        <div style="font-size: 10px">优惠' + resData.data.content.order.preference_amount + '元</div>\n' +
            '        <!--  实际配送费  -->\n' +
            '        <div style="font-size: 10px">[配送费:' + resData.data.content.order.express_amount + '元]</div>\n' +
            '        <!--配送时间-->\n' +
            '        <!--实际支付-->\n' +
            '        <div style="font-size: 20px">实付: ￥' + resData.data.content.order.real_pay_amount + '元</div>\n' +
            '        <span>--------------------------------------------------</span>\n' +
            '        <!--收货地址-->\n' +
            '        <div style="font-size: 15px">收货地址:' + resData.data.content.order.address + '</div>\n' +
            '        <!--收货人-->\n' +
            '        <div>收货人:' + resData.data.content.order.consignee.substring(0, 1) + '**' + '</div>\n' +
            '        <!-- 联系电话 -->\n' +
            '        <div>联系电话:' + resData.data.content.order.mobile.substring(0, 3) + '****' + resData.data.content.order.mobile.substring(7, 12) + '</div>\n' +
            '        <span>--------------------------------------------------</span>\n' +
            '        <!--订单备注-->\n' +
            '        <div style="font-size: 15px">订单备注:' + resData.data.content.order.remark + '</div>\n' +
            '        <span>--------------------------------------------------</span>\n' +
            '      </div>'
          LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%",
            html);
          LODOP.PRINT();
        }
        if (resData.type == "say") {
          console.log("say说");
          store.commit('mp3_say', true)
          store.commit('sayObj', resData.data)
          store.commit('overallIsDot', true)
          isDotNumList.push(Number(resData.data.send_id.slice(2)))
          store.commit('isDotNum', isDotNumList)
          console.log(isDotNumList)
          console.log(resData.data);
          console.log(Number(resData.data.send_id.slice(2)));
          // this.isDotList.push(Number(resData.data.send_id.slice(2)));
          _this.isDotList = Number(resData.data.send_id.slice(2));

        } else if (resData.type == "init") {
          console.log(resData.client_id)
          store.commit('client_id', resData.client_id)
          _this.$api.bindShop(resData.client_id).then(() => {
            //绑定client_id到shop_id
            // console.log(res.data.info);
          });
        }
        if (_this.getLeftUserList) {
          _this.getLeftUserList();
        }
      };
    }
  }
}
initWebSocket();
Vue.prototype.$initWebSocket = initWebSocket

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

