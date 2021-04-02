export const formConfig = {
  title: 'Modal usage',

  fields: {
    name: {
      label: 'Ваше имя'
    },
    nick: {
      label: 'Ваш никнейм',
      value: '',
    },
  },

  modal: {
    // all availble properties. See more: https://quasar.dev/vue-components/dialog#qdialog-api
    position: 'left',
    isOpen: false,
    persistent: true,
    "transition-hide": 'fade',

    // Optional trigger button
    // Trigger button properties. See more: https://quasar.dev/vue-components/button#qbtn-api
    triggerButton: {
      label: 'open',
      class: 'custom_button_class '
    }
  },



}
