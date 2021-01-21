import request from '../utils/request'

//登录接口
export function login(data) {
  return request({
    url: "/main/user/syn/info",
    method: "POST",
    data
  })
}
//登录接口
export function getUser(data) {
  return request({
    url: "/applet/user/syn/info",
    method: "POST",
    data
  })
}
//更新用户手机号
export function update_phone(data) {
  return request({
    url: "/applet/update_phone",
    method: "POST",
    data
  })
}
//刷新用户信息
export function update_user_info() {
  return request({
    url: "/applet/update_user_info",
    method: "POST"
  })
}
//展示促销劵(原始图)
export function show_coupon_image(data) {
  return request({
    url: "/applet/coupon/show_coupon_image",
    method: "GET",
    data
  })
}
//展示促销劵(原始图)
export function buy_coupon(data) {
  return request({
    url: "/applet/coupon/buy_coupon",
    method: "GET",
    data
  })
}
//展示[已购]促销劵(原始图)
export function show_sell_coupon_image(data) {
  return request({
    url: "/applet/coupon/show_sell_coupon_image",
    method: "GET",
    data
  })
}

//保存促销劵图片到(客户端)手机
export function save_coupon_image(data) {
  return request({
    url: "/applet/coupon/save_coupon_image",
    method: "GET",
    data
  })
}
//获取当前用户信息
export function getInfo() {
  return request({
    url: "/applet/user/getInfo",
    method: "GET"
  })
}
//sessinKey
export function getSessinKey(jsCode) {
  return request({
    url: "/applet/" + jsCode,
    method: "GET"
  })
}
//代理人[收益]详情
export function agent_coupon_profit_info(data) {
  return request({
    url: "/applet/coupon/agent_coupon_profit_info",
    method: "GET",
    data
  })
}
//代理人[收益]列表
export function agent_coupon_profit_list(data) {
  return request({
    url: "/applet/coupon/agent_coupon_profit_list",
    method: "GET",
    data
  })
}
//销售员[折让]详情
export function seller_coupon_discount_info(data) {
  return request({
    url: "/applet/coupon/seller_coupon_discount_info",
    method: "GET",
    data
  })
}
//销售员[收益]详情
export function seller_coupon_profit_info(data) {
  return request({
    url: "/applet/coupon/seller_coupon_profit_info",
    method: "GET",
    data
  })
}
//销售员[收益列表]
export function seller_coupon_profit_list(data) {
  return request({
    url: "/applet/coupon/seller_coupon_profit_list",
    method: "GET",
    data
  })
}
//申请成为代理人/销售员
export function appRole(data) {
  return request({
    url: "/applet/user/applicationMemberRole",
    method: "GET",
    data
  })
}
//获取二维码
export function getCode() {
  return request({
    url: "/applicationMemberRoleTest",
    method: "GET"
  })
}
//商家背景图
export function queryBusinessImg(data) {
  return request({
    url: "/applet/user/queryBusinessImg",
    method: "GET",
    data
  })
}
//获取用户私钥
export function getPrivateKey(data) {
  return request({
    url: "/applet/user/getPrivateKey",
    method: "GET",
    data
  })
}
//查看可以发行的促销劵列表
export function getAgentCouponList(data) {
  return request({
    url: "/applet/coupon/canBeAgentCouponList",
    method: "GET",
    data
  })
}
//促销券编辑列表
export function shoWEditCouponList() {
  return request({
    url: "/applet/coupon/showEditCouponList",
    method: "GET"
  })
}
//查看保存未发行的促销劵
export function queryEditCouponInfo(data) {
  return request({
    url: "/applet/coupon/queryEditCouponInfo",
    method: "GET",
    data
  })
}
//查看保存未发行的自定义促销劵
export function query_editcoupon_list(data) {
  return request({
    url: "/applet/coupon/query_editcoupon_list",
    method: "GET",
    data
  })
}
//查看我的促销券(编辑完成)列表
export function queryEditCouponList(data) {
  return request({
    url: "/applet/coupon/queryEditCouponList",
    method: "GET",
    data
  })
}
//促销券编辑
export function editCoupon(data) {
  return request({
    url: "/applet/coupon/editCoupon",
    method: "POST",
    data
  })
}
//发行促销券
export function addCouponAgent(data) {
  return request({
    url: "/applet/coupon/addCouponAgent",
    method: "GET",
    data
  })
}
//查看已发行促销券列表(代理人查看)
export function addCouponAgentList(data) {
  return request({
    url: "/applet/coupon/queryCouponAgentList",
    method: "GET",
    data
  })
}
//查看已发行促销券列表(老板查看所用代理人)  促销券回顾
export function queryAllCouponAgentList(data) {
  return request({
    url: "/applet/coupon/queryAllCouponAgentList",
    method: "GET",
    data
  })
}
//查询成员列表
export function queryMemberList(data) {
  return request({
    url: "/applet/user/queryMemberList",
    method: "GET",
    data
  })
}
//查看促销券出售数量(老板)
export function queryAllCouponSellList(data) {
  return request({
    url: "/applet/coupon/queryAllCouponSellList",
    method: "GET",
    data
  })
}
//查看促销券出售数量(代理人)
export function queryCouponSellList(data) {
  return request({
    url: "/applet/coupon/queryCouponSellList",
    method: "GET",
    data
  })
}
//查看促销券出售列表(已出售促销劵)
export function querySellCouponListBySeller(data) {
  return request({
    url: "/applet/coupon/querySellCouponListBySeller",
    method: "GET",
    data
  })
}
//查看促销券验收列表(已验收促销劵))
export function queryUseCouponListBySeller(data) {
  return request({
    url: "/applet/coupon/queryUseCouponListBySeller",
    method: "GET",
    data
  })
}
//添加促销劵收藏(消费者)
export function couponCollect(data) {
  return request({
    url: "/applet/coupon/couponCollect",
    method: "GET",
    data
  })
}
//查看收藏列表
export function queryCouponCollectList(data) {
  return request({
    url: "/applet/coupon/queryCouponCollectList",
    method: "GET",
    data
  })
}
//我已购促销券
export function queryMyCouponList(data) {
  return request({
    url: "/applet/coupon/queryMyCouponList",
    method: "GET",
    data
  })
}
//查看促销券验收列表(销售员查看))--折让列表
export function queryCouponUseList(data) {
  return request({
    url: "/applet/coupon/queryCouponUseList",
    method: "GET",
    data
  })
}
//查看促销券验收列表(销售员查看))--折让列表
export function queryCouponUseList2(data) {
  return request({
    url: "/applet/coupon/queryCouponUseList2",
    method: "GET",
    data
  })
}
//查看促销券收入列表(销售员查看))
export function querySellCouponList(data) {
  return request({
    url: "/applet/coupon/querySellCouponList",
    method: "GET",
    data
  })
}
//促销券销售(销售员))
export function couponSell(data) {
  return request({
    url: "/applet/coupon/couponSell",
    method: "GET",
    data
  })
}
//促销券验证(销售员))
export function couponConsume(data) {
  return request({
    url: "/applet/coupon/couponConsume",
    method: "GET",
    data
  })
}
//添加商家信息
export function addMerchantInfo(data) {
  return request({
    url: "/applet/user/addMerchantInfo",
    method: "POST",
    data
  })
}
//查看申请人列表
export function applicationMemberList(data) {
  return request({
    url: "/applet/user/applicationMemberList",
    method: "GET",
    data
  })
}
//获取授权证书
export function getBrowseCert(data) {
  return request({
    url: "/applet/cert/getBrowseCert",
    method: "GET",
    data
  })
}
//成员管理
export function memberManage(data) {
  return request({
    url: "/applet/user/memberManage",
    method: "GET",
    data
  })
}
//企业信息
export function queryBusinessInfo() {
  return request({
    url: "/applet/user/queryBusinessInfo",
    method: "GET"
  })
}
//文件上传
export function uploadFile(data) {
  return request({
    url: "/applet/file/upload",
    method: "POST",
    data
  })
}
//用户身份二维码
export function showUserQRCode() {
  return request({
    url: "/applet/user/showUserQRCode",
    method: "POST"
  })
}
//促销券浏览
export function queryCouponBrowse(data) {
  return request({
    url: "/applet/coupon/queryCouponBrowse",
    method: "GET",
    data
  })
}
//删除促销券浏览记录
export function del_coupon_browse(data) {
  return request({
    url: "/applet/coupon/del_coupon_browse",
    method: "GET",
    data
  })
}
//删除促销券收藏记录
export function del_coupon_collect(data) {
  return request({
    url: "/applet/coupon/del_coupon_collect",
    method: "GET",
    data
  })
}
//身份切换
export function changeUserType(data) {
  return request({
    url: "/applet/user/change_user_type",
    method: "GET",
    data
  })
}
//判断是否有身份切换
export function hasUserType() {
  return request({
    url: "/applet/user/has_user_type",
    method: "GET"
  })
}
//老板-促销券删除
export function delCoupon(data) {
  return request({
    url: "/applet/coupon/del_coupon",
    method: "GET",
    data
  })
}
//代理人-促销券删除
export function delCouponAgent(data) {
  return request({
    url: "/applet/coupon/del_coupon_agent",
    method: "GET",
    data
  })
}
//操作记录-成员管理
export function member_handle_record(data) {
  return request({
    url: "/applet/user/member_handle_record",
    method: "GET",
    data
  })
}
//操作记录-促销券
export function coupon_handle_record(data) {
  return request({
    url: "/applet/coupon/coupon_handle_record",
    method: "GET",
    data
  })
}
//搜索代理人
export function search_agent(data) {
  return request({
    url: "/applet/user/search_agent",
    method: "GET",
    data
  })
}
//搜索商家
export function search_business(data) {
  return request({
    url: "/applet/user/search_business",
    method: "GET",
    data
  })
}
//邀请代理人
export function invite_agent(data) {
  return request({
    url: "/applet/user/invite_agent",
    method: "GET",
    data
  })
}
//查看代理邀请列表
export function query_agent_invite(data) {
  return request({
    url: "/applet/user/query_agent_invite",
    method: "GET",
    data
  })
}
//代理邀请管理
export function agent_invite_manage(data) {
  return request({
    url: "/applet/user/agent_invite_manage",
    method: "GET",
    data
  })
}
//代理的商家列表
export function my_business_list() {
  return request({
    url: "/applet/user/my_business_list",
    method: "GET"
  })
}
//申请成为代理人
export function apply_agent(data) {
  return request({
    url: "/applet/user/apply_agent",
    method: "GET",
    data
  })
}
//趋势图:最近七天每天每种劵出售[数量])
export function coupon_sell_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_sell_trend_chart",
    method: "GET"
  })
}
//趋势图:最近七天每天销售劵总[收益])
export function coupon_profit_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_profit_trend_chart",
    method: "GET"
  })
}
//趋势图:最近七天每天销售劵总[折让])
export function coupon_discount_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_discount_trend_chart",
    method: "GET"
  })
}
//趋势图:最近一年每月销售劵总[收益])
export function coupon_profit_trend_chart_month() {
  return request({
    url: "/applet/coupon/coupon_profit_trend_chart_month",
    method: "GET"
  })
}
//趋势图:最近一年每月销售劵总[折让])
export function coupon_discount_trend_chart_month() {
  return request({
    url: "/applet/coupon/coupon_discount_trend_chart_month",
    method: "GET"
  })
}
//趋势图:最近一年每月促销劵出售[数量])
export function coupon_sell_trend_chart_month() {
  return request({
    url: "/applet/coupon/coupon_sell_trend_chart_month",
    method: "GET"
  })
}
//代理人趋势图:最近七天每天销售劵总[收益])
export function coupon_agent_profit_trend_chart(data) {
  return request({
    url: "/applet/coupon/coupon_agent_profit_trend_chart",
    method: "GET",
    data
  })
}
//销售员趋势图:最近10天每天销售劵总[收益])
export function coupon_seller_profit_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_seller_profit_trend_chart",
    method: "GET"
  })
}
//销售员趋势图:最近10天每天销售劵总[折让])
export function coupon_seller_discount_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_seller_discount_trend_chart",
    method: "GET"
  })
}
//店铺转让
export function business_tran(data) {
  return request({
    url: "/applet/user/business_tran",
    method: "GET",
    data
  })
}
//店铺转让信息
export function business_tran_info(data) {
  return request({
    url: "/applet/user/business_tran_info",
    method: "GET",
    data
  })
}
//[店铺转让]老板状态修改
export function business_tran_boss_status(data) {
  return request({
    url: "/applet/user/business_tran_boss_status",
    method: "GET",
    data
  })
}
//[店铺转让]接收人状态修改
export function business_tran_receiver_status(data) {
  return request({
    url: "/applet/user/business_tran_receiver_status",
    method: "GET",
    data
  })
}
//[删除]购买的代金券
export function del_coupon_purchased(data) {
  return request({
    url: "/applet/coupon/del_coupon_purchased",
    method: "GET",
    data
  })
}
//查看无用(已过期||使用次数为0)的已购促销券
export function query_useless_coupon_list(data) {
  return request({
    url: "/applet/coupon/query_useless_coupon_list",
    method: "GET",
    data
  })
}
//查询的促销劵信息
export function query_coupon_info(data) {
  return request({
    url: "/applet/coupon/query_coupon_info",
    method: "GET",
    data
  })
}
//[店铺转让]记录
export function business_tran_record(data) {
  return request({
    url: "/applet/user/business_tran_record",
    method: "GET",
    data
  })
}
//查看用户促销劵使用记录(消费者查看)
export function query_consumer_user_coupon_list(data) {
  return request({
    url: "/applet/coupon/query_consumer_user_coupon_list",
    method: "GET",
    data
  })
}

