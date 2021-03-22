<template>
  <div class="q-gutter-md">
    <q-input v-bind="rest" @focus="onFocus"> </q-input>
  </div>
</template>

<script>
import { shouldEval } from "./extra";
import { fbGlobal } from "src/arguments";

export default {
  name: "SimpleInput",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    fieldInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fbGlobal,
    };
  },
  computed: {
    rest() {
      let res = {};
      res = fbGlobal.fields[this.keyName];
      return res;
    },
  },
  methods: {
    onFocus(e) {
      if (this.rest?.onFocus) {
        const cb = this.rest.onFocus(fbGlobal);
        if (typeof cb === "function") cb(fbGlobal, this, e);
      }
    },
  },
  beforeMount() {
    const commonAttributes = {
      hint: undefined,
      label: undefined,
      clearable: true,
      readonly: false,
    };

  },





  // watch: {
  //   "rest": {  // Never worls
  //     handler(val) {
  //       console.log("field info prop changed", val);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

<style>
</style>