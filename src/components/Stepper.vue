<template>
  <RowMapper
    :rows="filteredRows[0]"
    :settings="fbGlobal"
  />
</template>

<script>
import RowMapper from "./RowMapper";
import { fbGlobal } from "src/arguments";
import { fieldsToRows } from './toRows';
export default {
  name: "Stepper",
  components: {
    RowMapper,
  },
  data() {
    return {
      fbGlobal,
      filteredRows: []
    };
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  beforeMount() {
    this.rows.length && this.rows.forEach(tabRow => {
      const res = fieldsToRows(tabRow, fbGlobal.values);
      this.filteredRows.push(res)
    });
  },
};
</script>

<style>
</style>