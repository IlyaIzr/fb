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
        :rules="rules"
        :label="rest.label"
        :clearable="rest.clearable"
        :clear-icon="rest['clear-icon']"
        :disable="rest.disable"
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
import { commonMethods, computedRules, onMountCommon } from "./common";
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
      inputValue: "",
    };
  },
  computed: {
    ...computedRules,
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
