<template>
  <div class="col fb-field-wrap q-mx-md">
    <div class="column fb-field">
      <SimpleInput
        v-if="inputType === 'simple'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Multiple
        v-else-if="inputType === 'multiple'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
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
      const self = this;
      if (!this.trigger) return null;

      const i = this.fieldInfo;
      if (i.multiKey) {
        const field = fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key];

        if (field.watcher) {
          res = field;
          return res;
        }

        // Case first time assignment of reactive wrap
        const reactiveFieldWrap = {
          set: function (targetObj, prop, value) {
            // Make changes and additions observable
            targetObj.watcher += 1;
            // And reactive
            self.trigger += 1;

            targetObj[prop] = value;

            return true;
          },
        };

        field.watcher = 1;
        const reactive = new Proxy(field, reactiveFieldWrap);
        fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key] = reactive;
        res = field;
      } else res = fbGlobal.fields[i.key];

      // console.log({ ...res }, res.watcher);
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