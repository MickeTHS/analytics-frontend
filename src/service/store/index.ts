import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.module';
import customer from './customer.module';
import user from './user.module';


export default new Vuex.Store({
  modules: {
    auth,
    customer,
    user
  }
});
