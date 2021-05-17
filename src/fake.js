export const formConfig = {


  fields: {
    bio: {
      label: 'Tell us about yourself',
      type: 'select',
      outerLeft: {
        type: 'button',
        label: 'be'
      },
      innerLeft: {
        type: 'button',
        label: 'pe'
      }
    },
  },




  methods: {
    onSubmit(fb, _, res) { console.dir(res) }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}