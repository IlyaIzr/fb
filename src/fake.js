export const formConfig = {


  fields: {
    peps: {
      label: "Multiple with simpleinputs",
      row: 1
    },
    asa: {
      label: 'a',
      row: 1,
      innerLeft: {
        type: 'button',
        icon: 'warning',
        onClick: (fb, component, field) => {
          field.value = 'New value'
        }
      },
    },
    pword: {
      label: 'pword',
      type: 'password',
      row: 1,
      innerLeft: {
        type: 'button',
        icon: 'warning',
        onClick: (fb, component, field) => {
          field.value = 'New value'
        }
      },
    }

  },




  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },

  title: '',
}

export const values = {}