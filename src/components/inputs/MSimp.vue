<template>
  <div class="q-gutter-md">
    <label for="">{{ rest.label }}</label>

    <RowMapper :rows="rows" :settings="{}" :multiKey="rest.key" />
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import { fieldsToRows } from "src/components/toRows";
export default {
  name: "Multiple",
  props: {
    keyName: {
      type: String,
      required: true,
    },
  },
  components: {
    RowMapper: () => import("src/components/RowMapper"),
  },
  data() {
    return {
      computeRawsTrigger: 1,
      rows: [],
    };
  },
  computed: {
    rest() {
      let res = {};
      res = fbGlobal.fields[this.keyName];
      return res;
    },
  },
  methods: {
    rowsComputed() {
      // console.log({ ...this.rest.fields });
      const res = fieldsToRows(
        this.rest.settings,
        fbGlobal.values?.[this.keyName],
        this.keyName,
        this.rest.value
      );
      // console.log(res);
      return res;
    },
  },

  beforeMount() {
    const field = fbGlobal.fields[this.keyName];
    if (!field.fields) field.fields = [];
    // console.log({ ...field });

    this.rows = this.rowsComputed();

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
};
</script>

<style>
</style>