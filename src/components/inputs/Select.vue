<template>
  <div class="q-gutter-md">
    <q-select
      :options="parsedOptions"
      v-bind="rest"
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
    };
  },
  computed: {
    parsedOptions() {
      let res = "";
      const o = this.rest.options;
      if (!o?.length) return res;
      // Case options are label-value pair
      if (o[0].value) res = o;
      // Case options are array of strings
      else if (typeof o[0] === "string") res = o;
      // Case options are name-id pair
      else {
        res = [];
        o.forEach((option) => {
          res.push({ label: option.name, value: option.id });
        });
      }
      return res;
      // p.s. all that shit code made thanks to vetur bugs, so it wouldn't redline whole project for no good reason at all
    },
  },
  methods: {
    parseValue(val) {
      // So far it runs only on init
      let res = "";
      const o = this.rest.options;
      // validate
      if (val === undefined) return res;
      if (!o?.length || !o?.[0]) return res;
      // find value of right format
      if (typeof o?.[0] === "string") res = o.find((strVal) => val === strVal);
      else res = o.find((ops) => ops.id === val || ops.value === val);
      return res ?? "";
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
