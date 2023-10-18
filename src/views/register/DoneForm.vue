<template>

  <div>
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          DONE!
        </div>

        <p>You have successfully registered. Continue to the dashboard.</p>

        <div class="d-flex align-items-end flex-column justify-content-end">

          <v-btn
            color="success"
            class="mt-4"
            max-width="150"
            @click="validate"
            style="align-self:flex-end"
            :disabled="!code_verified"
            >
            CONTINUE
          </v-btn>

        </div>

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
  name: 'DoneForm',
  components: {
    Snackbar
  },
  mounted() {
    (this.$refs['snackbar'] as any).error('EnterEmailForm error');
    (this.$refs['snackbar'] as any).success('EnterEmailForm success');
  },
  methods: {

    
    clicked_copy_code() {
      this.copy_to_clipboard();
    },

    copy_to_clipboard() {
      (this.$refs['input-tracking-code'] as any).focus();
      
      navigator.clipboard.writeText(this.input_tracking_code).then(
        () => {
          (this.$refs['snackbar'] as any).success('Successfully copied to clipboard!');
        },
        () => {
          (this.$refs['snackbar'] as any).error('Unable to copy to clipboard!');
        },
      );
    },

    async validate () {

      const { valid } = await (this.$refs['form'] as any).validate()

      if (valid) {
        this.$emit('on_step_done', 'ENTER_DOMAIN');
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
