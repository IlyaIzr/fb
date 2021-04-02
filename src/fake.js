export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      onFocus(fb) {
         
        // fb.fields.members.settings.lastName = {  // redifene inside multiple
        //   hint: 'New labelc'
        // }

        // - TDB
        // fb.fields.members.settings.lastName.hint = 'New hint'
        // fb.fields.chil.hint = 'somebody'
      }
    },
    chil: {
      onFocus(fb) {
        fb.fields.members.settings.lastName.label = 'New labelc'
      }
    },
    members: {
      type: 'multiple',
      row: 1,
      label: "Membas",
      value: [
        { firstName: 'Peter', lastName: 'Bonnington' },
        { firstName: 'Lois', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'firstName',
        },
        lastName: {
          label: 'lastName'
        },
      }

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