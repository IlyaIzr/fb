import { fbGlobal } from "src/arguments"

function stringer(val, field) {
  if (!val || typeof val === 'object') return ""
  if (typeof val === 'function') val = val(fbGlobal, field)
  if (typeof val === 'string') return val
  return String(val)
}
function booleaner(val, field) {
  if (typeof val === 'function') val = val(fbGlobal, field)
  return Boolean(val)
}
function arrayer(val, field) {
  if (!val) return []
  if (typeof val === 'function') val = val(fbGlobal, field)
  if (Array.isArray(val)) return val
  return Array(val)
}
function numberer(val, field) {
  if (val === undefined) val = 0
  if (typeof val === 'function') val = val(fbGlobal, field)
  if (isNaN(val)) return 0
  return Number(val)
}
function inputMethods(val) {
  if (typeof val === 'function') return val
  return undefined
}


const commonProps = {
  label(val, f) { return stringer(val, f) },
  hint(val, f) { return stringer(val, f) },
  requiredMessage(val, f) { return stringer(val, f) },

  required(val, f) { return booleaner(val, f) },
  clearable(val, f) { return booleaner(val, f) },
  disable(val, f) { return booleaner(val, f) },
  service(val, f) { return booleaner(val, f) },
  visible(val, f) { return booleaner(val, f) },

  rules(val, f) { return arrayer(val, f) },

  onInput(val) { return inputMethods(val) },
  onFocus(val) { return inputMethods(val) },
  onBlur(val) { return inputMethods(val) },
}

export const validator = {
  text: {
    ...commonProps,
    value(val, f) { return stringer(val, f) },
    row(val, f) {
      let number = numberer(val, f)
      if (number < 1) number = 1
      return number
    },
    order(val, f) {
      let number = numberer(val, f)
      if (number < 1) number = 1
      return number
    },

    clearable(val, f) { return booleaner(val, f) },
    "clear-icon"(val, f) { return stringer(val, f) || "close" },
    mask(val, f) { return stringer(val, f) },
  },
  select: {
    ...commonProps,
    value(val, f) {
      if (f.multiple) return arrayer(val, f)
      return stringer(val, f)
    },
    writable(val, f) { return booleaner(val, f) },
    "use-input"(val, f) { return booleaner(val, f) },
    "use-chips"(val, f) { return booleaner(val, f) },
    multiple(val, f) { return booleaner(val, f) },

  },
  multiple: {
    ...commonProps,
    value(val, f) { return arrayer(val, f) },

  },
  slider: {
    ...commonProps,
    value(val, f) { return numberer(val, f) },
    showValue(val, f) { return booleaner(val, f) },
    reverse(val, f) { return booleaner(val, f) },

    min(val, f) { return numberer(val, f) },
    max(val, f) { return numberer(val, f) },
    step(val, f) { return numberer(val, f) },

  },

  date: {
    ...commonProps,
    value(val, f) {
      if (!f.range) return stringer(val, f)
    },

    range(val, f) { return booleaner(val, f) },
    withInput(val, f) { return booleaner(val, f) },

    inputMask(val, f) { return stringer(val, f) },
    mask(val, f) { return stringer(val, f) },
  },

  checkbox: {
    ...commonProps,
    value(val, f) { return booleaner(val, f) },

  },

  html: {
    ...commonProps,
    value(val, f) { return stringer(val, f) },

  },

  editor: {
    ...commonProps,
    value(val, f) { return stringer(val, f) },
    placeholder(val, f) { return stringer(val, f) },

  }

}


export function defaultProps(field) {
  // Required props
  field.type ??= "text";
  field.value ??= ""

  // Additional default props
  if (field.clearable === undefined) field.clearable = true
  if (field["clear-icon"] === undefined) field["clear-icon"] = "close"
  if (field.required === undefined) field.required = true
  if (field.visible === undefined) field.visible = true
  if (typeof field.rules !== 'object') field.rules = []


  return field
}