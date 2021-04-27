export const formConfig = {

  fields: {
    
    select: {
      type: 'select',
      // Options availible in any of those types
      // like this
      options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      // Value though is expected to be string or array of strings for multiple options
      // value: "114aZ",
      onInput(fbg, smth) {
        console.log(fbg, smth);
      }

    },
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values, formGlobal.fields);
    }
  },


  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}