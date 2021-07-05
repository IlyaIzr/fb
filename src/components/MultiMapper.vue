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
          class="fb-multiple-remove-btn q-mr-md"
          size="xs"
          type="button"
          :label="remButton.label || 'X'"
          :color="remButton.color || 'red'"
          :text-color="remButton.textColor"
          :disable="disabled"
          @click="$emit('remove', multiIndex)"
        >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[5, 5]">
            {{ remButton.tooltip || "Убрать" }}
          </q-tooltip>
        </q-btn>
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
    multiKey: {
      type: String,
    },
  },
  data() {
    return {
      remButton: fbGlobal.buttons?.multipleRemove || {},
    };
  },
  computed: {
    disabled() {
      if (this.remButton?.disable) return true;
      if (fbGlobal.fields[this.multiKey].disable) return true;
      if (fbGlobal.fields[this.multiKey].readonly) return true;
      return false;
    },
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
.fb-multiple-row {
  margin: 0px;
  position: relative;
}
.fb-multiple .fb-multiple-content.row {
  margin: 0px;
}
.fb-inner-row {
  margin: 8px 0;
  padding: 8px;
  border: 1px solid #e4e4e4;
  box-shadow: 3px 3px 3px aliceblue;
  border-radius: 8px;
  position: static;
}
.fb-multiple-remove-btn {
  position: absolute;
  top: 0px;
  right: 10px;
}
</style>