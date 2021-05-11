export const formConfig = {

  fields: {

    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      value: [
        { firstName: 'Peter', lastName: '' },
        { firstName: 'Lois', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'First name',
        },
        lastName: {
          label: 'Last name',
          hint: 'n'
        },
      },
    },

    react: {
      label: 'pick me',
      onFocus(fb){
        
        fb.fields.simpleMultiple.settings.lastName.hint = 'family name'
      }
    }

  },

  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}