export const formConfig = {
  fields: {
    firstguy: {
      value: 'Peter',
      row: 1,
      label: 11
    },
    secondGuy: {
      value: 'Sommsom',
      row: 2,
      label: 11,
      onFocus(a, b, c) {
        console.log('asas');
        console.log(...arguments);
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