export const formConfig = {

  fields: {
    
    row1: {
      row: 1,
      onFocus(fbg){
        console.log(fbg)
      }
    },
    row2: {
      row: 2,
      value: 'BEB'
    },
  },

tabs: true,

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}