<template>
  <div class="q-gutter-md col fb-field-slider" v-if="rest.visible">
    <q-field
      class="fb-field-label-slider"
      borderless
      ref="input"
      :label="rest.label"
      :rules="rules"
      :value="rest.value"
      :hint="rest.hint"
    >
      <template v-slot:control>
        <q-slider
          style="min-width: 180px"
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
      </template>
      <!-- Attachments -->
      <template v-slot:prepend v-if="innerLeft">
        <Attachment :config="innerLeft" :f="innerLeftClick" />
      </template>
      <template v-slot:append v-if="innerRight">
        <Attachment :config="innerRight" :f="innerRightClick" />
      </template>
    </q-field>
  </div>
</template>

<script>
import { commonMethods, onMountCommon, computedRules, computedAttachments } from "./common";
import Attachment from "src/components/helpers/Attachment";
export default {
  name: "SliderInput",
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
  beforeMount() {
    const field = this.rest;
    field.showValue ??= true;
  },
  mounted() {
    onMountCommon(this, this.rest);
  },
};
</script>

<style>
.fb-field-slider label {
  padding-bottom: 0;
  margin-top: 8px;
  /* margin-bottom: 4px; */
}
.fb-field-slider .q-field__control-container .fb-field-content {
  position: absolute;
  bottom: -13px;
}
.fb-field-slider .q-field__append.q-anchor--skip{
  display: none;
}
</style>
