import { serviceFields } from "./components/inputs/validator";

export const initConfig = {}

export const fbGlobal = {
  form: {},
  getFormValues() {
    const values = {};
    Object.entries(this.fields)?.forEach(([key, config]) => {
      if (config.service === true) return;
      // Case multiple
      if (config.type === "multiple") {
        values[config.key] = [];
        config.fields?.length &&
          config.fields.forEach((row, multiIndex) => {
            // Check if it is in the values
            if (!config.value[multiIndex]) return;
            Object.entries(row).forEach(([fieldKey, fieldConfig]) => {
              if (fieldConfig.service === true) return;
              if (!values[config.key][multiIndex])
                values[config.key][multiIndex] = {};

              if (fieldConfig.metaShouldSumbmit)  // case meta submit
                return values[config.key][multiIndex][fieldKey] = fieldConfig.meta

              return values[config.key][multiIndex][fieldKey] = fieldConfig.value;
            });
          });
        return;
      }
      // Case simple
      // case meta submit
      if (config.metaShouldSumbmit) return values[config.key] = config.meta

      return values[config.key] = config.value;
    });
    return values
  },
  resetFormInputs() {
    const fields = this.fields

    Object.keys(fields).forEach((key) => {
      key = String(key).replace("_", "");

      Object.keys(fields[key]).forEach((prop) => {
        // Case multiple
        if (prop === "fields") return;
        // TODO to be tested is this necessary?
        // if (prop === 'settings') {
        //   // Reset settings
        //   this.fields[key].settings = {}

        //   const settings = this.fields[key].settings
        //   const initSettings = initConfig[key].settings
        //   // fields[key].settings = {}
        //   // console.log({ ...this.fields[key].settings });
        //   Object.entries(initSettings).forEach(([fKey, conf]) => {
        //     // Define setting field as empty object

        //     if (fKey in initSettings) {
        //       settings[fKey] = conf;
        //     }
        //     else delete settings[fKey];
        //   })
        //   return;
        // }

        // rest actions
        if (prop in initConfig[key])
          fields[key][prop] = initConfig[key][prop];
        else delete fields[key][prop];
      });

      // rerender needed because values persists for second reset
      fields[key].component?.rerender();
    });

    this.form.component.computeRawsTrigger += 1;
  },
  clearFormInputs() {
    const fields = this.fields

    Object.entries(fields).forEach(([key, config]) => {
      if (config.type === "multiple") {
        config.fields?.length &&
          config.fields.forEach((row, multiIndex) => {
            Object.entries(row).forEach(([fieldKey, fieldConfig]) => {
              fieldConfig.value = "";
            });
          });
        return true;
      }
      if (serviceFields.has(config.type)) return;

      key = String(key).replace("_", "");
      fields[key].value = "";
    });

    this.form.component.$nextTick(() => {
      this.form.ref.resetValidation();
    });
  }
}

export const stepperStore = new Proxy({ watcher: 1, step: 0, tabLength: 1, validated: [] }, {
  set: function (field, prop, value) {
    field.watcher += 1
    field[prop] = value;
    return true;
  },
})

export const prevVisibility = {}

// const a = {
//   methos: {
//     onA() {
//       console.log('init func');
//     }
//   }
// }
// const b = { ...a }
// a.methos.onA = () => console.log('neuve func');

// b.methos.onA()