# Form builder documentation

## Field object keys
### Universal keys

Key | Default Value | Expected types | Description
--- | --- | --- | --- 
type | `'text'` | "text","password","textarea",<br>"email","number","time","dateNative",<br>"select","multiple","slider","date",<br>"checkbox","html","editor","button" | defines input type
row | first availible index after all <br> declared indexes | `Number`  | you can place several fields in one row
order | first availible index after all <br> declared order indexes | `Number`  | specify field order in the same row
label | `undefined` | `String`  | field label
hint | `undefined` | `String`  | field hint placed below field content
disabled | `undefined` | `Boolean`  | disable field input
value | `''` or `[]` | depends on input type  | field value
clearable | `true`  | `Boolean` | adds clear input icon if the field is input
"clear-icon"  | `'close'` | any material ui icon name | [Icon names](https://material.io/resources/icons/)
required | `false`  | `Boolean` | required inputs need to have value, <br> so that `Boolean(value) === true`
visible | `true`  | `Boolean` | field visibility. Invisible fields don't validate <br> but can hold values
rules | `[]`  | array of functions  | array of rules to validate input value <br> rules are functions with arguments  <br> `(value, formValues, globalConfig, metaValue)` <br> every function must return `true` <br> to pass validation
Simple inputs
mask  | `undefined` | `String`  | [Mask usage example](https://quasar.dev/vue-components/input#mask)