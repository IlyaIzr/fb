<template>
  <div v-if="rest.visible">
    <!-- No input -->
    <div v-if="!rest.withInput" class="q-gutter-md col fb-field-date">
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
    <div v-else class="q-gutter-md col fb-field-date">
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
        <!-- Attachments -->
        <template v-slot:before>
          <Attachment :config="outerLeft" :f="outerLeftClick" />
        </template>
        <template v-slot:prepend>
          <Attachment
            v-if="innerLeft"
            :config="innerLeft"
            :f="innerLeftClick"
          />
          <q-icon v-else name="event" class="cursor-pointer">
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

        <template v-slot:append v-if="innerRight">
          <Attachment :config="innerRight" :f="innerRightClick" />
        </template>
        <template v-slot:after>
          <Attachment :config="outerRight" :f="outerRightClick" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import CalendarInput from "src/components/helpers/Calendar";
import {
  attachmentMethods,
  commonMethods,
  computedAttachments,
  computedRules,
  onMountCommon,
} from "./common";
import Attachment from "src/components/helpers/Attachment";
function stringdDate(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (val.from) return val.from + " - " + val.to;
  return "";
}
export default {
  name: "DateInput",
  components: {
    CalendarInput,
    Attachment,
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
    ...computedAttachments,
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
    ...attachmentMethods,

    async onInputLocal(val) {
      let finalVal = val;
      let inputVal = val;

      if (typeof val === "object" && val?.from && val.to) {
        inputVal = val.from + " - " + val.to;
      }

      this.inputValue = stringdDate(inputVal);
      await this.onInput(finalVal);
    },
    async onTextInput(val) {
      console.log('%c⧭', 'color: #00e600', val)
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
  mounted() {
    onMountCommon(this, this.rest);
  },
};
</script>

<style>
</style>
