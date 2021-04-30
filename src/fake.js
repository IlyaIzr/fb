export const formConfig = {

  fields: {
    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs and some pther long textos",
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
    },
    some: {
      label: 'babasg'
    }
  },



  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}