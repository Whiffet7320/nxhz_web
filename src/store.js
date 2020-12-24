import Vue from "vue";
import Vuex from "vuex";
import api from "./api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    total: null,//goods
    order_total:null,
    per_page: 10,
    showModal: false,
    editStu: {},
    pageList: [],
    nowPage: 0,
    flag: false,
    user: {},
    details: {},
    breadListState: [], // 面包屑列表数据
    goodsList: [],
    sellSearch: '',
    operate_test_Search:'',
    examine_search:'',
    order_testContent_search:'',
    order_commentList_search:'',
    good_pageNum: 1,
    examine_pageNum:1,
    list_pageNum:1,
    testPage_pageNum:1,
    addGrant_good_pageNum:1,
    toGrant_good_pageNum:1,
    pageNum:1,
    // passWord: null,//用户密码
    orderSelect: null,//订单状态
    goodsId: null,//添加编辑的商品
    selectValue: [],//cat_id分类的数组
    nameSort: {},//商品订单详情页的显示顺序（商品详情，sku设置）
    client_id: null,//绑定client_id到shop_id
    overallIsDot: false,//全局的isDot
    isDotNum: '',//websocket中的isDot
    startTime:null,//根据时间筛选（订单页） 开始
    endTime:null,//结束时间
    startTime_commentList:null,//根据时间筛选（评论页） 开始
    endTime_commentList:null,//结束时间
    examine_Verify:null,//examine的verify_state（审核）
    mobile:null,//账号名
    passWord:null,//账号密码
    sayObj:null,//say过来后的数据
    toEditFlag:false,//渲染sell还是edit
    todetailsFlag:false,
    tolistDetailsFlag:false,
    detailsInfo:{},
    comment_total:null,
    couponData:null,
    coupon_display:null,
    mp3_say:false,
    // 领取记录
    couponUserList_total:null,//总数目
    couponUserList_pageNum:1,//page页码
    couponUserList_Search:null,
    couponUserList_state:null,//领取状态(选择器)
    couponUserList_coupon_type:null,//优惠券类型(选择器)
    couponUserList_row:null,//点击详情传过去的row值
  },
  mutations: {
    mp3_say(state, boolean){
      state.mp3_say = boolean;
    },
    coupon_display(state, num){
      state.coupon_display = num;
    },
    couponData(state, obj) {
      state.couponData = obj;
    },
    comment_total(state, num) {
      state.comment_total = num;
    },
    toEditFlag(state, boolean) {
      state.toEditFlag = boolean;
    },
    todetailsFlag(state, boolean) {
      state.todetailsFlag = boolean;
    },
    tolistDetailsFlag(state, boolean) {
      state.tolistDetailsFlag = boolean;
    },
    sayObj(state, obj) {
      state.sayObj = obj;
    },
    mobile(state, str) {
      state.mobile = str;
    },
    passWord(state, str) {
      state.passWord = str;
    },
    changeModal(state, boolean) {
      state.showModal = boolean;
    },
    goodsId(state, obj) {
      state.goodsId = obj;
    },
    changePageList(state, list) {
      state.pageList = list;
    },
    changeNowPage(state, num) {
      state.nowPage = num;
    },
    changeFlag(state, flag) {
      state.flag = flag
    },
    changeUser(state, user) {
      state.user = user
    },
    changeDetails(state, details) {
      state.details = details
    },
    changeDetailsInfo(state, details) {
      state.detailsInfo = details
    },
    breadListMutations(state, list) {
      state.breadListState = list;
    },
    goodsList(state, list) {
      state.goodsList = list;
    },
    edit(state, list) {
      state.edit = list;
    },
    sellSearch(state, str) {
      state.sellSearch = str;
    },
    operate_test_Search(state, str) {
      state.operate_test_Search = str;
    },
    examine_search(state, str) {
      state.examine_search = str;
    },
    good_pageNum(state, num) {//order页码
      state.good_pageNum = num;
    },
    examine_pageNum(state, num) {// examine页码
      state.examine_pageNum = num;
    },
    list_pageNum(state, num) {// order的list页码
      state.list_pageNum = num;
    },
    testPage_pageNum(state, num) {// testPage优惠券列表页码
      state.testPage_pageNum = num;
    },
    addGrant_good_pageNum(state, num) {//页码
      state.addGrant_good_pageNum = num;
    },
    toGrant_good_pageNum(state, num) {//页码
      state.toGrant_good_pageNum = num;
    },
    pageNum(state, num) {//order页码
      state.pageNum = num;
    },
    total(state, num) {//总数据
      state.total = num;
    },
    per_page(state, num) {//每页显示几条数据
      state.per_page = num;
    },
    // passWord(state, num) {//密码
    //   state.passWord = num;
    // },
    orderSelect(state, num) {//订单状态
      state.orderSelect = num;
    },
    selectValue(state, arr) {//cat_id分类的数组
      state.selectValue = arr;
    },
    nameSort(state, obj) {//商品订单详情页的显示顺序（商品详情，sku设置）
      state.nameSort = obj;
    },
    client_id(state, str) { //绑定client_id到shop_id
      state.client_id = str;
    },
    overallIsDot(state, boolean) {//全局的isDot
      state.overallIsDot = boolean;
    },
    isDotNum(state, num) {//websocket中的isDot
      state.isDotNum = num;
    },
    startTime(state, num) {//根据时间筛选（订单页）开始
      state.startTime = num;
    },
    endTime(state, num) {//根据时间筛选（订单页）结束
      state.endTime = num;
    },
    startTime_commentList(state, num) {//根据时间筛选（评论页）开始
      state.startTime_commentList = num;
    },
    endTime_commentList(state, num) {//根据时间筛选（评论页）结束
      state.endTime_commentList = num;
    },
    examine_Verify(state, num) {
      state.examine_Verify = num;
    },
    order_testContent_search(state, str){
      state.order_testContent_search = str;
    },
    order_commentList_search(state, str){
      state.order_commentList_search = str;
    },
    order_total(state, num) {//总数据
      state.order_total = num;
    },
    // 领取记录
    couponUserList_total(state, num) {//总数据
      state.couponUserList_total = num;
    },
    couponUserList_pageNum(state, num) {//页码
      state.couponUserList_pageNum = num;
    },
    couponUserList_Search(state, str){
      state.couponUserList_Search = str;
    },
    couponUserList_state(state, str){
      state.couponUserList_state = str;
    },
    couponUserList_coupon_type(state, str){
      state.couponUserList_coupon_type = str;
    },
    couponUserList_row(state, str){
      state.couponUserList_row = str;
    },
  },
  actions: {
    updateStu({ commit }, upstu) {
      return api.updateStudent(upstu).then((data) => {
        // console.log(data);
        return new Promise((resolve, reject) => {
          if (data.data.status == "success") {
            commit("changeModal", false);
            resolve({
              status: data.data.status,
              msg: data.data.msg,
            });
          } else {
            reject({
              status: data.data.status,
              msg: data.data.msg,
            });
          }
        });
      });
    },
    addStu({ commit }, addstu) {
      return api.addStudent(addstu).then((data) => {
        console.log(commit)
        return new Promise((resolve, reject) => {
          if (data.data.status == 'success') {
            resolve({
              status: data.data.status,
              msg: data.data.msg,
            })
          } else {
            reject({
              status: data.data.status,
              msg: data.data.msg,
            })
          }
        })
      })
    },
    // deleteStudent({})
  },
});
