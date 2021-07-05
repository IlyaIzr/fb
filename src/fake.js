export const formConfig = {


  fields: {

    
    webmoney: {
      label: "Аккаунты Webmoney",
      type: "multiple",
      disable: true,
      value: [{simp: 'asos'}],
      settings: {
        simp: {
          label: "Кошельки",
          // type: "creatable",
          row: 1,
        },
      },
    },
    sim: {}
  },

global: {
fields: {
  // disable: true
}
},

  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },
}

export const values = {}