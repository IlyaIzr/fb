import { fbGlobal } from "src/arguments"

function stringer(val, field) {
  if (!val) return ""
  if (typeof val === 'function') return val(fbGlobal, field)
  if (typeof val === 'string') return val
  return String(val)
}
function booleaner(val, field) {
  if (typeof val === 'function') val = val(fbGlobal, field)
  return Boolean(val)
}
function arrayer(val, field) {
  if (typeof val === 'function') val = val(fbGlobal, field)
  if (Array.isArray(val)) return val
  return Array(val)
}

const commonProps = {
  label(val, f) { stringer(val, f) },
  hint(val, f) { stringer(val, f) }

}

export const validator = {
  text: {
    ...commonProps,
    value(val, f) { stringer(val, f) },
  },
  select: {
    ...commonProps,
    value(val, f) {
      if (f.multiple) return arrayer(val, f)
      return stringer(val, f)
    },
    writable(val, f) { booleaner(val, f) },
    "use-input"(val, f) { booleaner(val, f) },
    multiple(val, f) { booleaner(val, f) },

  }

}