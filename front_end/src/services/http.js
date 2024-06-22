// src/utils/axios.js
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

// 创建一个Axios实例
const http = axios.create({
  baseURL: "http://localhost:3000", // 替换为你的后端 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 如果需要发送跨域请求时包含凭证（如 cookies）
});
export default http;
