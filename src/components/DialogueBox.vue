<template>

  <v-container class="dialoguebox-container">

    <div style="border: 8px solid #5d573e;">
      <v-row >
        <v-col cols="12">
          <p style="padding: 16px;">{{ revealed }}</p>
        </v-col>
        
      </v-row>


      <v-row v-for="option in checkbox_options">
        <v-col cols="12">
          <Checkbox class="ml-8" @unchecked="unchecked_value" @checked="checked_value" :is_checked="option.checked" :value="option.value" :text="option.text"/>
        </v-col>
        
      </v-row>

      <v-row v-if="selected_option !== null">
        <v-col cols="8">

        </v-col>
        <v-col cols="4">
          <Button class="mr-8" text="CONTINUE"></Button>
        </v-col>
        
      </v-row>
      
    </div>
  </v-container>

</template>

<style lang="css" scoped>
  @font-face {
    font-family: Nevis;
    src: url('@/assets/nevis.ttf');
  }

  .dialoguebox-container {
    background-color: #122722;
  }

  * {
    font-family: Nevis;
  }

  p {
    color: white;
  }

  .right-text p {
    color: white;
  }

</style>

<script lang='ts'>
import Vue from 'vue';
import { defineComponent } from 'vue'
import Checkbox from '@/components/Checkbox.vue';
import Button from '@/components/Button.vue';
import { VueElement } from 'vue';

export default defineComponent({
  name: 'DialogueBox',

  props: ['text', 'answers', 'multi'],
  components: {
    Checkbox,
    Button
  },
  mounted() {

    let i = 0;
    for (const answer of (this.answers as string[])) {
      this.checkbox_options.push({
        value: i++,
        text: answer,
        checked: false
      })
    }

    // reveals one character at a time
    for (let i = 0; i <= this.text.length; ++i) {
      setTimeout(() => {
        this.revealed = (this.text as string).substring(0, i);
      }, i * 50);
    }

    setTimeout(()=>{
      this.timetoreveal = true;
    }, this.text.length * 50 + 1000)

  },

  methods: {
    unchecked_value(value: number) {
      this.selected_option = null;
    },

    checked_value(value: number) {

      this.selected_option = value;
      for (const option of this.checkbox_options) {
        option.checked = false;
      }
      this.checkbox_options[value].checked = true;
    }
  },

  data () {
    return {
      checkbox_options: [] as { value: number, text: string, checked: boolean }[],
      selected_option: null as number | null,
      timetoreveal: false,
      revealed: '',
    }
  },
})
</script>
