export const formConfig = {


  fields: {
    btn: {
      type: 'button',
      value: 'seaboba',
      hint: 'prepersen',
      label: 'brn label',
      row: 1
    },
    re: {
      onFocus(fb){
        fb.fields.btn.visible = false
      }
    },
    
    re2: {
      onFocus(fb){
        fb.fields.btn.visible = true
        fb.fields.btn.value = 'saint bob'
      },
      row: 1,
      hint: 'prepersen',
      label: 'be bob'
    }
  },




  methods: {
    onSubmit(fb, _, res) { console.log({...res}) }
  },

  title: 'Dev title',
}

export const values = {}