<template>
  <div class="row fb-row">
    <!-- Map multilevel structure -->
    <div
      v-for="(rows, multiIndex) in multiRows"
      v-bind:key="multiRows.indexOf(rows)"
    >
      <!-- Map regular structure -->
      <div v-for="row in rows" v-bind:key="rows.indexOf(row)">
        <FieldMapper :fields="row" :order="rows.indexOf(row)" />
      </div>

      <q-btn
        v-if="multiKey"
        class="q-mr-md"
        size="sm"
        type="button"
        :label="remButton.text || '-'"
        :color="remButton.color || 'red'"
        :text-color="remButton.textColor"
        :disable="remButton.disabled"
        @click="$emit('remove', multiIndex)"
      />
    </div>
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";

export default {
  name: "MultiMapper",
  components: {
    FieldMapper: () => import("src/components/FieldMapper"),
  },
  props: {
    multiRows: {
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
    },
  },
  data() {
    return {
      remButton: fbGlobal.buttons?.multipleRemove || {},
    };
  },
  beforeMount() {
    this.multiRows.forEach((multiRow) => {
      multiRow.forEach((row) => {
        row.forEach((field) => {
          // console.log({ ...field });
          const multiEntry = fbGlobal.fields[this.multiKey];
          if (!multiEntry.fields?.[field.multiIndex])
            multiEntry.fields[field.multiIndex] = {};
          multiEntry.fields[field.multiIndex][field.key] = field;
        });
      });
    });
    // console.log({ ...fbGlobal.fields[this.multiKey].fields });
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