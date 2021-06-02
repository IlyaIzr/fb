<template>
  <div
    class="q-gutter-md col fb-field-checkbox"
    v-if="rest.visible"
    ref="readonlyWrap"
  >
    <q-field
      ref="input"
      :value="localVal"
      :rules="rules"
      :hint="rest.hint"
      name="checkboxInput"
      class="fb-field-label"
      borderless
      dense
    >
      <template v-slot:control>
        <q-checkbox
          v-bind="rest"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInputLocal"
          :rules="rules"
          class="fb-field-content"
          ref="checkbox"
        />
      </template>
      <!-- Attachments -->
      <template v-slot:before>
        <Attachment :config="outerLeft" :f="outerLeftClick" />
      </template>
      <template v-slot:prepend v-if="innerLeft">
        <Attachment :config="innerLeft" :f="innerLeftClick" />
      </template>
      <template v-slot:append v-if="innerRight">
        <Attachment :config="innerRight" :f="innerRightClick" />
      </template>
      <template v-slot:after>
        <Attachment :config="outerRight" :f="outerRightClick" />
      </template>
    </q-field>
  </div>
</template>

<script>
import {
  attachmentMethods,
  commonMethods,
  computedAttachments,
  computedRules,
  onMountCommon,
} from "./common";
import Attachment from "src/components/helpers/Attachment";

export default {
  name: "CheckboxInput",
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
    return {
      localVal: false,
    };
  },
  computed: {
    ...computedRules,
    ...computedAttachments,
  },
  methods: {
    ...commonMethods,
    ...attachmentMethods,

    async onInputLocal(val) {
      this.localVal = val;
      this.$refs.input.validate();
      await this.onInput(val);
    },
  },
  beforeMount() {
    this.localVal = this.rest.value;
  },

  mounted() {
    onMountCommon(this, this.rest);
    if (this.rest.readonly) {
      this.$refs.checkbox?.$el?.classList.add("readonly");
      this.$refs.readonlyWrap?.classList.add("readonlyWrap");
    }
  },
};
</script>

<style>
.fb-field-checkbox .readonly {
  pointer-events: none;
  opacity: 0.65;
}
.readonlyWrap .q-field__native.row {
  cursor: pointer;
}
</style>
