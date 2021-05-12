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
          label: 'Last name'
        },
      },
    },
    react: {
      onFocus(fb){
        // console.log({...fb.fields.simpleMultiple.settings});
        fb.fields.simpleMultiple.settings.lastName.hint = 'new hint'
        
        // fb.fields.simpleMultiple.settings.lastName = {
        //   label: 'Family name',
        //   hint: 'a.k.a second name'
        // }
      }
    }
  },


  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title',
  buttons: {
    reset: 'resme'
  }
}


export const values = {
  secondGuy: 'Annan'
}