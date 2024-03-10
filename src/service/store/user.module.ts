// action types
export const SET_USER = 'setUser';

// mutation types
export const UPDATE_USER = 'updateUser';

const state = {
  user: {}
};

const getters = {
  user: (state: { user: any; }) => state.user,
};

const actions = {
  [SET_USER](context: { commit: (arg0: string, arg1: any) => void; }, data: any){
    context.commit(UPDATE_USER, data);
  },
};

const mutations = {
  [UPDATE_USER](state: { user: any; }, data: any) {
    state.user = data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
