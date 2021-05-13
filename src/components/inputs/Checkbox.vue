<template>
  <div class="q-gutter-md col fb-field-checkbox" v-if="rest.visible">
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
import { commonMethods, computedAttachments, computedRules, onMountCommon } from "./common";
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
    ...computedRules
  },
  methods: {
    ...commonMethods,
    ...computedAttachments,

    async onInputLocal(val) {
      this.localVal = val;
      this.$refs.input.validate();
      await this.onInput(val);
    },
  },
  beforeMount() {
    this.localVal = this.rest.value;
  },
  
  mounted(){
    onMountCommon(this, this.rest)
  },
};
</script>

<style>
</style>
