export const formConfig = {


  fields: {
    bio: {
      type: 'select',
      name: 'login',
      options: ['aboba', 'abeba', 'bab'],
      onInput(fb, _, val) {
        console.log(val);
      },
      clearable: 1
    },
  },




  methods: {
    onSubmit(fb, _, res) { console.dir({...res}) }
  },

  title: 'Dev title',
}


export const values = {
  bio: 'bab'
}