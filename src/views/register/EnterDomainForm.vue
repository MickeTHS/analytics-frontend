<template>

  <div>
    <v-card-item>

      <div>
        <div class="text-overline mb-1">
          Create your account
        </div>
        <v-form ref="form">
          <v-text-field
            v-model="website"
            :rules="websiteRules"
            label="Your website"
            required
          ></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[(v: any) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <div class="d-flex align-items-end flex-column justify-content-end">
            <v-btn
              color="success"
              class="mt-4"
              max-width="200"
              @click="validate"
              style="align-self:flex-end"
              
              >
              CONTINUE
            </v-btn>

          </div>
        </v-form>
      </div>
    </v-card-item>

    <Snackbar 
      ref="snackbar"
    />
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

import { defineComponent } from 'vue'

import Snackbar from '@/components/Snackbar.vue';

export default defineComponent({
  name: 'EnterDomainForm',
  components: {
    Snackbar
  },
  mounted() {
    (this.$refs['snackbar'] as any).error('EnterDomainForm error');
    (this.$refs['snackbar'] as any).success('EnterDomainForm success');
  },
  methods: {

    async validate () {

      const { valid } = await (this.$refs['form'] as any).validate()

      if (valid) {
        this.$emit('on_step_done', 'ENTER_DOMAIN', {
          website: this.website,
        });
      }
    },
    reset () {
      (this.$refs['form'] as any).reset()
    },
    resetValidation () {
      (this.$refs['form'] as any).resetValidation()
    },
  },
  data() {
    return {
      
      website: '',
      code_verified: false,
      input_email: null,
      input_tracking_code: '<img src="https://tracking-wizard.io/img/aduhauhdwauhncnc" alt="Tracking Wizard - Simple Analytics"/>',
      websiteRules: [
        (v: any) => !!v || 'Website is required',
        (v: string | any[]) => (v && v.indexOf('.') > 0) || 'Must be a valid url',
      ],

      checkbox: false,
    }
  },
})


</script>
