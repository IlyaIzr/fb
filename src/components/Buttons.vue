<template>
  <div
    v-if="!fbGlobal.noButtons || fbGlobal.buttons === false"
    class="q-my-sm q-px-md"
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
    <!-- Next tab -->
    <q-btn
      v-if="buttons.next && step + 1 < tabLength"
      type="button"
      @click="$emit('next')"
      :class="common + buttons.next.class"
      v-bind="buttons.next"
    />
    <!-- Previous tab -->
    <q-btn
      v-if="buttons.back && step > 0"
      type="button"
      @click="$emit('back')"
      :class="common + buttons.back.class"
      v-bind="buttons.back"
    />

    <!-- ? __Right side__ ? -->
    <!-- Submit -->
    <q-btn
      v-if="(tabLength && step + 1 === tabLength) || buttons.submit"
      type="submit"
      @click="$emit('submit')"
      :class="common + buttons.submit.class"
      v-bind="buttons.submit"
    />
    <!-- Close momdal -->
    <q-btn
      v-if="buttons.close"
      type="button"
      v-close-popup
      :class="common + buttons.close.class"
      v-bind="buttons.close"
    />
  </div>
</template>

<script>
import { fbGlobal } from "src/arguments";
export default {
  name: "Buttons",
  props: {
    step: {
      type: Number,
      required: false,
    },
    tabLength: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      fbGlobal,
      common: 'q-mx-md '
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
  },
  beforeMount(){
    if (fbGlobal.tabs) this.common = 'q-mx-sm '
  }
};
</script>

<style>
</style>