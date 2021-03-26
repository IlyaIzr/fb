<template>
  <div class="col fb-field-wrap q-mx-md">
    <div class="column fb-field">
      <SimpleInput
        v-if="inputType === 'simple'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Multiple v-else-if="inputType === 'multiple'" :keyName="fieldInfo.key" />
    </div>
  </div>
</template>

<script>
import SimpleInput from "./inputs/SuperSimp";
import Multiple from "./inputs/MSimp";
import { fbGlobal } from "src/arguments";

export default {
  name: "FieldSorter",
  data() {
    return {};
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
    Multiple,
  },
  computed: {
    inputType() {
      let type = ""; // here you go stupid vetur. No other reason for that reassignment
      type = this.fieldInfo.type;
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
        return "simple";
      }
      switch (type) {
        case "multiple":
          return type;
      }
    },

    rest() {
      let res = {};
      if (this.fieldInfo.multiKey) {
        res = fbGlobal.fields[this.fieldInfo.multiKey].fields[this.fieldInfo.multiIndex][this.fieldInfo.key];
      } else res = fbGlobal.fields[this.fieldInfo.key];
      // console.log({...res});
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