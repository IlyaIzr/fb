<template>
  <div class="col fb-field-wrap q-mx-md">
    <div class="column fb-field">
      <SimpleInput
        v-if="inputType === 'simple'"
        :keyName="fieldInfo.key"
        :fieldInfo="fieldInfoData"
      />
    </div>
  </div>
</template>

<script>
import SimpleInput from "./inputs/SimpleInput";
import { fbGlobal } from "src/arguments";

export default {
  name: "FieldSorter",
  data() {
    return {
      fbGlobal,
      fieldInfoData: this.fieldInfo,
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
    // childField() {
    //   let res = {};
    //   res = fbGlobal.fields[this.fieldInfo.key];
    //   return res;
    // },
  },
  beforeMount() {

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
    // Make a method, call before mount and from watcher handler
    fbGlobal.newFields = fbGlobal.newFields || {};

    Object.entries(fbGlobal.fields).forEach(([key, config]) => {
      if (!fbGlobal.newFields[key])
        Object.defineProperty(fbGlobal.newFields, key, {
          get() {
            return this["_" + key];
          },
          set(conf) {
            if (!this["_" + key]) this["_" + key] = {};
            const res = { ...this["_" + key], ...conf };
            this["_" + key] = res;
            self.fieldInfoData = res;
            // console.log(key, { ...res });  //works as expected
          },
        });
      // initial config setting
      fbGlobal.newFields[key] = config;
    });
  },
  watch: {
    // "fieldInfo": {
    //   handler(val) {
    //     console.log("field info prop changed", val);
    //   },
    //   deep: true,
    // },
  },
};
</script>

<style>
</style>