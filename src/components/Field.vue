<template>
  <div
    :class="
      'fb-field-container col ' + `${!fieldInfo.multiKey ? ' q-mx-md' : ''}`
    "
    style="min-width: 160px"
  >
    <div class="fb-field row q-my-sm">
      <!-- Outer prefix -->
      <Attachment :config="rest.outerLeft" :f="outerLeftClick" />

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
        v-if="inputType === 'multiple'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Slider
        v-if="inputType === 'slider'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Date v-if="inputType === 'date'" :keyName="fieldInfo.key" :rest="rest" />
      <Checkbox
        v-if="inputType === 'checkbox'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
      <Html v-if="inputType === 'html'" :keyName="fieldInfo.key" :rest="rest" />
      <Editor
        v-if="inputType === 'editor'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />

      <div v-if="inputType === 'err'">
        err, wrong type: {{ fieldInfo.type }}
      </div>

      <Attachment :config="rest.outerRight" :f="outerRightClick" />
    </div>
  </div>
</template>

<script>
import SimpleInput from "./inputs/Simple";
import Multiple from "./inputs/Multiple";
import Select from "./inputs/Select";
import Slider from "./inputs/Slider";
import Date from "./inputs/Date";
import Checkbox from "./inputs/Checkbox";
import Html from "./inputs/Html";
import Editor from "./inputs/Editor";
import Attachment from "./inputs/Attachment";
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
    Date,
    Checkbox,
    Html,
    Editor,
    Attachment,
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
        "number",
        "time",
        "dateNative",
      ];
      if (simpleTypes.find((value) => value === type)) {
        return "simple";
      }
      const allowedTypes = new Set([
        "select",
        "multiple",
        "slider",
        "date",
        "checkbox",
        "html",
        "editor",
      ]);
      if (allowedTypes.has(type)) return type;
      else return "err";
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

            const validated =
              field.type && validator[field.type]?.[prop]?.(value, field);
            if (validated !== undefined) value = validated;

            field[prop] = value;
            if (
              prop === "value" &&
              fbGlobal.fields[i.multiKey].value?.[i.multiIndex]
            )
              fbGlobal.fields[i.multiKey].value[i.multiIndex][i.key] = value;

            return true;
          },
        };

        field.watcher = 1;
        const reactive = new Proxy(field, reactiveFieldWrap);
        fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key] = reactive;
        res = reactive;
        return res;
      }

      const reactiveFieldWrap = {
        set: function (field, prop, value) {
          // Make changes and additions observable
          field.watcher += 1;
          // And reactive
          self.trigger += 1;

          const validated =
            field.type && validator[field.type]?.[prop]?.(value, field);
          if (validated !== undefined) value = validated;

          field[prop] = value;
          return true;
        },
      };
      res = new Proxy(fbGlobal.fields[i.key], reactiveFieldWrap);

      // console.log({ ...res }, res.key, {...res.value});
      return res;
    },
  },
  methods: {
    async outerLeftClick() {
      const f = this.rest.outerLeft?.onClick;
      if (f) await f?.(fbGlobal, this.$children[0], this.rest);
    },
    async outerRightClick() {
      const f = this.rest.outerLeft?.onClick;
      if (f) await f?.(fbGlobal, this.$children[0], this.rest);
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
.fb-field-label {
  font-size: 1.2em;
  margin: 16px;
}
</style>