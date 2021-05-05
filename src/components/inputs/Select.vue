<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <q-select
      class="fb-field-content"
      v-bind="rest"
      :rules="rules"
      :value="localValue"
      :use-chips="Boolean(rest.value && rest.value.length)"
      :options="localOptions"
      @input="onInputLocal"
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
import { fbGlobal } from "src/arguments";
import { commonMethods, onMountCommon, strMethods } from "./common";

function simpleVal(val, isM = false) {
  // case multiple
  if ((isM && !val) || (isM && !val[0])) return [];
  if (isM && typeof val[0] === "string") return val;
  if (isM && val[0].id) return val.map((obj) => obj.id);
  if (isM && val[0].value) return val.map((obj) => obj.value);
  // case single val
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
      rules: this.selectRules(
        this.rest.rules,
        this.rest.required,
        this.rest.requiredMessage
      ),
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
    ...commonMethods,
    ...strMethods,
    parseValue(val) {
      // So far it runs only on init

      const o = this.parseOptions(this.rest.options);
      // Case multiple
      if (this.rest.multiple) {
        if (!val || !val[0]) return [];
        if (typeof val[0] === "string") {
          return o.filter((op) => val.includes(op.value));
        }
        const simpArray = simpleVal(val, true);

        if (val[0].value) return o.filter((op) => simpArray(op.value));
        if (val[0].id) return o.filter((op) => simpArray(op.value));
      }
      // Case single val
      let res = "";
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
      if (typeof ops[0] === "string")
        return ops.map((o) => {
          return { label: o, value: o };
        });
      // Case options are name-id pair
      const res = [];
      ops.forEach((option) => {
        res.push({ label: option.name, value: option.id });
      });
      return res;
    },
    async onInputLocal(val) {
      const isM = Boolean(this.rest.multiple);
      const simpleValue = simpleVal(val, isM);

      // Assign global value as simple string or array of them. Assign local value to whatever it gives us
      if (isM) {
        if (!val) val = [];
        this.onInput([...simpleValue]);
        this.localValue = [...val];
      } else {
        this.onInput(simpleValue);
        this.localValue = val;
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
    selectRules(rules, required, requiredMessage) {
      let res = rules;
      let multy = this.rest.multiple;
      if (required && multy) {
        return [
          (val) => (val && val.length) || requiredMessage || "Please fill",
          ...rules,
        ];
      }
      if (required) {
        res = [
          (val) => Boolean(val) || requiredMessage || "Please fill",
          ...rules,
        ];
      }
      return res;
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
  },
  mounted() {
    onMountCommon(this, this.rest);
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
.q-chip.no-wrap {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