// 亲亲和和项目的--------------------------------------
//注册公司
export function save_company_info(data) {
  return request({
    url: "/applet/user/save_company_info",
    method: "POST",
    data
  })
}
//搜索公司
export function search_company(data) {
  return request({
    url: "/applet/user/search_company",
    method: "GET",
    data
  })
}
//成员管理
export function member_manage(data) {
  return request({
    url: "/applet/user/member_manage",
    method: "GET",
    data
  })
}
//申请成为公司成员
export function add_company_member(data) {
  return request({
    url: "/applet/user/add_company_member",
    method: "GET",
    data
  })
}
//查看公司成员
export function query_company_member(data) {
  return request({
    url: "/applet/user/query_company_member",
    method: "GET",
    data
  })
}
//背景图
export function query_company_img(data) {
  return request({
    url: "/applet/user/queryBusinessImg",
    method: "GET",
    data
  })
}
//权益生成:新增权益类型
export function add_code_type(data) {
  return request({
    url: "/applet/code/add_code_type",
    method: "GET",
    data
  })
}
//传播和社交公司:增加权益项目
export function add_company_code_type(data) {
  return request({
    url: "/applet/code/add_company_code_type",
    method: "GET",
    data
  })
}
//传播和社交:项目转移(手动输入起始和结束编号)
export function transfer_company_code_type(data) {
  return request({
    url: "/applet/code/transfer_company_code_type",
    method: "GET",
    data
  })
}
//传播和社交:项目列表
export function query_company_code_type(data) {
  return request({
    url: "/applet/code/query_company_code_type",
    method: "GET",
    data
  })
}
//权益生成:新增权益(1次增加100个)
export function add_code(data) {
  return request({
    url: "/applet/code/add_code",
    method: "GET",
    data
  })
}
//权益生成:(打印)下载图片
export function download_code_by_type(data) {
  return request({
    url: "/applet/code/download_code_by_type",
    method: "GET",
    data
  })
}
//权益生成:查看权益列表
export function query_code_type(data) {
  return request({
    url: "/applet/code/query_code_type",
    method: "GET",
    data
  })
}
//权益生成:查看权益视频链接列表
export function query_code_video(data) {
  return request({
    url: "/applet/code/query_code_video",
    method: "GET",
    data
  })
}
//权益生成:新增或者修改权益视频链接
export function update_code_video_list(data) {
  return request({
    url: "/applet/code/update_code_video_list",
    method: "GET",
    data
  })
}
//权益生成:批量转让权益
export function sell_codes(data) {
  return request({
    url: "/applet/code/sell_codes",
    method: "GET",
    data
  })
}
//权益生成:按起始编号批量转让权益
export function sell_codes_from_start(data) {
  return request({
    url: "/applet/code/sell_codes_from_start",
    method: "GET",
    data
  })
}
//传播公司-->社交演绎:批量权益转让
export function sell_company_codes_to_company(data) {
  return request({
    url: "/applet/code/sell_company_codes_to_company",
    method: "GET",
    data
  })
}
//权益生成:查看起始ID与结束ID之间个数
export function query_codes_count(data) {
  return request({
    url: "/applet/code/query_codes_count",
    method: "GET",
    data
  })
}
//消费公司:查看权益列表
export function company_query_code_type(data) {
  return request({
    url: "/applet/code/company_query_code_type",
    method: "GET",
    data
  })
}
//消费公司:新增二维码视频链接
export function addnCodeVideo(data) {
  return request({
    url: "/applet/code/addnCodeVideo",
    method: "GET",
    data
  })
}
//消费公司:修改二维码视频链接
export function updateCodeVideo(data) {
  return request({
    url: "/applet/code/updateCodeVideo",
    method: "GET",
    data
  })
}
//消费公司:新增修改二维码视频链接
export function update_company_video(data) {
  return request({
    url: "/applet/code/update_company_video",
    method: "GET",
    data
  })
}
//消费公司:查看权益视频链接列表
export function query_company_video_link(data) {
  return request({
    url: "/applet/code/query_company_video_link",
    method: "GET",
    data
  })
}
//消费公司:批量转让权益
export function update_codes_link(data) {
  return request({
    url: "/applet/code/update_codes_link",
    method: "POST",
    data
  })
}
//消费公司:批量转让权益
export function sell_codes_company(data) {
  return request({
    url: "/applet/code/sell_codes_company",
    method: "GET",
    data
  })
}
//扫码看视频
export function get_video_link(data) {
  return request({
    url: "/applet/code/get_video_link",
    method: "GET",
    data
  })
}
//个人:扫码看视频(登录)
export function get_video_link_not_log(data) {
  return request({
    url: "/applet/code/get_video_link_not_log",
    method: "GET",
    data
  })
}
//查看我的权益列表
export function query_my_code(data) {
  return request({
    url: "/applet/code/query_my_code",
    method: "GET",
    data
  })
}
//个人:查看权益交易记录列表
export function query_my_code_tran(data) {
  return request({
    url: "/applet/code/query_my_code_tran",
    method: "GET",
    data
  })
}
//查看我的浏览
export function query_my_code_browse(data) {
  return request({
    url: "/applet/code/query_my_code_browse",
    method: "GET",
    data
  })
}
//扫二维码转让权益
export function SellCode(data) {
  return request({
    url: "/applet/code/SellCode",
    method: "GET",
    data
  })
}
//公司转让个人:权益转让
export function company_sell_code(data) {
  return request({
    url: "/applet/code/company_sell_code",
    method: "GET",
    data
  })
}
//个人:查看二维码视频链接列表
export function query_my_video_link(data) {
  return request({
    url: "/applet/code/query_my_video_link",
    method: "GET",
    data
  })
}
//个人:修改二维码视频链接
export function update_my_code_link(data) {
  return request({
    url: "/applet/code/update_my_code_link",
    method: "GET",
    data
  })
}
//展示二维码(获取该二维码权益)
export function showCodeToSell(data) {
  return request({
    url: "/applet/code/showCodeToSell",
    method: "GET",
    data
  })
}
//获取商品二维码图片
export function download_code(data) {
  return request({
    url: "/applet/code/download_code",
    method: "POST",
    data
  })
}
//权益生成转让营运传播
export function sell_code(data) {
  return request({
    url: "/applet/code/sell_code",
    method: "POST",
    data
  })
}
//获取当前用户BossId
export function getCurrentUserBossId() {
  return request({
    url: "/applet/user/getCurrentUserBossId",
    method: "GET"
  })
}
//获取公司会员列表
export function companyMemberList(data) {
  return request({
    url: "/applet/user/companyMember/getList",
    method: "GET",
    data
  })
}

