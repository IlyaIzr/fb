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
      <template v-slot:hint class="fb-field-hint"> {{ rest.hint }} </template>

      <!-- Attachments -->
      <template v-slot:prepend>
        <Attachment v-if="innerLeft" :config="innerLeft" :f="innerLeftClick" />
        <q-icon v-else name="cloud_upload" @click.stop />
      </template>
      <template v-slot:append v-if="innerRight">
        <Attachment :config="innerRight" :f="innerRightClick" />
      </template>
    </q-file>
  </div>
</template>

<script>
import { commonMethods, computedAttachments, computedRules, onMountCommon } from "./common";
import Attachment from "src/components/helpers/Attachment";

export default {
  name: "File",
  components: { Attachment },
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
    ...computedAttachments
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
