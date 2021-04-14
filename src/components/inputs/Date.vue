<template>
  <div v-if="rest.visible">
    <q-input :value="rest.value" />
    <div v-if="!rest.withInput" class="q-gutter-md">
      <p class="text-subtitle1 q-mb-none">{{ rest.label }}</p>
      <CalendarInput
        :label="rest.label"
        :keyName="keyName"
        :rest="rest"
        :class="rest.class + ' input-' + keyName"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <div v-else class="q-gutter-md">
      <q-input
        @input="onTextInput"
        :value="inputValue"
        :mask="rest.inputMask || textInputMask"
        :rules="rules"
        :label="rest.label"
        :clearable="rest.clearable"
        :clear-icon="rest['clear-icon']"
        :class="rest.class + ' input-' + keyName"
        ref="input"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <CalendarInput
                :keyName="keyName"
                :rest="rest"
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
import CalendarInput from "./Calendar";
import { commonMethods } from "./common";
const { formatDate } = date;
export default {
  name: "DateInput",
  components: {
    CalendarInput,
  },
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
      rules: this.dateRules(),
      inputValue: "",
    };
  },
  computed: {
    textInputMask() {
      let mask = "";
      mask = this.rest.range ? "##.##.#### - ##.##.####" : "##.##.####";
      if (this.rest.localization === "ru") return mask;
      if (this.rest.localization === "en") {
        mask = this.rest.range ? "####/##/## - ####/##/##" : "####/##/##";
      }
      return mask;
    },
  },
  methods: {
    ...commonMethods,

    async onInput(val, updateTextInput = true) {
      let cb;
      let finalVal = val;
      let inputVal = val;

      if (this.rest?.onInput) {
        cb = await this.rest.onInput(fbGlobal, this, val);
      }

      if (typeof val === "object" && val?.from && val.to) {
        inputVal = val.from + " - " + val.to;
      }

      this.rest.value = finalVal;
      if (updateTextInput) this.inputValue = inputVal;

      if (typeof cb === "function") await cb(fbGlobal, this, val);
    },
    async onTextInput(val) {
      if (!this.rest.range) return await this.onInput(val);
      // Case reset on range value
      if (!val) {
        this.inputValue = ""
        return await this.onInput("", false);
      }
      // Case valid length of range value provided
      if (val.length === 23) {
        const vals = val.split(" - ");
        return await this.onInput({ from: vals[0], to: vals[1] }, false);
      }
    },
    dateRules() {
      let res = this.rest.rules || [];
      if (this.rest.required && !this.rest.range) {
        res = [
          (dateString) =>
            (dateString.split(".")[0] < 32 &&
              dateString.split(".")[1] < 13 &&
              dateString.split(".")[2] > 1900) ||
            this.rest.requiredMessage ||
            "Incorrect date",
        ];
      } else if (this.rest.required) {
        res = [
          (rangeObject) =>
            (rangeObject.from.split(".")[0] < 2 &&
              rangeObject.from.split(".")[1] < 13 &&
              rangeObject.from.split(".")[2] > 1900 &&
              rangeObject.to.split(".")[0] < 32 &&
              rangeObject.to.split(".")[1] < 13 &&
              rangeObject.to.split(".")[2] > 1900) ||
            this.rest.requiredMessage ||
            "Incorrect date",
        ];
      }
      console.log(res[0]);
      return res;
    },
  },
  beforeMount() {
    const field = this.rest;
    field.withInput ??= true;
    this.inputValue = this.rest.value;
  },
};
</script>

<style>
</style>
