export const formConfig = {
  fields: {
    dato: {
      onInput(...abob) {

        // console.log('%c⧭', 'color: #731d1d', abob);
      },
      type: 'date',
      value: '12.12.2012'
    }
  },


  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },
}

export const values = {}