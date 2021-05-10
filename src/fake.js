export const formConfig = {

  fields: {

    re: {
      onFocus(fb){
        fb.fields.simpleInput = {
          rules: [val => val && val.length > 5 || 'need more letters'],
          clearable: false
        }
      }
    },
    simpleInput: {
      label: 'simrules',
      // required: true,
      rules: [val => val && val.length > 3 || 'need more letters']
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