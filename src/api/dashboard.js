/*
 * @Author: your name
 * @Date: 2020-07-06 12:31:09
 * @LastEditTime: 2020-07-07 15:08:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\vue-admin\src\api\index.js
 */
import http from "@/utils/http";

export function allUserCount(params) {
  return http({
    method: "get",
    url: "home/allUserCount",
    data: params,
  });
}

export function userStatistics(params) {
  return http({
    method: "post",
    url: "home/userStatistics",
    data: params,
  });
}
