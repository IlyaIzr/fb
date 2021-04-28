<template>
  <div
    v-if="!fbGlobal.noButtons || fbGlobal.buttons === false"
    class="fb-form-buttons q-my-md q-px-md"
  >
    <!-- Reset -->
    <q-btn
      v-if="buttons.reset"
      type="reset"
      @click="$emit('reset')"
      :class="common + buttons.reset.class"
      v-bind="buttons.reset"
    />
    <!-- Clear -->
    <q-btn
      v-if="buttons.clear"
      type="button"
      @click="$emit('clear')"
      :class="common + buttons.clear.class"
      v-bind="buttons.clear"
    />
    <!-- Previous tab -->
    <q-btn
      v-if="buttons.back && step > 0"
      type="button"
      @click="$emit('back')"
      :class="common + buttons.back.class"
      v-bind="buttons.back"
    />
    <!-- Next tab -->
    <q-btn
      v-if="buttons.next && step + 1 < tabLength"
      type="button"
      @click="$emit('next')"
      :class="common + buttons.next.class"
      v-bind="buttons.next"
    />

    <!-- ? __Right side__ ? -->
    <!-- Close modal -->
    <q-btn
      v-if="buttons.close"
      type="button"
      v-close-popup
      :class="common + buttons.close.class"
      v-bind="buttons.close"
    />
    <!-- Submit -->
    <q-btn
      v-if="canSubmit"
      type="button"
      @click="$emit('submit')"
      :class="common + buttons.submit.class"
      v-bind="buttons.submit"
    />
  </div>
</template>

<script>
import { fbGlobal, stepperStore } from "src/arguments";
export default {
  name: "Buttons",
  props: {},
  data() {
    return {
      fbGlobal,
      stepperStore,
      common: "q-mr-md ",
      step: stepperStore.step,
      tabLength: stepperStore.tabLength,
      validated: stepperStore.validated,
    };
  },
  computed: {
    buttons() {
      // default
      let res = {
        submit: { label: "Отправить", color: "primary" },
        // reset: { label: "Сбросить" },
      };

      if (fbGlobal.modal) res.close = { label: "Закрыть", color: "warning" };

      if (fbGlobal.tabs) {
        // delete res.reset;
        res.next = { label: "Далее" };
        res.back = { label: "Назад" };
      }

      if (fbGlobal.buttons && typeof fbGlobal.buttons === "object")
        Object.entries(fbGlobal.buttons).forEach(([key, conf]) => {
          if (typeof conf === "string") res[key] = { label: conf };
          else res[key] = conf;
        });
      return res;
    },
    canSubmit() {
      let res = true;
      if (!this.tabLength) return res;
      if (this.step + 1 === this.tabLength) return res;
      const s = this.validated.find((e) => e === false);
      if (s === undefined) return res;
      else return false;
    },
  },
  beforeMount() {
    if (fbGlobal.tabs) this.common = "q-mx-sm ";
  },
  mounted() {
    const self = this;
    if (!fbGlobal.buttons) fbGlobal.buttons = {};
    if (!fbGlobal.buttons.component)
      Object.defineProperty(fbGlobal.buttons, "component", {
        get() {
          return self;
        },
      });
  },
  watch: {
    stepperStore: {
      handler(val) {
        this.step = val.step;
        this.validated = val.validated;
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>