export const formConfig = {

  fields: {
    bebers: {
      type: 'number',
      
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