// 教课帮接口
// 查询代理人优惠券
export function getAgentCoupon1(data) {
  return request({
    url: "/coupon/agent/get",
    method: "post",
    data
  })
}
// 查询出售优惠券
export function getCouponsell(data) {
  return request({
    url: "/meeting/couponsell/get",
    method: "post",
    data
  })
}

// 创建会议房间
export function createMeeting(data) {
  return request({
    url: "/meeting/room/create",
    method: "post",
    data
  })
}
// 查询会议房间
export function getMeeting(data) {
  return request({
    url: "/meeting/room/get",
    method: "post",
    data
  })
}
// 查询会议房间集合
export function getMeetingList(data) {
  return request({
    url: "/meeting/room/getList",
    method: "post",
    data
  })
}
// 通过ID删除房间信息
export function deleteById(data) {
  return request({
    url: "/meeting/room/deleteById",
    method: "get",
    data
  })
}
// 通过ID修改房间信息
export function updateById(data) {
  return request({
    url: "/meeting/room/updateById",
    method: "post",
    data
  })
}
// 添加节目信息
export function addMenu(data) {
  return request({
    url: "/meeting/menu/sava",
    method: "post",
    data
  })
}
// 查询单个节目信息
export function queryOneMenu(data) {
  return request({
    url: "/meeting/menu/page",
    method: "post",
    data
  })
}
// 查询多个节目信息
export function queryMenuList(data) {
  return request({
    url: "/meeting/menu/list",
    method: "post",
    data
  })
}
// 改变节目顺序
export function updateOrder(data) {
  return request({
    url: "/meeting/menu/updateOrder",
    method: "get",
    data
  })
}
// 通过id修改节目信息
export function updateMenu(data) {
  return request({
    url: "/meeting/menu/update",
    method: "post",
    data
  })
}
// 开始节目
export function startMenu(data) {
  return request({
    url: "/meeting/menu/startProgram",
    method: "get",
    data
  })
}
// 结束节目
export function endProgram(data) {
  return request({
    url: "/meeting/menu/endProgram",
    method: "get",
    data
  })
}
// 通过ID删除节目信息
export function delMenu(data) {
  return request({
    url: "/meeting/menu/del",
    method: "get",
    data
  })
}
// 添加视频信息
export function savaVideo(data) {
  return request({
    url: "/meeting/video/sava",
    method: "post",
    data
  })
}
// 查询单个视频信息
export function queryVideo(data) {
  return request({
    url: "/meeting/video/page",
    method: "post",
    data
  })
}
// 查询多个视频信息
export function getVideoList(data) {
  return request({
    url: "/meeting/video/list",
    method: "post",
    data
  })
}
// 查询多个视频信息(解析了视频)
export function getMenuVideoParseLink(data) {
  return request({
    url: "/meeting/video/getMenuVideoParseLink",
    method: "post",
    data
  })
}
// 通过id修改视频信息
export function updateVideo(data) {
  return request({
    url: "/meeting/video/update",
    method: "post",
    data
  })
}
// 通过ID删除视频信息
export function delVideo(data) {
  return request({
    url: "/meeting/video/del",
    method: "get",
    data
  })
}
// 添加登记人信息
export function savaRegistr(data) {
  return request({
    url: "/meeting/registr/sava",
    method: "post",
    data
  })
}
// 查询单个登记人
export function queryRegistr(data) {
  return request({
    url: "/meeting/registr/page",
    method: "post",
    data
  })
}
// 查询单个登记人
export function changeRegistr(data) {
  return request({
    url: "/meeting/registr/change",
    method: "post",
    data
  })
}
// 查询节目多个登记人
export function getRegistrList(data) {
  return request({
    url: "/meeting/registr/list",
    method: "post",
    data
  })
}
// 通过id修改登记人信息
export function updateRegistr(data) {
  return request({
    url: "/meeting/registr/update",
    method: "post",
    data
  })
}
// 通过ID删除登记人信息
export function delRegistr(data) {
  return request({
    url: "/meeting/registr/del",
    method: "get",
    data
  })
}
// 查看代理人邀请情况
export function resultList(data) {
  return request({
    url: "/meeting/cert/resultlsit",
    method: "post",
    data
  })
}
// 查看代理人邀请详情
export function invitationList(data) {
  return request({
    url: "/meeting/cert/invitation",
    method: "post",
    data
  })
}
// 签到签退
export function consumeSign(data) {
  return request({
    url: "/meeting/consume/page",
    method: "post",
    data
  })
}
// 查询签到信息集合
export function getsignlist(data) {
  return request({
    url: "/meeting/consume/getsignlist",
    method: "post",
    data
  })
}
// 查询签到信息详情
export function getsignlistdetails(data) {
  return request({
    url: "/meeting/consume/getsignlistdetails",
    method: "post",
    data
  })
}

