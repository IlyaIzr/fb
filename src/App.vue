<template>
  <div id="q-app" style="min-height: 100vh" class="bg-white">
    <IsModal v-if="globalConfig" :settings="fbGlobal" :values="globalValues" />
  </div>
</template>

<script>
import { formConfig, values } from "./fake";
import IsModal from "./components/IsModal";
import { appInfo } from "./store";
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
    if (!this.globalConfig) console.log("no config provided to form-builder");
    appInfo.setRootComponent(this);

    // fbGlobal

    Object.entries(this.globalConfig).forEach(([key, val]) => {
      if (key === "fields") {
        fbGlobal["initialFields"] = val;
      }
      fbGlobal[key] = val;
    });
    fbGlobal.values = this.globalValues;
    fbGlobal.component = this;
  },
};
</script>
