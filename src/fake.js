export const formConfig = {
  modal: true,
  fields: {

    s: {
      required: true
    }
  },
  
  // customButtons key turns-off standard method buttons
  customButtons: {
    testo: {
      label: 'Test btn #1',
      color: 'red'
    },
    testo2: {
      label: 'Test btn #2',
      color: 'green'
    },
    testo3: {
      label: 'Test btn #3',
      color: 'orange',
      async onClick(fb, data, setting, formRef) {
        console.log('%c⧭', 'color: #364cd9', data);
        await formRef.validate()
        setting.label = 'reactive self change'
      }
    },
  },

  // methods: {
  //   onSubmit(fb, formComp, values) {
  //     console.log(values);
  //   }
  // },
}

export const values = {}