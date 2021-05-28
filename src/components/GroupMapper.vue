<template>
  <div>
    <div
      v-for="item in groupsWithRows"
      v-bind:key="groupsWithRows.indexOf(item)"
    >
      <FieldMapper
        v-if="Array.isArray(item)"
        :fields="item"
        :order="groupsWithRows.indexOf(item)"
      />
      <div v-else class="fb-group-wrapper" ref="wraps">
        <h5
          v-if="item.groupLabel"
          class="fb-group-label fb-field-label"
          ref="labels"
        >
          {{ item.groupLabel }}
        </h5>
        <div class="fb-group">
          <RowMapper :rows="item.rows" :hasGroups="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FieldMapper from "./FieldMapper";
import RowMapper from "./RowMapper";
import { sortByGroup, fieldsToRows } from "./toRows";

export default {
  name: "GroupMapper",
  components: {
    FieldMapper,
    RowMapper,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    groupsWithRows() {
      const sorted = sortByGroup(this.rows);
      return sorted;
    },
  },
  methods: {
    parseFields(fields) {
      const res = fieldsToRows(fields);
      console.log("%c⧭", "color: #73998c", fields, res);
      return res;
    },
  },
  mounted() {
    // Styling
    const { labels, wraps } = this.$refs;
    labels?.forEach((label, index) => {
      const difference = label.clientHeight - 32;
      if (difference) wraps[index].className += " fb-group-big-label-case";
    });
  },
};
</script>


<style>
.fb-group-wrapper {
  padding: 24px 16px;
  position: relative;
}
.fb-group-big-label-case {
  padding-top: 42px;
}
.fb-group-label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 19px;
  font-size: min(2.8vw, 18px);
  line-height: min(3.2vw, 22px);
  padding: 0 8px;
  margin: 10px 0;
  /* margin: 30px 130px; */
  /* text-align: center; */
  background-color: #fff;
}
.fb-group {
  border: 1px solid #cdcdcd;
  border-radius: 8px;
  margin: 8px -4px;
}
</style>