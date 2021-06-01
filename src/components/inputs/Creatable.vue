<template>
  <div
    class="q-gutter-md col fb-field-select"
    v-if="rest.visible"
    ref="iWrapper"
  >
    <q-select
      v-bind="rest"
      :rules="rules"
      :options="[]"
      use-chips
      use-input
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add-unique"
      class="fb-field-content"
      ref="input"
      @input-value="onOptionInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ rest.createOptionMsg || "Введите значение и нажмите 'enter'" }}
          </q-item-section>
        </q-item>
      </template>
      <!-- Attachments -->
      <template v-slot:before>
        <Attachment :config="outerLeft" :f="outerLeftClick" />
      </template>
      <template v-slot:prepend v-if="innerLeft">
        <Attachment :config="innerLeft" :f="innerLeftClick" />
      </template>
      <template v-slot:append v-if="innerRight">
        <Attachment :config="innerRight" :f="innerRightClick" />
      </template>
      <template v-slot:after>
        <Attachment :config="outerRight" :f="outerRightClick" />
      </template>
    </q-select>
  </div>
</template>

<script>
import Attachment from "src/components/helpers/Attachment";
import {
  attachmentMethods,
  commonMethods,
  computedAttachments,
  computedRules,
  onMountCommon,
} from "./common";
import { fbGlobal } from "src/arguments";

// function simpleOptions(ops) {
//   if (!ops?.length) return [];
//   if (typeof ops[0] === "string") return ops;
//   if (ops[0].id) return ops.map((option) => option.id);
//   if (ops[0].value) return ops.map((option) => option.value);
// }

export default {
  name: "Creatable",
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
    return {};
  },
  computed: {
    ...computedRules,
    ...computedAttachments,
    // localOptions(){
    //   return simpleOptions(this.rest.options)
    // }
  },
  methods: {
    ...commonMethods,
    ...attachmentMethods,
    async onOptionInput(val) {
      if (this.rest?.onKeyDown) {
        await this.rest.onKeyDown(fbGlobal, this, val);
      }
    },
  },
  mounted() {
    onMountCommon(this, this.rest);
  },
};
</script>

<style>
</style>
