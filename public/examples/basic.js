export const formConfig = {

  fields: {
    name: {
      label: 'Ваше имя'
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

  title: 'Basic form'
}


export const values = {
  name: 'Louis'
}