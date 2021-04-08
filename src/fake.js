export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      onFocus(fb) {
        fb.fields.multiple.settings.firstName = {
          label: 'New setting field'
        }
        // fb.fields.multiple.fields[0].firstName.label = true
      },
    },
    chil: {
      onFocus(fb) {
        // fb.fields.multiple.reset()
        console.log(fb.fields.multiple.settings.firstName.label );
      },
      row: '1s',
    },
    multiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      value: [
        { firstName: 'Peter', lastName: '' },
        { firstName: 'Lois', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'First name',
        },
        lastName: {
          label: 'Last name'
        },
      },

    },
  },
  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

  buttons: {
    reset: {
      label: 'reset'
    },
  },


  title: 'Dev title'
}


export const values = {
}