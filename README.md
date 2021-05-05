# Form builder documentation

## Field object keys
### Universal keys

Key | Default Value | Expected types | Description
--- | --- | --- | --- 
type | `'text'` | "text","password","textarea",<br>"email","number","time","dateNative",<br>"select","multiple","slider","date",<br>"checkbox","html","editor","button" | defines input type
value | `''` or `[]` | depends on input type  | field value
clearable | `true`  | boolean | adds clear input icon if the field is input
"clear-icon"  | `'close'` | any material ui icon name | [Icon names](https://material.io/resources/icons/)
required | `false`  | boolean | required inputs need to have value, <br> so that `Boolean(value) === true`
visible | `true`  | boolean | field visibility. Invisible fields don't validate <br> but can hold values
rules | `[]`  | array of functions  | array of rules to validate input value <br> rules are functions with arguments  <br> `(value, formValues, globalConfig, metaValue)` <br> every function must return `true` <br> to pass validation
