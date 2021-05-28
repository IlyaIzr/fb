export const formConfig = {


  fields: {
    sel: {
      type: 'select',
      options: ['aboba', 'abeba', 'abiba'],
      // writable: true,
      // multiple: true
    },
    sel2: {
      type: 'select',
      options: ['aboba', 'abeba', 'abiba'],
      writable: true,
      multiple: true
    },
    a: {
      value: 'a'
    },
    b: {}
  },




  methods: {
    onSubmit(fb, _, res) { console.log({...res}) }
  },

  title: 'Dev title',
}

export const values = {}