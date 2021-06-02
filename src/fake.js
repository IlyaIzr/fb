export const formConfig = {


  fields: {
    cb: {
      type: 'checkbox',
      // readonly: true,
      value: 1
    },
    s: {
      
      readonly: true,
      value: 'sabob',
    }
  },




  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },

  title: '',
}

export const values = {}