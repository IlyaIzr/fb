<template>
  <div class="q-gutter-md">
    <q-input
      v-bind="filtered"
      :class="rest.class + ' input-' + rest.key"
      @focus="onFocus"
      @blur="onBlur"
      @input="input"
    >
    </q-input>
  </div>
</template>

<script>
import {
  methods,
  commonMethods,
  watchers,
  stringRules,
  shouldEval,
} from "./extra";
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
      archiveRest: { ...fbGlobal.newFields[this.keyName] },
      isPassword: fbGlobal.newFields[this.keyName].type === "password",
      fbGlobal,
    };
  },
  computed: {
    filtered() {
      let res = {};
      // res = this.fieldInfo; //reacts to updates from parent
      res = fbGlobal.newFields[this.keyName]; //reacts to field{} key updates
      // console.log(res);
      return res;
    },

    rest() {
      let res = {};
      res = fbGlobal.newFields[this.keyName];
      // console.log("res fields", { ...res });
      return res;
    },
  },
  methods: {
    ...commonMethods,
    ...methods,
    ...stringRules,
  },
  beforeMount() {
    const commonAttributes = {
      hint: undefined,
      label: undefined,
      clearable: true,
      readonly: false,
    };

    // fbGlobal
    const reactive = {};
    const self = this;

    const fields = fbGlobal.newFields;

    // Lower priority, user config, might not have required properties
    // Object.entries(fields[this.keyName]).forEach(([key, val]) => {
    //   if (shouldEval(key, val)) {
    //     const res = val(fbGlobal, self);
    //     // this["_" + key] = res;
    //     this[key] = res;
    //     reactive[key] = res;
    //   } else reactive[key] = val;
    // });

    // Higher priority, override, includes all required properties
    // console.log({...this.fieldInfo});
    Object.entries(this.fieldInfo).forEach(([key, val]) => {
      if (key === "value") {
        Object.defineProperty(reactive, key, {
          set(v) {
            // console.log('set value did run');
            if (typeof v === "function") this["_" + key] = v(fbGlobal, self);
            else this["_" + key] = String(v);
          },
          get() {
            return this["_" + key];
          },
        });
        reactive.value = val;
      } else ;
      reactive[key] = val;
    });

    //Lowest priority with check
    // Object.entries(commonAttributes).forEach(([key, val]) => {
    //   // console.log(this.fieldInfo.key, key, val); //WTF?
    //   if (reactive[key] === undefined) reactive[key] = val;
    // });

    fields[this.rest.key] = reactive;
  },
  watch: {
    // "fieldInfo": {
    //   handler(val) {
    //     console.log("field info prop changed", val);
    //   },
    //   deep: true,
    // },
    // filtered() {
    //   console.log("fil changes");
    // },
  },
};
</script>

<style>
</style>