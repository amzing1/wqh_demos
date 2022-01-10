import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import nProgress from 'nprogress';

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['content-type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> | void => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      (config.headers as AxiosRequestHeaders).token = token;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

axios.interceptors.response.use((res) => {
  if (res.data.code === 111) {
    sessionStorage.setItem('token', '');
    // token过期操作
  }
  return res;
});

interface ResType<T> {
  code: number;
  data?: T;
  msg: string;
  err?: string;
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, params?: unknown): Promise<ResType<T>>;
  upload<T>(url: string, params?: unknown): Promise<ResType<T>>;
  download(url: string): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      nProgress.start();
      axios
        .get(url, { params })
        .then((res) => {
          nProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          nProgress.done();
          reject(err.data);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      nProgress.start();
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          nProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          nProgress.done();
          reject(err.data);
        });
    });
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      nProgress.start();
      axios
        .post(url, file, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((res) => {
          nProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          nProgress.done();
          reject(err.data);
        });
    });
  },
  download(url) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};

export default http;
