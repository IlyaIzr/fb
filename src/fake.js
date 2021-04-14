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
    
    thirdGuy: {
      value: 'Bascerini',
      row: 2
    }
  },
  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },



  title: 'Dev title'
}


export const values = {
}