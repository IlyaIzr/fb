<template>
  <div class="q-gutter-md col fb-field-simple" v-if="rest.visible">
    <q-input
      v-bind="rest"
      @focus="onFocus"
      @input="onInput"
      :rules="rules"
      ref="input"
      class="fb-field-content"
    >
      
      <template v-slot:before>
        <Attachment :config="outerLeft" :f="outerLeftClick" />
      </template>
      <template v-slot:prepend v-if="innerLeft">
        <Attachment :config="innerLeft" :f="innerLeftClick" />
      </template>
      <template v-slot:append v-if="innerRight || isPassword">
        <Attachment :config="innerRight" :f="innerRightClick" />
        <q-icon
          v-if="isPassword"
          :name="isPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="pSwitch"
        />
      </template>      
      <template v-slot:after>
        <Attachment :config="outerRight" :f="outerRightClick" />
      </template>
    </q-input>
  </div>
</template>

<script>
import Attachment from "src/components/helpers/Attachment";
import { attachmentMethods, commonMethods, computedAttachments, computedRules, onMountCommon } from "./common";

export default {
  name: "SimpleInput",
  components: { Attachment },
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: Object,
  },
  data() {
    return {
      isPassword: this.rest.type === "password",
    };
  },
  computed: {
    ...computedRules,
    ...computedAttachments
  },
  methods: {
    ...commonMethods,
    ...attachmentMethods,
    pSwitch() {
      this.rest.type = this.rest.type === "text" ? "password" : "text";
    },
  },
  beforeMount() {
    const field = this.rest;
    // if (field.type === "text") field.autogrow ??= true;
    if (field.type === "dateNative") field.type = "date";
    field.autocomplete ??= true
  },
  mounted(){
    onMountCommon(this, this.rest)
  },
  watch: {
    // rest: {
    //   handler() {
    //     console.log("rerest", this.rest.key);
    //   },
    //   deep: true,
    // },
    // trigger() {
    //   console.log("trigger happend");
    // },
  },
};
</script>

<style>
</style>