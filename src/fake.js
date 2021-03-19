export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      row: 1,
      value: 'Anton',
      hint: 'as',
      onFocus(fb) {
        // console.log(fb.title);
        // fb.title = "Peps"
        // console.log(fb.title);
        // fb.fields.name.label = 'New label'
        // fb.fields['e-mail'].value = function (fbGlobal, vNode) { return vNode._uid }
        // fb.fields['e-mail'].hint = 'Changes cause email value fires update'
        // fb.fields.login.hint = 'not fires cause no setters exist for hint or fields.login '
        // // console.log('login obj', fb.fields.login);
        // fb.fields.name.hint = 'also fires because of label described setter'

        // fb.fields.name = {
        //   label: 'new obj label',
        //   // row: 1,
        //   value: 'Bamby',
        // }
        // console.log(fb.fields.name.label);
        
        // THIS WORKS WHEN COMBINED WTF!?
        // fb.fields.name.label = 'New label'
        // fb.newFields.name = {
        //   label: 'new obj label',
        //   // row: 1,
        //   value: 'Bamby',
        // }
        
        fb.newFields.name = {
          label: 'new obj label',
          // row: 1,
          value: 'Bamby',
          // hint: undefined
        }
        fb.newFields.name.label = 'String change'
        
        fb.newFields.login = {
          label: 'new obj label',
          // row: 1,
          value: 'Bamby',
          hint: undefined
        }

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