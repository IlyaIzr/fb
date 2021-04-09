<template>
  <div class="q-gutter-md" v-if="rest.visible" style="min-width: 180px">
    <q-field
      borderless
      ref="input"
      :label="rest.label"
      :rules="rules"
      :value="rest.value"
      :hint="rest.hint"
    >
      <q-slider
        ref="slider"
        :min="rest.min || 0"
        :max="rest.max || 100"
        :step="rest.step || 0.01"
        :reverse="rest.reverse || false"
        :label="rest.showValue"
        v-bind="rest"
        @change="onBlur"
        @input="onInput"
      />
    </q-field>
  </div>
</template>

<script>
import { commonMethods, strMethods, checkRulesBool } from "./common";
export default {
  name: "SliderInput",
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
    return {
      rules: checkRulesBool(
        this.rest.rules,
        this.rest.required,
        this.rest.requiredMessage
      ),
    };
  },
  methods: {
    ...commonMethods,
    ...strMethods,
  },
  beforeMount() {
    const field = this.rest;
    field.showValue ??= true;
  },
};
</script>

<style>
</style>
