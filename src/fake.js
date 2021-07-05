export const formConfig = {


  fields: {

    
    webmoney: {
      label: "Аккаунты Webmoney",
      type: "multiple",
      value: [],
      settings: {
        wallets: {
          label: "Кошельки",
          type: "creatable",
          row: 1,
        },
      },
    },
  },



  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },
}

export const values = {}