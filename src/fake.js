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
        },
        lastName: {
          label: 'Last name'
        },
      },
    },
  },


  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title',
  buttons: {
    reset: 'resme'
  }
}


export const values = {
  secondGuy: 'Annan'
}