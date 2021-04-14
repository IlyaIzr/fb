<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <q-input v-bind="rest" @focus="onFocus" @input="onInput" :rules="rules">
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
  
};
</script>

<style>
</style>