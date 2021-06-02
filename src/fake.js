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
      // required: true,
      // rules: [length => Boolean(length)]
      rules: [
        function (a, b, c, d) {
          return console.log(a, b, c, d);
        }
      ]

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