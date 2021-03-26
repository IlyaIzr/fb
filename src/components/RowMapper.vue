<template>
  <div class="row fb-row">
    <q-step v-if="settings.tabs" />

    <div v-else v-for="row in rows" v-bind:key="rows.indexOf(row)">
      <FieldMapper :fields="row" :order="rows.indexOf(row)" />
    </div>
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import FieldMapper from "./FieldMapper";
// import Stepper from "./Stepper";

export default {
  name: "RowMapper",
  components: {
    FieldMapper,
    // Stepper,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
    settings: {
      type: Object,
      required: false,
      default: {},
    },
    multiKey: {
      type: String,
      required: false,
    },
  },
  beforeMount() {
    if (!this.multiKey) return;
    this.rows.forEach((row) => {
      row.forEach((field) => {
        // console.log({ ...field });
        if (!fbGlobal.fields[this.multiKey].fields[field.multiIndex])
          fbGlobal.fields[this.multiKey].fields[field.multiIndex] = {};
        fbGlobal.fields[this.multiKey].fields[field.multiIndex][
          field.key
        ] = field;
      });
    });
    // console.log({ ...fbGlobal.fields[this.multiKey].fields });
  },
};
</script>


<style>
</style>