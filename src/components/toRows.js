// Adds default values
// Then adds first-priority values from fb() values argument

export const fieldsToRows = (fields = {}, values = {}) => {
  if (!Object.entries(fields).length) return []

  // Map fields
  const res = [];
  const noRowIndexes = [];
  for (const [key, field] of Object.entries(fields)) {


    //Assign value from values source, or else assign default value if it's not in config
    if (values[key] !== undefined
      // && !field.multiKey
    ) {
      field.value = values[key]
    } else if (field.value === undefined)
      field.value = "";

    //Assign default field type as 'text'
    if (!field.type) field.type = "text";

    field.key = String(key).replace("_", "")

    // Assign default rest values
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
      noRowIndexes.push([field]);
    } else {
      //Put fields in array by they order. Make several fields share similar index
      const definedRow = res[field.row - 1];
      if (definedRow && typeof definedRow === 'object' && field.order) {  //TODO
        // const toInsert = definedRow[field.order]
        res[field.row - 1] = [...definedRow, { ...field }];
      } else if (definedRow && typeof definedRow === 'object') {
        res[field.row - 1] = [...definedRow, { ...field }];
      } else {
        res[field.row - 1] = [{ ...field }];
      }
    }

  }

  // Clear fields array
  const resFiltered = res.filter((field) => field != null); //delete all empty indexes
  resFiltered.splice(resFiltered.length - 1, 0, ...noRowIndexes); //add unindexed arrays

  return resFiltered;
}