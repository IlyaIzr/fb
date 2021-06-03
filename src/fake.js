export const formConfig = {


  fields: {
    c: {
      row: 1,
      type: 'checkbox',
      label: 'cb label'
    },
    s: {
      row: 1,
      order: 1
    },
    s2: {
      row: 2,
      order: 1
    },
    b: {
      row: 2,
      type: 'button'
    },

  },




  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },

  title: '',
}

export const values = {}