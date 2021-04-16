export const formConfig = {
  fields: {

    rangeInput: {
      type: 'date',
      value: { from: '12.12.2012', to: '15.12.2012' },
      range: true,
    },
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