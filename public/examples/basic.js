export const formConfig = {
  title: 'Basic form',

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

}


export const values = {
  name: 'Louis'
}