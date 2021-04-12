export const formConfig = {
  fields: {
    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      value: [
        { firstName: 'Peter', lastName: 'Man' },
        { firstName: 'Lois', lastName: 'Puttershmidt' },
        
        { firstName: 'Meg', lastName: 'Test' },
        { firstName: 'static', lastName: 'Filler' },

      ],
      settings: {
        firstName: {
          label: 'First name',
        },
        lastName: {
          label: 'Last name'
        },
      },
  
      row: 1
    },
    s: {
      onFocus(fb){
        console.log(fb.fields);
      }
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