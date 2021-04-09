import { fbGlobal } from "src/arguments";

// Exeptions: Multiple
export const commonMethods = {
  async onFocus(e) {
    if (this.rest?.onFocus) {
      const cb = await this.rest.onFocus(fbGlobal);
      if (typeof cb === "function") await cb(fbGlobal, this, e);
    }
  },
  async onBlur(e) {
    if (this.rest?.onBlur) {
      const cb = await this.rest.onBlur(fbGlobal);
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
  onInput(val) {
    let cb;
    if (this.rest?.onInput) {
      cb = this.rest.onInput(fbGlobal, this, val);
    }
    this.rest.value = val;

    if (typeof cb === "function") cb(fbGlobal, this, val);
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