// 增加一个房间角色申请
export function createRole(data) {
  return request({
    url: "/room/role/create",
    method: "post",
    data
  })
}
// 查询用户申请房间角色
export function getRoleList(data) {
  return request({
    url: "/room/role/getList",
    method: "post",
    data
  })
}
// 查询一个用户房间申请角色
export function getRole(data) {
  return request({
    url: "/room/role/get",
    method: "post",
    data
  })
}
// 通过id修改人申请角色
export function updateRole(data) {
  return request({
    url: "/room/role/updateById",
    method: "post",
    data
  })
}
// 通过id删除申请信息
export function deleteRole(data) {
  return request({
    url: "/room/role/delete",
    method: "get",
    data
  })
}
// 保存当前房间角色
export function saveCurrentRoomRole(data) {
  return request({
    url: "/applet/user/saveCurrentRoomRole",
    method: "get",
    data
  })
}
// 获取当前角色信息
export function getCurrentRoomRole(data) {
  return request({
    url: "/applet/user/getCurrentRoomRole",
    method: "get",
    data
  })
}
// 查看房间角色申请列表
export function getRoomRoleUserList(data) {
  return request({
    url: "/room/role/getRoomRoleUserList",
    method: "post",
    data
  })
}

// 创建桌子信息
export function createTable(data) {
  return request({
    url: "/meeting/table/create",
    method: "post",
    data
  })
}
// 获取桌子信息
export function getTable(data) {
  return request({
    url: "/meeting/table/get",
    method: "post",
    data
  })
}
// 获取桌子信息集合
export function getTableList(data) {
  return request({
    url: "/meeting/table/getList",
    method: "post",
    data
  })
}
// 添加/修改桌子用户
export function addTableUser(data) {
  return request({
    url: "/meeting/table/addTableUser",
    method: "get",
    data
  })
}
// 通过ID删除桌子信息
export function deleteTable(data) {
  return request({
    url: "/meeting/table/deleteById",
    method: "get",
    data
  })
}
// 通过ID修改桌子信息
export function updateTable(data) {
  return request({
    url: "/meeting/table/updateById",
    method: "post",
    data
  })
}
// 获取用户应该去那个桌子
export function getUserToTable(data) {
  return request({
    url: "/meeting/table/getUserToTable",
    method: "get",
    data
  })
}
// 通过用户ID获取桌子信息
export function getTableInfoByUserId(data) {
  return request({
    url: "/meeting/table/getTableInfoByUserId",
    method: "get",
    data
  })
}
// 获取桌子ID获取用户信息
export function getUserInfoListByTableId(data) {
  return request({
    url: "/applet/user/getUserInfoListByTableId",
    method: "get",
    data
  })
}

