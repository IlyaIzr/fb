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
      const cb = await this.rest.onFocus(fbGlobal, this, this.rest);
      if (typeof cb === "function") await cb(fbGlobal, this, this.rest);
    }
  },


  // Exeption: Multiple
  async onBlur(e) {
    if (this.rest?.onBlur) {
      const cb = await this.rest.onBlur(fbGlobal, this, this.rest);
      if (typeof cb === "function") await cb(fbGlobal, this, e);
    }
  },
  
  reset() {
    fbGlobal.fields[this.keyName] = { ...initConfig[this.keyName] }
  },

  // Exeption: Multiple
  rerender() {
    this.$forceUpdate()
  },

  // Exeption: Multiple
  clear() {
    this.onInput('')
  },

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
// Exeptions: Multiple, TODO Calendar
export const computedRules = {
  rules() {
    return getRules(
      this.rest.rules,
      this.rest.required,
      this.rest.requiredMessage,
      this.rest.metaValue,
      this.rest
    )
  }
}
// Rules wrapper
function getRules(rules, required, requiredMessage, metaValue, rest) {
  let res = wrapedUserRules(rules, fbGlobal, metaValue)
  const reqMsg = requiredMessage || 'Please fill'
  const type = rest.type
  let baseCheckFunction

  if (required) {
    if (type === 'select' && rest.multiple)
      baseCheckFunction = (val) => (val && val.length) || reqMsg

    if (type === 'date' && !rest.range)
      baseCheckFunction = (dateString) =>
        (dateString.split(".")[0] < 32 &&
          dateString.split(".")[1] < 13 &&
          dateString.split(".")[2] > 1900) ||
        reqMsg

    if (type === 'date')
      baseCheckFunction = (str) => {
        const obj = rest.value;
        if (!str || str.length < 23) return reqMsg;
        const { from, to } = obj;
        let [day, month, year] = from.split(".");
        if (day > 31 || month > 12 || year < 1900) return reqMsg;
        [day, month, year] = to.split(".");
        if (day > 31 || month > 12 || year < 1900) return reqMsg;
        return true;
      }

    if (type === 'slider') baseCheckFunction = val => Number(val) > 0 || reqMsg

    baseCheckFunction = (val) => Boolean(val) || reqMsg


  } else if (type === 'date') {
    // Case date not required
    // Still need correct date
    if (rest.range) baseCheckFunction = (str) => {
      if (!str) return true
      const obj = rest.value;
      if (!str || str.length < 23) return reqMsg;
      const { from, to } = obj;
      let [day, month, year] = from.split(".");
      if (day > 31 || month > 12 || year < 1900) return reqMsg;
      [day, month, year] = to.split(".");
      if (day > 31 || month > 12 || year < 1900) return reqMsg;
      return true;
    }
    else baseCheckFunction = (dateString) =>
    Boolean(dateString) === false ||
    (dateString.split(".")[0] < 32 &&
      dateString.split(".")[1] < 13 &&
      dateString.split(".")[2] > 1900) ||
    reqMsg
  }
  
  res = [baseCheckFunction, ...res,];

  return res
}


// Exeptions: Multiple, Editor(no slots)
export const computedAttachments = {
  innerLeft() {
    let conf = {};
    if (!this.rest.innerLeft) return null;
    conf = this.rest.innerLeft;
    if (!conf.type) return null;
    return conf;
  },
  innerRight() {
    let conf = {};
    if (!this.rest.innerRight) return null;
    conf = this.rest.innerRight;
    if (!conf.type) return null;
    return conf;
  },
}

// Exeptions: Calendar 
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