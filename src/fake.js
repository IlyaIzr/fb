export const formConfig = {

  fields: {
    
    row1: {
      row: 1,
      onFocus(fbg){
        fbg.fields.row23.hint = 'assa'
        fbg.fields.row23.label = 'assa'
      },
      label: 'abab',
      hint: 'jjsj'
    },
    row2: {
      row: 1,
      // value: 'BEB'
    },
    row22: {
      row: 2
    },
    row23: {
      row: 2
    }
  },


  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}