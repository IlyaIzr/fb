export const formConfig = {

  fields: {
    inputDate: {
      type: 'date',
      rules: [(val, formValues, fbGlobal, metaValue = 'In development') => console.log('validation happens', val) === true],
      required: true,
      withInput: false,
      range: true,
      // value: { from: '12.12.2012', to: '15.12.2012' },
    },
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