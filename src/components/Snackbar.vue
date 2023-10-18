<template>
  <div>
    <v-snackbar
      v-model="error_snackbar"
      :timeout="timeout"
      :top="true"
    >
      {{ error_snackbar_text }}

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="error_snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="success_snackbar"
      :timeout="timeout"
      :top="true"
    >
      {{ success_snackbar_text }}

      <template v-slot:actions>

          <v-btn
            color="green"
            variant="text"
            @click="success_snackbar = false"
          >
          Close
          </v-btn>

      </template>
    </v-snackbar>
  </div>
  
</template>

<script lang="ts">

import { defineComponent } from 'vue'



export default defineComponent({
  name: 'Snackbar',
  components: {

  },
  mounted() {
 
  },
  methods: {

    error(message: string) {
      this.error_snackbar = true;
      this.error_snackbar_text = message;
    },

    success(message: string) {
      this.success_snackbar = true;
      this.success_snackbar_text = message;
    }
   
  },
  data() {
    return {
      error_snackbar: false,
      success_snackbar: false,
      error_snackbar_text: 'Error',
      success_snackbar_text: 'Success',
      timeout: 2000,
    }
  },
})


</script>