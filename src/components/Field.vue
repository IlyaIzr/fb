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
        const fieldGlobal =
          fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key];

        const reactiveFieldWrap = {
          set: function (targetObj, prop, value) {
            console.log("field level ractivity", prop, value, { ...targetObj });
            // Make changes and additions observable
            if (!targetObj.watcher) targetObj.watcher = 1;
            targetObj.watcher += 1;
            self.trigger += 1;

            targetObj[prop] = value;

            return true;
          },
        };

        fieldGlobal.watcher = 1;
        const reactive = new Proxy(fieldGlobal, reactiveFieldWrap);
        fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key] = reactive;
        res = fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key];
      } else res = fbGlobal.fields[i.key];

      console.log({ ...res }, res.watcher);
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
    rest: {
      handler() {
        console.log("rerest", this.fieldInfo.key);
      },
      deep: true,
    },
    trigger() {
      console.log("trigger happend");
    },
  },
};
</script>

<style>
</style>