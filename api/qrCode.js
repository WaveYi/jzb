import request from '../utils/request'

//查看促销劵二维码列表  /main/quick-response-code/list
export function qrCodeList(params) {
  return request({
    url: "/applet/video/query_code_video_list",
    method: "GET",
    params
  })
}

//查看促销劵二维码视频信息
export function query_code_videoInfo(params) {
  return request({
    url: "/applet/video/query_code_videoInfo",
    method: "GET",
    params
  })
}

//扫码看视频
export function queryVideoUrl(params) {
  return request({
    url: "/applet/video/queryVideoUrl",
    method: "GET",
    params
  })
}

//扫码看视频(未登录)
export function queryVideoUrl1(params) {
  return request({
    url: "/manage/queryVideoUrl",
    method: "GET",
    params
  })
}

//修改二维码视频链接
export function updateCodeVideoList(params) {
  return request({
    url: "/applet/video/updateCodeVideoList",
    method: "GET",
    params
  })
}

//二维码文件列表
export function qrCodeFileList(params) {
  return request({
    url: "/main/quick-response-code/file/list",
    method: "GET",
    params
  })
}

//批量更新文件
export function editQrCodeFileList(data) {
  return request({
    url: "/main/quick-response-code/file/batch",
    method: "PUT",
    data
  })
}

//微视解析
export function weseeAnalysis(data) {
  return request({
    url: "/main/quick-response-code/wesee/link/analysis",
    method: "POST",
    data
  })
}