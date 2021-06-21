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
          onInput(a,b,val, som){
    
            console.log('%c⧭', 'color: #f200e2',b, val, som);
          }
        },
        lastName: {
          label: 'Last name'
        },
      },
    },

    
    firstName1: {
      label: 'First name',
      onInput(a,b,val, som){

        console.log('%c⧭', 'color: #f200e2',b, val, som);
      }
    },
  },



  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },
}

export const values = {}