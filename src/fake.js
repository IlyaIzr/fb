export const formConfig = {

  fields: {
    date: {
      type: 'date'
    }
  },


  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}