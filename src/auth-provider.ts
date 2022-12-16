// 这个文件会定义一些函数，用来操控JWT的Token
// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__"; // 保存用户输入时的key

export const getToken = () => window.localStorage.getItem(localStorageKey); // 获取Token

export const handleUserResponse = ({ user }: { user: User }) => {
  // 处理服务器响应的用户数据
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  // 处理用户登录
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  // 处理用户注册
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  // 处理退出登录
  window.localStorage.removeItem(localStorageKey);
