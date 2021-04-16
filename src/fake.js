export const formConfig = {

  fields: {
    multipleSelect: {
      type: 'select',
      options: ['pepe', 'bebe'],
      // value must be an array
      value: [''],
      multiple: true
    }
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