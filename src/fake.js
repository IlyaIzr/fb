export const formConfig = {

  fields: {
    p: {
      type: 'file',
      onInput(fb, some, val){console.log(val, typeof val);}
    }
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