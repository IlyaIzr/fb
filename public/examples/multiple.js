export const formConfig = {
  title: 'Multiple fields',

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

    row: 1
  },
  reacivity: {
    label: 'Focus on me',
    onFocus(formGlobal) {
      const fb = formGlobal

      // Change one property on rendered field
      fb.fields.simpleMultiple.fields[0].firstName.hint = 'First rendered "firstname" hint'

      // Assign config
      // TBD
      // fb.fields.simpleMultiple.fields[0].firstName = {
      //   hint: 'First rendered "firstname" hint',
      //   label: 'First name first'
      // }

      // Rewrite fields settings
      // __ Rewrite whole config
      fb.fields.simpleMultiple.settings.lastName = { 
        label: 'Family name',
        hint: 'a.k.a second name'
      }

      // __ Update single property (without rewriting)
      fb.fields.simpleMultiple.settings.lastName.hint = 'family name'
    }
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

}


export const values = {
  simpleMultiple: {
    // Define highest priority values
    // __ For all fields with key
    lastName: 'Griffin',

    // __ or just for the specific row
    1: {
      lastName: 'Griffin-Puttersmidt'
    }
  }
}