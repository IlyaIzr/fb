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
  tabs: true,
  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },
  // modal: {
  //   maximized: true
  // },
  // modal: true,

  // tabs: {
  //   "header-nav": true
  // },

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}