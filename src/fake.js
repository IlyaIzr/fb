export const formConfig = {
  fields: {
    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      value: [
        { firstName: 'Lois1', lastName: 'Puttershmidt' },
        { firstName: 'Lois2', lastName: 'Puttershmidt' },
        { firstName: 'Lois3', lastName: 'Puttershmidt' },
        { firstName: 'Lois4', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'First name', row: 1
        },
        lastName: {
          label: 'Last name', row: 1
        },
      },
    },
  },


  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    },
    async onReset(formGlobal, component) {
      // Callback functions availible for all event handlers
      return async (formGlobal) => {
        // do something AFTER reset
        formGlobal.title = 'Warning, form has been reseted'
      }
    },
  },
  buttons: {
    reset: {label: 'res'}
  }
}

export const values = {
  simpleMultiple: [
    { firstName: 'Lois1', lastName: 'Puttershmidt' },
    { firstName: 'Lois2', lastName: 'Puttershmidt' },
    { firstName: 'Lois3', lastName: 'Puttershmidt' },
    { firstName: 'Lois4', lastName: 'Puttershmidt' }

  ],
}