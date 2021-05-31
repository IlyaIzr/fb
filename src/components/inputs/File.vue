<template>
  <div class="q-gutter-md col fb-field-file" v-if="rest.visible">
    <q-file
      bottom-slots
      :use-chips="Boolean(rest.value && rest.value.length && rest.clearable)"
      v-bind="rest"
      class="fb-field-content"
      @blur="onBlur"
      @input="onInputLocal"
      @focus="onFocus"
    >
      <template v-slot:hint class="fb-field-hint"> {{ rest.hint }} </template>

      <!-- Attachments -->
      <template v-slot:before>
        <Attachment :config="outerLeft" :f="outerLeftClick" />
      </template>
      <template v-slot:prepend>
        <Attachment v-if="innerLeft" :config="innerLeft" :f="innerLeftClick" />
        <q-icon v-else name="cloud_upload" @click.stop />
      </template>
      <template v-slot:append v-if="innerRight">
        <Attachment :config="innerRight" :f="innerRightClick" />
      </template>
      <template v-slot:after>
        <Attachment :config="outerRight" :f="outerRightClick" />
      </template>
    </q-file>
  </div>
</template>

<script>
import {
  attachmentMethods,
  commonMethods,
  computedAttachments,
  computedRules,
  onMountCommon,
  readFileAsync,
} from "./common";
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
    ...computedAttachments,
  },
  methods: {
    ...commonMethods,
    ...attachmentMethods,
    async onInputLocal(val) {
      if (!this.rest.rawData) return await this.onInput(val);

      let fileVal;
      if (Array.isArray(val)) {
        fileVal = await Promise.all(
          val.map(async (singleVal) => await readFileAsync(singleVal))
        );
      } else fileVal = await readFileAsync(val);
      await this.onInput(val, fileVal);
      this.rest.rawDataValue = fileVal
    },
  },
  mounted() {
    onMountCommon(this, this.rest);
  },
  beforeMount() {
    this.rest.rawData ??= true;
  },
};
</script>

<style>
</style>
