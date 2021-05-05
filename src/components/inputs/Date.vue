<template>
  <div v-if="rest.visible">
    <!-- No input -->
    <div v-if="!rest.withInput" class="q-gutter-md">
      <h5 class="fb-field-label text-subtitle1 q-mb-none">{{ rest.label }}</h5>
      <CalendarInput
        :label="rest.label"
        :keyName="keyName"
        :textInputValue="inputValue"
        :rest="rest"
        :class="rest.class + ' input-' + keyName"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <!-- With input -->
    <div v-else class="q-gutter-md">
      <q-input
        @input="onTextInput"
        :value="inputValue"
        :mask="rest.inputMask || textInputMask"
        :rules="inputRules"
        :label="rest.label"
        :clearable="rest.clearable"
        :clear-icon="rest['clear-icon']"
        ref="input"
        class="fb-field-content"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <CalendarInput
                :keyName="keyName"
                :rest="rest"
                :textInputValue="inputValue"
                @input="onInputLocal"
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
import CalendarInput from "src/components/helpers/Calendar";
import { commonMethods, onMountCommon, wrapedUserRules } from "./common";
import { fbGlobal } from "src/arguments";
function stringdDate(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (val.from) return val.from + " - " + val.to;
  return "";
}
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
      inputRules: this.getInputRules(),
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

    async onInputLocal(val) {
      let finalVal = val;
      let inputVal = val;


      if (typeof val === "object" && val?.from && val.to) {
        inputVal = val.from + " - " + val.to;
      }

      await this.onInput(finalVal)
      this.inputValue = stringdDate(inputVal);
    },
    async onTextInput(val) {
      if (!this.rest.range) return await this.onInputLocal(val);
      // Case reset on range value
      if (!val) {
        this.inputValue = "";
        return await this.onInputLocal("");
      }
      return await this.onInputLocal({
        from: val.substr(0, 10),
        to: val.substr(13, 10),
      });
    },
    getInputRules() {
      let res = wrapedUserRules(this.rest.rules || [], fbGlobal, "TODO"); //metavalue
      // Delimeter
      // const d = this.rest.inputMask?.[2] || ".";
      if (this.rest.required && !this.rest.range) {
        res = [
          (dateString) =>
            (dateString.split(".")[0] < 32 &&
              dateString.split(".")[1] < 13 &&
              dateString.split(".")[2] > 1900) ||
            this.rest.requiredMessage ||
            "Incorrect date",
          ...res,
        ];
      } else if (this.rest.required) {
        const range = (str) => {
          const obj = this.rest.value;
          // !console.log("im runing", this.rest.value, str);
          const errMsg = this.rest.requiredMessage || "Incorrect date";
          if (!str || str.length < 23) return errMsg;
          const { from, to } = obj;
          let [day, month, year] = from.split(".");
          if (day > 31 || month > 12 || year < 1900) return errMsg;
          [day, month, year] = to.split(".");
          if (day > 31 || month > 12 || year < 1900) return errMsg;
          return true;
        };
        res = [range, ...res];
      }
      return res;
    },
  },
  beforeMount() {
    const field = this.rest;
    field.withInput ??= true;
    this.inputValue = stringdDate(this.rest.value);
  },
  mounted(){
    onMountCommon(this, this.rest)
  },
};
</script>

<style>
</style>
