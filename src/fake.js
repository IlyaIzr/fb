export const formConfig = {

  fields: {
    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      required: 1,
      value: [
        {}
      ],
      settings: {
        firstName: {
          label: 'First name', required: 1,
          row: 1
        },
        lastName: {
          label: 'Last name',
          service: true,
          outerRight: {
            type: 'button',
            icon: 'settings',  // name of the icon
            onClick(a, b, c) {
              console.log(c.component);
            }
          },
          row: 1
        },
      },
      tab: 1,

    },
    firstName: {
      label: 'First name', required: 1,
      innerLeft: {
        type: 'button',
        icon: 'settings'  // name of the icon
      },
    },
  },



  methods: {
    onSubmit(fb, _, res) { console.dir(res) }
  },

  title: 'Dev title',
}


export const values = {
  secondGuy: 'Annan'
}