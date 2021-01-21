import request from '../utils/request'

//登录接口
export function login(data) {
  return request({
    url: "/applet/user/syn/info",
    method: "POST",
    data
  })
}

//获取当前用户信息
export function user() {
  return request({
    url: "/applet/login/current/info",
    method: "GET"
  })
}
//查看可切换身份
export function query_user_type() {
  return request({
    url: "/applet/user/has_user_type",
    method: "GET"
  })
}
//切换身份
export function change_user_type(data) {
  return request({
    url: "/applet/user/change_user_type",
    method: "GET",
    data
  })
}
//查看我的公司信息
export function get_company_info() {
  return request({
    url: "/applet/user/get_company_info",
    method: "GET"
  })
}
//用户公司二维码
export function show_user_company_id() {
  return request({
    url: "/applet/user/show_user_company_id",
    method: "GET"
  })
}
//用户身份二维码
export function showUserQRCode() {
  return request({
    url: "/applet/user/showUserQRCode",
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
//上传文件
export function upload(data) {
  return request({
    url: "/applet/user/file/upload",
    method: "POST",
    data
  })
}

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
    url: "/applet/user/search_business",
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
//权益老板:项目转移(手动输入起始和结束编号)
export function codeInfoTransferType(data) {
  return request({
    url: "/applet/code/codeInfoTransferType",
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
