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
    p: {
      onFocus(fb, some, val) {
        delete fb.fields.simpleMultiple.settings.firstName
      }
    },
    setCheck: {
      onFocus(fb) { console.log({ ...fb.fields.simpleMultiple.settings.firstName }); }
    }
  },

  buttons: {
    reset: 'resme'
  },


  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}