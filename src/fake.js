export const formConfig = {

  title: 'Simple text inputs',

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
}

export const values = {}