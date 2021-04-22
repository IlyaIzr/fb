import { fbGlobal } from "src/arguments";

// Exeptions: Multiple
export const commonMethods = {
  async onFocus() {
    if (this.rest.onFocus) {
      const cb = await this.rest.onFocus(fbGlobal, this);
      if (typeof cb === "function") await cb(fbGlobal, this);
    }
  },
  async onBlur(e) {
    if (this.rest?.onBlur) {
      const cb = await this.rest.onBlur(fbGlobal, this);
      if (typeof cb === "function") await cb(fbGlobal, this, e);
    }
  },

  clear() {
    console.log('TODO TBD');
  },


  reset() {
    console.log('TODO TBD');
  },
}

// Exeptions: Multiple
export const strMethods = {
  async onInput(val) {
    let cb;
    if (this.rest?.onInput) {
      cb = await this.rest.onInput(fbGlobal, this, val);
    }
    this.rest.value = val;

    if (typeof cb === "function") await cb(fbGlobal, this, val);
  },
}


// Exeptions: Date, Editor, File, Html, SelectInput, Slider
export function checkRulesBool(rules, required, requiredMessage) {
  let res = rules
  if (required) {
    res = [
      (val) => Boolean(val) || requiredMessage || "Please fill",
      ...rules,
    ];
  }
  return res;
}
export function checkRulesNum(rules, required, requiredMessage) {
  let res = rules
  if (required) {
    res = [
      (val) => Number(val) > 0 || requiredMessage || "Please fill",
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