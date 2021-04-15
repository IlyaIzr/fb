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
      <RowMapper
        v-if="filteredRows[index]"
        :rows="filteredRows[index]"
      />
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation class="formButtons">
        <Buttons
          @submit="trySubmit"
          @reset="$emit('reset')"
          @clear="$emit('clear')"
          @next="onNextClick"
          @back="onBackClick"
          :step="step"
          :tabLength="tabs.steps.length"
          :validated="validated"
        />
        <!-- <q-btn label="testo" @click="testo"></q-btn> -->
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script>
import RowMapper from "./RowMapper";
import Buttons from "./Buttons";
import { fbGlobal } from "src/arguments";
import { fieldsToRows } from "./toRows";
export default {
  name: "Stepper",
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
      if (t && t.steps && Object.keys(t).length) {
        Object.keys(t).forEach((key) => (res[key] = t[key]));
      } else if (t) {
        const diff = this.rows.length - 2;
        for (let i = 0; i < diff; i++) {
          res.steps.push({ title: "" });
        }
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
      let res;
      if (this.tabs.validateTabNavigation) {
        // Form validation
        res = await this.formRef.validate();
        if (res) this.step = val;
      } else this.step = val;
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
        // Todo err logic
        // console.log("prev errors", [...this.errors]);
        this.errors = this.errors.filter((errstep) => errstep !== step);
        // console.log("filtered step", step, this.errors);
        return true;
      } else {
        this.validated[step] = false;
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
        console.log('emitting');
        this.$emit("submit");
      } else {
        this.step = this.errors[0];
        // this.$nextTick(async function () { f.$children[0].focus();
        // });
      }
    },
  },
  beforeMount() {
    this.rows.length &&
      this.rows.forEach((tabRow) => {
        const res = fieldsToRows(tabRow, fbGlobal.values);
        this.filteredRows.push(res);
      });
    // Assign 'done' statuses
    for (let i = 0; i < this.filteredRows.length; i++) {
      this.validated[i] = false;
    }
  },
  mounted() {
    // It doesn't exist before mount, although it happens in parent component
    this.formRef = fbGlobal.methods?.component?.$refs.form;
  },
};
</script>

<style>
.q-stepper__nav.formButtons{
  padding: 0;
  border-top: 1px solid lightgray;
}
.fb-tabs .q-stepper__step-inner{
  padding: 0;

}
</style>