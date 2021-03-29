export const formConfig = {
  fields: {
    // name: {
    //   label: 'Ваше имя',
    //   value: 'Anton',
    //   // label: function (formGlobal, component) { return component._uid },
    //   onFocus(fb) {
    //     // fb.fields.name = {
    //     //   label: 'new obj label',
    //     //   // row: 2,
    //     //   order: 1,
    //     //   value: 'Bamby',
    //     //   hint: 'new added hint'
    //     // }
    //     // fb.fields['login'].hint = 'works now too'
    //   }
    // },
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
          label: 'firstName'
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

  // buttons: [  // buttons NOT required
  //   {
  //     type: 'submit', // required IF buttons declared
  //     label: 'отправить', color: 'primary', class: 'customClassName' //not required
  //   },
  //   { type: 'reset', label: 'сбросить' },  // reset button not required
  //   { type: 'close', label: 'x' },    
  //   { type: 'clear', label: 'очистить' },  // not required
  // ],

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