export const formConfig = {

  fields: {
    // bio: {
    //   label: 'Tell us about yourself'
    // },
    // name: {
    //   label: 'Ваше имя',
    //   value: 'Anton',
    //   tab: 2
    // },
    city: {
      label: 'City',
      rules: [a => a && a.length > 3 || 'err msg'],   // todo
      tab: 3,
    },
  },


  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title',
  buttons: {
    reset: 'res me'
  }
}


export const values = {
  secondGuy: 'Annan'
}