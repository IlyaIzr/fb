export const formConfig = {

  fields: {
    bebers: {
      type: 'password',
      value: 'as',
      row: 1,
      outerLeft: {
        type: 'button',
        label: 'pus',
        onClick: (fb, component, field) => {
          field.value = 'New value'
        }
      },
    },
    peps: { row: 1, label: 'pepser', tab: 2 }
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },
  
  tabs: {
    steps: [
      { title: 'First', icon: 'settings' }, //Icon names: https://material.io/resources/icons/
      { title: 'Second', icon: 'img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg' }
    ]
  },

  global: {
    fields: {
      label: 'Imma field'
    },
    tabs: {
      steps: {
        title: 'tab thing',
        icon: 'settings'
      }
    }
  },

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}