<template>
  <q-date
    ref="calendar"
    v-bind="rest"
    today-btn
    @input="onInput"
    :mask="mask"
    class="fb-field-content"
    :value="rest.value !== undefined ? rest.value : today"
  >
    <div v-if="rest.withInput" class="row items-center justify-end">
      <q-btn v-close-popup label="Close" color="primary" flat ref="btn" />
    </div>
    <template v-slot:default class="q-ma-none">
      <q-icon name="cancel" @click="onInput('')" class="cursor-pointer" />
      <q-field
        v-if="!rest.withInput"
        ref="calendarCheck"
        :value="textInputValue"
        :rules="rules"
        borderless
        dense
        class="fb-field-hint"
      />
    </template>
  </q-date>
</template>

<script>
import { fbGlobal } from "src/arguments";
import { wrapedUserRules } from "../inputs/common";
export default {
  name: "CalendarInput",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: {
      type: Object,
      required: true,
    },
    textInputValue: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    rules() {
      let res = wrapedUserRules(this.rest.rules || [], fbGlobal, "TODO");
      const errMsg = this.rest.requiredMessage || "Incorrect date";
      const noRange = (str) => {
        if (!str) return errMsg;
        const [day, month, year] = str.split("."); // Watch mask
        if (day < 32 && month < 13 && year > 1900 && year < 2222) return true;
        return errMsg;
      };
      const range = (str) => {
        const errMsg = this.rest.requiredMessage || "Incorrect date";
        if (!str || str.length < 23) return errMsg;
        const [from, to] = str.split(" - ");
        let [day, month, year] = from.split(".");
        if (day > 31 || month > 12 || year < 1900) return errMsg;
        [day, month, year] = to.split(".");
        if (day > 31 || month > 12 || year < 1900) return errMsg;
        return true;
      };
      if (this.rest.required && !this.rest.range) {
        res = [noRange, ...res];
      } else if (this.rest.required) {
        res = [range, ...res];
      }
      return res;
    },
    mask() {
      let mask = "";
      if (this.rest.calendarMask) return this.rest.calendarMask;
      mask = "DD.MM.YYYY";
      if (this.rest.localization === "ru") return mask;
      if (this.rest.localization === "en") {
        mask = "YYYY.MM.DD";
      }
      return mask;
    },
    today() {
      return new Date().toLocaleDateString("ru");
    },
  },
  methods: {
    async onInput(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style>
</style>
