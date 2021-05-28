export const formConfig = {


  fields: {
    first: {
      row: 1,
      
      group: 2
    },
    second: {
      group: 1
    },
    third: {
      group: 1,
      row: 1,
    },
  },




  methods: {
    onSubmit(fb, _, res) { console.log({...res}) }
  },

  title: 'Dev title',
}

export const values = {}