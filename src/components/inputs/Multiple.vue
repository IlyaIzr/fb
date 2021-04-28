<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <h5 class="fb-field-label">{{ rest.label }}</h5>

    <MultiMapper
      :multiRows="rows"
      :settings="{}"
      :multiKey="rest.key"
      :key="computeRawsTrigger"
      @remove="removeField"
    />

    <q-btn
      class="q-mr-md"
      size="sm"
      :label="addButton.text || '+'"
      :color="addButton.color || 'green'"
      :text-color="addButton.textColor"
      :disable="addButton.disabled"
      @click="addField"
    />
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import { fieldsToRows } from "src/components/toRows";
import { validator } from "./validator";
import MultiMapper from "src/components/MultiMapper";
import { onMountCommon } from './common';
export default {
  name: "MultipleInput",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    // TODO add reactivity for incoming rest.settings changes
    rest: Object,
  },
  components: {
    MultiMapper,
  },
  data() {
    return {
      computeRawsTrigger: 1,
      rows: [],
      stringUpdates: 1,
      addButton: fbGlobal.buttons?.multipleAdd || {},
    };
  },
  computed: {},
  methods: {
    computeRowsEffect() {
      const rows = fieldsToRows(
        this.rest.settings,
        fbGlobal.values?.[this.keyName],
        this.keyName,
        this.rest.value
      );
      this.rows = rows;
    },
    addField() {
      const obj = {};
      Object.keys(this.rest.settings).forEach((key) => (obj[key] = ""));
      this.rest.value.push(obj);
      this.redrawChildren();
    },
    removeField(index) {
      const newVals = [...this.rest.value];
      newVals.splice(index, 1);
      this.rest.value = newVals;
      this.redrawChildren();
    },
    redrawChildren() {
      this.computeRowsEffect();
      this.computeRawsTrigger += 1;
    },
    clear(){
      this.rest.value = []
    }
  },

  beforeMount() {
    const self = this;
    const field = fbGlobal.fields[this.keyName];
    if (!field.fields) field.fields = [];

    // console.log({ ...field });

    // Wrap settings with reactivity
    const redrawWrap = {
      set: function (field, prop, value) {
        let validated =
          field.type && validator[field.type]?.[prop]?.(value, field);
        if (validated !== undefined) value = validated;

        // console.log('changes simp setting');]
        self.stringUpdates = { field, prop, value };
        // console.log(field.key, 'change');
        field[prop] = value;

        return true;
      },
    };
    const s = fbGlobal.fields[this.keyName].settings;
    Object.keys(s).forEach((key) => {
      fbGlobal.fields[this.keyName].settings[key] = new Proxy(
        s[key],
        redrawWrap
      );
    });

    this.computeRowsEffect();

    // VALIDATION STUFF
    // Validate props for this specific input. Example: define select value
    //   Object.entries(field).forEach(([key, val]) => {
    //     let assignment;
    //     if (shouldEval(key, val)) {
    //       assignment = val(fbGlobal, this);
    //     } else assignment = val;

    //     // Assignment validation
    //     switch (key) {
    //       case "label":
    //         assignment &&= String(assignment);
    //         break;
    //     }
    //     field[key] = assignment;
    //   });
  },
  mounted(){
    onMountCommon(this, this.rest)
  },
  watch: {
    // They fire only after component is mounted
    "rest.settings": {
      handler() {
        this.computeRowsEffect();
        this.computeRawsTrigger += 1;
      },
      deep: true,
    },
    // "rest.value": {
    //   handler(s) {
    //   console.log('value change listned', s);
    //     this.computeRowsEffect();
    //     this.computeRawsTrigger += 1;
    //   },
    //   deep: true,
    // },
    stringUpdates({ field, prop, value }) {
      // updates already rendered fields
      const mult = fbGlobal.fields[this.keyName];
      if (mult.fields?.[field.multiIndex]?.[prop])
        mult.fields[field.multiIndex][prop] = value;
    },
    // trigger() {
    //   console.log("trigger happend");
    // },
  },
};
// Adding fields. Case 1 - .value are initValue, on add we assign current values to initValue, redraw whole field
// Case 2 - we redraw field.value on every child value change, not listening to values, providing methods to redraw field
</script>

<style>
.fb-row.fb-field-content.fb-multiple-content{
  margin-top: 0;
}
</style>