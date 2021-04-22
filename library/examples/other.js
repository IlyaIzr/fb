const formConfig = {
  title: 'Other type of inputs',

  fields: {
    // Checkbox

    checkbox: {
      type: 'checkbox',
      value: true,
      onInput(formGlobal, component, value) {
        if (value) console.log('Agreed');
      }
    },

    // Html injector

    html: {
      type: 'html',
      value: 'some <br> html',
      // no Event handler functions
    },

    // Slider

    slider: {
      type: 'slider',
      label: 'some slider',
      // value: 12,
      min: -10,
      max: 22,
      rules: [val => val > 5 || 'bigger then 5, please'],
      showValue: false,
      // More props can be found here https://quasar.dev/vue-components/slider#qslider-api
    },

    // Text editor

    editor: {
      type: 'editor',
      onInput(formGlobal, component, value) {
        // value is a String of html content
      },
      disable: false
    },

    // Button, custom button

    triggerButton: {
      type: 'button',
      label: 'custom button',
      color: 'primary',
      size: 'sm',
      onClick(fb, component, fieldConfig) {
        fb.fields.targetField.visible = true
      },
      onInput() {
        // onClick alias
      },
      onFocus() {
        // onClick alias
      },
      onBlur() {
        // onClick alias
      },
      // See more button props: https://quasar.dev/vue-components/button#qbtn-api
    },


  },

  // Global values
  // lowest priority

  global: {
    fields: {
      label: 'Label for fields without label'
    },
    tabs: {
      steps: {
        title: 'tab thing',
        icon: 'settings'
      }
    }
  },


  // Form event handlers
  methods: {
    async onSubmit(formGlobal, component, values) {
      console.log(values);
    },
    async onReset(formGlobal, component) {
      // Callback functions availible for all event handlers
      return async (formGlobal) => {
        // do something AFTER reset
        formGlobal.title = 'Warning, form has been reseted'
      }
    },
    async onClear(formGlobal, component) {
      return (formGlobal) => {
        // do something AFTER form been cleared
        formGlobal.title = 'Warning, form has been reseted'
      }
    },
    async onValidateSuccess(fb, component) {
      // runs after all fields validated successfully
    },
    async onValidateError(fb, component, error) {
      console.log(error);
    },
    async onValidationError(f, c, e) {
      // Alias onValidateError
    },
    async onValidateSuccess(fb, component) {
      // runs after all fields validated successfully
    },
    async onMount(formGlobal, component, formRef) {
      // runs after form component did mount
    }
  },

}