<template>
  <div
    class="fb-multiple q-gutter-md q-pa-xs q-my-md"
    ref="wrap"
    v-if="rest.visible"
  >
    <h5 class="fb-multiple-label fb-field-label q-mx-none absolute-center q-px-xs" ref="label">
      {{ rest.label }}
    </h5>

    <MultiMapper
      :multiRows="rows"
      :multiKey="rest.key"
      :key="computeRawsTrigger"
      @remove="removeField"
    />

    <q-btn
      class="fb-multiple-add-button full-width q-ma-sm"
      size="sm"
      :label="addButton.label || 'Добавить'"
      :color="addButton.color || 'green'"
      :text-color="addButton.textColor"
      :disable="addButton.disable"
      @click="addField"
    >
      <i>+</i>
      <q-tooltip
        v-if="addButton.tooltip"
        anchor="top middle"
        self="bottom middle"
        :offset="[5, 5]"
      >
        {{ addButton.tooltip || "Добавить поле" }}
      </q-tooltip>
    </q-btn>

    <q-field
      ref="validation"
      :value="rest.value.length"
      :rules="rules"
      borderless
      style="height: 1px; padding-right: 60px"
      dense
      class="fb-multiple-validation"
    >
    </q-field>
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import { fieldsToRows } from "src/components/toRows";
import { validator } from "./validator";
import MultiMapper from "src/components/MultiMapper";
import { commonMethods, computedRules, onMountCommon } from "./common";
export default {
  name: "MultipleInput",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    // TODO add reactivity for incoming rest.settings changes
    rest: Object,
  },
  components: {
    MultiMapper,
  },
  data() {
    return {
      computeRawsTrigger: 1,
      rows: [],
      stringUpdates: 1,
      addButton: fbGlobal.buttons?.multipleAdd || {},
    };
  },
  computed: {
    ...computedRules,
  },
  methods: {
    ...commonMethods,
    computeRowsEffect() {
      const clearSettings = {};
      Object.entries(this.rest.settings).forEach(([key, conf]) => {
        clearSettings[key] = { ...conf };
      });
      const rows = fieldsToRows(
        { ...clearSettings },
        fbGlobal.values?.[this.keyName],
        this.keyName,
        this.rest.value
      );
      this.rows = rows;
    },
    async addField() {
      const obj = {};
      Object.keys(this.rest.settings).forEach((key) => (obj[key] = ""));
      await this.onInput([...this.rest.value, obj]);
      this.redrawChildren();
    },
    async removeField(index) {
      const newVals = [...this.rest.value];
      newVals.splice(index, 1);
      await this.onInput(newVals);
      this.redrawChildren();
    },
    redrawChildren() {
      this.computeRowsEffect();
      this.computeRawsTrigger += 1;
    },
    clear() {
      this.rest.value = [];
    },
    rerender() {
      this.redrawChildren();
    },
  },

  beforeMount() {
    const self = this;
    const field = fbGlobal.fields[this.keyName];
    if (!field.fields) field.fields = [];

    // console.log({ ...field });

    // Wrap settings with reactivity
    const redrawWrap = {
      set: function (field, prop, value) {
        // console.log("set settings updates", { ...field }, prop, value);
        let validated =
          field.type && validator[field.type]?.[prop]?.(value, field);

        if (validated !== undefined) value = validated;
        // console.log('changes simp setting');
        self.stringUpdates = { field, prop, value };
        // console.log(field.key, 'assigned value ', value);
        field[prop] = value;
        return true;
      },
    };
    const s = fbGlobal.fields[this.keyName].settings;
    Object.keys(s).forEach((key) => {
      // for string changes injections we got to transfer field key somehow
      s[key].key = key;
      s[key] = new Proxy(s[key], redrawWrap);
    });

    this.computeRowsEffect();
  },
  mounted() {
    onMountCommon(this, this.rest);

    // Styling
    const { label, wrap } = this.$refs;
    const difference = label.clientHeight - 32;
    if (difference) wrap.className += " fb-field-big-label-case";
  },
  watch: {
    // They fire only after component is mounted
    "rest.settings": {
      handler() {
        this.computeRowsEffect();
        this.computeRawsTrigger += 1;
      },
      deep: true,
    },
    // "rest.value": {
    //   handler(s) {
    //   console.log('value change listned', s);
    //     this.computeRowsEffect();
    //     this.computeRawsTrigger += 1;
    //   },
    //   deep: true,
    // },
    stringUpdates({ field, prop, value }) {
      // console.log("string updates did run", { ...field }, prop, value);
      // updates already rendered fields
      const multiField = fbGlobal.fields[this.keyName];
      if (multiField?.fields?.length)
        multiField.fields.forEach((fieldsGroup) => {
          fieldsGroup[field.key] && (fieldsGroup[field.key][prop] = value);
        });
    },
    // trigger() {
    //   console.log("trigger happend");
    // },
  },
};
// Adding fields. Case 1 - .value are initValue, on add we assign current values to initValue, redraw whole field
// Case 2 - we redraw field.value on every child value change, not listening to values, providing methods to redraw field
</script>

<style>
.fb-row.fb-field-content.fb-multiple-content {
  margin-top: 0;
}
.fb-multiple {
  border: 1px solid #b2b2b2;
  border-radius: 8px;
  margin: 8px -4px;
  position: relative;
  padding: 24px 8px;
}
.fb-multiple .fb-multiple-label {
  left: 50%;
  transform: translateX(-50%);
  top: -27px;
  font-size: min(2.8vw, 18px);
  padding: 0 8px;
  margin: 10px 0;
  background-color: #fff;
}
.fb-multiple.fb-field-big-label-case {
  margin-top: 24px;
  padding-top: 48px;
}
.fb-multiple-add-button i {
  position: absolute;
  right: 15px;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.fb-multiple-validation{
  margin: 0;
  margin-bottom: -12px;
  margin-left: 4px;
  align-items: center;
  text-align: center;
}
.fb-multiple-validation .q-field__append {
  height: 26px;
  margin-left: auto;
}
</style>