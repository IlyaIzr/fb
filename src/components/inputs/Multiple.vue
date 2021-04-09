<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <label for="">{{ rest.label }}</label>

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
      const field = fbGlobal.fields[this.keyName];
      const obj = {};
      Object.keys(field.settings).forEach((key) => (obj[key] = ""));
      field.value.push(obj);
    },
    removeField(index) {
      const field = fbGlobal.fields[this.keyName];
      field.value.splice(index, 1);
    },
  },

  beforeMount() {
    const self = this;
    const field = fbGlobal.fields[this.keyName];
    if (!field.fields) field.fields = [];
    if (!field.watcher) field.watcher = 1;

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
  watch: {
    // They fire only after component is mounted
    "rest.settings": {
      handler() {
        this.computeRowsEffect();
        this.computeRawsTrigger += 1;
      },
      deep: true,
    },
    "rest.value": {
      handler() {
        this.computeRowsEffect();
        this.computeRawsTrigger += 1;
      },
      deep: true,
    },
    stringUpdates({ field, prop, value }) {
      // updates already rendered fields
      const mult = fbGlobal.fields[this.keyName];
      if (mult?.fields?.length)
        mult.fields.forEach((r) => {
          r[field.key][prop] = value;
        });
    },
    // trigger() {
    //   console.log("trigger happend");
    // },
  },
};
</script>

<style>
</style>