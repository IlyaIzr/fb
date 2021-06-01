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
  group(val, f) {
    let number = numberer(val, f)
    if (number < 1) number = 1
    return number
  },
  groupLabel(val, f) { return stringer(val, f) },
  label(val, f) {
    let res = stringer(val, f)
    if (f.required && res?.[0] !== '*') res = '* ' + res
    return res
  },
  autocomplete(val, f) {
    if (val == 'off') return val
    const isOn = booleaner(val, f)
    if (isOn) return 'on'
    else return 'off'
  },
  hint(val, f) { return stringer(val, f) },
  requiredMessage(val, f) { return stringer(val, f) },
  metaValueKey(val, f) { return stringer(val, f) },

  required(val, f) { return booleaner(val, f) },
  clearable(val, f) { return booleaner(val, f) },
  disable(val, f) { return booleaner(val, f) },
  // migration / alias
  disabled(val, f) { return booleaner(val, f) },
  clearable(val, f) { return booleaner(val, f) }, //??
  "clear-icon"(val, f) { return stringer(val, f) || "close" },
  loading(val, f) { return booleaner(val, f) },
  service(val, f) {
    if (f.type === 'html' || f.type === 'button') return true
    return booleaner(val, f)
  },
  visible(val, f) {
    const res = booleaner(val, f)
    if (!res && !fbGlobal.global?.fields?.submitInvisible) f.service = this.service(true, f)
    if (res && f.service !== undefined) f.service = this.service(false, f)
    return res
  },
  metaShouldSumbmit(val, f) { return booleaner(val, f) },

  rules(val, f) {
    let res = arrayer(val, f)
    if (!res?.[0]) res = []
    return res
  },

  onInput(val) { return inputMethods(val) },
  onFocus(val) { return inputMethods(val) },
  onBlur(val) { return inputMethods(val) },

  meta(metaObj, f) {
    const metaValKey = f.metaValueKey || 'value'
    if (metaObj[metaValKey]) {
      f.value = metaObj[metaValKey]
    }
    return metaObj
  }
}

const textMeta = {
  ...commonProps,
  mask(val, f) { return stringer(val, f) },
  prefix(val, f) { return stringer(val, f) },
  suffix(val, f) { return stringer(val, f) },
  autogrow(val, f) { return booleaner(val, f) },
}

export const validator = {
  text: {
    ...textMeta,
    value(val, f) { return stringer(val, f) },
  },
  password: {
    ...textMeta,
    value(val, f) { return stringer(val, f) },
  },
  email: {
    ...textMeta,
    value(val, f) { return stringer(val, f) },
  },
  number: {
    ...textMeta,
    value(val, f) { return numberer(val, f) },
  },
  time: {
    ...textMeta,
    value(val, f) { return stringer(val, f) },
  },
  dateNative: {
    ...textMeta,
    value(val, f) { return stringer(val, f) },
  },
  textarea: {
    ...textMeta,
    value(val, f) { return stringer(val, f) },
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
    options(val, f) { return arrayer(val, f) },

  },
  creatable: {
    ...commonProps,
    value(val, f) { return arrayer(val, f) },
    multiple() { return true },
    options() { return [] },
    createOptionMsg(val, f) { return stringer(val, f) },
    'use-chips'() { return true },

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

  },

  button: {
    ...commonProps,
    value(val, f) { return stringer(val, f) },
    color(val, f) { return stringer(val, f) },
    size(val, f) { return stringer(val, f) },
  },

  file: {
    ...commonProps,
    value(val, f) { return typeof val === 'object' ? val : null },
    rawData(val, f) { return booleaner(val, f) },
    multiple(val, f) { return booleaner(val, f) },
    'max-files'(val, f) { return numberer(val, f) },
    'max-file-size'(val, f) { return numberer(val, f) },
    accept(val, f) { return stringer(val, f) },
  },
}


export function defaultProps(field) {
  // Required props
  field.type ??= "text";
  field.value ??= ""
  field.service ??= false
  field.visible ??= true
  field.hint ??= "" //for styles
  field.clear = function () {
    this.component.clear()
  }
  field.reset = function () {
    this.component.reset()
  }
  field.rerender = function () {
    this.component?.rerender?.()
  }
  // field.autocomplete ??= false

  // Additional default props
  if (field.clearable === undefined) field.clearable = true
  if (field["clear-icon"] === undefined) field["clear-icon"] = "close"
  if (field.required === undefined) field.required = false
  if (field.visible === undefined) field.visible = true
  if (typeof field.rules !== 'object') field.rules = []

  if (field.required && !field.label) field.label = '*'

  return field
}

export const simpleTypes = [
  "text",
  "password",
  "textarea",
  "email",
  "number",
  "time",
  "dateNative",
];

export const allowedTypes = new Set([
  "select",
  "creatable",
  "multiple",
  "slider",
  "date",
  "checkbox",
  "html",
  "editor",
  "button",
  "file"
]);

export const serviceFields = new Set([
  "html",
  "button",
]);