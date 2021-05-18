export const formConfig = {


  fields: {
    name: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      value: [
        { firstName: 'Peter', lastName: '' },
        { firstName: 'Lois', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'First name',
        },
        lastName: {
          label: 'Last name'
        },
      },
      
      onInput(fb, c, val) {
        console.log(fb.fields.name.value);
        console.log(val);
        console.log(fb.getFormValues());
      }
    },
  },




  methods: {
    onSubmit(fb, _, res) {
      console.log(res);
    }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}