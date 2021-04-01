export const formConfig = {
  title: 'Tabs example',

  bio: {
    label: 'Tell us about yourself'
  },
  fields: {
    name: {
      label: 'Ваше имя',
      value: 'Anton',
      tab: 2
    }
  },
  city: {
    label: 'City',
    rules: [a => a && a.length > 3 || 'err msg'],
    tab: 3,
  },

  // tabs: true,  // Thats enough

  // More verbose config
  tabs: {
    "header-nav": true
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

  buttons: {   // Not reuired

    // You can re-assign buttons values
    submit: {
      label: 'Send', class: 'customClass'
    },
    next: {
      label: '=>'
    }
  },
},


