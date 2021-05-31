<template>
  <div class="fb-field-button" v-if="localRest.visible">
    <q-field
      ref="input"
      :hint="localRest.hint"
      :label="localRest.fieldLabel"
      class="fb-field-label"
      borderless
      dense
    >
      <template v-slot:control>
        <q-btn v-bind="localRest" @click="onClick" class="fb-field-content">
          <q-tooltip
            v-if="localRest.tooltip"
            anchor="top middle"
            self="bottom middle"
            :offset="[5, 5]"
          >
            {{ localRest.tooltip }}
          </q-tooltip>
        </q-btn>
      </template>
    </q-field>
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
import { onMountCommon } from "../inputs/common";

export default {
  name: "ButtonElement",
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
      // localRest: {},
    };
  },
  computed: {
    localRest() {
      if (!this.rest) return {};
      const res = {
        ...this.rest,
        label: this.rest.value,
        fieldLabel: this.rest.label,
      };
      return res;
    },
  },
  methods: {
    async onClick() {
      const r = this.rest;
      const f = r.onClick || r.onInput || r.onFocus || r.onBlur;
      if (typeof f !== "function") return;
      await f(fbGlobal, this, this.rest);
    },
  },

  mounted() {
    onMountCommon(this, this.rest);
  },
  beforeMount() {
    // if (!this.rest.size) this.rest.size = 'sm'
  },
};
</script>

<style>
.fb-field-button .q-field__label.no-pointer-events.absolute.ellipsis {
  top: -4px;
}
.fb-field-button .q-field--dense.q-field--float .q-field__label {
  transform: translateY(-10%) scale(0.95);
}
.fb-field-button .q-btn__content {
  font-size: 13px;
}
</style>
