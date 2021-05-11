export const formConfig = {

  fields: {

    slider: {
      type: 'slider',
      label: 'some slider',
      // value: 12,
      min: -10,
      max: 22,
      rules: [val => val > 5 || 'bigger then 5, please'],
      // showValue: false,
      row: 1
      // More props can be found here https://quasar.dev/vue-components/slider#qslider-api
    },
    b: {row: 1}
  },

  methods: {
    onSubmit(fb, _, res) { console.log(res) }
  },

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}