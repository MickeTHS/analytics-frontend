// action types
export const SET_CUSTOMER = 'setCustomer';

// mutation types
export const UPDATE_CUSTOMER = 'updateCustomer';

const state = {
  customer: {}
};

const getters = {
  customer: (state: { customer: any; }) => state.customer,
};

const actions = {
  [SET_CUSTOMER](context: { commit: (arg0: string, arg1: any) => void; }, data: any){
    context.commit(UPDATE_CUSTOMER, data);
  },
};

const mutations = {
  [UPDATE_CUSTOMER](state: { customer: {}; }, data: any) {
    state.customer = data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
