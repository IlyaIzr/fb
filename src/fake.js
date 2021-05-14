export const formConfig = {

  fields: {
    f: {
      type: 'file',
      onInput(fb, comp, val){
        console.log(val);
        
      }
    }
  },

  buttons: {
    reset: 'resme'
  },


  methods: {
    onSubmit(fb, _, res) { console.dir(res.f) }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}