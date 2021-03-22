export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      row: 1,
      value: 'Anton',
      hint: 'as',
      label: function (formGlobal, component) { return component._uid },
      onFocus(fb) {
        // console.log(fb.title);
        // fb.title = "Peps"
        // console.log(fb.title);


        fb.fields.name = {
          label: 'new obj label',
          // row: 1,
          value: 'Bamby',
          // hint: undefined
        }
        fb.fields['e-mail'].hint = 'works now too'


      }
    },
    login: {
      label: 'Ваш логин',
      row: 1,
      order: 1,
      // hint: ""
      // value: function (f, v) { return v._uid },
    },
    'e-mail': {
      label: 'E-mail',
      row: 2,
      type: 'email'
    }
  },
  methods: {
    onSubmit(t, vals, nodes) {
      console.log(vals);
    }
  },

  title: 'Dev title'
}


export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}