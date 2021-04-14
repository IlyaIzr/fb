<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <q-card-section
      v-bind="rest"
      ref="input"
      v-html="rest.value"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { commonMethods } from './common';

export default {
  name: "HtmlInjection",
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
    ...commonMethods
  },
};
</script>

<style>
</style>
