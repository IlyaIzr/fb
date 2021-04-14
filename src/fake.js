export const formConfig = {
  fields: {
    // date: {
    //   type: 'date',
    //   // value: '12/12/2012'
    //   required: false,
    //   // range: true,
    // },
    // checkbox: {
    //   type: 'checkbox',
    // },
    html: {
      type: 'html',
      value: 'some <br> html'
    },
    s: {
      onFocus(fb){
        console.log(fb.fields);
      },
      required: false
    }
  },
  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },



  title: 'Dev title'
}


export const values = {
}