export const formConfig = {

  fields: {
    bio: {
      label: 'Tell us about yourself'
    },
    rea: {
      label: 'R',
      onFocus(fb, comp,f){
        fb.fields.name.value = 'Piotr'
      },
      required: 1,
      tab: 2
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

  // tabs: true,  // Thats enough

  // More verbose config
  // tabs: {
  //   "header-nav": true,
  //   steps: [
  //     { title: 'First', icon: 'settings' }, //Icon names: https://material.io/resources/icons/
  //     { title: 'Second', icon: 'img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg' },
  //     // { title: 'Pirst', icon: 'settings' }, //Icon names: https://material.io/resources/icons/
  //   ]
  //   // More properties: https://quasar.dev/vue-components/stepper#qstepper-api
  // },

  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title',
  buttons: {
    reset: 'c; me'
  }
}


export const values = {
  secondGuy: 'Annan'
}