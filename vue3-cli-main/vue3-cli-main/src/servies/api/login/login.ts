import http from '@/servies/http';
import { ILoginApi } from './types';

const loginApi: ILoginApi = {
  login(params) {
    return http.post('/login', params);
  },
};

export default loginApi;
