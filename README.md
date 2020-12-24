# stu_manage

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<!-- 测试端 2020-12-24
1.order.testBottom:
    "$store.state.order_total": function () {
      this.getData();
    },
    created() {
    this.myPageNum = this.examine_pageNum;
    this.$store.commit("per_page", 10);
    this.mySearch = this.$store.state.examine_search;加了这一条
    this.getData();
  },  
2.order.listBottom:
    "$store.state.comment_total": function () {
      this.getData();
    },
    created() {
    this.mySearch = this.$store.state.order_commentList_search;;加了这一条
  }, 
  把pageNum换成了list_pageNum（store.js新增）
 -->