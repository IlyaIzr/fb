export const formConfig = {
  title: 'Slider example',

  fields: {
    slider: { 
      type: 'slider',
      label: 'some slider',
      // value: 12,
      min: -10,
      max: 22,
      rules: [val => val > 5 || 'bigger then 5, please'],
      showValue: false,
      // More props can be found here https://quasar.dev/vue-components/slider#qslider-api
    }
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

}

