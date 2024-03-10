/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

import auth from './service/store/auth.module';
import customer from './service/store/customer.module';
import user from './service/store/user.module';

// Composables
import { createApp } from 'vue'
import { createStore } from "vuex";

// Create a new store instance or import from module.
const store = createStore({
  /* state, actions, mutations */
  modules: {
    auth,
    customer,
    user
  }
});


// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
app.use(store);

registerPlugins(app)

app.mount('#app')
