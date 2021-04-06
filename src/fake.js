export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      onFocus(fb) {
        // fb.fields.select.value = '2aaaZ'
        fb.fields.select.options = [...fb.fields.select.options, { name: 'New ops', id: 'sass' }]
      }
    },
    chil: {
      onFocus(fb) {
      }
    },
    select: {
      type: 'select',
      // options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      options: [{ label: 'Alpha', value: '114aZ' }, { label: 'Beta', value: '2aaaZ' },],
      // options: ['pepe', 'bebe'],
      // value: "114aZ"
      // value: ['pepe'],
      multiple: true

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
}