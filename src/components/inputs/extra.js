import { fbGlobal, globalArg } from "src/arguments";
// import { valueStore, configStore } from "../../store";

// Exeptions: Multiple
export const commonMethods = {
  onFocus(e) {
    if (this.rest?.onFocus) {
      const cb = this.rest.onFocus(fbGlobal)
      if (typeof cb === 'function') cb(this)
    }
  },
  onBlur(e) {
    this.$emit("blur", e);
  },
  input(val) {
    this.onInput(val);
  },

  clear() {
    this.setValue("");
    this.$nextTick(function () {
      this.$refs.input.resetValidation();
    });
  },

  getStoreValue() {
    let res;
    if (this.rest.multiKey)
      res = valueStore.getValueByKey(
        this.rest.key,
        this.rest.multiKey,
        this.rest.multiIndex
      );
    else res = valueStore.getValueByKey(this.rest.key);
    // console.log(res); // returns f()
    return res;
  },
  setConfig(arg1 = "", arg2) {
    if (arguments.length === 2) {
      // Case 2 arg
      if (arg1) this.storeConfig({ [arg1]: arg2 });
      else console.log("WARNING! No name provided!");
    } else if (arguments.length === 1) {
      // Case 1 arg
      if (arg1 && typeof arg1 === "object") this.storeConfig(arg1);
      else console.log("WARNING! No value object provided!");
    }
  },

}

// Exeptions: Multiple
export const methods = {

  onInput(val) {
    this.storeValue(val);
    this.$emit("input", val);
  },

  reset() {
    this.setConfig(this.archiveRest);
    this.setValue(this.archiveRest.value);
    this.$nextTick(function () {
      this.$refs.input?.resetValidation?.();
    });
  },


  // Store actions
  storeValue(val) {
    if (this.rest.multiKey)
      valueStore.updateKeyValue(
        this.rest.key,
        val,
        this.rest.multiKey,
        this.rest.multiIndex
      );
    else valueStore.updateKeyValue(this.rest.key, val);
    const recieved = this.getStoreValue();
    this.value = recieved
  },
  storeConfig(obj) {
    if (this.rest.multiKey) {
      configStore.set(
        this.rest.key,
        obj,
        this.rest.multiKey,
        this.rest.multiIndex
      );
      this.$parent.rest = configStore.get(
        this.rest.key,
        this.rest.multiKey,
        this.rest.multiIndex
      );
    } else {
      configStore.set(this.rest.key, obj);
      this.$parent.rest = configStore.get(this.rest.key);
    }
  },
  setValue(val) { // candidate to common
    this.storeValue(val);
  },
}


// Exeptions: Date, Editor, File, Html, SelectInput, Slider
export function checkRulesStr(rules, required, requiredMessage) {
  let res = rules
  if (required) {
    res = [
      (val) => Boolean(val) || requiredMessage || "Please fill",
      ...rules,
    ];
  }
  return res;
}


// Exeptions: Slider

// Exeptions: Multiple
export const watchers = {

  "valueStore.state.watcher": function () {
    console.log('watched');
    const val = this.getStoreValue();
    console.log(val, "any");
    if (val !== this.value) {
      this.value = val;
    }
  },

  "this.rest.visible": function () {
    if (this.rest.hasOwnProperty("visible") && !this.rest.visible) {
      this.$parent.$el.parentNode.className += " hidden";
    }
  },
}

export function shouldEval(key, val) {
  if (typeof val !== 'function') {
    return false
  } else if (
    key === 'onInput' ||
    key === 'onFocus' ||
    key === 'onBlur'
  ) {
    return false
  } else return true
}