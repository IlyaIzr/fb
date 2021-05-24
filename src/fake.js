export const formConfig = {


  fields: {
    select: {
      type: 'select',
      options: ['field on', 'field off'],
      writable: true,
      onInput(fb, comp, val) {
        if (val === 'field off') fb.fields.target.visible = false
        if (val === 'field on') fb.fields.target.visible = true
      }
    },
    target: {
      value: 'target value'
    }
  },



  methods: {
    onSubmit(fb, _, res) { console.table({ ...res }) }
  },

  title: 'Dev title',
}


export const values = {
  bio: 'bab'
}