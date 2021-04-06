import { fbGlobal } from "src/arguments"

function stringer(val, field) {
  if (!val) return ""
  if (typeof val === 'function') return val(fbGlobal, field)
  return String(val)
}
function booleaner(val, field) {
  if (typeof value === 'function') val = val(fbGlobal, field)
  return Boolean(val)
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
    writable(val, f) { booleaner(val, f) },
    "use-input"(val, f) { booleaner(val, f) },
    multiple(val, f) { booleaner(val, f) },
    
  }

}