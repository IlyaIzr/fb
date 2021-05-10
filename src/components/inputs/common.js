import { fbGlobal, initConfig } from "src/arguments";

export const commonMethods = {
  async onInput(val) {
    let cb;
    if (this.rest?.onInput) {
      cb = await this.rest.onInput(fbGlobal, this, val);
    }
    this.rest.value = val;
    if (this.rest.meta) {
      const valKey = this.rest.metaValueKey || 'value'
      this.rest.meta[valKey] = val // cause value been validated
    }

    if (typeof cb === "function") await cb(fbGlobal, this, val);
  },

  // Exeption: Multiple
  async onFocus() {
    if (this.rest.onFocus) {
      const cb = await this.rest.onFocus(fbGlobal, this);
      if (typeof cb === "function") await cb(fbGlobal, this);
    }
  },

  // Exeption: Multiple
  async onBlur(e) {
    if (this.rest?.onBlur) {
      const cb = await this.rest.onBlur(fbGlobal, this);
      if (typeof cb === "function") await cb(fbGlobal, this, e);
    }
  },

  reset() {
    fbGlobal.fields[this.keyName] = { ...initConfig.fields[this.keyName] }
  },

  rerender() {
    this.$forceUpdate()
  },

  // Exeption: Multiple
  clear() {
    this.onInput('')
  },

}

export const strMethods = {
}

// helper function
export function wrapedUserRules(rules, fbGlobal, metaValue) {
  const res = []
  rules.forEach(ruleFunction => {
    const functionToPush = (val) => {
      return ruleFunction(val, fbGlobal.getFormValues(), fbGlobal, metaValue)
    }
    res.push(functionToPush)
  })
  return res
}

// Validation Rules
// used for: Simple, Checkbox 
// Exeptions: Date, Editor, File, SelectInput, Slider
export const computedRulesBool = {
  rules() {
    return checkRulesBool(
      this.rest.rules,
      this.rest.required,
      this.rest.requiredMessage
    )
  }
}
// helper function
function checkRulesBool(rules, required, requiredMessage, metaValue) {
  let res = wrapedUserRules(rules, fbGlobal, metaValue)
  if (required) {
    res = [
      (val) => Boolean(val) || requiredMessage || "Please fill",
      ...res,
    ];
  }
  return res;
}

// Used for: slider
export function checkRulesNum(rules, required, requiredMessage) {
  let res = wrapedUserRules(rules, fbGlobal, metaValue)
  if (required) {
    res = [
      (val) => Number(val) > 0 || requiredMessage || "Please fill",
      ...res,
    ];
  }
  return res;
}

// Exeptions: Attachments, Calendar 
export function onMountCommon(fieldComponent, fieldConfig) {
  if (!fieldConfig.component) Object.defineProperty(fieldConfig, 'component', {
    get() {
      return fieldComponent
    }
  })
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