<template>

  <div class="pa-4 text-center">
    
    <v-card
      class="mx-auto my-8"
      elevation="16"
      max-width="344"
      v-if="local_item"
    >
      <v-form ref="form" @submit.prevent="submit">
        
        <v-card-item>
          <v-card-title>
            Login
          </v-card-title>
          <v-card-subtitle>
            Your e-mail is your username
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-text-field
                :disabled="loading" 
                label="E-mail"
                v-model="local_item.email"
                :rules="[v => !!v || 'E-mail is required']"
                type="email"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-text-field
                :disabled="loading"
                label="Password"
                v-model="local_item.password"
                :rules="[v => !!v || 'Password is required']"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>

      
        </v-card-text>

        <v-row>
          <v-col class="text-right mr-4 mb-4">
            <a href="/forgot" @click.prevent="forgot_password_clicked">Forgot password?</a>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :disabled="loading"
            :loading="loading"
            color="primary"
            text="Login"
            variant="tonal"
            type="submit"
            block
          ></v-btn>
        </v-card-actions>

      </v-form>
    </v-card>

  </div>


</template>

<style lang="css" scoped>
canvas {
  width: 512px;
  height: 256px;
  image-rendering: pixelated;
}
</style>


<script lang="ts">

/**
 * For convenience we are naming the frontend entity type "site" to be Site.
 * 
 * In the Api it is known as an Entity.
 * 
 */

import { defineComponent } from 'vue'
import { Entity } from '@/interfaces/entity';
import { mapGetters } from 'vuex'

import api from '@/service/analytics-api';
import { User } from '@/interfaces/user';

import store from '../../service/store';

import { PURGE_AUTH, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from '../../service/store/auth.module';
import { SET_USER } from '../../service/store/user.module';


export default defineComponent({
  name: 'LoginView',
  
  components: {
    ...mapGetters(['customer'])
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    forgot_password_clicked() {
      
    },

    async validate () {
      const { valid } = await (this.$refs.form as any).validate()

      return valid;
    },
    async submit() {
      this.loading = true;

      try {

        if (!this.local_item) {
          return false;
        }

        const valid = await this.validate();

        if (!valid) {
          this.reset_loading_later();
          return false;
        }

        await this.login(this.local_item);
      }
      catch (err) {
        console.error('save error', err)
      }
      
      this.reset_loading_later();
    },

    reset_loading_later() {
      setTimeout(() => { this.loading = false; }, 1000);
    },

    async login(user: User) {

      const res = await api.post(`/user/login`, user );

      if (res.status === 200) {

        const user = res.data;

        this.$emit('authenticated', user);

        store.dispatch(SET_USER, user);
        store.dispatch(SET_ACCESS_TOKEN, user.token);
        store.dispatch(SET_REFRESH_TOKEN, user.refresh_token);

        return res.data;
      }

      throw `unable to authenticate: ${res.status} ${res.data.reason}`;
    },

  },
  data() {
    return {
      loading: false,
      local_item: {} as User
    }
  },
})


</script>
