export const formConfig = {

  fields: {
    bebers: {
      type: 'password',
      value: 'as',
      row: 1,
      outerLeft: {
        type: 'button',
        label: 'pus',
        onClick: (fb, component, field) => {
          field.value = 'New value'
        }
      },
    },
    peps: {row: 1}
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },
  // modal: {
  //   maximized: true
  // },
  // modal: true,

  // tabs: {
  //   "header-nav": true
  // },

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}