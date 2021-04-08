<template>
  <div class="row fb-row">
    <div v-for="row in rows" v-bind:key="rows.indexOf(row)">
      <FieldMapper :fields="row" :order="rows.indexOf(row)" />
    </div>
  </div>
</template>

<script>
import FieldMapper from "./FieldMapper";

export default {
  name: "RowMapper",
  components: {
    FieldMapper,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
};
</script>


<style>
</style>