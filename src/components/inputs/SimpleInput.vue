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
  computed,
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
      archiveRest: { ...fbGlobal.fields[this.keyName] },
      isPassword: fbGlobal.fields[this.keyName].type === "password",
      fbGlobal,
    };
  },
  computed: {
    ...computed,
    rest() {
      let res = {};
      res = fbGlobal.fields[this.keyName];
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

    // Lower priority, user config, might not have required properties
    Object.entries(fbGlobal.fields[this.keyName]).forEach(([key, val]) => {
      if (shouldEval(key, val)) {
        const res = val(fbGlobal, self);
        // this["_" + key] = res;
        this[key] = res;
        reactive[key] = res;
      } else reactive[key] = val;
    });

    // Higher priority, override, includes all required properties
    // Solution - describe array of possible attributes
    // this.fieldInfo.hint = "pre-setted hint"
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
      } else reactive[key] = val;
    });

    //Lowest priority with check
    Object.entries(commonAttributes).forEach(([key, val]) => {
      if (reactive[key] === undefined) reactive[key] = val;
    });

    fbGlobal.fields[this.rest.key] = reactive;
  },
  watch: {

    // rest: {
    //   handler(val) {
    //     console.log("SOME HAPPS", val.key, val);
    //   },
    //   deep: true,
    // },
    filtered(){
      console.log('fil changes');
    }
  },
};
</script>

<style>
</style>