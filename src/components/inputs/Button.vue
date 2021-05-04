<template>
  <div class="fb-field-button q-mr-md" v-if="rest.visible">
    <q-btn v-bind="rest" @click="onClick">
      
      <q-tooltip
        v-if="rest.tooltip"
        anchor="top middle"
        self="bottom middle"
        :offset="[5, 5]"
      >
        {{ rest.tooltip }}
      </q-tooltip>
      
    </q-btn>
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import { onMountCommon } from './common';

export default {
  name: "ButtonElement",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async onClick() {
      const r = this.rest;
      const f = r.onClick || r.onInput || r.onFocus || r.onBlur;
      if (typeof f !== "function") return;
      await f(fbGlobal, this, this.rest);
    },
  },
  
  mounted(){
    onMountCommon(this, this.rest)
  },
};
</script>

<style>
</style>
