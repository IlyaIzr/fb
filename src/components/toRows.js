import { fbGlobal } from "src/arguments";
import { defaultProps, validator } from "./inputs/validator";

export const fieldsToRows = (fields, values = {}, multiKey = false, multiValues = []) => {
  if (!Object.entries(fields).length) return []

  // Assign required and default values, order rows
  const orderedRows = [];
  const unorderedRows = [];

  for (let [key, field] of Object.entries(fields)) {

    // Assign globals
    if (fbGlobal.global?.fields) for (const [key, value] of Object.entries(fbGlobal.global.fields)) {
      if (field[key] === undefined) field[key] = value
    }

    // service keys
    if (!field.watcher) field.watcher = 1
    if (multiKey) field.multiKey = multiKey
    // correct getters '_key' value
    field.key = String(key).replace("_", "")

    // Assign required and default values
    defaultProps(field) // mutates field

    // Assign values from fb second-argument. 
    // Should be last one to have highest priority
    if (field.key in values) field.value = values[field.key]


    // Validate initial entries
    Object.entries(field).forEach(([prop, value]) => {
      let validated = validator[field.type]?.[prop]?.(value, field);
      if (validated !== undefined) field[prop] = validated;
    })

    // Assign rows
    if (field.row === undefined) {
      unorderedRows.push([field]);  // [field] means every new field gets new entire row
    } else {
      //Put fields in array by they order. Make several fields share similar index
      const thisFieldRow = orderedRows[field.row - 1];
      if (thisFieldRow) {
        thisFieldRow.push(field)
      } else {
        orderedRows[field.row - 1] = [field];
      }
    }
  }

  // Clear rows and order fields inside rows
  const filteredRows = orderedRows.filter((row) => row != null); //delete all empty indexes
  const orderedFields = filteredRows.map(row => {
    const withoutOrder = []
    const ordered = []
    row.forEach(field => {
      if (field.order) {
        // Put field by it's order or to the closest vacant position
        if (!ordered[field.order - 1]) ordered[field.order - 1] = field
        else {
          let count = 0
          while (ordered[field.order + count]) {
            count += 1
          }
          ordered[field.order + count] = field
        }
      } else withoutOrder.push(field)
    })
    const fieldsFiltered = ordered.filter((field) => field != null)
    fieldsFiltered.push(...withoutOrder)
    return fieldsFiltered
  })
  orderedFields.push(...unorderedRows); //add unindexed arrays

  // Computations for multi-children 
  if (!multiKey) return orderedFields;

  // if (!values && !multiValues) return orderedFields
  // Populate multiple fields (ordered rows * length of multivalues)
  const muliLevelPopulated = []
  if (multiValues.length) for (let i = 0; i < multiValues.length; i++) {
    muliLevelPopulated.push([])
  }

  multiValues.forEach((valueObj, index) => {
    orderedFields.forEach(row => {
      const fields = row.map(field => {
        field.multiIndex = index
        field.value = valueObj[field.key]

        // Assign user second arg values
        const globalValue = values?.[field.key]
        if (globalValue) field.value = globalValue
        const userValue = values?.[index]?.[field.key]
        if (userValue) field.value = userValue

        // Assign the field
        return { ...field } // It BREAKS without {...} I mean WTF am i missing
      })
      muliLevelPopulated[index].push(fields)
    })
  })

  return muliLevelPopulated
}

export function sortByTabs(fields, defaultTab) {
  if (!Object.entries(fields).length) return []
  const indexedGroup = []
  const unIndexedFields = {}

  for (let [key, field] of Object.entries(fields)) {

    let index = field.tab || defaultTab
    key = String(key).replace("_", "")

    // Case no index
    if (index === undefined) {

      if (unIndexedFields[key]) console.log('WARNING! Fields with repeating key' + key, { ...field }, field);
      unIndexedFields[key] = fields[key]

    } else {

      // Case has index
      index -= 1
      if (index < 0) index = 0

      if (!indexedGroup[index]) indexedGroup[index] = {}

      else if (indexedGroup[index][key]) console.log('WARNING! Fields with repeating key' + key, { ...field }, field);

      // console.log(index, key, field);
      indexedGroup[index][key] = fields[key]
    }
  }

  // TODO put unindexed in first tab? Or last? We need to know last tab then. Should we ask for that at all here?
  if (!indexedGroup[0]) indexedGroup[0] = {}
  indexedGroup[0] = { ...indexedGroup[0], ...unIndexedFields }

  const filtered = indexedGroup.filter((row) => row != null); //delete all empty indexes

  return filtered
}

