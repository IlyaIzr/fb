<template>
<div class="fb-service-visibility-trigger col" :key="visibleTrigger" :style="!fieldInfo.visible && 'display: none'">
  <div
    v-if="fieldInfo.visible && inputType !== 'button'"
    
    :class="
      'fb-field-container col ' + `${!fieldInfo.multiKey ? ' q-mx-md' : ''}`
    "
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
      <File
        v-if="inputType === 'file'"
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
  <div v-else-if="inputType === 'button'">
    <Button
      v-if="inputType === 'button'"
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
import Date from "./inputs/Date";
import Checkbox from "./inputs/Checkbox";
import File from "./inputs/File";
import Html from "./helpers/Html";
import Editor from "./inputs/Editor";
import Button from "./helpers/Button";
import Attachment from "./helpers/Attachment";
import { fbGlobal, prevVisibility } from "src/arguments";
import { allowedTypes, simpleTypes, validator } from "./inputs/validator";

export default {
  name: "FieldSorter",
  data() {
    return {
      trigger: 1,
      visibleTrigger: 1,
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
    Button,
    File
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

        // Why have i aded this? It ruins multiple.value bonding
        // if (field.watcher) {
        //   res = field;
        //   return res;
        // }

        // Assignment of reactive wrap
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
    rest: {
      handler(field) {
        console.log(prevVisibility[this.fieldInfo.key], field.visible);
        // console.log("rerest", this.fieldInfo.key, { ...a }, { ...b });
        if (field.visible !== prevVisibility[this.fieldInfo.key]) {console.log('retrigger happend');this.visibleTrigger += 1;}
        prevVisibility[this.fieldInfo.key] = field.visible
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