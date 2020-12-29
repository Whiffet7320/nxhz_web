export default {
    bindShop: '/shop/message/bind/shop',//(聊天室)绑定client_id到shop_id
    userList: '/shop/message/user/list',//获取聊天用户列表
    userSay: '/shop/message/user/say',//聊天
    userHistory: '/shop/message/user/history',//聊天历史记录
    baseUrl: 'http://ufol.ngrok.farambi.top',//测试服
    // baseUrl:'http://api.xianfmei.com',
    login: '/shop/passport/login',
    info: '/shop/info',
    goodsList: '/shop/goods/list',
    allList: '/shop/category/all/list',
    orderList: '/shop/order/list',
    orderInfo: '/shop/order/info',
    infoChange: '/shop/info/change',//修改用户
    orderChange: '/shop/order/change',//收货，发货
    shipping: '/shop/shipping/list',//配送方式
    goodsEdit: '/shop/goods/edit',//添加编辑商品
    goodsInfo: '/shop/goods/info',//获取商品信息
    goodsChange: '/shop/goods/change',//商品 下架&删除
    skuList: '/shop/goods/sku/list',//获取商品规格列表
    skuChange: '/shop/goods/sku/change',//修改规格属性 上下架&删除&修改库存
    skuEdit: '/shop/goods/sku/edit',//添加规格 添加&编辑
    ossststoken: '/shop/oss/ststoken',//oss上传获取ststoken
    imageList: '/shop/goods/image/list',//获取商品相册列表
    imageChange: '/shop/goods/image/change',//添加&删除图片
    commentList: '/shop/order/comment/list',//评论列表
    commentInfo: '/shop/order/comment/info',//评论详情
    couponList: '/shop/coupon/list',//优惠卷列表
    couponEdit: '/shop/coupon/edit',//添加&编辑
    couponSend: '/shop/coupon/send',//分发优惠券
    shopUserList: '/shop/user/list',//用户列表
    couponChange: '/shop/coupon/change',//排序&显示&删除
    couponUserList: '/shop/coupon/user/list',//优惠卷：领取列表
    skuUpload: '/shop/goods/sku/upload',//批量导入&批量更新
}