// 添加中奖人信息
export function addWinner(data) {
  return request({
    url: "/meeting/winner/sava",
    method: "post",
    data
  })
}
// 查询单个中奖人
export function queryWinner(data) {
  return request({
    url: "/meeting/winner/page",
    method: "post",
    data
  })
}
// 查询节目多个中奖人
export function getWinnerList(data) {
  return request({
    url: "/meeting/winner/list",
    method: "post",
    data
  })
}
// 通过id修改中奖信息
export function updateWinner(data) {
  return request({
    url: "/meeting/winner/update",
    method: "post",
    data
  })
}
// 通过ID删除中奖人信息
export function delWinner(data) {
  return request({
    url: "/meeting/winner/del",
    method: "get",
    data
  })
}

// 添加节目关注者
export function createProgramJoin(data) {
  return request({
    url: "/meeting/programJoin/create",
    method: "post",
    data
  })
}
// 查询节目关注者集合
export function getProgramJoinList(data) {
  return request({
    url: "/meeting/programJoin/getList",
    method: "post",
    data
  })
}
// 查询单个节目关注者
export function getProgramJoin(data) {
  return request({
    url: "/meeting/programJoin/get",
    method: "post",
    data
  })
}
// 通过ID删除节目关注者
export function deleteProgramJoin(data) {
  return request({
    url: "/meeting/programJoin/delete",
    method: "get",
    data
  })
}
// 通过id修改节目关注者
export function updateProgramJoin(data) {
  return request({
    url: "/meeting/programJoin/update",
    method: "post",
    data
  })
}
// 嘉宾活跃状态查看
export function getProgramjoinStatus(data) {
  return request({
    url: "/meeting/programjoin/list",
    method: "post",
    data
  })
}

