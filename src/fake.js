export const formConfig = {
  fields: {
    firstguy: {
      
    },
    secondGuy: {
      value: 'Sommsom',
      row: 2,
      label: 'secondGuy',
      onFocus(a, b, c) {
        // console.log('asas');
        // console.log(...arguments);
      }
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
  firstguy: 'Annan'
}