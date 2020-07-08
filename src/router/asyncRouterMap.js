/*
 * @Author: your name
 * @Date: 2020-07-06 12:31:09
 * @LastEditTime: 2020-07-08 10:13:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\vue-admin\src\router\asyncRouterMap.js
 */
import _import from "@/utils/import";
const Layout = _import("layout/Layout");

export const asyncRouterMap = [
  // 个人中心
  {
    path: "/profile",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: _import("profile/index"),
        name: "profile",
        meta: {
          title: "profile",
          icon: "test"
        }
      }
    ]
  },
  // 权限页 只有 admin 用户才可访问
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/index",
    meta: {
      roles: ["运营"]
    },
    children: [
      {
        path: "index",
        component: _import("permission/index"),
        name: "permission",
        meta: {
          title: "permission",
          icon: "test",
          roles: ["运营"]
        }
      }
    ]
  },
  // 表格
  {
    path: "/datatable",
    component: Layout,
    children: [
      {
        path: "index",
        component: _import("datatable/index"),
        name: "datatable",
        meta: {
          title: "datatable",
          icon: "table"
        }
      }
    ]
  },
    //其他没权限访问的全部丢在404页面
  { path: "*", redirect: "/404", hidden: true }
];
