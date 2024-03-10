<template>

  <div class="pa-4 text-center">
    <v-card
      class="mx-auto my-8"
      elevation="16"
      max-width="344"
      v-if="local_item"
    >
      <v-toolbar
        color="rgba(0, 0, 0, 0)"
        theme="dark"
      >
        
        <template v-slot:append>
          <v-btn @click="$emit('close')" icon="mdi-close"></v-btn>
        </template>
      </v-toolbar>
      <v-form ref="form" @submit.prevent="submit">
        
        <v-card-item>
          <v-card-title>
            Create account
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
                v-model="local_item.password1"
                :rules="password_rules"
                type="password"
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
                label="Repeat password"
                v-model="local_item.password2"
                :rules="repeat_password_rule"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="accepted_terms"
              color="secondary"
              label="I agree to site terms and conditions"
              required
              :rules="[v => !!v || 'Must accept terms and conditions']"
            >
            <template v-slot:label>
              <div>
                I agree to the 
                <v-tooltip location="bottom">
                  <template v-slot:activator="{ props }">
                    <a
                      href="#"
                      target="_blank"
                      v-bind="props"
                      @click.prevent="open_terms_conditions"
                    >
                      Terms and Conditions
                    </a>
                  </template>
                  Click to read
                </v-tooltip>
                
              </div>
            </template>
            </v-checkbox>
          </v-row>
      
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :disabled="loading"
            :loading="loading"
            color="primary"
            text="Create account"
            variant="tonal"
            type="submit"
            block
          ></v-btn>
        </v-card-actions>

      </v-form>
    </v-card>

    <v-dialog v-model="show_terms_conditions" max-width="500">
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close Dialog"
            @click="show_terms_conditions = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    
    </v-dialog>

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

import store from '../../service/store';
import dayjs from 'dayjs';

import { PURGE_AUTH, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from '../../service/store/auth.module';
import { SET_USER } from '../../service/store/user.module';


import api from '@/service/analytics-api';
import { User } from '@/interfaces/user';

interface CreateUserForm {
  email: string,
  password1: string,
  password2: string
}

export default defineComponent({
  name: 'CreateAccountView',
  
  components: {
    ...mapGetters(['customer'])
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    async validate () {
      const { valid } = await (this.$refs.form as any).validate()

      return valid;
    },

    open_terms_conditions() {
      this.show_terms_conditions = true;
    },

    reset_loading_later() {
      setTimeout(() => { this.loading = false; }, 1000);
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

        await this.create_user(this.local_item.email, this.local_item.password1);
      }
      catch (err) {
        console.error('save error', err)
      }
      
      this.reset_loading_later();
    },

    async create_user(email: string, password: string) {

      const res = await api.post(`/user/register`, { email, password });

      if (res.status === 201) {

        const user = res.data;

        this.$emit('created', user);

        store.dispatch(SET_USER, user);
        store.dispatch(SET_ACCESS_TOKEN, user.token);
        store.dispatch(SET_REFRESH_TOKEN, user.refresh_token);

        return res.data;
      }

      throw `unable to create: ${res.status} ${res.data.reason}`;
    },

  },
  data() {
    return {
      show_link: true,
      accepted_terms: false,
      show_terms_conditions: false,
      loading: false,
      local_item: {
        email: '',
        password1: '',
        password2: ''
      } as CreateUserForm,

      password_rules: [
        (value: any) => !!value || 'Please type password.',
        (value: any) => (value && value.length >= 6) || 'minimum 6 characters',
      ],

      repeat_password_rule: [
        (value: any) => !!value || 'Repeat password',
        (value: any) =>
          value === (this.local_item as any).password1 || 'The password confirmation does not match.',
      ],
    }
  },
})


</script>
