export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      onFocus(fb) {
        fb.fields.chil.visible = false
        // fb.fields.multiple.fields[0].firstName.label = true
      },
    },
    chil: {
      onFocus(fb) {
        // fb.fields.multiple.reset()
      },
      row: '1s',
      visible: false
    },
    slider: { 
      type: 'slider',
      label: 'some slider',
      // value: 12,
      min: -10,
      max: 22,
      rules: [val => val > 5 || 'bigger please']
    }
  },
  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

  buttons: {
    clear: {
      label: 'clear'
    },
  },


  title: 'Dev title'
}


export const values = {
}