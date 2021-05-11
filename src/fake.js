export const formConfig = {

  fields: {

    date: {
      type: 'date',
      range: 1,
      required: 1
    }
  },

  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}