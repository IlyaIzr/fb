<template>
  <div class="col fb-field-wrap q-mx-md">
    <div class="column fb-field">
      <SimpleInput
        v-if="inputType === 'simple'"
        :keyName="fieldInfo.key"
        :fieldInfo="fieldInfo"
      />
    </div>
  </div>
</template>

<script>
import SimpleInput from "./inputs/SimpleInput";
import { valueStore } from "../store";
import { fbGlobal } from "src/arguments";

export default {
  name: "FieldSorter",
  data() {
    return {
      fbGlobal,
    };
  },
  props: {
    fieldInfo: {
      type: Object,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    rowNumber: {
      type: Number,
      required: true,
    },
  },
  components: {
    SimpleInput,
  },
  computed: {
    inputType() {
      const type = this.fieldInfo.type;
      let inputType;
      const simpleTypes = [
        "text",
        "password",
        "textarea",
        "email",
        "search",
        "tel",
        "number",
        "url",
        "timedate",
      ];
      if (simpleTypes.find((value) => value === type)) {
        inputType = "simple";
        return inputType;
      }
    },
    childField() {
      let res = {};
      res = fbGlobal.fields[this.fieldInfo.key];
      return res;
    },
  },
  beforeMount() {
    // Additional rest config, unified for all inputs
    // this.fieldInfo.ref = "input";
    // this.fieldInfo.name = this.fieldInfo.key;
    // this.fieldInfo["clear-icon"] = "close";
    // this.fieldInfo.required =
    //   this.fieldInfo.required === undefined ? true : this.fieldInfo.required;
    // this.fieldInfo.clearable =
    //   this.fieldInfo.clearable === undefined ? true : this.fieldInfo.clearable;
    // this.fieldInfo.visible =
    //   this.fieldInfo.visible === undefined ? true : this.fieldInfo.visible;
    valueStore.updateKeyValue(this.fieldInfo.key, this.fieldInfo.value);

    //  fbGlobal
    const self = this;
    fbGlobal.rows[this.rowNumber][this.order] = {
      component: self,
      get element() {
        return this?.component?.$el;
      },
      field: {
        get component() {
          return self.$children[0];
        },
        get element() {
          return this?.component?.$el;
        },
      },
    };

    // New fields turbo
    fbGlobal.newFields = fbGlobal.newFields || {};

    Object.entries(fbGlobal.fields).forEach(([key, config]) => {
      if (!fbGlobal.newFields[key])
        Object.defineProperty(fbGlobal.newFields, key, {
          get() {
            return this["_" + key];
          },
          set(conf) {
            if (!this["_" + key]) this["_" + key] = conf;
            else this["_" + key] = { ...this["_" + key], ...conf };
            // console.log("reconfigured", fbGlobal?.newFields?.["_" + key]);
          },
        });
      // initial config setting
      fbGlobal.newFields[key] = config;
    });
  },
  // updated(){
  //   console.log('Field has been updated');
  // },
  watch: {
    // Solution: pass field settings as props - drawbacks - setter description on wrong level
    // "childField": {
    //   handler(val) {
    //     console.log("SOME HAPPS", val.key, val);
    //   },
    //   deep: true,
    // },
  },
};
</script>

<style>
</style>