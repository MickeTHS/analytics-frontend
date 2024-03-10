<template>
<v-sheet width="600" class="mx-auto mt-8">

  <v-card
    class="mx-auto"
    
    :variant="'elevated'"
  >
    <v-data-table :items="items">
      <template v-slot:top>
        <v-toolbar
          flat
        >

          <v-spacer></v-spacer>
          <v-btn
            class="mb-2"
            color="primary"
            @click="new_site_clicked"
            dark
          >
            + New site
          </v-btn>
        </v-toolbar>
      </template>
      
    </v-data-table>

  </v-card>

  <SiteEditor 
    :show="show_editor"
    :item="selected_site"
    @close="show_editor = false"
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
import api from '@/service/analytics-api';
import SiteEditor from './site/SiteEditor.vue';

export default defineComponent({
  name: 'SitesView',
  components: {
    SiteEditor
  },
  mounted() {
  
  },
  methods: {
    new_site_clicked() {
      this.show_editor = true;
    },
    
    async get_sites(customer_id: number) {
      const res = await api.get(`/entity/${customer_id}/sites`);

      if (res.status === 200) {
        return res.data;
      }

      return [];
    }
  },
  data() {
    return {
      selected_site: null,
      show_editor: false,
      items: [
        { name: 'Site #1', domain: 'support.memlist.se', visitors_total: 23 },
        { name: 'Site #2', domain: 'priks.memlist.se', visitors_total: 23 },
        { name: 'Site #3', domain: 'luf.memlist.se', visitors_total: 23 },
        { name: 'Site #4', domain: 'test.memlist.se', visitors_total: 23 },
      ]
    }
  },
})


</script>
