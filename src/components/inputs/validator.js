import { fbGlobal } from "src/arguments"

function stringer(val, field) {
  if (!val || typeof val === 'object') return ""
  if (typeof val === 'function') return val(fbGlobal, field)
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
  val = Number(val)
  if (isNaN(val)) return 0
  return val
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
  },
  select: {
    ...commonProps,
    value(val, f) {
      if (f.multiple) return arrayer(val, f)
      return stringer(val, f)
    },
    writable(val, f) { return booleaner(val, f) },
    "use-input"(val, f) { return booleaner(val, f) },
    multiple(val, f) { return booleaner(val, f) },

  },
  multiple: {
    ...commonProps,
    value(val, f) { return arrayer(val, f) },

  }

}

// TBC
export function defaultProps(field) {
  // Required props
  field.type ??= "text";
  field.value ??= ""

  // Additional default props
  // if (field.clearable === undefined) field.clearable = true
  if (field.required === undefined) field.required = true
  if (typeof field.rules !== 'object') field.rules = []


  return field
}