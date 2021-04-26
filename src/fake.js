export const formConfig = {

  fields: {
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values, formGlobal.fields);
    }
  },


  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}