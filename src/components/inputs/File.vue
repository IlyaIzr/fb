<template>
  <div class="q-gutter-md col fb-field-file" v-if="rest.visible">
    <q-file
      bottom-slots
      v-bind="rest"
      class="fb-field-content"
      @blur="onBlur"
      @input="onInput"
      @focus="onFocus"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" @click.stop />
      </template>

      <template v-slot:hint class="fb-field-hint"> {{ rest.hint }} </template>
    </q-file>
  </div>
</template>

<script>
import { commonMethods, computedRules, onMountCommon } from "./common";

export default {
  name: "File",
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
    return {};
  },
  computed: {
    ...computedRules,
  },
  methods: {
    ...commonMethods,
  },
  mounted() {
    onMountCommon(this, this.rest);
  },
};
</script>

<style>
</style>
