"use client";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.interceptors.request.use(async (config) => {
  config.withCredentials = true;

  return config;
});

export const axiosClient = axios;
