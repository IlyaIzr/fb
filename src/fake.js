export const formConfig = {


  fields: {
    bio: {
      label: 'Tell us about yourself'
    },
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      tab: 2
    },
    city: {
      label: 'City',
      rules: [a => a && a.length > 3 || 'err msg'],
      tab: 3,
    },
  },

  tabs: true,  // Thats enough



  methods: {
    onSubmit(fb, _, res) { console.dir(res) }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}