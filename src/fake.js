export const formConfig = {


  fields: {
    simpleMultiple: {
      label: "Multiple with simpleinputs",
    },
    asa: {}

  },
  modal: true,
  tabs: true,




  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },

  title: '',
}

export const values = {}