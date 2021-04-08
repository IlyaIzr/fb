<template>
  <div class="q-gutter-md">
    <q-input v-bind="rest" @focus="onFocus" @input="onInput" :rules="rules">
    </q-input>
  </div>
</template>

<script>
import { checkRulesStr, shouldEval } from "./common";
import { fbGlobal } from "src/arguments";

export default {
  name: "SimpleInput",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: Object,
  },
  data() {
    return {
      fbGlobal,
      rules: checkRulesStr(
        this.rest.rules,
        this.rest.required,
        this.rest.requiredMessage
      ),
    };
  },
  computed: {},
  methods: {
    onFocus(e) {
      if (this.rest?.onFocus) {
        const cb = this.rest.onFocus(fbGlobal);
        if (typeof cb === "function") cb(fbGlobal, this, e);
      }
    },
    onInput(val) {
      let cb;
      if (this.rest?.onInput) {
        cb = this.rest.onInput(fbGlobal, this, val);
      }
      this.rest.value = val;

      if (typeof cb === "function") cb(fbGlobal, this, val);
    },
  },
  beforeMount() {
    const field = this.rest;

    // Validate props for this specific input. Example: define select value
    Object.entries(field).forEach(([key, val]) => {
      let assignment;
      if (shouldEval(key, val)) {
        assignment = val(fbGlobal, this);
      } else assignment = val;

      // Assignment validation
      switch (key) {
        case "label":
          assignment ||= String(assignment);
          break;
      }
      field[key] = assignment;
    });
  },

  updated() {
    // console.log({...fbGlobal.fields[this.keyName]});
  },

  // watch: {
  //   "rest": {  // Works now
  //     handler(val) {
  //       console.log("field info prop changed", {...val});
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

<style>
</style>