export const fbGlobal = {
}
export const initConfig = {
}

export const stepperStore = new Proxy({ watcher: 1, step: 0, tabLength: 1, validated: [] }, {
  set: function (field, prop, value) {
    field.watcher += 1
    field[prop] = value;
    return true;
  },
})