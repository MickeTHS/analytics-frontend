<template>

  <div class="checkbox-container">
    <div class="left-container">
      <div @click="clicked" v-if="!checked" id="unchecked"></div>
      <div @click="clicked" v-else id="checked"></div>
    </div>
    <div class="right-text">
      <span>{{ text }}</span>
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
  }

  .checkbox-container {
    height: 32px;
    width: 100%;
    clear: both;
  }

  span {
    margin-top: 8px;
    color: white;
  }

  .left-container {
    float: left;
  }

  .right-text {
    float: left;
    width: 320px;
    margin-left: 8px;
    padding-top: 4px;
  }

  .right-text p {
    color: white;
  }

  #checked {
    /* set background image */
    background-image: url('@/assets/checkbox_checked.png');
    width: 32px;
    height: 32px;
  }

  #unchecked {
    /* set background image */
    background-image: url('@/assets/checkbox_unchecked.png');
    width: 32px;
    height: 32px;
  }
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

// Logo
import logo from '../assets/logo.svg'

export default defineComponent({
  name: 'Checkbox',

  props: ['value', 'text', 'is_checked'],

  watch: {
    is_checked: function (new_val) {
      this.checked = new_val;
    }
  },

  methods: {
    clicked() {
      this.checked = !this.checked;

      if (this.checked) {
        this.$emit('checked', this.value);
      }
      else {
        this.$emit('unchecked', this.value);
      }
      
    },

  },

  data () {
    return {
      checked: false,
    }
  },
})
</script>
