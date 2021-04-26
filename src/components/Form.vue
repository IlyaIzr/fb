<template>
  <div style="min-width: min(75vw, 1800px)" class="fb-form bg-white">
    <!-- Close modal v-if it's modal -->
    <div
      v-if="settings.title"
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
      class="fb-form-content q-pa-none scroll"
      ref="form"
      @submit="onSubmit"
      @reset="onReset"
      @validation-success="onValidateSuccess"
      @validation-error="onValidateError"
    >
      <Tabs
        v-if="settings.tabs"
        :rows="rows"
        @submit="onSubmit"
        @reset="onReset"
        @clear="onClear"
        ref="tabsComponent"
      />
      <RowMapper
        v-else
        :rows="rows"
        @submit="onSubmit"
        @reset="onReset"
        @clear="onClear"
      />
    </q-form>

    <q-separator />

    <!-- Buttons -->
    <Buttons
      :buttons="settings.buttons"
      @submit="trySubmit"
      @reset="onReset"
      @clear="onClear"
      @back="onBack"
      @next="onNext"
    />
  </div>
</template>

<script>
import RowMapper from "./RowMapper";
import Buttons from "./Buttons";
import Tabs from "./Tabs";
import { fieldsToRows, sortByTabs } from "./toRows";
import { fbGlobal, initConfig } from "src/arguments";
import { validator } from "./inputs/validator";
export default {
  name: "Form",
  components: {
    RowMapper,
    Buttons,
    Tabs,
  },
  data() {
    return {
      methods: this.settings?.methods || {},
      fbGlobal,
      computeRawsTrigger: 1,
      rows: [],
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
  computed: {},
  methods: {
    async trySubmit(e) {
      if (this.settings.tabs) {
        const res = await this.$refs.tabsComponent.trySubmit(e);
        if (!res) return false;
      }
      const res = await this.$refs.form.validate();
      if (res) await this.onSubmit();
    },
    // Event Handlers
    async onSubmit() {
      const values = fbGlobal.getFormValues()

      if (this.methods.onSubmit) {
        const cb = await this.methods.onSubmit(fbGlobal, this, values);
        if (typeof cb === "function") cb(fbGlobal, this, values);
      }
    },
    async onReset() {
      let cb;
      if (this.methods.onReset) {
        cb = await this.methods.onReset(fbGlobal, this);
      }

      Object.keys(fbGlobal.fields).forEach((key) => {
        key = String(key).replace("_", "");

        Object.keys(fbGlobal.fields[key]).forEach((prop) => {
          // Case multiple
          if (prop === "fields") return;
          // rest actions
          if (prop in initConfig.fields[key])
            fbGlobal.fields[key][prop] = initConfig.fields[key][prop];
          else delete fbGlobal.fields[key][prop];
        });
        this.computeRawsTrigger += 1;
      });

      if (typeof cb === "function") await cb(fbGlobal, this);
    },
    async onClear() {
      let cb;
      if (this.methods.onClear) {
        cb = await this.methods.onClear(fbGlobal, this);
      }

      Object.entries(fbGlobal.fields).forEach(([key, config]) => {
        if (config.type === "multiple") {
          config.fields.length &&
            config.fields.forEach((row, multiIndex) => {
              Object.entries(row).forEach(([fieldKey, fieldConfig]) => {
                fieldConfig.value = "";
              });
            });
          return true;
        }

        key = String(key).replace("_", "");
        fbGlobal.fields[key].value = "";
      });
      this.$nextTick(() => {
        this.$refs.form.resetValidation();
      });

      if (typeof cb === "function") await cb(fbGlobal, this);
    },
    async onValidateSuccess() {
      if (this.methods.onValidateSuccess) {
        const cb = await this.methods.onValidateSuccess(fbGlobal, this);
        if (typeof cb === "function") cb(fbGlobal, this);
      }
    },
    async onValidateError(err) {
      const f = this.methods.onValidateError || this.methods.onValidationError;
      if (f) {
        const cb = await f(fbGlobal, this, err);
        if (typeof cb === "function") await cb(fbGlobal, this, err);
      }
    },
    onNext() {
      this.$refs.tabsComponent.onNextClick();
    },
    onBack() {
      this.$refs.tabsComponent.onBackClick();
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
      const f = fbGlobal;
      if (f.tabs) {
        const sortedFields = sortByTabs(f.fields, f.global?.fields?.tabIndex);
        return sortedFields;
      }
      const res = fieldsToRows(f.fields, f.values);
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
    const reactiveHandler = {
      set: function (field, prop, value) {
        let validated =
          field.type && validator[field.type]?.[prop]?.(value, field);
        if (validated !== undefined) value = validated;

        // This lets vue watch objects even on new properties additionc
        field.watcher += 1;
        // default assignment
        field[prop] = value;
        // Indicate success
        return true;
      },
    };

    Object.entries(this.settings.fields).forEach(([key, config]) => {
      Object.defineProperty(fbGlobal.fields, key, {
        get() {
          return this["_" + key];
        },
        set(conf) {
          if (!this["_" + key]) this["_" + key] = {};
          // Mutate object to keep reactivity
          Object.entries(conf).forEach(([prop, val]) => {
            this["_" + key][prop] = val;
          });

          // Wrap with field-level reactivity
          const reactiveField = new Proxy(this["_" + key], reactiveHandler);
          // and activate it
          Object.entries(this["_" + key]).forEach(([key, val]) => {
            reactiveField[key] = val;
          });
          self.settings.fields[key] = reactiveField;
          this["_" + key] = reactiveField;
          self.computeRawsTrigger += 1; // This component reactivity, redraws rows
          // console.log(key, { ...res }); //works as expected
        },
      });

      // initial config setting
      fbGlobal.fields[key] = config;
    });

    // assign rows once
    this.rows = this.rowsComputed();
  },

  async mounted() {
    if (this.methods.onMount) {
      const cb = await this.methods.onMount(fbGlobal, this, this.$refs.form);
      if (cb && typeof cb === "function") await cb(fbGlobal, this, this.$refs.form);
    }
  },
  watch: {
    computeRawsTrigger: {
      handler() {
        // console.log("form redraw happens");
        const newRows = this.rowsComputed();
        this.rows = newRows;
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>