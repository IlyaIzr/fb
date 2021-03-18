import { appInfo } from "./store"

export const globalArg = (some) => {
  const res = appInfo.state.config || {}

  res.component = appInfo.root
  res.element = res.component.$el
  res.form = res.form || {}

  const form = res.form
  form.component = res.component.$children[0];
  form.element = res.component.$children[0].$el


  return res
}

export const fbGlobal = {
  get element() { return this?.component?.$el },
  get watcher() { return this.w },
  set watcher(v) { this.w = String(v + Math.random) }
}