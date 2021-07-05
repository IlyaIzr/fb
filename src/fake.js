export const formConfig = {


  fields: {

    
    webmoney: {
      label: "Аккаунты Webmoney",
      type: "multiple",
      value: [],
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



  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },
}

export const values = {}