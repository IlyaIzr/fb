<template>
  <div id="q-app" style="min-height: 100vh" class="fb-mounting-point bg-white">
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
    fbGlobal.watcher ||= 1;
    const self = this;
    Object.entries(this.globalConfig).forEach(([key, val]) => {
      if (key === "fields") {
        return true;
      }

      Object.defineProperty(fbGlobal, key, {
        get() {
          return this["_" + key];
        },
        set(val) {
          this["_" + key] = val;
          fbGlobal.watcher += 1; //not using this ATM, but makes it observable
          self.globalConfig[key] = val;
        },
      });
      fbGlobal[key] = val;
    });
    fbGlobal.values = this.globalValues || {};
    fbGlobal.component = this;
  },
};
</script>
