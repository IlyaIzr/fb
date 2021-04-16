<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <q-input v-bind="rest" @focus="onFocus" @input="onInput" :rules="rules" class="fb-field-content">
    </q-input>
  </div>
</template>

<script>
import { checkRulesBool, commonMethods, strMethods } from "./common";

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
      rules: checkRulesBool(
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
  beforeMount(){
    // console.log({...this.rest});
  },
  watch: {
    // rest: {
    //   handler() {
    //     console.log("rerest", this.rest.key);
    //   },
    //   deep: true,
    // },
    // trigger() {
    //   console.log("trigger happend");
    // },
  },
  
};
</script>

<style>
</style>