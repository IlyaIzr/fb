export const formConfig = {

  fields: {
    
    row1: {
      row: 1,
      onFocus(fbg){
        // console.log();
        fbg.fields.row2.clear()
      }
    },
    row2: {
      row: 2,
      value: 'BEB'
    },
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