<template>
  <div class="row fb-row">
    <div v-for="row in rows" v-bind:key="rows.indexOf(row)">
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
  },
  
  // watch: {
  //   "rows": {
  //     handler(s) {
  //       console.log("rows update", s);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>


<style>
</style>