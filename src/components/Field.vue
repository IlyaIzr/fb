<template>
  <div class="col fb-field-wrap q-mx-md">
    <div class="column fb-field">
      <SimpleInput
        v-if="inputType === 'simple'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Select
        v-if="inputType === 'select'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Multiple
        v-else-if="inputType === 'multiple'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Slider
        v-if="inputType === 'slider'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Date
        v-if="inputType === 'date'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />

    </div>
  </div>
</template>

<script>
import SimpleInput from "./inputs/Simple";
import Multiple from "./inputs/Multiple";
import Select from "./inputs/Select";
import Slider from "./inputs/Slider";
import Date from './inputs/Date'
import { fbGlobal } from "src/arguments";
import { validator } from "./inputs/validator";

export default {
  name: "FieldSorter",
  data() {
    return {
      trigger: 1,
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
    Multiple,
    Select,
    Slider,
    Date
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
        case "select":
          return type;
      }
      switch (type) {
        case "multiple":
          return type;
      }      
      switch (type) {
        case "slider":
          return type;
      }
      switch (type) {
        case "date":
          return type;
      }

    },

    rest() {
      let res = {};
      const self = this;
      if (!this.trigger) return null;

      const i = this.fieldInfo;
      // Case multifield children
      if (i.multiKey) {
        const field = fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key];

        if (field.watcher) {
          res = field;
          return res;
        }

        // Case first time assignment of reactive wrap
        const reactiveFieldWrap = {
          set: function (field, prop, value) {
            // Make changes and additions observable
            field.watcher += 1;
            // And reactive
            self.trigger += 1;

            let validated =
              field.type && validator[field.type]?.[prop]?.(value, field);
            if (validated !== undefined) value = validated;

            field[prop] = value;

            return true;
          },
        };

        field.watcher = 1;
        const reactive = new Proxy(field, reactiveFieldWrap);
        fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key] = reactive;
        res = field;
      } else res = fbGlobal.fields[i.key];

      // console.log({ ...res }, res.key, {...res.value});
      return res;
    },
  },
  beforeMount() {
    //  fbGlobal
    // const self = this;
    // fbGlobal.rows[this.rowNumber][this.order] = {
    //   component: self,
    //   get element() {
    //     return this?.component?.$el;
    //   },
    //   field: {
    //     get component() {
    //       return self.$children[0];
    //     },
    //     get element() {
    //       return this?.component?.$el;
    //     },
    //   },
    // };
  },

  watch: {
    // rest: {
    //   handler() {
    //     console.log("rerest", this.fieldInfo.key);
    //   },
    //   deep: true,
    // },
    // trigger() {
    //   console.log("trigger happend");
    // },
  },
};
</script>

<style>
</style>