// 添加投票
export function addVote(data) {
  return request({
    url: "/meeting/vote/sava",
    method: "post",
    data
  })
}
// 查询单个投票
export function queryVote(data) {
  return request({
    url: "/meeting/vote/page",
    method: "post",
    data
  })
}
// 查询多个投票
export function getVoteList(data) {
  return request({
    url: "/meeting/vote/list",
    method: "post",
    data
  })
}
// 查询节目投票情况
export function getVoteListCount(data) {
  return request({
    url: "/meeting/vote/listcount",
    method: "post",
    data
  })
}
// 通过id修改投票信息
export function updateVote(data) {
  return request({
    url: "/meeting/vote/update",
    method: "post",
    data
  })
}
// 通过ID删除投票信息
export function delVote(data) {
  return request({
    url: "/meeting/vote/del",
    method: "get",
    data
  })
}


// 获取用户信息
export function getUserInfoByUnionId(data) {
  return request({
    url: "/applet/user/getUserInfoByUnionId",
    method: "get",
    data
  })
}
// 修改用户信息
export function updateUserInfo(data) {
  return request({
    url: "/applet/user/updateUserInfo",
    method: "post",
    data
  })
}
// 获取切换身份
export function getCompanyRoleList(data) {
  return request({
    url: "/applet/user/getCompanyRoleList",
    method: "get",
    data
  })
}
// 审批公司申请
export function approvalCompanyApply(data) {
  return request({
    url: "/applet/user/approvalCompanyApply",
    method: "post",
    data
  })
}
// 获取公司信息集合
export function getCompanyApplyList(data) {
  return request({
    url: "/applet/user/getCompanyApplyList",
    method: "post",
    data
  })
}
// 查看邀请成功列表
export function getInvitationList(data) {
  return request({
    url: "/meeting/couponsell/invitation",
    method: "post",
    data
  })
}

