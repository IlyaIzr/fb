<template>
  <div v-if="fields" class="row items-center">
    <Field
      :fieldInfo="field"
      v-for="field in fields"
      v-bind:key="field.key"
      :rowNumber="order"
      :order="fields.indexOf(field)"
    />
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import Field from "./Field";
export default {
  name: "FieldMapper",
  components: {
    Field,
  },
  props: {
    fields: {
      type: Array || undefined,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  beforeMount() {
    //  fbGlobal
    this.rows = this.rows ?? [];
    fbGlobal.rows = fbGlobal.rows ?? [];
    const self = this;

    const rowToPush = {
      component: self,
      get element() {
        return this?.component?.$el;
      },
    };

    fbGlobal.rows.push(rowToPush);
  },
};
</script>

<style>
</style>