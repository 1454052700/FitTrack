/*
 * @Author: your name
 * @Date: 2020-07-06 12:31:09
 * @LastEditTime: 2020-07-08 10:11:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\vue-admin\src\api\login.js
 */
import http from "@/utils/http";
import {getToken} from "@/utils/auth";

export function login(data) {
  return http({
    url: "login",
    method: "post",
    data:data
  });
}

export function getCode() {
  return http({
    url: "login/getCode",
    method: "post"
  });
}

export function logout() {
  return http({
    url: "/login/logout",
    method: "post"
  });
}

export function getUserInfo() {
  return http({
    url: "/getUserInfo",
    method: "get",
    headers: {
      "Content-Type": "multipart/form-data",
      "token":getToken()
    }
  });
}
