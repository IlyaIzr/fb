<template>
  <div
    :class="
      'fb-service-visibility-trigger' +
      (smallFields.has(inputType) ? '' : ' col')
    "
    :key="visibleTrigger"
    :style="!fieldInfo.visible && 'display: none'"
  >
    <div
      v-if="fieldInfo.visible && !smallFields.has(inputType)"
      :class="
        'fb-field-container col ' + `${!fieldInfo.multiKey ? ' q-mx-md' : ''}`
      "
    >
      <div class="fb-field row q-my-sm">
        <SimpleInput
          v-if="inputType === 'simple'"
          :keyName="fieldInfo.key"
          :rest="rest"
        />
        <Creatable
          v-if="inputType === 'creatable'"
          :keyName="fieldInfo.key"
          :rest="rest"
        />
        <Select
          v-else-if="inputType === 'select'"
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
        <Date
          v-if="inputType === 'date'"
          :keyName="fieldInfo.key"
          :rest="rest"
        />
        <File
          v-if="inputType === 'file'"
          :keyName="fieldInfo.key"
          :rest="rest"
        />
        <Html
          v-if="inputType === 'html'"
          :keyName="fieldInfo.key"
          :rest="rest"
        />
        <Editor
          v-if="inputType === 'editor'"
          :keyName="fieldInfo.key"
          :rest="rest"
        />

        <div v-if="inputType === 'err'">
          err, wrong type: {{ fieldInfo.type }}
        </div>
      </div>
    </div>
    <div v-else-if="inputType === 'button'" class="fb-field-button-container">
      <Button
        v-if="inputType === 'button'"
        :keyName="fieldInfo.key"
        :rest="rest"
      />
    </div>
    <div
      v-else-if="inputType === 'checkbox'"
      class="fb-field-checkbox-container"
    >
      <Checkbox
        v-if="inputType === 'checkbox'"
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
import Creatable from "./inputs/Creatable";
import Slider from "./inputs/Slider";
import Date from "./inputs/Date";
import Checkbox from "./inputs/Checkbox";
import File from "./inputs/File";
import Html from "./helpers/Html";
import Editor from "./inputs/Editor";
import Button from "./helpers/Button";
import { fbGlobal, prevVisibility } from "src/arguments";
import {
  allowedTypes,
  simpleTypes,
  smallFields,
  validator,
} from "./inputs/validator";

export default {
  name: "FieldSorter",
  data() {
    return {
      trigger: 1,
      visibleTrigger: 1,
      smallFields: smallFields,
              // I dont know why, but it's working...
      proxied: 0,
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
    Button,
    File,
    Creatable,
  },
  computed: {
    inputType() {
      let type = ""; // here you go stupid vetur. No other reason for that reassignment
      type = this.fieldInfo.type;
      if (simpleTypes.find((value) => value === type)) {
        return "simple";
      }
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
        // I dont know why, but it's working...
        if (this.proxied > 1) return field;

        // Assignment of reactive wrap
        const reactiveFieldWrap = {
          set: function (field, prop, value) {
            if (prop === "watcher") return true;
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

        const reactive = new Proxy(field, reactiveFieldWrap);
        fbGlobal.fields[i.multiKey].fields[i.multiIndex][i.key] = reactive;
        res = reactive;
        this.proxied += 1;
        return res;
      }

      const reactiveFieldWrap = {
        set: function (field, prop, value) {
          if (prop === "watcher") return true;
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
  methods: {},
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
      handler(field) {
        // console.log(prevVisibility[this.fieldInfo.key], field.visible);
        // console.log("rerest", this.fieldInfo.key, { ...a }, { ...b });
        if (field.visible !== prevVisibility[this.fieldInfo.key])
          this.visibleTrigger += 1;
        prevVisibility[this.fieldInfo.key] = field.visible;
      },
      deep: true,
    },
    // trigger() {
    //   console.log("trigger happend");
    // },
  },
};
</script>

<style>
.fb-form .fb-row .fb-field-container {
  min-width: 185px;
}
.fb-field-label {
  font-size: 1.2em;
  margin: 16px;
}
.fb-field {
  flex-direction: column;
}
/* .fb-field input{
  height: 61px;
} */
</style>