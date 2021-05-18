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
      confMethods: this.settings?.methods || {},
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
      const values = fbGlobal.getFormValues();

      // Notify submit
      const notify = fbGlobal.notify || {};
      if (!notify.message) notify.message = "Отправлено";
      if (!notify.timeout) notify.timeout = 200;
      const notifyRef = ''
      // this.$q.notify(notify);

      if (this.confMethods.onSubmit) {
        const cb = await this.confMethods.onSubmit(
          fbGlobal,
          this,
          values,
          notifyRef
        );
        if (typeof cb === "function") cb(fbGlobal, this, values, notifyRef);
      }
    },
    async onReset() {
      let cb;
      if (this.confMethods.onReset) {
        cb = await this.confMethods.onReset(fbGlobal, this);
      }
      fbGlobal.resetFormInputs();

      if (typeof cb === "function") await cb(fbGlobal, this);
    },
    async onClear() {
      let cb;
      if (this.confMethods.onClear) {
        cb = await this.confMethods.onClear(fbGlobal, this);
      }

      fbGlobal.clearFormInputs();

      if (typeof cb === "function") await cb(fbGlobal, this);
    },
    async onValidateSuccess() {
      if (this.confMethods.onValidateSuccess) {
        const cb = await this.confMethods.onValidateSuccess(fbGlobal, this);
        if (typeof cb === "function") cb(fbGlobal, this);
      }
    },
    async onValidateError(err) {
      const f =
        this.confMethods.onValidateError || this.confMethods.onValidationError;
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

    rowsComputed(values) {
      const f = fbGlobal;
      if (f.tabs) {
        const sortedFields = sortByTabs(f.fields, f.global?.fields?.tabIndex);
        return sortedFields;
      }
      const res = fieldsToRows(f.fields, values);
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

          // console.log('%c⧭', 'color: #cc0088',  key, config.value, {...fbGlobal.fields._discipline})
          // console.log('%c⧭', 'color: #cc0088',  key, config.value, fbGlobal.fields._discipline?.value)
          self.computeRawsTrigger += 1; // This component reactivity, redraws rows

          // console.log(key, { ...res }); //works as expected
        },
      });

      // initial config setting
      fbGlobal.fields[key] = config;
      // store copy of config
      if (config.type === "multiple") {
        // Make actual copy of settings, so they would persist
        initConfig[key] = { ...config, settings: {} };
        Object.entries(config.settings).forEach(
          ([fKey, fConf]) => (initConfig[key].settings[fKey] = { ...fConf })
        );
      } else initConfig[key] = { ...config };
    });

    // assign rows once
    this.rows = this.rowsComputed(fbGlobal.values);

    // assign component reference
    Object.defineProperty(fbGlobal.form, "component", {
      get() {
        return self;
      },
    });
    Object.defineProperty(fbGlobal.form, "ref", {
      get() {
        return self.$refs.form;
      },
    });
  },

  async mounted() {
    if (this.confMethods.onMount) {
      const cb = await this.confMethods.onMount(
        fbGlobal,
        this,
        this.$refs.form
      );
      if (cb && typeof cb === "function")
        await cb(fbGlobal, this, this.$refs.form);
    }
  },
  watch: {
    computeRawsTrigger: {
      handler() {
        const newRows = this.rowsComputed();
        this.rows = newRows;
      },
      deep: true,
    },
  },
};
// btw this copying for init config didn't work, javascript mystery

// initConfig[key] = { ...config };
// if (config.type === "multiple") {
//   // Make actual copy of settings, so they would persist
//   Object.entries(config.settings).forEach(
//     ([fKey, fConf]) => (initConfig[key].settings[fKey] = { ...fConf })
//   );
// }
</script>

<style>
</style>

