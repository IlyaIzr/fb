export const formConfig = {

  fields: {
    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      required: 1,
      value: [
        {}
      ],
      settings: {
        firstName: {
          label: 'First name', required: 1
        },
        lastName: {
          label: 'Last name'
        },
      },
      tab: 1
    },
    f: {
      onFocus(fb){
      },
      tab: 2
    },
  },
  tabs: true,
  modal: true,



  methods: {
    onSubmit(fb, _, res) { console.dir(res) }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}