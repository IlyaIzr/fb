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
service | `false` | `Boolean` | if set to `false` field value won't appear in object of submited values

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
options   | `[]` | `Array`  | Select options. Array elements allowed to have 1 of 3 types <br>`{ name: String, id: String }`<br>`{ label: String, value: String }`<br>`String`
multiple  | `false` | `Boolean` | Allows to pick several options
value     | `''` or `[]` | `String` or `Array` | `Array` is for multiple select
writable  | `false` | `Boolean` | Allows to sort options by user input

#### Multiple
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"multiple"` | `"multiple"` | -
value | `[]` | `[Object]` | Array of objects with fieldKey: fieldValue pairs <br> `{ firstName: 'Peter', lastName: 'Griffin' }`
settings | `{}` | fieldKey: fieldConfig{} | Field configs that will be used. <br> Keys correspond to value keys

#### Date
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"date"` | `"date"` | -
withInput  | `true` | `Boolean` | Adds text input with date mask
range  | `false` | `Boolean` | Allows to pick a period between two dates
value | `String` or `{ from: String, to: String }` | `DD.MM.YYYY` or `{ from: 'DD.MM.YYYY' , to: 'DD.MM.YYYY' }` | Date value

> More properties here: https://quasar.dev/vue-components/date#qdate-api

#### Checkbox
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"checkbox"` | `"checkbox"` | -
value | `false` | `Boolean` | define if checkbox checked

#### Html
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"html"` | `"html"` | -
value | `''` | `String` that can contain html | Example: `HTML <em>tags</em>`
service | `true` | `Boolean` | html has no need to be submited

#### Slider
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"slider"` | `"slider"` | -
value | `0` | `Number` | -
min | `0` | `Number` | lowest allowed slider value
max | `100` | `Number` | highest allowed slider value
step | `0.01` | `Number` | slider step
showValue | `true` | `Boolean` | if `false`, there will be no icon of current value on top of slider

> More properties here: https://quasar.dev/vue-components/slider#qslider-api

#### Text editor
Rrich text editor with simple Html markup tools

Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"editor"` | `"editor"` | -
value | `''` | `String` that can contain html | Example: `HTML <em>tags</em>`

> Unlike field.type: 'html' text editor has user input

#### Custom button
Button should be used for custom reactivity binded to user actions

Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"button"` | `"button"` | -
label | `''` | `String` | button label (inner text)
color | `'primary'` | `String` | button color, [examples](https://quasar.dev/style/color-palette)
size | `'md'` | `String` | button size
onClick | `onClick = async (globalConfig, component, fieldConfig) => {}` | `Function` | Semantic name for only event that <br> button can have. You can also use <br> onInput, onFocus or onBlur handlers, that will also fire