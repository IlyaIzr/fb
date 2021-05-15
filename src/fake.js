export const formConfig = {

  fields: {
    target: {
      label: 'im target', row: 1
    },
    tar2: {row: 1},
    firstName: {
      label: 'Im a hider', 
      onFocus(fb){
        fb.fields.target.visible = false
      }
    },
    s: {
      label: 'Im a revealer', 
      onFocus(fb){
        fb.fields.target.visible = true
      }

    }
    ,
    sb: {
      label: 'Im dont affect visibility', 
      onFocus(fb){
        fb.fields.target.label = true
      }

    }
  },



  methods: {
    onSubmit(fb, _, res) { console.dir(res) }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}