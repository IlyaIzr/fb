export const formConfig = {

  fields: {
    firstName: {
      label: 'First name',
      row: 1,
      order: 1,
      required: true
    },
    button: {
      type: 'button',
      row: 1,
      order: 2,
      label: 'Aboba'
    },
    some: {
      label: 'babasg', row: 1,
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