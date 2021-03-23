<template>
  <div id="q-app" style="min-height: 100vh" class="bg-white">
    <IsModal
      v-if="globalConfig && globalConfig.fields"
      :settings="globalConfig"
      :values="globalValues"
    />
  </div>
</template>

<script>
import { formConfig, values } from "./fake";
import IsModal from "./components/IsModal";
import { fbGlobal } from "./arguments";
export default {
  name: "App",
  data() {
    return {
      globalConfig: formConfig,
      globalValues: values,
      fbGlobal,
    };
  },
  components: { IsModal },
  beforeMount() {
    if (!this.globalConfig?.fields)
      console.log("no config or fields provided to form-builder");

    // fbGlobal

    Object.entries(this.globalConfig).forEach(([key, val]) => {
      if (key !== "fields") fbGlobal[key] = val;
    });
    fbGlobal.values = this.globalValues;
    fbGlobal.component = this;
    Object.defineProperty(fbGlobal, "element", {
      get() {
        return this?.component?.$el;
      },
    });
  },
};
</script>
