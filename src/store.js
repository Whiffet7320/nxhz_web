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
    examine_search:'',
    order_testContent_search:'',
    order_commentList_search:'',
    good_pageNum: 1,
    examine_pageNum:1,
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
    examine_Verify:null,//examine的verify_state（审核）
    mobile:null,//账号名
    passWord:null,//账号密码
    sayObj:null,//say过来后的数据
    toEditFlag:false,//渲染sell还是edit
    todetailsFlag:false,
    tolistDetailsFlag:false
  },
  mutations: {
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
    examine_search(state, str) {
      state.examine_search = str;
    },
    good_pageNum(state, num) {//order页码
      state.good_pageNum = num;
    },
    examine_pageNum(state, num) {// examine页码
      state.examine_pageNum = num;
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
    examine_Verify(state, num) {
      state.examine_Verify = num;
    },
    order_testContent_search(state, str){
      state.order_testContent_search = str;
    },
    order_total(state, num) {//总数据
      state.order_total = num;
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
