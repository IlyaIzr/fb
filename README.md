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
disable | `undefined` | `Boolean`  | disable field input
value | `''` or `[]` | depends on input type  | field value
clearable | `true`  | `Boolean` | adds clear input icon if the field is input
"clear-icon"  | `'close'` | any material ui icon name | [Icon names](https://material.io/resources/icons/)
required | `false`  | `Boolean` | required inputs need to have value, <br> so that `Boolean(value) === true`
visible | `true`  | `Boolean` | field visibility. Invisible fields don't validate <br> but can hold values
rules | `[]`  | array of functions  | array of rules to validate input value <br> rules are functions with arguments  <br> `(value, formValues, globalConfig, metaValue)` <br> every function must return `true` <br> to pass validation
service | `false` | `Boolean` | if set to `false` field value won't appear in object of submited values
group | `undefined` | `Number` or `String`  | numerical index of the field-group, natural number
groupLabel | `undefined` | `String`  | label of the group, if one needed

#### Field event handlers (functions)
Name  | With arguments  | Description
--- | --- | --- 
onInput | `onInput = async (globalConfig, component, value, ?multipleIndex) => {}` | Fires when field's value changes
onFocus | `onFocus = async (globalConfig, component, fieldSettings, ?multipleIndex) => {}` | Fires when field gets focus on it
onBlur | `onBlur = async (globalConfig, component, fieldSettings, ?multipleIndex) => {}` | Fires when field loses focus
onKeyDown | `onKeyDown = async (globalConfig, component, inputVal) => {}` | fires on every user keydown <br> in field types `'creatable'` and `'select'`

* globalConfig - reactive object that holds all the information about the form
* component - reference to Vue's field component

### Keys sorted by type
----------------
#### Simple inputs
Key | Expected types | Description
--- | --- | --- 
type  | "text","password","textarea",<br>"email","number","time","dateNative" | input field type
value  | `String || Number` | `Number` is for type "number", rest of cases has type of `String`
fieldAttachments | `undefined` | `Object` | Describe field attachments
mask  | `String`  | [Mask usage example](https://quasar.dev/vue-components/input#mask)
prefix  | `String` |  Static string before user input
suffix  | `String` |  Static string after user input

> See more: https://quasar.dev/vue-components/input#qinput-api

#### Select
Key       | Default value | Expected types | Description
---       | --- | --- | --- 
type      | `"select"` | `"select"` | -
options   | `[]` | `Array`  | Select options. Array elements allowed to have 1 of 3 types <br>`{ name: String, id: String }`<br>`{ label: String, value: String }`<br>`String`
multiple  | `false` | `Boolean` | Allows to pick several options
value     | `''` or `[]` | `String` or `Array` | `Array` is for multiple select
fieldAttachments | `undefined` | `Object` | Describe field attachments
writable  | `true` | `Boolean` | Allows to filter options by user input

#### Multiple
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"multiple"` | `"multiple"` | -
value | `[]` | `[Object]` | Array of objects with fieldKey: fieldValue pairs <br> `{ firstName: 'Peter', lastName: 'Griffin' }`
settings | `{}` | fieldKey: fieldConfig{} | Field configs that will be used. <br> Keys correspond to value keys
rules | `[]` | Array of functions with following args <br> `(multipleLength, formValues, globalConfig, metaValue) => true` | validation rules 

#### Date
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"date"` | `"date"` | -
withInput  | `true` | `Boolean` | Adds text input with date mask
range  | `false` | `Boolean` | Allows to pick a period between two dates
value | `String` or `{ from: String, to: String }` | `DD.MM.YYYY` or `{ from: 'DD.MM.YYYY' , to: 'DD.MM.YYYY' }` | Date value
fieldAttachments | `undefined` | `Object` | Describe field attachments

> More properties here: https://quasar.dev/vue-components/date#qdate-api

#### Checkbox
Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"checkbox"` | `"checkbox"` | -
value | `false` | `Boolean` | define if checkbox checked
fieldAttachments | `undefined` | `Object` | Describe field attachments

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
fieldAttachments | `undefined` | `Object` | Describe field attachments
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
value | `''` | `String` | button text
color | `'primary'` | `String` | button color, [examples](https://quasar.dev/style/color-palette)
size | `'md'` | `'xs', 'sm', 'md', 'lg', 'xl'` | button size
onClick | `onClick = async (globalConfig, component, fieldConfig) => {}` | `Function` | Semantic name for only event that <br> button can have. You can also use <br> onInput, onFocus or onBlur handlers, that will also fire


#### File uploader

Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"file"` | `"file"` | -
value | `null` | `File`, `FileList`, `Array`, `null` | `Filelist` and `Array` expected if `field.multiple === true`
fieldAttachments | `undefined` | `Object` | Describe field attachments. <br> `fieldAttachments.innerLeft` will replace upload icon
multiple  | `false` | `Boolean` | Allows to pick several files
accept | `'*'` | `String` | Comma separated list of unique file type specifiers. <br> Maps to 'accept' attribute of native input type=file element
max-files | 1 | `Number` or `String` | Maximum number of files to contain
max-file-size | `undefined` | `Number` or `String` | Maximum size of individual file in bytes
rawData | `true` | `Boolean` | recieve file input arguments as `ArrayBuffer` if `true`. Receive as `File` if `false` 

> More properties here: https://quasar.dev/vue-components/file-picker#qfile-api

#### Creatable
An input where users can create multiple options manually

Key | Default value | Expected types | Description
--- | --- | --- | --- 
type  | `"creatable"` | `"creatable"` | -
value | `[]` | `Array` of unique `String`s | for example: ['a', 'b', 'abc']
createOptionMsg | `Введите значение и нажмите 'enter'` | `String` | message to client
onKeyDown | `undefined` | `function onKeyDown(fbGlobal, vueComponent, value)` | fires on every user keydown

### Field Attachments
You can attach different icons and buttons to various inputs. You can also add functionality to them. Field attachment is an `Object` inside field config
```javascript
field: {
  outerLeft: {
    // here you can describe where to put an attachment
  }
}
```


There are 4 keys availible to describe attachment position: 'outerLeft', 'innerLeft', 'innerRight', 'outerRight'
Inside those keys you can describe attachment itself. There're 4 types availible:
* Icon. Expects a material-icon name, [see names](https://material.io/resources/icons/) 
```javascript
      outerLeft: {
        type: 'icon',
        name: 'settings'  // name of the icon
      },
```
* Image. Expects image url
```javascript
      innerLeft: {
        type: 'img',
        src: 'url://some url'
      },
```
* Button. Allows you to run action on user click
```javascript
      innerRight: {
        type: 'button',
        icon: 'warning',
        onClick: (fb, component, field) => {
          field.value = 'New value'
        }
      },
```
* Html. Expects html injection
```javascript
      innerLeft: {
        type: 'html',
        value: '<div class="yourCustomClass"></div>'
      },
```

## Global keys
### Global field keys

> global fields keys should be assigned to `config.global.fields` instance

Global field keys are assigned to each field inside form if they're not specified in field config
#### Global only keys
Key |  Expected types | Description
--- | --- | --- 
submitInvisible | `Boolean` | allows you to submit invisible fields. Affects `field.service` option

### Custom buttons
Custom buttons overrides standart submit buttons, therefore methods described in 'methods' global keys won't work

> usage example
```javascript
const formConfig = {  
  fields: {
    simple: {
      required: true
    }
  },
  
  customButtons: {
    custom1: {
      label: 'Im custom button',
      color: 'orange',
      async onClick(globalConfig, formData, buttonSetting, formRef) {
        console.log('%c⧭', 'color: #364cd9', formData);
        // Validate form
        await formRef.validate()
        buttonSetting.label = 'reactive self change'
      }
    },
    custom2: {
      label: 'Custom btn #2',
      color: 'green'
    },
  },
}
```
You can use [more button settings](https://quasar.dev/vue-components/button#qbtn-api) 