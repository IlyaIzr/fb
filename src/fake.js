export const formConfig = {

  fields: {
    field: {
      type: 'email',
      autocomplete: false,
      rules: [(val, formValues, fbGlobal, metaValue = 'In development') => console.log(val, formValues, fbGlobal)]
    }
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },


  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}