export default {
    bindShop:'/shop/message/bind/shop',//(聊天室)绑定client_id到shop_id
    userList:'/shop/message/user/list',//获取聊天用户列表
    userSay:'/shop/message/user/say',//聊天
    userHistory:'/shop/message/user/history',//聊天历史记录
    baseUrl:'http://ufol.ngrok.farambi.top',
    login:'/shop/passport/login',
    info:'/shop/info',
    goodsList:'/shop/goods/list',
    allList:'/shop/category/all/list',
    orderList:'/shop/order/list',
    orderInfo:'/shop/order/info',
    infoChange:'/shop/info/change',//修改用户
    orderChange:'/shop/order/change',//收货，发货
    shipping:'/shop/shipping/list',//配送方式
    goodsEdit:'/shop/goods/edit',//添加编辑商品
    goodsInfo:'/shop/goods/info',//获取商品信息
    goodsChange:'/shop/goods/change',//商品 下架&删除
    skuList:'/shop/goods/sku/list',//获取商品规格列表
    skuChange:'/shop/goods/sku/change',//修改规格属性 上下架&删除&修改库存
    skuEdit:'/shop/goods/sku/edit',//添加规格 添加&编辑
    ossststoken:'/shop/oss/ststoken',//oss上传获取ststoken
    imageList:'/shop/goods/image/list',//获取商品相册列表
    imageChange:'/shop/goods/image/change',//添加&删除图片
}