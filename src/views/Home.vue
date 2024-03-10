<template>
  <v-sheet width="600" class="mx-auto text-center">
    <v-row v-if="!show_create">
      <v-col>
        <p>No account yet?</p>
        <p><a href="#" @click.prevent="show_create = !show_create">Create account</a></p>
      </v-col>
    </v-row>
    
    <CreateAccountView 
      v-if="show_create"
      @close="close_account_create"
    />
    <LoginView 
      v-if="!show_create"
    />
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
import LoginView from './login/LoginView.vue';
import CreateAccountView from './login/CreateAccountView.vue';


export default defineComponent({
  name: 'Home',
  components: {
    LoginView,
    CreateAccountView
  },
  mounted() {
 
  },
  methods: {
    close_account_create() {
      this.show_create = false;
    }
  },
  data() {
    return {
      show_create: false
    }
  },
})


</script>
