<template>
  <v-sheet width="600" class="mx-auto mt-8">

    <v-card
      class="mx-auto"
      max-width="460"
      :variant="'elevated'"
    >
      
      <EnterDomainForm 
        v-if="step === 'ENTER_DOMAIN'"
        @on_step_done="step_done"
        
      />
      
      <VerifyDomainForm 
        v-if="step === 'VERIFY_DOMAIN'"
        :tracking_html_element="registration_data.tracking_html_element"
        @on_step_done="step_done"
        
      />

      <EnterEmailForm 
        v-if="step === 'ENTER_EMAIL'"
        @on_step_done="step_done"
        
      />

      <VerifyEmailForm 
        v-if="step === 'VERIFY_EMAIL'"
        @on_step_done="step_done"
        
      />

      <DoneForm 
        v-if="step === 'DONE'"
        @on_step_done="step_done"
        
      />

    </v-card>

    
</v-sheet>

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
import EnterDomainForm from './register/EnterDomainForm.vue';
import EnterEmailForm from './register/EnterEmailForm.vue';
import VerifyDomainForm from './register/VerifyDomainForm.vue';
import VerifyEmailForm from './register/VerifyEmailForm.vue';
import DoneForm from './register/DoneForm.vue';
import api from '@/service/analytics-api';

export default defineComponent({
  name: 'RegisterView',
  components: {
    EnterDomainForm,
    EnterEmailForm,
    VerifyDomainForm,
    VerifyEmailForm,
    DoneForm
  },
  mounted() {
 
  },
  methods: {

    async step_done(done_step: string, data: any) {

      switch (done_step) {
        case 'ENTER_DOMAIN': {
          this.registration_data.website = data.website;

          const response = await this.post_anonymous_user(this.registration_data.website);

          if (response === null) {
            return;
          }

          this.registration_data.tracking_html_element = response.tracking_html_element;

          break;
        }
      }

      const index = this.steps.findIndex((step: string) => step === done_step);

      if (index < this.steps.length - 1) {
        this.step = this.steps[index + 1];
      }
      else {
        this.step = 'DONE';
      }
    },

    async post_anonymous_user(website: string) {
      try {
        const res = await api.post(`/user/register/anonymous`, { website: website });

        if (res.status === 201) {
          return res.data;
        }
      }
      catch (err) {
        console.error('post_anonymous_user', err);
      }

      return null;
    }

  },
  data() {
    return {

      registration_data: {
        website: '',
        email: '',
        tracking_html_element: '',
      },

      error_snackbar: false,
      success_snackbar: false,
      error_snackbar_text: 'Error',
      success_snackbar_text: 'Success',
      timeout: 2000,
      website: '',
      code_verified: false,
      input_email: null,
      input_tracking_code: '<img src="https://tracking-wizard.io/img/aduhauhdwauhncnc" alt="Tracking Wizard - Simple Analytics"/>',
      websiteRules: [
        (v: any) => !!v || 'Website is required',
        (v: string | any[]) => (v && v.indexOf('.') > 0) || 'Must be a valid url',
      ],

      steps: [
        'ENTER_DOMAIN',
        'VERIFY_DOMAIN',
        'ENTER_EMAIL',
        'VERIFY_EMAIL',
        'DONE'
      ],

      step: 'ENTER_DOMAIN',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }
  },
})


</script>
