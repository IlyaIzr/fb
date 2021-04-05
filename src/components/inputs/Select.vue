<template>
  <div class="q-gutter-md">
    <q-select
      v-bind="rest"
      :options="localOptions"
      :value="localValue"
      @input="onInput"
      @focus="onFocus"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ rest.noResultsMsg || "Нет результатов" }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
function simpleVal(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (val.id) return val.id;
  if (val.value) return val.value;
}
export default {
  name: "Select",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.parseValue(this.rest.value),
      localOptions: this.parseOptions(this.rest.options),
    };
  },
  computed: {
  },
  methods: {
    parseValue(val) {
      // So far it runs only on init
      let res = "";
      const o = this.parseOptions(this.rest.options);
      // validate
      if (val === undefined) return res;
      if (!o?.length || !o?.[0]) return res;
      // find value of right format
      if (typeof o?.[0] === "string") res = o.find((strVal) => val === strVal);
      else res = o.find((ops) => ops.id === val || ops.value === val);
      return res ?? "";
    },
    parseOptions(ops) {
      if (!ops?.length) return [];
      // Case options are label-value pair
      if (ops[0].value) return ops;
      // Case options are array of strings
      if (typeof ops[0] === "string") return ops;
      // Case options are name-id pair
      const res = [];
      ops.forEach((option) => {
        res.push({ label: option.name, value: option.id });
      });
      return res;
    },
    onInput(val) {
      const simpleValue = simpleVal(val);

      let cb;
      if (this.rest?.onInput) {
        cb = this.rest.onInput(fbGlobal, this, val);
      }
      // Assign global value as simple string or array of them. Assign local value to whatever it gives us
      this.rest.value = simpleValue;
      this.localValue = val;

      if (typeof cb === "function") cb(fbGlobal, this, val);
    },
    onFocus(e) {
      if (this.rest?.onFocus) {
        const cb = this.rest.onFocus(fbGlobal);
        if (typeof cb === "function") cb(fbGlobal, this, e);
      }
    },
  },
  watch: {},
};
</script>

<style>
</style>
