/*
 * @Author: your name
 * @Date: 2020-07-06 12:31:09
 * @LastEditTime: 2020-07-06 16:07:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\vue-admin\src\api\index.js
 */
import http from "@/utils/http";

export function login(params) {
  return http({
    url: "",
    method: "post",
    data: params
  });
}

export function uploadFileRequest(url, params) {
  return http({
    method: "post",
    url: url,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export function selectRecord(url, params) {
  return http({
    method: "get",
    url: "guided/selectGuid",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
      "appId":1
    }
  });
}
