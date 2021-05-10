export const formConfig = {

  fields: {

    date: {
      type: 'select',
      options: ['asf', 'afag'],
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