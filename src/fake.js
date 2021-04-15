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
    
    // thirdGuy: {
    //   value: 'Bascerini',
    //   row: 2
    // },
    // name: {
    //   label: 'Ваше имя',
    //   value: 'Anton',
    //   tab: 2
    // },
    // city: {
    //   label: 'City',
    //   rules: [a => a && a.length > 3 || 'err msg'],
    //   tab: 3,
    // },
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