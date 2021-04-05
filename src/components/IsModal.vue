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
      modalConfig: this.settings.modal,
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
    fbGlobal.modal.component = this;
    Object.defineProperty(fbGlobal.modal, "element", {
      get() {
        return this?.component?.$el;
      },
    });
    fbGlobal.modal.closeModal = () => (this.isOpen = false);
  },
};
</script>

<style>
</style>