// 添加促销券
export function createcouponsell(data) {
  return request({
    url: "/meeting/couponsell/createcouponsell",
    method: "post",
    data
  })
}
// 代理人通过扫码代理促销券
export function addCouponAgentByScan(data) {
  return request({
    url: "/coupon/agent/addCouponAgentByScan",
    method: "get",
    data
  })
}
// 同意邀请
export function sellaccept(data) {
  return request({
    url: "/meeting/couponsell/sellaccept",
    method: "get",
    data
  })
}
// 扫码绑定会议桌
export function updateCodeInfoContent(data) {
  return request({
    url: "/applet/code/updateCodeInfoContent",
    method: "get",
    data
  })
}
// 获取二维码信息
export function getCodeInfo(data) {
  return request({
    url: "/applet/code/getCodeInfo",
    method: "get",
    data
  })
}
// 推送菜单视频
export function pushMenuVideoLinkToCodeType(data) {
  return request({
    url: "/applet/code/pushMenuVideoLinkToCodeType",
    method: "get",
    data
  })
}


// 促销券新接口
// 发布促销券/促销券
export function publishCoupon(data) {
  return request({
    url: "/applet/coupon/publishCoupon",
    method: "POST",
    data
  })
}
// 修改促销券/促销券状态
export function updateCouponStatus(data) {
  return request({
    url: "/applet/coupon/updateCouponStatus",
    method: "GET",
    data
  })
}
// 查看老板发行的促销券列表
export function query_boss_publish_coupon(data) {
  return request({
    url: "/coupon/agent/query_boss_publish_coupon",
    method: "GET",
    data
  })
}
// 获取促销券集合
export function getCouponInfoList(data) {
  return request({
    url: "/applet/coupon/getCouponInfoList",
    method: "POST",
    data
  })
}
//查看出售成功促销券列表
export function querySellSuccessCouponList(data) {
  return request({
    url: "/meeting/couponsell/querySellSuccessCouponInfoList",
    method: "POST",
    data
  })
}
//查看出售成功促销券列表（有图片的）
export function querySellSuccessCouponImgList(data) {
  return request({
    url: "/meeting/couponsell/querySellSuccessCouponImgList",
    method: "POST",
    data
  })
}
//查看出售成功促销券列表（有图片的）只是为了
export function queryRemoteMyCouponList(data) {
  return request({
    url: "/applet/coupon/queryRemoteMyCouponList",
    method: "GET",
    data
  })
}
//查看出售成功促销券列表（有图片的）只是为了
export function getCouponImgList(data) {
  return request({
    url: "/coupon/img/getList",
    method: "POST",
    data
  })
}

