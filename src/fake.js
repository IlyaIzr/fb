export const formConfig = {


  fields: {
    a: {
      value: 'a', 
      group: 1,
      groupLabel: 'abob abob abob abob abob abob abob abob abob '
    },
    simpleMultiple: {
      group: 1,
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
  },




  methods: {
    onSubmit(fb, _, res) { console.log({...res}) }
  },

  title: 'Dev title',
}

export const values = {}