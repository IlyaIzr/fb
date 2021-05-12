<template>
  <q-stepper
    :value="step"
    @input="onInput"
    ref="stepper"
    animated
    flat
    style="padding: 0"
    :header-nav="true"
    @before-transition="beforeStep"
    class="fb-tabs"
    v-bind="tabsSettings"
  >
    <q-step
      v-for="(tab, index) in tabs.steps"
      v-bind:key="index"
      :name="index"
      :title="tab.title"
      :icon="tab.icon || 'settings'"
      :error="Boolean(errors.find((el) => el === Number(index)))"
      :done="validated[index]"
      class="fb-content-wrap"
    >
      <RowMapper v-if="filteredRows[index]" :rows="filteredRows[index]" />
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation class="formButtons">
        <!-- <Buttons
          @submit="trySubmit"
          @reset="$emit('reset')"
          @clear="$emit('clear')"
          @next="onNextClick"
          @back="onBackClick"
        /> -->
        <!-- <q-btn label="testo" @click="testo"></q-btn> -->
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script>
import RowMapper from "./RowMapper";
import Buttons from "./Buttons";
import { fbGlobal, stepperStore } from "src/arguments";
import { fieldsToRows } from "./toRows";
export default {
  name: "Tabs",
  components: {
    RowMapper,
    Buttons,
  },
  data() {
    return {
      fbGlobal,
      filteredRows: [],
      step: 0,
      errors: [],
      formRef: {},
      validated: [],
    };
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  computed: {
    tabs() {
      let res = {
        steps: [{ title: "" }, { title: "" }],
      };
      const t = fbGlobal.tabs;
      const gs = fbGlobal.global?.tabs;
      if (t && t.steps && Object.keys(t).length) {
        Object.keys(t).forEach((key) => (res[key] = t[key]));
      } else if (t) {
        const diff = this.rows.length - 2;
        for (let i = 0; i < diff; i++) {
          res.steps.push({ title: "" });
        }
      }
      if (gs && typeof gs === "object") {
        Object.keys(gs).forEach((key) => {
          if (key === "steps")
            res.steps.forEach((step) => {
              Object.keys(gs.steps).forEach(
                (prop) => (step[prop] = gs.steps[prop])
              );
            });
          else res[key] = gs[key];
        });
      }
      return res;
    },
    tabsSettings() {
      let res = {};
      const settings = fbGlobal.tabs;
      if (typeof settings !== "object") return res;
      Object.entries(settings).forEach((key) => {
        if (typeof key !== "object") res[key] = settings[key];
      });
      return res;
    },
  },
  methods: {
    async onInput(val) {
      await this.formRef.validate();
      this.setStep(val);
    },
    async onNextClick() {
      const attempt = await this.validateStep();
      if (attempt) this.$refs.stepper.next();
    },
    async onBackClick() {
      const attempt = await this.validateStep();
      if (attempt) this.$refs.stepper.previous();
    },
    async beforeStep(currStep, prevStep) {
      // late guy
      await this.validateStep(prevStep);
    },
    async validateStep(prevStep) {
      const res = await this.formRef.validate();
      const step = prevStep ?? this.step;

      if (res) {
        this.validated[step] = true;
        stepperStore.validated[step] = true;
        // Todo err logic
        // console.log("prev errors", [...this.errors]);
        this.errors = this.errors.filter((errstep) => errstep !== step);
        // console.log("filtered step", step, this.errors);
        return true;
      } else {
        this.validated[step] = false;
        stepperStore.validated[step] = false;

        this.errors.push(step);
        // console.log("pushed step", step, this.errors);
        return false;
      }
    },
    async trySubmit(e) {
      e?.preventDefault();
      // Check if all the steps are 'done'
      await this.validateStep();
      if (this.errors.length === 0) {
        return true;
      } else {
        this.setStep(this.errors[0]);
        return false;
        // this.$nextTick(async function () { f.$children[0].focus();
        // });
      }
    },
    setStep(step) {
      this.step = step;
      stepperStore.step = step;
    },
    rowsToTabs() {
      this.rows.length &&
        this.rows.forEach((tabRow) => {
          const res = fieldsToRows(tabRow, fbGlobal.values);
          this.filteredRows.push(res);
        });
      // Assign 'done' statuses
      for (let i = 0; i < this.filteredRows.length; i++) {
        this.validated[i] = false;
        stepperStore.validated[i] = false;
      }
    },
  },
  beforeMount() {
    this.rowsToTabs();
    stepperStore.tabLength = this.tabs.steps.length;
  },
  mounted() {
    // It doesn't exist before mount, although it happens in parent component
    this.formRef = fbGlobal.form.ref;
    const self = this;
    if (typeof fbGlobal.tabs === "boolean") fbGlobal.tabs = {};
    if (!fbGlobal.tabs.component)
      Object.defineProperty(fbGlobal.tabs, "component", {
        get() {
          return self;
        },
      });
  },

  watch: {
    rows: {
      handler() {
        // Reset case
        this.rowsToTabs();
        this.setStep(0);
      },
    },
  },
};
</script>

<style>
.q-stepper__nav.formButtons {
  padding: 0;
  border-top: 1px solid lightgray;
}
.fb-tabs .q-stepper__step-inner {
  padding: 0;
}
.q-stepper__header {
  padding: 0 2px;
}
.q-stepper__tab {
  border-left: 2px solid lightgray;
  border-right: 2px solid lightgray;
  border-radius: 2px;
  margin: 0 2px;
}
.fb-tabs {
  margin-top: 6px;
}
</style>