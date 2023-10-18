<template>
  <v-container>
    <v-row style="background-color: black; min-height: 128px;">
      
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <canvas id="canvas" width="128" height="64"></canvas>
        <img id="spritesheet_wizard" src="@/assets/wizard_sheet.png" style="display:none;">
      </v-col>
    </v-row>
    <v-row style="background-color: black; min-height: 200px;">
      <DialogueBox text="Before I can consider you as my apprentice, you must answer a few basic questions. Question one: do you own or administer a website?" :answers="['Yes', 'No', 'What\'s a website?']"/>
      <!--<DialogueBox text="Test" :answers="['Yes', 'No', 'What\'s a website?']"/>-->
    </v-row>
  </v-container>

</template>

<style lang="css" scoped>
canvas {
  width: 512px;
  height: 256px;
  image-rendering: pixelated;
}
</style>

<script lang="ts">


import HelloWorld from '@/components/HelloWorld.vue'
import { defineComponent } from 'vue'
import Sprite_draw from '../game/game_engine/sprite_draw';
import Sprite_sheet from '../game/game_engine/sprite_sheet';
import Game_renderer from '../game/game_engine/game_renderer';
import Wizard_character_library, { Wizard_animations, Wizard_character } from '../game/gameplay/wizard_character';
import Checkbox from '@/components/Checkbox.vue';
import DialogueBox from '@/components/DialogueBox.vue';


export default defineComponent({
  name: 'RPGView',
  components: {
    HelloWorld,
    DialogueBox
  },
  mounted() {
    console.log('HomeView mounted!')
    const image_spritesheet_wizard = this.$el.querySelector('#spritesheet_wizard')

    const canvas = this.$el.querySelector('#canvas').getContext('2d');

    let ctx = this.$el.querySelector('#canvas').getContext('2d');

    // Initialize the game renderer
    Game_renderer.initialize(canvas);

    //const sprite = Sprite_draw.create_game_engine_sprite(image_spritesheet_wizard, 0, 0, 64, 56, 0, 0, 1, true);
    const wizard_sprite_sheet = Sprite_sheet.create_game_engine_sprite_sheet(image_spritesheet_wizard, 64, 54, 4, 3);

    const wizard = Wizard_character_library.create_wizard(wizard_sprite_sheet);

    wizard.play_animation(Wizard_animations.IDLE.DOWN);

    if (wizard.sprite_instance) {
      Game_renderer.add_sprite(wizard.sprite_instance);
    }
    
    window.addEventListener('keyup', this.keyup_handler);
    window.addEventListener('keydown', this.keydown_handler);

    this.wizard = wizard;
    
    //console.log(sprite);

    //Game_renderer.add_sprite(sprite);
    //Game_renderer.add_sprite(sprite_animation_object);

  },
  methods: {
    keyup_handler(event: any) {
      
      switch (event.key) {
        case 'a':
          console.log('a');
          break;
        case 's':
          console.log('s');
          break;
        case 'd':
          console.log('d');
          break;
        case 'w':
          console.log('w');
          break;

      }
    },
    keydown_handler(event: any) {

      if (this.wizard === null) { return; }
      
      switch (event.key) {
        case 'a':
          console.log('keydown a');
          this.wizard.play_animation(Wizard_animations.WALK.LEFT);
          break;
        case 's':
          console.log('keydown s');
          this.wizard.play_animation(Wizard_animations.WALK.DOWN);
          break;
        case 'd':
          console.log('keydown d');
          this.wizard.play_animation(Wizard_animations.WALK.RIGHT);
          break;
        case 'w':
          console.log('keydown w');
          this.wizard.play_animation(Wizard_animations.WALK.UP);
          break;
          
      }
    }
  },
  data() {
    return {
      wizard: null as Wizard_character | null,

      size: 'sm',
      items: [
        { text: 'Extra small (2px)', value: 'xs' },
        { text: 'Small (4px)', value: 'sm' },
        { text: 'Medium (8px)', value: 'md' },
        { text: 'Large (16px)', value: 'lg' },
        { text: 'Extra large (24px)', value: 'xl' }
      ]
    }
  },
})


</script>
