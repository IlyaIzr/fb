<template>
  <div class="q-my-sm">
    <q-btn
      v-if="resBtn.type"
      type="reset"
      @click="$emit('reset')"
      :label="resBtn.label"
      :color="resBtn.color"
      :text-color="resBtn.textColor"
      :class="resBtn.class"
    />
    <q-btn
      v-if="clearBtn.type"
      @click="$emit('clear')"
      type="button"
      :label="clearBtn.label"
      :color="clearBtn.color"
      :text-color="clearBtn.textColor"
      :class="clearBtn.class"
    />
    <q-btn
      :label="subBtn.label"
      type="submit"
      @click="$emit('submit')"
      :color="subBtn.color"
      :text-color="subBtn.textColor"
      :class="subBtn.class"
    />
    <q-btn
      v-if="closeBtn.type && modal"
      v-close-popup
      :label="closeBtn.label"
      type="button"
      :color="closeBtn.color"
      :text-color="closeBtn.textColor"
      :class="closeBtn.class"
    />
  </div>
</template>

<script>
export default {
  name: "Buttons",
  props: {
    buttons: {
      type: Array,
      required: false,
      default: () => [
        { type: "submit", label: "Отправить" },
        { type: "reset", label: "Сбросить" },
      ],
    },
    modal: {
      type: Object || undefined,
      required: false,
    },
  },
  computed: {
    subBtn() {
      let res = {};
      this.buttons.map((btn) => {
        if (btn.type === "submit") {
          !btn.color ? (btn.color = "primary") : null;
          btn.class += " q-ml-sm";
          res = { ...btn };
        }
      });
      return res;
    },
    resBtn() {
      let res = {};
      this.buttons.map((btn) => {
        if (btn.type === "reset") {
          !btn.color ? (btn.color = "primary") : null;
          res = { ...btn };
        }
      });
      return res;
    },
    clearBtn() {
      let res = {};
      this.buttons.map((btn) => {
        if (btn.type === "clear") {
          !btn.color ? (btn.color = "primary") : null;
          res = { ...btn };
        }
      });
      return res;
    },
    closeBtn() {
      let res = {};
      this.buttons.map((btn) => {
        if (btn.type === "closeModal" || btn.type === "close") {
          !btn.color ? (btn.color = "warning") : null;
          btn.class += " q-ml-sm";
          res = { ...btn };
        }
      });
      return res;
    },
  },
};
</script>

<style>
</style>