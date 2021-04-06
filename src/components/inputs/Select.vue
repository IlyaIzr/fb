<template>
  <div class="q-gutter-md">
    <q-select
      v-bind="rest"
      :value="localValue"
      :options="localOptions"
      @input="onInput"
      @input-value="shorthenOptions"
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
import { shouldEval } from "./extra";
import { validator } from "./validator";
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
      initOptions: this.parseOptions(this.rest.options),
    };
  },
  computed: {
    // localValue() {
    //   let res = "";
    //   res = this.parseValue(this.rest.value)
    //   return res;
    // },
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
    async onInput(val) {
      const simpleValue = simpleVal(val);

      let cb;
      if (this.rest?.onInput) {
        cb = await this.rest.onInput(fbGlobal, this, val);
      }
      // Assign global value as simple string or array of them. Assign local value to whatever it gives us
      this.rest.value = simpleValue;
      this.localValue = val;

      if (typeof cb === "function") await cb(fbGlobal, this, val);
    },
    async onFocus(e) {
      if (this.rest?.onFocus) {
        const cb = await this.rest.onFocus(fbGlobal);
        if (typeof cb === "function") await cb(fbGlobal, this, e);
      }
    },
    async shorthenOptions(val) {
      const needle = val.toLocaleLowerCase?.();
      let newOptions = this.initOptions;
      if (val)
        newOptions = this.initOptions.filter((v) => {
          if (v.label?.toLocaleLowerCase?.().indexOf(needle) > -1) {
            return v;
          }
        });
      let cb;
      if (this.rest?.onInput) {
        cb = await this.rest.onInput(fbGlobal, this, val);
      }
      this.localOptions = newOptions;
      this.$emit("optionInput", val);
      this.$nextTick(function () {
        this.$refs.input?.resetValidation?.();
      });
      if (typeof cb === "function") await cb(fbGlobal, this, val);
    },
  },

  beforeMount() {
    const field = this.rest;

    // Writable handling
    field["use-input"] = (function () {
      if (field.writable || field["use-input"]) return true;
      if (field.writable === undefined && field.multiple === undefined)
        return true;
      return field["use-input"] || field.writable;
    })();

    // Validate props from config
    Object.entries(field).forEach(([key, val]) => {
      let assignment;

      // Execute function values
      if (shouldEval(key, val)) {
        assignment = val(fbGlobal, this, field);
      } else assignment = val;

      // Assignment validation

      const validated = validator[field.type]?.[key]?.(val, field);
      if (validated !== undefined) assignment = validated;

      field[key] = assignment;
    });
  },
  watch: {
    rest: {
      handler(o) {
        this.localValue = this.parseValue(o.value);
        const ops = this.parseOptions(o.options);
        this.localOptions = ops;
        this.initOptions = ops;
        // console.log("ima field handler", o);
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>
