<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <p class="text-subtitle1 q-mb-none">{{ rest.label }}</p>
    <q-editor
      v-bind="rest"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      :placeholder="rest.placeholder"
    />
    <!-- TODO clearable btn -->
  </div>
</template>

<script>
import { commonMethods, strMethods } from './common';
export default {
  name: "EditorInput",
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
  methods: {
    ...commonMethods,
    ...strMethods,
  },
  beforeMount(){
    this.rest.localization ||= "ru"
  }
};
</script>

<style>
</style>
