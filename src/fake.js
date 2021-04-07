export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      onFocus(fb) {
        // fb.fields.multiple.settings.firstName.label = true
        fb.fields.multiple.fields[0].firstName.label = true
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
      multiple: 'a',
      writable: 'a'

    },
    multiple: {
      type: 'multiple',
      label: true,
      value: [
        { firstName: 'Peter', lastName: '' },
        { firstName: 'Lois', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'First name',
        },
        lastName: {
          label: 'Last name'
        },
      },
  
      row: 1
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