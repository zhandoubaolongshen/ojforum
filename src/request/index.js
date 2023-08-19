import axios from 'axios';
import store from '../store/index'; // 假设你的Vuex store的文件路径是@/store/index.js

const service = axios.create({
  baseURL: "http://47.110.146.231:8080",
  timeout: 3000,
  headers: {
    'Authorization': `UVW ${store.state.token}`,
    "tokenHead": "UVW",
  },
  
});

service.interceptors.request.use(
    config => {
      // 在每次请求发送前，将store中最新的token值设置到请求头中
      config.headers['Authorization'] = `UVW ${store.state.token}`;
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

export default service;