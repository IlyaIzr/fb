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
  },
  data() {
    return {
      fbGlobal,
      feebee: null
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

    const field = fbGlobal.fields[this.keyName];

    // Lower priority, user config, might not have required properties
    Object.entries(field).forEach(([key, val]) => {
      let assignment;
      if (shouldEval(key, val)) {
        assignment = val(fbGlobal, this);
      } else assignment = val;

      // Assignment validation
      switch (key) {
        case "label":
          assignment &&= String(assignment);
          break;
      }
      field[key] = assignment;
    });

    const reactiveHandler = {
      set: function (targetObj, prop, value) {
        // extra actions
        console.log("proxyed thing", prop, value);

        // default assignment
        targetObj[prop] = value;
        // Indicate success
        return true;
      },
    };
    // fbGlobal.fields[this.keyName] = reactiveField
  },

  // watch: {
  //   "rest": {  // Works now
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