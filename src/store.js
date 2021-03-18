
export const vNodeStore = {
  debug: false,
  state: {
    multiChildren: {}
  },
  setComponent(key, component, multiKey = "", fieldNumber = 0) {  //sorter component, parent to input
    if (!multiKey) {
      if (this.debug) console.log(`component ${key} recieved vNode`)
      this.state[key] = component
    } else {
      if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated component with key ${key}`, component)
      if (!this.state.multiChildren[multiKey]) this.state.multiChildren[multiKey] = []
      this.state.multiChildren[multiKey][fieldNumber] = { ...this.state.multiChildren[multiKey][fieldNumber] }
      this.state.multiChildren[multiKey][fieldNumber][key] = component
      // console.log('store of mKey now: ', this.state[multiKey].multiChildren)
    }
  },
  getComponent(key, multiKey = "", fieldNumber = 0) { //  child input component
    let value
    if (!multiKey) {
      value = this.state[key]?.$children[0]
    } else {
      value = this.state.multiChildren[multiKey]?.[fieldNumber]?.[key]?.$children[0]
    }
    if (this.debug) console.log('key ' + key + ' request for options recieved. They are: ', value)
    return value
  },
  get(key, multiKey, fieldNumber) { //Alias
    return this.getComponent(key, multiKey, fieldNumber)
  },
  getMultiSiblings(key, multiKey) {
    let res = []
    const multiParentStore = this.state.multiChildren[multiKey]
    multiParentStore?.map((children) => {
      if (children.hasOwnProperty(key)) res.push(children[key].$children[0])
    })
    if (res.length) return res
    else return null
  },
  resetComponents() {
    for (const [key] of Object.entries(this.state)) {
      this.state[key]?.$children?.[0]?.reset?.()
    }
  },
  //helper global methods
  closeModal: () => { console.log('no modal to close') }
}


export const valueStore = {
  debug: false,
  state: {
    watcher: 'a'
  },
  updateKeyValue(key, value, multiKey = "", fieldNumber = "") {
    if (typeof value === 'object' && value && value.length === undefined) value = { ...value }  //skip obj observer
    if (typeof value === 'object' && value && value.length !== undefined) value = [...value]  //skip arr observer
    if (!multiKey) {
      if (this.debug) console.log(`key ${key} recieved value`, value)
      this.state[key] = value
    } else {
      if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated key ${key} with `, value)
      // this thingy stops from making observers
      this.state[multiKey] = [...this.state[multiKey]]
      this.state[multiKey][fieldNumber] = { ...this.state[multiKey][fieldNumber] }
      this.state[multiKey][fieldNumber][key] = value
    }
    this.state.watcher = value + String(new Date)
  },
  updateFile(key, value, multiKey = "", fieldNumber = "") {
    if (!multiKey) {
      if (this.debug) console.log(`key ${key} recieved value`, value)
      this.state[key] = value
    } else {
      if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated key ${key} with `, value)
      // this thingy stops from making observers
      this.state[multiKey] = [...this.state[multiKey]]
      this.state[multiKey][fieldNumber] = { ...this.state[multiKey][fieldNumber] }
      this.state[multiKey][fieldNumber][key] = value
    }
    this.state.watcher = value + String(new Date)
  },
  getValueByKey(key, multiKey = "", fieldNumber = "") {
    let value
    if (!multiKey) {
      value = this.state[key]
    } else {
      value = this.state[multiKey] && this.state[multiKey][fieldNumber] && this.state[multiKey][fieldNumber][key]
    }
    if (this.debug) console.log('key ' + key + ' request recieved. Its value ', value)
    // if (!multiKey) console.log('key ' + key + ' request recieved. Its value ', value)
    return value
  },
  getStore() {
    const res = killObservers(this.state)
    return res
  },
  deleteMultiField(multiKey, fieldNumber) {
    if (this.debug) console.log(`field ${fieldNumber} was deleted from multikey ${multiKey}`)
    const n = [...this.state[multiKey]]
    n.splice(fieldNumber, 1)
    this.state[multiKey] = n
    this.state.watcher = 'deleted' + multiKey + String(new Date)
  },
  clearStore(exeptionKey = '') {
    if (this.debug) console.log('store was reseted')
    // let empty = {}
    for (const [key, value] of Object.entries(this.state)) {
      if (key === 'watcher') this.state.watcher = 'empty' + String(new Date)
      else if (key !== exeptionKey) this.state[key] = ""
    }
  }
}


export const configStore = {
  debug: false,
  state: { w: 'a' },
  set(key, config, multiKey = "", fieldNumber = "") {
    if (!multiKey) {
      if (this.debug) console.log(`key ${key} recieved config`, config)
      if (this.state[key]) this.state[key] = { ...this.state[key], ...config }
      else this.state[key] = config
    } else {
      if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated key ${key} config`, config)
      if (!this.state[multiKey]) this.state[multiKey] = []
      if (!this.state[multiKey][fieldNumber]) this.state[multiKey][fieldNumber] = {}
      if (this.state[multiKey][fieldNumber][key])
        this.state[multiKey][fieldNumber][key] = { ...this.state[multiKey][fieldNumber][key], ...config }
      else this.state[multiKey][fieldNumber][key] = config
    }
    this.state.w = Math.random()
  },
  get(key, multiKey = "", fieldNumber = "") {
    let value
    if (!multiKey) {
      value = this.state[key] || {}
    } else {
      value = this.state[multiKey]?.[fieldNumber]?.[key] || {}
    }
    if (this.debug) console.log('key ' + key + ' request for config recieved. They are: ', value)
    return { ...value }
  },
  create(key, config, multiKey = "", fieldNumber = "") {
    // creates item only if it hasn't existed yet
    if (!multiKey) {
      if (!this.state[key]) {
        this.state[key] = config;
        if (this.debug) console.log('created rest for', key)
      }
    } else {
      if (!this.state[multiKey]) this.state[multiKey] = []
      if (!this.state[multiKey][fieldNumber]) this.state[multiKey][fieldNumber] = {}
      if (!this.state[multiKey][fieldNumber][key]) {
        this.state[multiKey][fieldNumber][key] = config
        if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated key ${key} config`, config)
      }
    }
    this.state.w = Math.random()
  },
  reset() {
    this.state = {}
  }
}

export const appInfo = {
  state: {},
  setSettings(settings) { this.state.config = settings },
  setValues(vals) { this.state.values = vals },
  setRootComponent(node) { this.root = node },
}