export const formConfig = {

  fields: {
    
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
          row: 1
        },
        lastName: {
          label: 'Last name',
          row: 1
        },
      },
    },
    
  },

  methods: {
    onSubmit(fb, _, res) {console.log(res)}
  },

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}