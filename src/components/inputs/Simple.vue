<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <q-input v-bind="rest" @focus="onFocus" @input="onInput" :rules="rules">
    </q-input>
  </div>
</template>

<script>
import { checkRulesStr, commonMethods, strMethods } from "./common";
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
    ...commonMethods,
    ...strMethods
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