import axios from "axios";
import config from '../config';
import {
    Notification,
    Loading
} from 'element-ui';

let loadingInstance;

/**
 * 创建axios实例
 * @type {AxiosInstance}
 */
const request = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? config.apiUrl : '/',
    timeout: config.timeout
});

/**
 * 请求拦截
 */
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.1)'
    });
    return config;
}, error => {
    loadingInstance.close();
    return Promise.reject(error);
});

/**
 * 相应拦截
 */
request.interceptors.response.use(response => {
    loadingInstance.close();
    const code = response.status;
    if (code < 200 || code > 300) {
        return Promise.reject(`error ${code}`);
    }
    if (response.data.code !== 2000) {
        Notification.error({
            title: response.data.message,
            duration: 5000
        });
    }
    return response.data;
}, error => {
    loadingInstance.close();
    return Promise.reject(error);
});


export default request;