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

#### Field event handlers (functions)
Name  | With arguments  | Description
--- | --- | --- 
onInput | `onInput = async (globalConfig, component, value) => {}` | Fires when field's value changes
onFocus | `onFocus = async (globalConfig, component) => {}` | Fires when field gets focus on it
onBlur | `onBlur = async (globalConfig, component) => {}` | Fires when field loses focus
* globalConfig - reactive object that holds all the information about the form
* component - reference to Vue's field component

### Keys sorted by type
----------------
#### Simple inputs
Key | Expected types | Description
--- | --- | --- 
type  | "text","password","textarea",<br>"email","number","time","dateNative" | input field type
mask  | `String`  | [Mask usage example](https://quasar.dev/vue-components/input#mask)
prefix  | `String` |  Static string before user input
suffix  | `String` |  Static string after user input
value  | `String || Number` | `Number` is for type "number", rest of cases has type of `String`

> See more: https://quasar.dev/vue-components/input#qinput-api

#### Select
Key       | Default value | Expected types | Description
---       | --- | --- | --- 
type      | `"select"` | `"select"` | -
options   | `[]` | `Array`  | Select options. Array elements allowed to have 1 of 3 types <br>
`{ name: String, id: String }`
`{ label: String, value: String }`
`String`
multiple  | `false` | `Boolean` | Allows to pick several options
value     | `'' || []` | `String || Array` | `Array` is for multiple select
writable  | `false` | `Boolean` | Allows to sort options by user input

#### Multiple
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"multiple"` | `"multiple"` | -
value | `[]` | `[Object]` | Array of objects with fieldKey: fieldValue pairs <br> `{ firstName: 'Peter', lastName: 'Griffin' }`
settings | `{}` | fieldKey: fieldConfig{} | Field configs that will be used. <br> Keys correspond to value keys