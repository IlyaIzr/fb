<template>
  <div class="q-gutter-md">
    <label for="">{{ rest.label }}</label>

    <RowMapper
      :rows="rows"
      :settings="{}"
      :multiKey="rest.key"
      :key="computeRawsTrigger"
    />
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import { fieldsToRows, reactiveFieldWrap } from "src/components/toRows";
import { validator } from './validator';
export default {
  name: "Multiple",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    // TODO add reactivity for incoming rest.settings changes
    rest: Object,
  },
  components: {
    RowMapper: () => import("src/components/RowMapper"),
  },
  data() {
    return {
      computeRawsTrigger: 1,
      rows: [],
      stringUpdates: 1,
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
  },

  beforeMount() {
    const field = fbGlobal.fields[this.keyName];
    if (!field.fields) field.fields = [];
    if (!field.watcher) field.watcher = 1;
    // console.log({ ...field });

    // Wrap settings with reactivity
    const self = this;
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
    stringUpdates({ field, prop, value }) {
      const mult = fbGlobal.fields[this.keyName];
      if (mult.fields.length)
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