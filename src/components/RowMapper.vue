<template>
  <div >
    <div v-for="row in rows" v-bind:key="rows.indexOf(row)" class="row fb-row">
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