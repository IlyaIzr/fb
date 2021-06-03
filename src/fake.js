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
          row: 1
        },
        lastName: {
          label: 'Last name',
          type: 'checkbox'
        },
      },

    },
  },




  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },

  title: '',
}

export const values = {}