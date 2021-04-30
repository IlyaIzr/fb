<template>
  <div class="fb-row fb-field-content fb-multiple-content row">
    <!-- Map multilevel structure -->
    <div
      v-for="(rows, multiIndex) in multiRows"
      v-bind:key="multiRows.indexOf(rows)"
      class="fb-multiple-row col-12 q-ma-md"
    >
    <div class="fb-inner-row">
      <!-- Map regular structure -->
      <RowMapper :rows="rows" />

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
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";

export default {
  name: "MultiMapper",
  components: {
    RowMapper: () => import("src/components/RowMapper"),
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
.fb-multiple-row{
  margin: 0px;

}
.fb-multiple .fb-multiple-content.row{
  margin: 0px;
}
.fb-inner-row{
  margin: 8px;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 8px;
}

</style>