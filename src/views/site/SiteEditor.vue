<template>

  <div class="pa-4 text-center">
    <v-dialog
      v-model="show_local"
      max-width="600"
    >
      
      <v-card
        v-if="local_item"
        prepend-icon="mdi-web"
        title="Edit site"
      >
        <v-card-text>
          <v-form ref="form" fast-fail @submit.prevent>
            <v-row dense>
              <v-col
                cols="12"
                md="12"
                sm="12"
              >
                <v-text-field
                  label="Display name *"
                  v-model="local_item.name"
                  :rules="[v => !!v || 'Display name is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="12"
                sm="12"
              >
                <v-text-field
                  hint="Example: www.mysite.com"
                  label="Web URL *"
                  :rules="[v => !!v || 'Web URL is required']"
                  v-model="local_item.url"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  :items="region_options"
                  v-model="local_item.region"
                  label="Region *"
                  :rules="[v => !!v || 'Region is required']"
                  required
                ></v-select>
              </v-col>

              <v-col
                cols="12"
                md="12"
                sm="12"
              >
                <v-text-field
                  hint="An internal description of this site"
                  label="Description"
                ></v-text-field>
              </v-col>


            </v-row>

            <small class="text-caption text-medium-emphasis">* indicates required field</small>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="$emit('close')"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="save"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

/**
 * For convenience we are naming the frontend entity type "site" to be Site.
 * 
 * In the Api it is known as an Entity.
 * 
 */

import { defineComponent } from 'vue'
import { Entity } from '@/interfaces/entity';
import { mapGetters } from 'vuex'

import api from '@/service/analytics-api';

export default defineComponent({
  name: 'SiteEditor',
  props: ['show','item'],
  components: {
    ...mapGetters(['customer'])
  },
  watch: {
    item() {
      if (this.item) {
        this.local_item = { ...this.item };
      }
    },
    show(value, oldValue) {
      this.show_local = value;
    },
    show_local(value) {
      if (!value) {
        this.$emit('close');
      }
    }
  },
  mounted() {
    this.show_local = this.show;

    if (this.item) {
      this.local_item = { ...this.item }
    }
    else {
      this.local_item = {} as any;
    }
    
  },
  methods: {
    async validate () {
      const { valid } = await (this.$refs.form as any).validate()

      return valid;
    },
    async save() {
      try {

        if (!this.local_item) {
          return false;
        }

        const valid = await this.validate();

        if (!valid) {
          return false;
        }

        if (this.local_item.id) {
          await this.update_site(this.local_item);
        }
        else {
          await this.create_site(this.local_item);
        }
      }
      catch (err) {
        console.error('save error', err)
      }
      
    },

    async create_site(site: Entity) {

      site.type = 'SITE';

      const res = await api.post(`/entity`, site );

      if (res.status === 201) {

        this.$emit('created', res.data);

        return res.data;
      }

      throw `unable to create site: ${res.status} ${res.data.reason}`;
    },

    async update_site(site: Entity) {
      const res = await api.put(`/entity/${site.id}`, site);

      if (res.status === 204) {

        this.$emit('updated', this.local_item);

        return true;
      }

      throw `unable to update site: ${res.data.status} ${res.data.reason}`;
    },

  },
  data() {
    return {
      region_options: [
        { title: 'Europe', value: 'EU' },
        { title: 'North America', value: 'NA' },
        { title: 'South America', value: 'SA' },
        { title: 'Africa', value: 'AF' },
        { title: 'East Asia', value: 'EA' }, 
      ],
      show_local: false,
      local_item: null as Entity | null
    }
  },
})


</script>