//出售促销券
export function couponsellCoupon(data) {
  return request({
    url: "/meeting/couponsell/sellCoupon",
    method: "GET",
    data
  })
}
//验证促销券
export function verifySellCoupon(data) {
  return request({
    url: "/meeting/couponsell/verifySellCoupon",
    method: "GET",
    data
  })
}
//查看代理的促销券列表
export function queryAgentCouponList(data) {
  return request({
    url: "/coupon/agent/queryCouponAgentList",
    method: "GET",
    data
  })
}
//代理人代理促销券
export function addAgentCoupon(data) {
  return request({
    url: "/coupon/agent/addCouponAgent",
    method: "POST",
    data
  })
}
//创建代理人促销券信息
export function createCouponAgent(data) {
  return request({
    url: "/coupon/agent/create",
    method: "POST",
    data
  })
}
//获取促销券消费记录集合
export function consumeRecordList(data) {
  return request({
    url: "/coupon/consume/record/queryUserCouponConsume",
    method: "POST",
    data
  })
}
//预览代理的促销券
export function previewAgentCouponImg(data) {
  return request({
    url: "/coupon/agent/previewAgentCouponImg",
    method: "GET",
    data
  })
}
//预览出售的促销券图片
export function previewSellCouponImg(data) {
  return request({
    url: "/meeting/couponsell/previewSellCouponImg",
    method: "POST",
    data
  })
}
//退出会议
export function emptyRoomRole(data) {
  return request({
    url: "/meeting/room/exitRoom",
    method: "GET",
    data
  })
}
//代理人浏览效率
export function queryAgentInviteRatioList(data) {
  return request({
    url: "/coupon/agent/queryAgentInviteRatioList",
    method: "POST",
    data
  })
}
//代理人浏览效率详情
export function queryAgentInviteUserList(data) {
  return request({
    url: "/coupon/agent/queryAgentInviteUserList",
    method: "POST",
    data
  })
}


//通过房间ID统计菜单票数
export function statisticsMenuVoteByRoomId(data) {
  return request({
    url: "/meeting/vote/statisticsMenuVoteByRoomId",
    method: "GET",
    data
  })
}
//通过菜单ID查看投票人员详情（评价列表）
export function queryUserVoteDetailByMenuId(data) {
  return request({
    url: "/meeting/vote/queryUserVoteDetailByMenuId",
    method: "GET",
    data
  })
}

//创建/修改输入规则
export function verifyChangeByRoomId(data) {
  return request({
    url: "/input/verify/changeByRoomId",
    method: "POST",
    data
  })
}
//获取输入规则
export function getVerify(data) {
  return request({
    url: "/input/verify/get",
    method: "POST",
    data
  })
}

//奖励代金券
export function awardCoupon(data) {
  return request({
    url: "/meeting/couponsell/awardCoupon",
    method: "GET",
    data
  })
}
//赠送代金券
export function giveDiscount(data) {
  return request({
    url: "/applet/coupon/giveDiscount",
    method: "GET",
    data
  })
}

//创建物流记录
export function createCodeLogisticsRecord(data) {
  return request({
    url: "/logisticsRecord/createCodeLogisticsRecord",
    method: "GET",
    data
  })
}
//获取物流记录集合
export function getLogisticsRecordList(data) {
  return request({
    url: "/logisticsRecord/getLogisticsRecordList",
    method: "GET",
    data
  })
}

//添加关系（鸡装到箱子调用该接口）
export function createParentTypeCode(data) {
  return request({
    url: "/code/type/parent/createRelationByTypeId",
    method: "GET",
    data
  })
}
//添加分组（箱子装到箱子/车调用该接口）
export function createRelationByTypeId(data) {
  return request({
    url: "/code/type/parent/create",
    method: "POST",
    data
  })
}
//创建二维码场景视频
export function createCodeSceneVide(data) {
  return request({
    url: "/applet/code/createCodeSceneVide",
    method: "GET",
    data
  })
}
//创建视频浏览记录
export function addCodeBrowse(data) {
  return request({
    url: "/applet/code/addCodeBrowse",
    method: "GET",
    data
  })
}


//查看鸡的种类销售量
export function queryUserPositionSalesVolume(data) {
  return request({
    url: "/coupon/consume/record/queryUserPositionSalesVolume",
    method: "POST",
    data
  })
}
//查看鸡的种类趋势图
export function queryUserPositionSalesTendency(data) {
  return request({
    url: "/coupon/consume/record/queryUserPositionSalesTendency",
    method: "POST",
    data
  })
}

//查询优惠券类型趋势图
export function queryCouponSellAmountStatisticalTrend(data) {
  return request({
    url: "/applet/coupon/queryCouponSellAmountStatisticalTrend",
    method: "POST",
    data
  })
}