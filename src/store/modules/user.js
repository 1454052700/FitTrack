/*
 * @Author: your name
 * @Date: 2020-07-06 12:31:09
 * @LastEditTime: 2020-07-08 10:51:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\vue-admin\src\store\modules\user.js
 */
import { login, logout, getUserInfo } from "@/api/login";
import { setToken, removeToken,getToken } from "@/utils/auth";
import Cookies from "js-cookie";
import * as types from "../mutaion-types";

//定义公共用户可抓取数据
const user = {
  state: {
    token: "",
    roles: [],
    name: "",
    avatar: "",
    introduction: ""
  },
  //  从mutaion-type.js中获取数据
  mutations: {
    [types.SET_TOKEN]: (state, token) => {
      state.token = token;
    },
    [types.SET_ROLES]: (state, roles) => {
      state.roles = roles;
    },
    [types.SET_INTRODUCTION]: (state, introduction) => {
      state.introduction = introduction;
    },
    [types.SET_NAME]: (state, name) => {
      state.name = name;
    },
    [types.SET_AVATAR]: (state, avatar) => {
      state.avatar = avatar;
    }
  },
  //  登录，获取当前用户的token，并存入当前用户
  actions: {
    loginbyUser( { commit },{ userName, passWord,code }) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await login({userName, passWord,code});
          if (response.data) {
            commit(types.SET_TOKEN, response.data);
            setToken(response.data);
            Cookies.set("user", userName);
          }
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    //  退出，将当前用户的路由信息移除，移除当前用户
    logout({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          await logout(state.token);
          commit(types.SET_ROLES, "");
          commit(types.SET_ROLES, []);
          Cookies.remove("user");
          removeToken();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

    //移除token
    felogout({ commit }) {
      return new Promise(resolve => {
        commit(types.SET_TOKEN, "");
        removeToken();
        resolve();
      });
    },
    //  获取用户信息以及当前路由角色
    getUserInfo({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await getUserInfo();
          const {username,photo,nickname } = response.data;
          
          commit(types.SET_NAME, username);
          commit(types.SET_AVATAR, photo);
          commit(types.SET_ROLES, [nickname]); 
          commit(types.SET_INTRODUCTION, '');

          console.log(username,"username")
          console.log(photo,"photo")
          console.log(nickname,"nickname")

          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    }
  }
};

export default user;
