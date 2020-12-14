import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
    timeout: 1000,
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
    timeout: 1000,
})
// myGet.interceptors.request.use(/*这是拦截器设置tokne*/
//     config => {
//         let token = localStorage.getItem("token");

//         if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.token = `${token}`;
//         }
//         return config;
//     },
//     err => {
//         alert(err)
//         return Promise.reject(err);
//     });
// myGet.interceptors.response.use(
//     response => {/*在这里可以设置请求成功的一些设置*/
//         let newToken = response.config.headers.token
//         localStorage.setItem('token', newToken);
//         if (response.data.code == -1 && response.status == 200) {
//             this.$message({ showClose: true, message: response.data.msg, type: 'warning' });
//         }
//         return response;
//     },
//     error => {/*在这里设置token过期的跳转*/
//         if (error.response) {
//             if (error.response.data.code == 401) {
//                 router.push('/login');
//             }
//         }
//     });
// myPost.interceptors.request.use(/*这是拦截器设置tokne*/
//     config => {
//         let token = localStorage.getItem("token");

//         if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.token = `${token}`;
//         }
//         return config;
//     },
//     err => {
//         alert(err)
//         return Promise.reject(err);
//     });
// myPost.interceptors.response.use(
//     response => {/*在这里可以设置请求成功的一些设置*/
//         let newToken = response.config.headers.token
//         localStorage.setItem('token', newToken);
//         if (response.data.code == -1 && response.status == 200) {
//             this.$message({ showClose: true, message: response.data.msg, type: 'warning' });
//         }
//         return response;
//     },
//     error => {/*在这里设置token过期的跳转*/
//         if (error.response) {
//             if (error.response.data.code == 401) {
//                 router.push('/login');
//             }
//         }
//     });

// myPost.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
//     let token = sessionStorage.getItem("token")
//     console.log(token)
//     if (token) {
//         token = 'bearer' + ' ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中
//         config.headers.common['Authorization'] = token
//     }
//     console.log(token)
//     return config
// }, function (error) {
//     return Promise.reject(error)
// })
// myGet.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
//     let token = sessionStorage.getItem("token")
//     console.log(token)
//     if (token) {
//         token = 'bearer' + ' ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中
//         config.headers.common['Authorization'] = token
//     }
//     return config
// }, function (error) {
//     return Promise.reject(error)
// })
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        // config.headers.token = sessionStorage.token;
        config.headers = {
            'token': sessionStorage.token,
            'Access-Control-Allow-Origin': '*',
            "access-control-allow-credentials": "true"
        }
    }
    console.log(config)
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.token,
            'Access-Control-Allow-Origin': '*',
            "access-control-allow-credentials": "true"
        }
        // config.headers.token = sessionStorage.token;
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    if (response.status === 200 && response.data.status == 1) {
        console.log(response.data.info == '' || response.data.info == "ok")
        if (response.data.info == '' || response.data.info == "ok") {
            return response;
        } else {
            vue.$message({
                message: response.data.info,
                type: "success",
            });
        }
        return response;
    } else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({ path: "/" })
        router.go(0)
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200 && response.data.status == 1) {
        if (response.data.info == '' || response.data.info == "ok") {
            return response;
        } else {
            vue.$message({
                message: response.data.info,
                type: "success",
            });
            return response;
        }
    }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({ path: "/" })
        router.go(0)
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})


