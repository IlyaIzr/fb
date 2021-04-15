export const formConfig = {
  fields: {
    firstguy: {
      value: 'Peter',
      row: 1
    },
    secondGuy: {
      value: 'Sommsom',
      row: 2
    },
    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      value: [
        { firstName: 'Peter', lastName: '' },
        { firstName: 'Lois', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'First name',
        },
        lastName: {
          label: 'Last name'
        },
      },
  
      row: 3
    },
    
  },
  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },
modal: {
  maximized: true
},
modal: true,

// tabs: {
//   "header-nav": true
// },

  title: 'Dev title'
}


export const values = {
}