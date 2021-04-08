import { fbGlobal } from "src/arguments";

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
  onInput(val) {
    this.storeValue(val);
    this.$emit("input", val);
  },

  clear() {
    this.setValue("");
    this.$nextTick(function () {
      this.$refs.input.resetValidation();
    });
  },


  reset() {
    this.setConfig(this.archiveRest);
    this.setValue(this.archiveRest.value);
    this.$nextTick(function () {
      this.$refs.input?.resetValidation?.();
    });
  },
}

// Exeptions: Multiple
export const methods = {}


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