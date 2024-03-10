<template>

  <div class="pa-4 text-center">
    <v-dialog
      v-model="show_local"
      max-width="600"
    >
      
      <v-card
        v-if="local_item"
        prepend-icon="mdi-web"
        title="Edit site"
      >
        <v-card-text>
          <v-form ref="form" fast-fail @submit.prevent>
            <v-row dense>
              <v-col
                cols="12"
                md="12"
                sm="12"
              >
                <v-text-field
                  label="E-mail *"
                  v-model="local_item.email"
                  :rules="[v => !!v || 'Please enter e-mail']"
                  required
                ></v-text-field>
              </v-col>

              
            </v-row>

          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="$emit('close')"
          ></v-btn>

          <v-btn
            color="primary"
            text="Send instructions"
            variant="tonal"
            @click="save"
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

import api from '@/service/analytics-api';

export default defineComponent({
  name: 'ForgotDialog',
  props: ['show'],
  components: {
    ...mapGetters(['customer'])
  },
  watch: {
    
    show(value, oldValue) {
      this.show_local = value;
    },
    
    show_local(value) {
      if (!value) {
        this.$emit('close');
      }
    }
  },
  mounted() {
    this.show_local = this.show;    
  },
  methods: {
    async validate () {
      const { valid } = await (this.$refs.form as any).validate()

      return valid;
    },
    async save() {
      try {

        if (!this.local_item) {
          return false;
        }

        const valid = await this.validate();

        if (!valid) {
          return false;
        }

        const res = await api.post(`/user/forgot`, { email: this.local_item.email } );

        if (res.status === 200) {
          return true;
        }
      }
      catch (err) {
        console.error('save error', err)
      }
      
      return false;
    },

  },
  data() {
    return {
      show_local: false,
      local_item: null as { email: string } | null
    }
  },
})


</script>
