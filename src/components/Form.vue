<template>
  <div style="min-width: min(75vw, 1800px)" class="fb-form">
    <!-- Close modal v-if it's modal -->
    <div
      v-if="title"
      style="max-height: 8vh"
      class="fb-title-wrap fb-form-title-wrap q-px-md q-py-xs relative-position"
    >
      <q-btn
        v-if="settings.modal"
        dense
        flat
        icon="close"
        v-close-popup
        class="fb-close-modal absolute"
        style="right: 20px"
      >
        <q-tooltip content-class="fb-close-modal-tooltip bg-white text-primary"
          >Закрыть</q-tooltip
        >
      </q-btn>
      <div class="fb-title fb-form-title text-h5">{{ settings.title }}</div>
    </div>

    <q-separator />

    <!-- Form itself -->
    <q-form
      :style="settings.modal && 'max-height: 65vh'"
      :class="
        'fb-content q-pa-none' +
        `scroll bg-white ${settings.tabs ? '' : 'q-pa-md q-py-none'}`
      "
      ref="form"
      @submit="onSubmit"
      @reset="onReset"
      @validation-success="onValidateSuccess"
      @validation-error="onValidateError"
    >
      <RowMapper
        :rows="rows"
        :settings="settings"
        @submit="onSubmit"
        @reset="onReset"
        @clear="onClear"
        ref="fucker"
        :key="r"
      />
    </q-form>

    <q-separator />

    <!-- Buttons -->
    <div
      v-if="!settings.noButtons"
      :class="`fb-buttons ${settings.modal && ' float-right q-mr-md '}  ${
        settings.tabs && ' q-pa-none'
      } `"
    >
      <Buttons
        :buttons="settings.buttons"
        :modal="settings.modal"
        v-if="!settings.tabs"
        @submit="onSubmit"
        @reset="onReset"
        @clear="onClear"
      />
    </div>
  </div>
</template>

<script>
import RowMapper from "./RowMapper";
import Buttons from "./ButtonsOld";
import { valueStore, vNodeStore } from "../store";
import { fieldsToRows } from "./toRows";
import { fbGlobal } from "src/arguments";
export default {
  name: "Form",
  components: {
    RowMapper,
    Buttons,
  },
  data() {
    return {
      methods: this.settings?.methods || {},
      fbGlobal,
      f: 1,
      rows: [],
      r: 1,
    };
  },
  props: {
    settings: {
      type: Object,
      required: true,
    },
    values: {
      type: Object,
      required: false,
    },
  },
  computed: {
    valuesResponse() {
      let res = valueStore.state;
      return res;
    },
    title() {
      return fbGlobal?.title;
    },
  },
  methods: {
    // Event Handlers
    async onSubmit(e) {
      // const res = await this.$refs.methods.validate();
      // if (!res) return null;
      // const valuesResponse = { ...this.valuesResponse };
      // delete valuesResponse.watcher;
      // // Remove service keys
      // let seriveKeys = [];
      // let multiKeys = [];
      // this.settings.fields.map((field) => {
      //   if (field.service || field.type === "html") seriveKeys.push(field.key);
      //   else if (field.type === "multiple") {
      //     multiKeys.push(field.key);
      //     field.fields.map((miniF) => {
      //       if (miniF.service || miniF.field?.type === "html")
      //         seriveKeys.push(miniF.key);
      //     });
      //   }
      // });
      // const checkDates = (value) => {
      //   if (typeof value === "object" && value.from && value.to) {
      //     return { start: value.from, finish: value.to };
      //   }
      // };
      // for (const [key, value] of Object.entries(valuesResponse)) {
      //   if (seriveKeys.indexOf(key) > -1) delete valuesResponse[key];
      //   // Check for calndar range object, in simple fields
      //   const res = checkDates(value);
      //   if (res) valuesResponse[key] = res;
      //   // Case multiKey
      //   if (multiKeys.indexOf(key) > -1) {
      //     valuesResponse[key].map((multiRow) => {
      //       for (const [miniKey, miniValue] of Object.entries(multiRow)) {
      //         // Check for service keys in multiFields
      //         if (seriveKeys.indexOf(miniKey) > -1) delete multiRow[miniKey];
      //         // Calendar range in multiFields
      //         const res = checkDates(miniValue);
      //         if (res) multiRow[miniKey] = res;
      //       }
      //     });
      //   }
      // }
      if (this.methods.onSubmit) {
        const cb = await this.methods.onSubmit(
          this,
          valueStore.state,
          vNodeStore
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },
    async onReset() {
      let cb;
      if (this.methods.onReset) {
        const res = await this.methods.onReset(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          vNodeStore
        );
        cb = res && res.cb;
      }
      vNodeStore.resetComponents();
      if (cb && typeof cb === "function") cb(this);
    },
    async onClear() {
      let exeption;
      let cb;
      if (this.methods.onClear) {
        const res = await this.methods.onClear(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          vNodeStore
        );
        exeption = res && res.exeption;
        cb = res && res.cb;
      }
      valueStore.clearStore(exeption);
      if (cb && typeof cb === "function") cb(this);
      this.$nextTick(() => {
        this.$refs.methods.resetValidation();
      });
    },
    async onValidateSuccess() {
      if (this.methods.onValidateSuccess) {
        const cb = await this.methods.onValidateSuccess(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          vNodeStore
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },
    async onValidateError(err) {
      vNodeStore.setComponent("firstFieldFailedValidation", err);
      const f = this.methods.onValidateError || this.methods.onValidateError;
      if (f) {
        const cb = await f(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          err,
          vNodeStore
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },

    async reset() {
      this.onReset();
    },
    async clear() {
      this.onClear();
    },
    async submit() {
      this.onSubmit();
    },

    rowsComputed() {
      let res = [];
      if (!this.f) return "fuck";
      let fields = fbGlobal.newFields;
      // console.log("computation of fields from form", { ...fields.name });
      res = fieldsToRows(fields, fbGlobal.values);
      return res;
    },
  },

  beforeMount() {
    import("quasar/lang/" + (this.settings.localization || "ru")).then(
      (lang) => {
        this.$q.lang.set(lang.default);
      }
    );

    // fbGlobal
    this.methods = this.methods ?? {};
    const self = this;

    Object.keys(this.methods).forEach((key) => {
      const method = self.methods[key];
      // const methods = {}
      Object.defineProperty(fbGlobal.methods, key, {
        set: function (val) {
          this["_" + key] = val;
          // ??????????????????????????????????????????????????????
          self.methods["_" + key] = val; //dunno why
        },
        get: function () {
          return this["_" + key];
        },
      });

      fbGlobal.methods[key] = method;
    });

    fbGlobal.methods.component = this;
    fbGlobal.methods.element = this.$el;

    // If no new fields defined, define before computation
    // if (!fbGlobal.newFields) {  //fires only once anyways but WATCH IT

    fbGlobal.newFields = {};
    Object.entries(this.settings.fields).forEach(([key, config]) => {
      Object.defineProperty(fbGlobal.newFields, key, {
        get() {
          return this["_" + key];
        },
        set(conf) {
          if (!this["_" + key]) this["_" + key] = {};
          const res = { ...this["_" + key], ...conf };
          this["_" + key] = res;
          self.settings.fields[key] = res;
          self.f += 1;
          // console.log(key, { ...res }); //works as expected
        },
      });
      // initial config setting
      fbGlobal.newFields[key] = config;
    });

    // }

    this.rows = this.rowsComputed();
  },
  // updated(){
  //   console.log('im updated');
  // },

  watch: {
    // nothing fires
    "fbGlobal.title": function () {
      console.log("Glob change");
    },
    "settings.title": function () {
      console.log("Title change");
    },

    f: {
      handler() {
        const newRows = this.rowsComputed();
        this.rows = newRows;
        this.r += 1
      },
      deep: true,
    },

    "fbGlobal.newFields": {
      handler() {
        console.log("newFields deep change");
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>