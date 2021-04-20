<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <q-input
      v-bind="rest"
      @focus="onFocus"
      @input="onInput"
      :rules="rules"
      ref="input"
      class="fb-field-content"
    >
      <template v-slot:prepend v-if="innerLeft">
        <q-icon v-if="innerLeft.type === 'icon'" v-bind="innerLeft" />
        <q-avatar v-else-if="innerLeft.type === 'img'">
          <img v-bind="innerLeft" />
        </q-avatar>
        <q-btn
          v-else-if="innerLeft.type === 'button'"
          round
          dense
          flat
          v-bind="innerLeft"
          @click="innerLeftClick"
        />
      </template>
      <template v-slot:append v-if="innerRight || isPassword">
        <div v-if="innerRight">
          <q-icon v-if="innerRight.type === 'icon'" v-bind="innerRight" />
          <q-avatar v-else-if="innerRight.type === 'img'">
            <img v-bind="innerRight" />
          </q-avatar>
          <q-btn
            v-else-if="innerRight.type === 'button'"
            round
            dense
            flat
            v-bind="innerRight"
            @click="innerRightClick"
          />
        </div>
        <q-icon
          v-if="isPassword"
          :name="isPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="pSwitch"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import { checkRulesBool, commonMethods, strMethods } from "./common";

export default {
  name: "SimpleInput",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: Object,
  },
  data() {
    return {
      rules: checkRulesBool(
        this.rest.rules,
        this.rest.required,
        this.rest.requiredMessage
      ),
      isPassword: this.rest.type === "password",
    };
  },
  computed: {
    innerLeft() {
      let conf = {};
      if (!this.rest.innerLeft) return null;
      conf = this.rest.innerLeft;
      if (!conf.type) return null;
      return conf;
    },
    innerRight() {
      let conf = {};
      if (!this.rest.innerRight) return null;
      conf = this.rest.innerRight;
      if (!conf.type) return null;
      return conf;
    },
  },
  methods: {
    ...commonMethods,
    ...strMethods,
    async innerLeftClick() {
      if (this.innerLeft?.onClick)
        await this.innerLeft.onClick?.(fbGlobal, this, this.rest);
    },
    async innerRightClick() {
      if (this.innerRight?.onClick)
        await this.innerRight.onClick?.(fbGlobal, this, this.rest);
    },
    pSwitch() {
      this.rest.type = this.rest.type === "text" ? "password" : "text";
    },
  },
  beforeMount() {
    const field = this.rest;
    if (field.type === "text") field.autogrow ??= true;
    if (field.type === "dateNative") field.type = "date";
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