export const formConfig = {

  fields: {
    simpleMultiple: {
      type: 'multiple',
      settings: {
        user: {
          type: 'select',
          options: ['a', 'b']
        },
        abuser: {
          type: 'select',
          options: ['a', 'b']
        }
      },
      // onInput(a, b, c){console.log({...a}, b, c)}
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