// myPost.interceptors.response.use(response => {
//     console.log(response)
//     if (response.status === 200) {
//         // sessionStorage.setItem("isLogin", false);
//         console.log(sessionStorage.getItem("isLogin"));
//         var myresponse = response
//     } else if (response.status === 401) {
//         sessionStorage.setItem("isLogin", false);
//         console.log(sessionStorage.getItem("isLogin"));
//         router.push({ path: "/" })
//         router.go(0)
//     }
//     return myresponse
// }),
//     (error) => {
//         console.log(error)
//         console.log(error.response.status)
//         return Promise.reject(error)
//     }
// myGet.interceptors.response.use(response => {
//     console.log(response)
//     if (response.status === 200) {
//         // sessionStorage.setItem("isLogin", false);
//         console.log(sessionStorage.getItem("isLogin"));
//         var myresponse = response
//     }
//     else if (response.status === 401) {
//         sessionStorage.setItem("isLogin", false);
//         console.log(sessionStorage.getItem("isLogin"));
//         router.push({ path: "/" })
//         router.go(0)
//     } else if (response.status === 500) {
//         // sessionStorage.setItem("isLogin", false);
//         console.log(sessionStorage.getItem("isLogin"));
//     }
//     return myresponse
// }), (error) => {
//     console.log(error)
//     console.log(error.response.status)
//     return Promise.reject(error)
// }
export default {
    login(obj) {
        return myPost({
            url: urls.login,
            params: {
                ...obj
            },
            // 要在这里写 headers,从sessionStorage中拿,并给headers设置token
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    info() {
        return myGet({
            url: urls.info,
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    goodsList(obj) {
        return myGet({
            url: urls.goodsList,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    allList() {//所有商品分类
        return myGet({
            url: urls.allList,
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    orderList(obj) {
        return myGet({
            url: urls.orderList,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    orderInfo(order_id) {
        return myGet({
            url: urls.orderInfo,
            params: {
                order_id
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    infoChange(obj) {//修改用户
        return myPost({
            url: urls.infoChange,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    orderChange(obj) {
        return myPost({
            url: urls.orderChange,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    shipping() {
        return myGet({
            url: urls.shipping,
            params: {
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    goodsEdit(obj) {//添加编辑商品
        return myPost({
            url: urls.goodsEdit,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    goodsInfo(goods_id) {//获取商品信息
        return myGet({
            url: urls.goodsInfo,
            params: {
                goods_id
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    goodsChange(obj) {//商品 删除下架
        return myPost({
            url: urls.goodsChange,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    skuList(goods_id) {//获取商品规格列表
        return myGet({
            url: urls.skuList,
            params: {
                goods_id
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    skuChange(obj) {//修改规格属性 上下架&删除&修改库存
        return myPost({
            url: urls.skuChange,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    skuEdit(obj) {//添加规格 添加&编辑
        return myPost({
            url: urls.skuEdit,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    // 聊天室
    bindShop(client_id) {//绑定client_id到shop_id
        return myPost({
            url: urls.bindShop,
            params: {
                client_id
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    userList() {
        return myGet({//获取聊天用户列表
            url: urls.userList,
            params: {
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    userSay(obj) {
        return myPost({
            url: urls.userSay,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    userHistory(obj) {//获取消息历史记录
        return myPost({
            url: urls.userHistory,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    ossststoken() {
        return myGet({//oss上传获取ststoken
            url: urls.ossststoken,
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    imageList(goods_id) {//获取商品相册列表
        return myGet({//oss上传获取ststoken
            url: urls.imageList,
            params: {
                goods_id
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    imageChange(obj) {//添加 删除图片
        return myPost({
            url: urls.imageChange,
            params: {
                ...obj
            },
            // headers: {
            //     'token': sessionStorage.getItem("token")
            // },
        })
    },
    commentList(obj) {//评论列表
        return myGet({
            url: urls.commentList,
            params: {
                ...obj
            },
        })
    },
    commentInfo(comment_id) {//评论详情
        return myGet({
            url: urls.commentInfo,
            params: {
                comment_id,
            },
        })
    },
    couponList(obj) {//优惠卷列表
        return myGet({
            url: urls.couponList,
            params: {
                ...obj,
            },
        })
    },
    couponEdit(obj) {//添加&编辑
        return myPost({
            url: urls.couponEdit,
            params: {
                ...obj,
            },
        })
    },
    couponSend(obj) {//分发优惠券
        return myPost({
            url: urls.couponSend,
            params: {
                ...obj,
            },
        })
    },
    shopUserList(obj) {//用户列表
        return myGet({
            url: urls.shopUserList,
            params: {
                ...obj,
            },
        })
    },
    couponChange(obj) {//排序&显示&删除
        return myPost({
            url: urls.couponChange,
            params: {
                ...obj,
            },
        })
    },
    couponUserList(obj) {//优惠卷：领取列表
        return myGet({
            url: urls.couponUserList,
            params: {
                ...obj,
            },
        })
    },
}