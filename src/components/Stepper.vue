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
  >
    <q-step
      v-for="(tab, index) in tabs.steps"
      v-bind:key="index"
      :name="index"
      :title="tab.title"
      :icon="tab.icon || 'settings'"
      :error="Boolean(errors.find((el) => el === Number(index + 1)))"
    >
      <RowMapper
        v-if="filteredRows[index]"
        :rows="filteredRows[index]"
        :settings="fbGlobal"
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
      if (t && Object.keys(t).length) {
        Object.keys(t).forEach((key) => (res[key] = t[key]));
      }
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
      if (this.tabs.validateButtonNavigation) {
        const res = await this.formRef.validate();
        if (res) this.$refs.stepper.next();
      } else this.step += 1;
    },
    async onBackClick() {
      if (this.tabs.validateButtonNavigation) {
        const res = await this.formRef.validate();
        if (res) this.$refs.stepper.previous();
      } else this.step -= 1;
    },
    async beforeStep(newVal, prevVal) {
      const res = await this.formRef.validate();

      if (res) this.errors = this.errors.filter((step) => step !== prevVal);
      else this.errors.push(prevVal);
    },
    async trySubmit(e) {
      e?.preventDefault();
      await this.beforeStep(null, this.step);
      if (this.errors.length === 0) {
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
  },
  mounted() {
    // It doesn't exist before mount, although it happens in parent component
    this.formRef = fbGlobal.methods?.component?.$refs.form;
  },
};
</script>

<style>
</style>