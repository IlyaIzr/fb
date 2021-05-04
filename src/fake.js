export const formConfig = {

  fields: {
    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs and some pther long textos",
      value: [
        { firstName: 'Peter', lastName: '' },
        { firstName: 'Lois', lastName: 'griffin' }
      ],
      settings: {
        firstName: {
          label: 'First name',
          row: 1,
        },
        lastName: {
          label: 'Last name',
          type: 'select',
          options: ['griffin', 'bebser'],
          row: 1
        },
      },
    },
    some: {
      label: 'babasg'
    },
    
  },



  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}