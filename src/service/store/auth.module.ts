import Cookies from 'js-cookie';

// action types
export const SET_ACCESS_TOKEN = 'setAccessToken';
export const SET_REFRESH_TOKEN = 'setRefreshToken';

// mutation types
export const PURGE_AUTH = 'purgeAuth';
export const UPDATE_ACCESS_TOKEN = 'updateAccessToken';
export const UPDATE_REFRESH_TOKEN = 'updateRefreshToken';

function token_expires_at(token: string) {
  if (token === null || token === undefined) return 0;

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  
  const expirationTime = decodedToken.exp;

  return expirationTime;
}

const user_refresh_token = Cookies.get('user_refresh_token');
const user_access_token = Cookies.get('user_access_token');

const state = {
  user_access_token: 'undefined' === typeof user_access_token || user_access_token === undefined || user_access_token === 'undefined' ? null : Cookies.get('user_access_token'),
  user_refresh_token: ('undefined' === typeof user_refresh_token || user_refresh_token === undefined || user_refresh_token === 'undefined') ? null : Cookies.get('user_refresh_token'),
};

const getters = {
  user_access_token: (state: { user_access_token: any; }) => state.user_access_token,
  user_refresh_token: (state: { user_refresh_token: any; }) => state.user_refresh_token
};

const actions = {
  [SET_ACCESS_TOKEN](context: { commit: (arg0: string, arg1: any) => void; }, data: any){
    context.commit(UPDATE_ACCESS_TOKEN, data);
  },
  [SET_REFRESH_TOKEN](context: { commit: (arg0: string, arg1: any) => void; }, data: any) {
    context.commit(UPDATE_REFRESH_TOKEN, data);
  },
};

const mutations = {
  [UPDATE_ACCESS_TOKEN](state: { user_access_token: string; }, data: any) {
    state.user_access_token = data;

    const user_token_expire_at = token_expires_at(state.user_access_token);

    Cookies.set('user_access_token', state.user_access_token, { expires: new Date(user_token_expire_at * 1000) });
  },
  [UPDATE_REFRESH_TOKEN](state: { user_refresh_token: string; }, data: any) {
    state.user_refresh_token = data;

    const user_refresh_token_expire_at = token_expires_at(state.user_refresh_token);

    Cookies.set('user_refresh_token', state.user_refresh_token, { expires: new Date(user_refresh_token_expire_at * 1000) });
  },
  [PURGE_AUTH](state: { user_access_token: null; user_refresh_token: null; }) {
    state.user_access_token = null;
    state.user_refresh_token = null;
    Cookies.remove('user_refresh_token');
    Cookies.remove('user_access_token');
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
