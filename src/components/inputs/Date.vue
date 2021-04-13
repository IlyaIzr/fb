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
        :value="rest.value"
        :mask="rest.inputMask || textInputMask"
        :rules="rules"
        :key="fuckenMask"
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
      fuckenMask: 1,
      rules: this.dateRules(),
    };
  },
  computed: {
    textInputMask() {
      let mask = "";
      mask = this.rest.range ? "##.##.#### - ##.##.####" : "##.##.####";
      if (this.rest.localization === "ru") return mask;
      else if (this.rest.localization === "en") {
        mask = this.rest.range ? "####/##/## - ####/##/##" : "####/##/##";
      }
      return mask;
    },
  },
  methods: {
    ...commonMethods,

    async onInput(val) {
      // this.fuckenMask += 1;
      let cb;
      let finalVal = val;

      if (this.rest?.onInput) {
        cb = await this.rest.onInput(fbGlobal, this, val);
      }

      if (typeof val === "object" && val && val.start && val.finish) {
        finalVal = {
          from: val.start,
          to: val.finish,
        };
      }
      console.log("higher date input", finalVal);

      this.rest.value = finalVal;
      this.$nextTick(() => {
        this.$forceUpdate();
      });

      if (typeof cb === "function") await cb(fbGlobal, this, val);
    },
    async onTextInput(val) {
      console.log("higher date text input", val);
      let finalVal = val;
      if (val && this.rest.range) {
        const dates = val.split(" - ");
        finalVal = { from: dates[0], to: dates[1] };
      }
      let cb;
      if (this.rest?.onInput) {
        cb = await this.rest.onInput(fbGlobal, this, val);
      }
      
      this.rest.value = finalVal;
      this.$nextTick(() => {
        this.$forceUpdate();
      });

      if (typeof cb === "function") await cb(fbGlobal, this, val);
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
  mounted() {
    // if (this.rest.withInput || this.rest.withInput === undefined)
    //   this.validate = this.$refs.input.validate;
    // else this.validate = this.$children[0].$refs.calendarCheck;
    // if (this.rest.hasOwnProperty("visible") && !this.rest.visible) {
    //   this.$parent.$el.parentNode.className += " hidden";
    // }
  },
  beforeMount() {
    const field = this.rest;
    field.withInput ??= true;
  },
};
</script>

<style>
</style>
