// Adds default required values
// Then adds first-priority values from fb() values argument

export const fieldsToRows = (fields = {}, values = {}) => {
  if (!Object.entries(fields).length) return []

  // Map fields
  const orderedRows = [];
  const unorderedRows = [];
  for (let [key, field] of Object.entries(fields)) {

    // field = { ...field }   // to do or not? removes Proxy wrap

    //Assign value from values source, or else assign default value if it's not in config
    if (values[key] !== undefined
      // && !field.multiKey
    ) {
      field.value = values[key]
    } else if (field.value === undefined)
      field.value = "";

    //Assign default field type as 'text'
    if (!field.type) field.type = "text";

    // correct getters '_key' value
    field.key = String(key).replace("_", "")

    // Assign default rest values
    // Should be last one to have highest priority
    // for (const [key, value] of Object.entries(globalRest)) {
    //   if (field[key] !== undefined) {
    //   } else if (typeof value === "function") {
    //     field[key] = value(this.settings, field);
    //   } else if (typeof value === "string") {
    //     field[key] = value;
    //   }
    // }

    // Make extra array for not indexed fields


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
    row.forEach(field => field.order ? ordered[field.order - 1] = field : withoutOrder.push(field))
    const fieldsFiltered = ordered.filter((field) => field != null)
    fieldsFiltered.push(...withoutOrder)
    return fieldsFiltered
  })
  orderedFields.push(...unorderedRows); //add unindexed arrays
  return orderedFields;
}