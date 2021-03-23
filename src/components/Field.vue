<template>
  <div class="col fb-field-wrap q-mx-md">
    <div class="column fb-field">
      <SimpleInput
        v-if="inputType === 'simple'"
        :keyName="fieldInfo.key"
      />
    </div>
  </div>
</template>

<script>
import SimpleInput from "./inputs/SuperSimp";
import { fbGlobal } from "src/arguments";

export default {
  name: "FieldSorter",
  data() {
    return {
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

  },
};
</script>

<style>
</style>