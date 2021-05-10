export const formConfig = {

  fields: {

    date: {
      // type: 'slider',
      // options: ['asf', 'afag'],
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