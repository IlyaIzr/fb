<template>
  <div v-if="isModal" class="fb-modal">
    <q-dialog v-model="isOpen" v-bind="modalConfig">
      <Form :settings="settings" :values="values" />
    </q-dialog>

    <q-btn
      v-if="modalConfig.triggerButton"
      v-bind="modalConfig.triggerButton"
      @click="isOpen = !isOpen"
    />
  </div>

  <Form v-else :settings="settings" :values="values" />
</template>

<script>
import Form from "./Form";
import { fbGlobal } from "src/arguments";
export default {
  name: "IsModal",
  components: { Form },
  data() {
    return {
      isModal: Boolean(this.settings.modal),
      isOpen: this.settings.modal?.isOpen === false ? false : true,
      modalConfig:
        typeof this.settings.modal === "object" ? this.settings.modal : {},
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
  beforeMount() {
    if (!fbGlobal.modal) return;
    // fbGlobal
    if (typeof fbGlobal.modal !== "object") fbGlobal.modal = {};
    if (!fbGlobal.modal.component)
      Object.defineProperty(fbGlobal.modal, "component", {
        get() {
          return this;
        },
      });
    fbGlobal.modal.closeModal = () => (this.isOpen = false);
  },
};
</script>

<style>
.q-dialog__inner--minimized .fb-form {
  max-height: unset;
}
.q-dialog__inner--minimized .fb-form-content {
  max-height: calc(100vh - 200px);
}
/* Case maximized */
.q-dialog__inner--maximized .fb-form {
  max-height: 100vh;
  overflow-y: hidden;
}
.q-dialog__inner--maximized .fb-form-content {
  max-height: calc(100vh - 100px);
}
.q-dialog__inner--maximized .fb-form-buttons.q-my-md {
  margin-top: 10px;
}
</style>