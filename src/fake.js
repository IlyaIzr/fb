export const formConfig = {


  fields: {
    p:{row: 1},
    b:{row: 3},
    pd:{row: 5},
    first: {
      row: 1,
      
      group: 2
    },
  },




  methods: {
    onSubmit(fb, _, res) { console.log({...res}) }
  },

  title: 'Dev title',
}

export const values = {}