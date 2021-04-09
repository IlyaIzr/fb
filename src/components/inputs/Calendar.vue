<template>
  <q-date
    ref="calendar"
    v-bind="rest"
    today-btn
    @input="onInput"
  >
    <!-- <div v-if="rest.withInput" class="row items-center justify-end">
      <q-btn v-close-popup label="Close" color="primary" flat ref="btn" />
    </div>
    <template v-slot:default class="q-ma-none">
      <q-icon name="cancel" @click="onInput('')" class="cursor-pointer" />
      <q-field
        ref="calendarCheck"
        :value="rest.range ? rangeValues : rest.value"
        :rules="rules"
        borderless
        dense
      />
    </template> -->
  </q-date>
</template>

<script>
import { commonMethods } from "./common";
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
  },
  data() {
    return {};
  },
  computed: {
    rules() {
      let res = [];
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
      return res;
    },
  },
  methods: {
    ...commonMethods,
  async onInput(val) {
    console.log(val, 'here');
    let cb;
    if (this.rest?.onInput) {
      cb = await this.rest.onInput(fbGlobal, this, val);
    }
    this.rest.value = val;

    if (typeof cb === "function") await cb(fbGlobal, this, val);
  },
  },
};
</script>

<style>
</style>
