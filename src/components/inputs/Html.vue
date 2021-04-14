<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <q-card-section v-bind="rest" ref="input" v-html="rest.value" class="fb-field-content" />
  </div>
</template>

<script>
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
};
</script>

<style>
</style>
