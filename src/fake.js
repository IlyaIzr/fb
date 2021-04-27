export const formConfig = {

  fields: {
    
    row1: {
      row: 1,
      onFocus(fbg){
        fbg.fields.row2.visible = false
      }
    },
    row2: {
      row: 2,
      label: 'hide me',
      // visible: true, //would rerender
    },
    row23: {
      row: 2
    },
    row24: {
      row: 2
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