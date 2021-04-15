const formConfig = {
  title: 'Basic form',

  fields: {
    name: {
      label: 'Click me',
      onFocus(fb) {
        // Example of reactivity usage
      },
      rules: [val => val?.length > 3 || 'Name too short']
    },
    nick: {
      label: 'Ваш никнейм',
      value: '',
      rules: [a => a && a.length > 3 || 'err msg'],
    },
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

}
