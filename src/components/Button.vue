<template>

  <div class="button-container">
    <div @mousedown="mouse_down" @mouseup="mouse_up" class="mouse-listener">
      <div v-if="!down" id="up">
        <p>{{ text }}</p>
      </div>
      <div v-else id="down">
        <p>{{ text }}</p>
      </div>
    </div>
    
  </div>

</template>

<style lang="css" scoped>
  @font-face {
    font-family: Nevis;
    src: url('@/assets/nevis.ttf');
  }

  * {
    font-family: Nevis;
    /* If you want to implement it in very old browser-versions */
    -webkit-user-select: none; /* Chrome/Safari */ 
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */

    /* The rule below is not implemented in browsers yet */
    -o-user-select: none;

    /* The rule below is implemented in most browsers by now */
    user-select: none;
  }

  .button-container:hover {
    cursor: pointer;
  }

  .button-container {
    height: 64px;
    width: 128px;
    align-items: center;
  }

  p {
    padding: 16px;
  }

  #up {
    /* set background image */
    background-image: url('@/assets/button_unpressed.png');
    width: 128px;
    height: 64px;
  }

  #down {
    /* set background image */
    background-image: url('@/assets/button_pressed.png');
    width: 128px;
    height: 64px;
  }
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

// Logo
import logo from '../assets/logo.svg'

export default defineComponent({
  name: 'Button',

  props: ['text'],

  methods: {
    mouse_down() {
      this.down = true;
    },

    mouse_up() {
      this.down = false;
    }
  },

  data () {
    return {
      down: false,
    }
  },
})
</script>
