export const formConfig = {


  fields: {
    ht: {
      type: 'html', value: 'html text'
    }
  },

modal: true,

  methods: {
    onSubmit(fb, _, res) { console.table({ ...res }); 
    fb.clearFormInputs() }
  },

  title: 'Dev title',
}


export const values = {
  bio: 'bab'
}