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
        :key="updater"
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
      fieldReactivity: 1,
      rows: [],
      updater: 1,
      isMounted: false,
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
      if (!this.fieldReactivity) return "never";
      const res = fieldsToRows(fbGlobal.fields, fbGlobal.values);
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
    const self = this;

    // Methods assignment, WIP
    this.methods = this.methods ?? {};
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

    // Fields assignment

    fbGlobal.fields = {};
    Object.entries(this.settings.fields).forEach(([key, config]) => {
      const reactiveHandler = {
        set: function (targetObj, prop, value) {
          // This lets vue watch objects even on new properties addition
          if (!targetObj.watcher) targetObj.watcher = 1;
          else targetObj.watcher += 1;
          // default assignment
          targetObj[prop] = value;
          // Indicate success
          return true;
        },
      };

      Object.defineProperty(fbGlobal.fields, key, {
        get() {
          return this["_" + key];
        },
        set(conf) {
          if (!this["_" + key]) this["_" + key] = {};
          const res = { ...this["_" + key], ...conf };

          // Wrap with reactivity and activate it
          const reactiveWrap = new Proxy(res, reactiveHandler);
          Object.entries(res).forEach(([key, val]) => {
            reactiveWrap[key] = val;
          });
          self.settings.fields[key] = reactiveWrap;
          this["_" + key] = reactiveWrap;
          self.fieldReactivity += 1; //Vue reactivity
          // console.log(key, { ...res }); //works as expected
        },
      });

      // initial config setting
      fbGlobal.fields[key] = config;
      // console.log(key, { ...config });
    });

    // assign rows once
    this.rows = this.rowsComputed();
  },

  watch: {
    "settings.title": function () {
      // Not borking
      console.log("Title change");
    },

    fieldReactivity: {
      handler() {
        const newRows = this.rowsComputed();
        this.rows = newRows;
        this.updater += 1;
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>