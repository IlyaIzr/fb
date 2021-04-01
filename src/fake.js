export const formConfig = {
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      tab: 2,
      // label: function (formGlobal, component) { return component._uid },
      onFocus(fb) {
        // fb.fields.name = {
        //   label: 'new obj label',
        //   // row: 2,
        //   order: 1,
        //   value: 'Bamby',
        //   hint: 'new added hint'
        // }
        // fb.fields['login'].hint = 'works now too'
        // console.log(fb.fields.members.fields);
        fb.fields.members.fields[0].firstName.hint = 'Check checko'
         
        // fb.fields.members.settings.lastName = {  // redifene inside multiple
        //   label: 'New labelc'
        // }
        // fb.fields.chil.hint = 'somebody'
      }
    },
    chil: {
      value: '',
      // required: true,
      rules: [a => Boolean(a) || 'err msg'],
      tab: 3,
      onFocus(fb) {
        fb.fields.name.hint = 'Bamby'
      }
    },
    members: {
      type: 'multiple',
      row: 1,
      label: "Membas",
      value: [
        { firstName: 'Peter', lastName: 'Bonnington' },
        { firstName: 'Lois', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'firstName',
        },
        lastName: {
          label: 'lastName'
        },
      }

    }
  },
  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(formGlobal);
      console.log(values);
    }
  },

  // tabs: true,
  tabs: {
    "header-nav": true
  },

  // buttons: {
  //   submit: {
  //     label: 'Sub custom text', class: 'cuTOmamAMmaaS11'
  //   }
  // },

  title: 'Dev title'
}


export const values = {
  n55eds: '200',
  mailo12: 'testo@validate',
  // members: [
  //   { lastName: 'Griffin' }
  // ]
  members: {
    lastName: 'Griffin',
    1: {
      lastName: 'Griffin-Puttersmidt'
    }
  }
}