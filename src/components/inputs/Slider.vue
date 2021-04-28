<template>
  <div class="q-gutter-md" v-if="rest.visible" style="min-width: 180px">
    <q-field
      class="fb-field-label"
      borderless
      ref="input"
      :label="rest.label"
      :rules="rules"
      :value="rest.value"
      :hint="rest.hint"
    >
      <q-slider
        class="fb-field-content"
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
import { commonMethods, strMethods, checkRulesBool, onMountCommon } from "./common";
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
  mounted(){
    onMountCommon(this, this.rest)
  },
};
</script>

<style>
</style>
