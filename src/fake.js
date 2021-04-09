export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      onFocus(fb) {
        fb.fields.chil.visible = false
        // fb.fields.multiple.fields[0].firstName.label = true
      },
    },
    chil: {
      onFocus(fb) {
        // fb.fields.multiple.reset()
      },
      row: '1s',
      visible: false
    },
    select: {
      type: 'select',
      // Options availible in any of those types
      // like this
      options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      // or this
      // options: [{ label: 'Alpha', value: '114aZ' }, { label: 'Beta', value: '2aaaZ' },],
      // or this
      // options: ['pepe', 'bebe'],
      // Value though is expected to be string or array of strings for multiple options
      value: [],
      multiple: true

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
}