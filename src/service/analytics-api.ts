import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3209',
});

import store from './store';
import dayjs from 'dayjs';
import { parseJwt } from './jwt.service';

import { PURGE_AUTH, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from './store/auth.module';

let is_refreshing = false;
let failed_queue = [] as { resolve: any, reject: any }[];

const processQueue = (error: any, token = null) => {
  failed_queue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failed_queue = [];
};

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

api.interceptors.request.use(async request => {
  let user_token = store.getters.user_access_token;
  let user_refresh_token = store.getters.user_refresh_token;

  if (user_refresh_token && user_refresh_token.length > 16) {
    const parsed = parseJwt(user_refresh_token);
    const cd = dayjs.unix(parsed.exp);
    const now = dayjs();

    if (cd < now) {
      console.log('user refresh token has expired');
      store.commit(PURGE_AUTH);
    }
  }
  
  if (user_token && user_token.length > 16) {
    request.headers['Authorization'] = `Bearer ${user_token}`;
  }

  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // if we are already refreshing, wait for the new token
      if (is_refreshing) {
        // add the request to the queue so that we can do it later while refreshing
        return new Promise(function(resolve, reject) {
          failed_queue.push({ resolve, reject });
        })
        .then((token) => {

          originalRequest.headers['Authorization'] = `Bearer ${token}`;

          return axios(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }
    

      originalRequest._retry = true;
      is_refreshing = true;

      return new Promise((resolve, reject) => {
        api.post('/user/refresh-token', {
          'refresh_token': store.getters.user_refresh_token  // replace getRefreshToken with actual implementation
        })
        .then(res => {

          if (res.status !== 201) { 
            console.error('unable to refresh token');
            
            store.commit(PURGE_AUTH);

            reject(error);
            return;
          }

          const data = res.data;

          console.log('token refreshed', data.token, data.refresh_token);

          store.dispatch(SET_ACCESS_TOKEN, data.token);
          store.dispatch(SET_REFRESH_TOKEN, data.refresh_token)

          originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

          processQueue(null, data.token);
          resolve(axios(originalRequest));
        })
        .catch((err) => {
          processQueue(err, null);
          reject(err);
        })
        .then(() => {
          is_refreshing = false;
        });
      });
    }

    return error.response;
  }
);


export default api;