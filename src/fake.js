export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      onFocus(fb) {
        fb.fields.chil.value = NaN
        // fb.fields.multiple.fields[0].firstName.label = true
      },
    },
    chil: {
      onFocus(fb) {
        // fb.fields.multiple.reset()
      },
      row: '1s',
      label(fb, component, smt){
        console.log(...arguments);
        return 'some label'
      }
    },
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