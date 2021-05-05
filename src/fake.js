export const formConfig = {

  fields: {
    
    rangeInput: {
      type: 'date',
      range: true,
      value: { from: '12.12.2012', to: '15.12.2012' },
    },
    
  },

  methods: {
    onSubmit(fb, _, res) {console.log(res)}
  },

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}